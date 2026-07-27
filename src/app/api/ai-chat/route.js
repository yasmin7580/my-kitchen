import { GoogleGenAI } from "@google/genai";
import { auth } from "@/lib/auth";
import { myKitchenDb } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 1_000;
const RECIPES_API_URL = "http://localhost:8000/recipes";

const responseSchema = {
  type: "OBJECT",
  properties: {
    answer: { type: "STRING" },
    suggestions: {
      type: "ARRAY",
      items: { type: "STRING" },
      minItems: 3,
      maxItems: 3,
    },
  },
  required: ["answer", "suggestions"],
};

async function getAuthenticatedUser(request) {
  const session = await auth.api.getSession({ headers: request.headers });
  return session?.user ?? null;
}

function recipeMatchesMessage(recipe, message) {
  const terms = message.toLowerCase().match(/[a-z]{3,}/g) ?? [];
  if (!terms.length) return false;
  const haystack = [recipe.recipeName, recipe.category, recipe.ingredients, recipe.tags, recipe.difficulty]
    .join(" ")
    .toLowerCase();
  return terms.some((term) => haystack.includes(term));
}

function compactRecipe(recipe) {
  return {
    id: recipe._id?.toString(),
    name: recipe.recipeName,
    category: recipe.category,
    ingredients: recipe.ingredients,
    cookingTimeMinutes: recipe.cookingTime,
    difficulty: recipe.difficulty,
    tags: recipe.tags,
  };
}

async function getRelevantRecipes(message) {
  try {
    const response = await fetch(RECIPES_API_URL, { cache: "no-store", signal: AbortSignal.timeout(4_000) });
    if (!response.ok) return [];
    const recipes = await response.json();
    if (!Array.isArray(recipes)) return [];
    const matched = recipes.filter((recipe) => recipeMatchesMessage(recipe, message));
    return (matched.length ? matched : recipes.slice(0, 8)).slice(0, 8).map(compactRecipe);
  } catch {
    return [];
  }
}

function normaliseResponse(text) {
  const parsed = JSON.parse(text);
  const answer = typeof parsed.answer === "string" ? parsed.answer.trim() : "";
  const suggestions = Array.isArray(parsed.suggestions)
    ? parsed.suggestions.filter((item) => typeof item === "string" && item.trim()).slice(0, 3)
    : [];
  if (!answer || suggestions.length !== 3) throw new Error("Invalid Gemini response format");
  return { answer, suggestions };
}

function chatServiceError(error) {
  const detail = error instanceof Error ? error.message.toLowerCase() : "";
  if (detail.includes("api key") || detail.includes("api_key_invalid")) {
    return "Gemini rejected the API key. Check GEMINI_API_KEY in .env, then restart the server.";
  }
  if (detail.includes("quota") || detail.includes("resource exhausted")) {
    return "Gemini's request limit has been reached. Please try again later or check your Gemini API quota.";
  }
  if (detail.includes("permission") || detail.includes("not found") || detail.includes("model")) {
    return "Gemini access is unavailable for this API key. Confirm the key was created in Google AI Studio and has Gemini API access.";
  }
  return "The AI assistant is temporarily unavailable. Please try again shortly.";
}

export async function GET(request) {
  try {
    const user = await getAuthenticatedUser(request);
    if (!user?.email) return Response.json({ error: "Please sign in to use the assistant." }, { status: 401 });

    const messages = await myKitchenDb.collection("aiConversations")
      .find({ userEmail: user.email })
      .sort({ timestamp: -1 })
      .limit(10)
      .project({ _id: 0, role: 1, message: 1, timestamp: 1 })
      .toArray();

    return Response.json({ messages: messages.reverse() });
  } catch (error) {
    console.error("Unable to load AI chat history", error);
    return Response.json({ error: "Unable to load your conversation." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return Response.json({ error: "The AI assistant is not configured yet." }, { status: 503 });
    }

    const user = await getAuthenticatedUser(request);
    if (!user?.email) return Response.json({ error: "Please sign in to use the assistant." }, { status: 401 });

    const body = await request.json();
    const message = typeof body.message === "string" ? body.message.trim() : "";
    if (!message || message.length > MAX_MESSAGE_LENGTH) {
      return Response.json({ error: "Please enter a message of up to 1,000 characters." }, { status: 400 });
    }

    const conversations = myKitchenDb.collection("aiConversations");
    const history = await conversations.find({ userEmail: user.email })
      .sort({ timestamp: -1 })
      .limit(10)
      .project({ _id: 0, role: 1, message: 1 })
      .toArray();
    const relevantRecipes = await getRelevantRecipes(message);

    await conversations.insertOne({ userEmail: user.email, role: "user", message, timestamp: new Date() });

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const geminiHistory = history.reverse().map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.message }],
    }));

    const modelResponse = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [...geminiHistory, { role: "user", parts: [{ text: message }] }],
      config: {
        systemInstruction: `You are the helpful My Kitchen AI Assistant for a recipe-sharing application. Answer only about My Kitchen, recipes, ingredients, cooking, categories, cooking times, difficulty, tags, browsing recipes, adding recipes, editing a user's recipes, and account navigation. Do not claim that a recipe exists, is available, or has a specific detail unless it appears in the supplied recipe catalog. If information is unavailable, say so plainly and guide the user to browse All recipes or add a recipe. Do not give medical, allergy, or food-safety advice beyond a brief recommendation to consult a qualified professional when appropriate. Keep answers helpful and concise. Return JSON only with an answer and exactly three short, useful follow-up questions.\n\nRelevant recipes from the live catalog:\n${JSON.stringify(relevantRecipes)}`,
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    const result = normaliseResponse(modelResponse.text);
    await conversations.insertOne({ userEmail: user.email, role: "assistant", message: result.answer, timestamp: new Date() });
    return Response.json(result);
  } catch (error) {
    console.error("AI chat request failed", error);
    return Response.json({ error: chatServiceError(error) }, { status: 503 });
  }
}
