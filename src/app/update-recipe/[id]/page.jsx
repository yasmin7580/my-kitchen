"use client";

import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const emptyRecipe = {
  recipeName: "",
  category: "",
  cookingTime: "",
  difficulty: "",
  ingredients: "",
  instructions: "",
  tags: "",
};

export default function UpdateRecipe() {
  const { id } = useParams();
  const router = useRouter();
  const [recipe, setRecipe] = useState(emptyRecipe);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/recipes/${id}`);
        setRecipe({ ...emptyRecipe, ...result.data });
      } finally {
        setIsLoading(false);
      }
    };
    getRecipe();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe((currentRecipe) => ({ ...currentRecipe, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    try {
      await axios.put(`http://localhost:8000/recipes/${id}`, recipe);
      router.push("/my-recipe");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <section className="min-h-screen bg-[#f7f6ef] px-5 py-12 text-center text-[#63705c]">Loading recipe...</section>;
  }

  return (
    <section className="min-h-screen bg-[#f7f6ef] px-5 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <Link href="/my-recipe" className="inline-flex items-center gap-2 font-semibold text-[#54920f] hover:text-[#b65313]"><ArrowLeft size={18} /> Back to my recipes</Link>
        <div className="mt-6">
          <p className="font-semibold uppercase tracking-[0.16em] text-[#b65313]">Make changes</p>
          <h1 className="mt-2 text-3xl font-bold text-[#1f2f17] sm:text-4xl">Update recipe</h1>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-[#dfe5d9] bg-white p-5 shadow-sm sm:p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="md:col-span-2"><span className="mb-2 block font-semibold text-[#1f2f17]">Recipe name</span><input name="recipeName" value={recipe.recipeName} onChange={handleChange} required className="h-12 w-full rounded-xl border border-[#d6ddd0] px-4 outline-none focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" /></label>
            <label><span className="mb-2 block font-semibold text-[#1f2f17]">Category</span><input name="category" value={recipe.category} onChange={handleChange} required className="h-12 w-full rounded-xl border border-[#d6ddd0] px-4 outline-none focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" /></label>
            <label><span className="mb-2 block font-semibold text-[#1f2f17]">Difficulty</span><select name="difficulty" value={recipe.difficulty} onChange={handleChange} required className="h-12 w-full rounded-xl border border-[#d6ddd0] bg-white px-4 outline-none focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10"><option value="">Select difficulty</option><option>Easy</option><option>Medium</option><option>Hard</option></select></label>
            <label><span className="mb-2 block font-semibold text-[#1f2f17]">Cooking time (minutes)</span><input name="cookingTime" value={recipe.cookingTime} onChange={handleChange} type="number" min="1" required className="h-12 w-full rounded-xl border border-[#d6ddd0] px-4 outline-none focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" /></label>
            <label><span className="mb-2 block font-semibold text-[#1f2f17]">Tags</span><input name="tags" value={recipe.tags} onChange={handleChange} className="h-12 w-full rounded-xl border border-[#d6ddd0] px-4 outline-none focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" /></label>
            <label className="md:col-span-2"><span className="mb-2 block font-semibold text-[#1f2f17]">Ingredients</span><textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} rows="5" required className="w-full rounded-xl border border-[#d6ddd0] px-4 py-3 outline-none focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" /></label>
            <label className="md:col-span-2"><span className="mb-2 block font-semibold text-[#1f2f17]">Instructions</span><textarea name="instructions" value={recipe.instructions} onChange={handleChange} rows="6" required className="w-full rounded-xl border border-[#d6ddd0] px-4 py-3 outline-none focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" /></label>
          </div>
          <div className="mt-8 flex justify-end border-t border-[#edf0e9] pt-6"><button disabled={isSaving} className="inline-flex items-center gap-2 rounded-full bg-[#b65313] px-6 py-3 font-bold text-white disabled:opacity-60"><Save size={18} /> {isSaving ? "Saving..." : "Save changes"}</button></div>
        </form>
      </div>
    </section>
  );
}
