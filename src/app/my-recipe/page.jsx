"use client";

import { authClient } from "@/lib/auth-client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Clock3, Pencil, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

const emptyRecipe = {
  recipeName: "",
  category: "",
  difficulty: "",
  cookingTime: "",
  tags: "",
  ingredients: "",
  instructions: "",
};

const toFormValues = (recipe) => Object.fromEntries(
  Object.keys(emptyRecipe).map((key) => [key, recipe?.[key] ?? ""]),
);

const MyRecipe = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const userEmail = session?.user?.email

  const queryClient = useQueryClient();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [formValues, setFormValues] = useState(emptyRecipe);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["myRecipes", user?.email],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8000/recipes");
      return Array.isArray(res.data)
        ? res.data.filter((recipe) => recipe.userEmail === userEmail)
        : [];
    },
    enabled: userEmail ? true : false
  });

  const recipes = Array.isArray(data) ? data : [];

  const openUpdateModal = (recipe) => {
    setSelectedRecipe(recipe);
    setFormValues(toFormValues(recipe));
  };

  const closeModal = () => {
    if (!isSaving) setSelectedRecipe(null);
  };

  const saveChanges = async (event) => {
    event.preventDefault();
    const form = event.target
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    console.log(data)
    if (!selectedRecipe?._id) return;

    setIsSaving(true);
    try {
      await axios.patch(`http://localhost:8000/recipes/${selectedRecipe._id}`, data);
      await refetch()
      setSelectedRecipe(null);
    } finally {
      setIsSaving(false);
    }
  };


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(
          axios.delete(`http://localhost:8000/recipe/${id}`),
          {
            loading: "Deleting...",
            success: async ({ data }) => {
              if (data.deletedCount > 0) {
                await refetch();
                return "Recipe deleted successfully!";
              }

            },
            error: "Something went wrong!",
          }
        );
      }
    });
  }

  return (
    <section className="min-h-screen bg-[#f7f6ef] px-5 py-12 sm:px-8 lg:px-12">
      <Toaster />
      <div className="mx-auto max-w-7xl">
        <p className="font-semibold uppercase tracking-[0.16em] text-[#b65313]">Your kitchen</p>
        <h1 className="mt-2 text-3xl font-bold text-[#1f2f17] sm:text-4xl">My recipes</h1>
        <p className="mt-3 text-[#52604b]">Manage the recipes you have shared.</p>

        {isLoading ? (
          <div className="mt-8 rounded-2xl border border-[#e1e7dc] bg-white px-6 py-16 text-center text-[#63705c]">Loading your recipes...</div>
        ) : recipes.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {recipes.map((recipe) => (
              <article key={recipe._id ?? recipe.recipeName} className="overflow-hidden rounded-2xl border border-[#e1e7dc] bg-white shadow-sm">
                {recipe.image && (
                  <div className="relative h-52">
                    <Image src={recipe.image} alt={recipe.recipeName ?? "Recipe"} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3 text-sm font-semibold text-[#54920f]">
                    <span className="inline-flex items-center gap-2"><Clock3 size={16} /> {recipe.cookingTime} min</span>
                    <span>{recipe.difficulty}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-[#1f2f17]">{recipe.recipeName}</h2>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#61705a]">{recipe.ingredients}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#edf0e9] pt-5">
                    <button type="button" onClick={() => openUpdateModal(recipe)} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#54920f] px-4 py-2.5 font-bold text-[#447a0c] transition hover:bg-[#eff7e9]"><Pencil size={16} /> Update</button>
                    <button type="button" onClick={() => handleDelete(recipe._id)} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#b65313] px-4 py-2.5 font-bold text-white transition hover:bg-[#d16c29] disabled:cursor-not-allowed disabled:opacity-60"><Trash2 size={16} /> {deletingId === recipe._id ? "Deleting..." : "Delete"}</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-[#b8c9aa] bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-bold text-[#1f2f17]">No recipes yet</h2>
            <p className="mt-2 text-[#63705c]">Recipes you add will appear here.</p>
          </div>
        )}
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="update-recipe-title">
          <form onSubmit={saveChanges} className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div><h2 id="update-recipe-title" className="text-2xl font-bold text-[#1f2f17]">Update recipe</h2><p className="mt-1 text-sm text-[#63705c]">Edit the details, then save your changes.</p></div>
              <button type="button" onClick={closeModal} aria-label="Close update form" className="rounded-full p-2 text-[#52604b] hover:bg-[#eff7e9]"><X size={20} /></button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["recipeName", "Recipe name"],
                ["category", "Category"],
                ["difficulty", "Difficulty"],
                ["cookingTime", "Cooking time (minutes)"],
                ["tags", "Tags"],
              ].map(([name, label]) => (
                <label key={name} className={name === "recipeName" ? "md:col-span-2" : ""}>
                  <span className="mb-2 block text-sm font-semibold text-[#1f2f17]">{label}</span>
                  <input
                    name={name}
                    value={formValues[name]}
                    onChange={(event) => setFormValues({ ...formValues, [name]: event.target.value })}
                    type={name === "cookingTime" ? "number" : "text"}
                    min={name === "cookingTime" ? "1" : undefined}
                    required={name !== "tags"}
                    className="h-11 w-full rounded-xl border border-[#c7d4bd] bg-[#f3f8ef] px-3 font-medium text-[#1f2f17] outline-none transition focus:border-[#54920f] focus:bg-white focus:ring-4 focus:ring-[#54920f]/10"
                  />
                </label>
              ))}
              <label className="md:col-span-2"><span className="mb-2 block text-sm font-semibold text-[#1f2f17]">Ingredients</span><textarea name="ingredients" value={formValues.ingredients} onChange={(event) => setFormValues({ ...formValues, ingredients: event.target.value })} rows="4" required className="w-full rounded-xl border border-[#c7d4bd] bg-[#f3f8ef] px-3 py-2 font-medium text-[#1f2f17] outline-none transition focus:border-[#54920f] focus:bg-white focus:ring-4 focus:ring-[#54920f]/10" /></label>
              <label className="md:col-span-2"><span className="mb-2 block text-sm font-semibold text-[#1f2f17]">Instructions</span><textarea name="instructions" value={formValues.instructions} onChange={(event) => setFormValues({ ...formValues, instructions: event.target.value })} rows="5" required className="w-full rounded-xl border border-[#c7d4bd] bg-[#f3f8ef] px-3 py-2 font-medium text-[#1f2f17] outline-none transition focus:border-[#54920f] focus:bg-white focus:ring-4 focus:ring-[#54920f]/10" /></label>
            </div>
            <div className="mt-6 flex justify-end gap-3"><button type="button" onClick={closeModal} disabled={isSaving} className="rounded-full px-5 py-2.5 font-bold text-[#52604b] hover:bg-[#eff7e9]">Cancel</button><button type="submit" disabled={isSaving} className="rounded-full bg-[#54920f] px-6 py-2.5 font-bold text-white hover:bg-[#447a0c] disabled:cursor-not-allowed disabled:opacity-60">{isSaving ? "Saving..." : "Save changes"}</button></div>
          </form>
        </div>
      )}
    </section>
  );
};

export default MyRecipe;
