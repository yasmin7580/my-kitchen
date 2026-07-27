# My Kitchen

My Kitchen is a recipe-sharing web application where home cooks can discover recipes, publish their own dishes, and manage the recipes they have shared. It includes an authenticated, Gemini-powered AI assistant that can help users navigate the application and find recipes from the live catalog.

## Features

- Browse recipes by name, ingredient, tag, category, and cooking time.
- Register and sign in with email/password or Google.
- Add recipes with an image, category, difficulty, cooking time, ingredients, instructions, and tags.
- Update and delete recipes from the **My recipes** page.
- Upload recipe images through ImgBB.
- Responsive UI built with Tailwind CSS and DaisyUI.
- Floating AI assistant for signed-in users:
  - remembers the latest 10 messages in each user's conversation;
  - saves every user and assistant message in MongoDB;
  - uses the live recipe catalog as context for recipe questions;
  - shows a typing state and three suggested follow-up questions.

## Tech Stack

- Next.js 16 and React 19
- MongoDB
- Better Auth with Google sign-in
- Google Gemini (`@google/genai`)
- Tailwind CSS and DaisyUI
- Axios, TanStack Query, Lucide React, SweetAlert2, and React Hot Toast

## Prerequisites

- Node.js 20 or later
- npm
- MongoDB database
- A running recipe API at `http://localhost:8000`
- An ImgBB API key
- Google OAuth credentials
- A Google Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

## Installation

1. Clone the repository and open the project directory.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure the required variables:

   ```env
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_IMAGE_BB_API_KEY=your_imgbb_api_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

   Keep `.env` private. Never commit it or use `NEXT_PUBLIC_GEMINI_API_KEY`; the Gemini key must remain server-side.

4. Start the recipe API on port `8000`.

5. Start the Next.js application:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server. |
| `npm run build` | Creates a production build. |
| `npm run start` | Starts the production server after building. |
| `npm run lint` | Runs ESLint. |

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Home page |
| `/all-recipe` | Browse and filter all recipes |
| `/add-recipe` | Create a recipe (sign-in required) |
| `/my-recipe` | View, edit, and delete the current user's recipes |
| `/update-recipe/[id]` | Update a recipe |
| `/profile` | User profile |
| `/login` and `/register` | Authentication |
| `/blogs`, `/faq`, `/testimonial`, `/newsletter`, `/contact` | Informational pages |

## AI Assistant

The assistant is mounted in the root layout and appears as a floating chat button for signed-in users, except on authentication pages.

### Server API

`POST /api/ai-chat`

Request body:

```json
{
  "message": "Show me quick vegetarian recipes"
}
```

Response body:

```json
{
  "answer": "...",
  "suggestions": [
    "Show dinner recipes",
    "Find recipes under 30 minutes",
    "How do I add my own recipe?"
  ]
}
```

`GET /api/ai-chat` loads the current user's latest 10 saved messages.

The API route authenticates the request, reads the `aiConversations` MongoDB collection, retrieves relevant recipes from the recipe API, and sends that context to Gemini. The Gemini API key never reaches the browser.

## Recipe API Contract

The frontend and AI route expect the local recipe service to provide:

- `GET http://localhost:8000/recipes`
- `POST http://localhost:8000/recipes`
- `GET`, `PUT`, or `PATCH http://localhost:8000/recipes/:id`
- `DELETE http://localhost:8000/recipe/:id`

A recipe should include fields such as `recipeName`, `image`, `category`, `difficulty`, `cookingTime`, `ingredients`, `instructions`, `tags`, and `userEmail`.

## Security Notes

- Store all credentials only in `.env`.
- Rotate any API key that has been pasted into chat, committed to Git, or otherwise exposed.
- The AI chat route uses the signed-in user from Better Auth; it does not trust an email sent by the browser.

## License

This project is private and intended for educational use.
