"use client";

import Image from "next/image";
import { Clock3, Search, SlidersHorizontal, Tag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const fallbackImage = "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85";

const imageSource = (image) => typeof image === "string" && image.length > 0 ? image : fallbackImage;

const timeMatches = (time, filter) => {
    const minutes = Number(time);
    if (filter === "under-30") return minutes < 30;
    if (filter === "30-60") return minutes >= 30 && minutes <= 60;
    if (filter === "over-60") return minutes > 60;
    return true;
};

export default function AllRecipe() {


    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [time, setTime] = useState("all");

    useEffect(() => {
        const getRecipe = async () => {
            try {
                const result = await axios.get("http://localhost:8000/recipes")
                setRecipes(Array.isArray(result.data) ? result.data : [])
            } catch {
                setRecipes([])
            } finally {
                setIsLoading(false)
            }
        }
        getRecipe()
    }, [])



    const categories = ["all", ...new Set(recipes.map((recipe) => recipe.category))];
    const visibleRecipes = useMemo(() => {
        const term = search.trim().toLowerCase();
        return recipes.filter((recipe) => {
            const matchesSearch = !term || [recipe.recipeName, recipe.ingredients, recipe.tags].some((value) => String(value ?? "").toLowerCase().includes(term));
            return matchesSearch && (category === "all" || recipe.category === category) && timeMatches(recipe.cookingTime, time);
        });
    }, [recipes, search, category, time]);

    return (
        <section className="min-h-screen bg-[#f7f6ef] px-5 py-12 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl">
                <div className="max-w-2xl">
                    <p className="font-semibold uppercase tracking-[0.16em] text-[#b65313]">Find your next favourite</p>
                    <h1 className="mt-2 text-3xl font-bold text-[#1f2f17] sm:text-4xl">All recipes</h1>
                    <p className="mt-3 text-[#52604b]">Explore dishes shared by the My Kitchen community.</p>
                </div>

                <div className="mt-8 grid gap-3 rounded-2xl border border-[#dfe5d9] bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1fr)_180px_180px]">
                    <label className="relative block">
                        <span className="sr-only">Search recipes</span>
                        <Search size={19} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#54920f]" />
                        <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Search by recipe, ingredient or tag" className="h-12 w-full rounded-xl border border-[#d6ddd0] py-2 pl-11 pr-4 text-[#1f2f17] outline-none transition placeholder:text-[#9ba694] focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" />
                    </label>
                    <label className="relative block">
                        <span className="sr-only">Filter by category</span>
                        <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-[#d6ddd0] bg-white px-4 pr-10 font-medium text-[#1f2f17] outline-none focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10">
                            {categories.map((item) => <option key={item} value={item}>{item === "all" ? "All categories" : item}</option>)}
                        </select>
                        <SlidersHorizontal size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#54920f]" />
                    </label>
                    <label className="relative block">
                        <span className="sr-only">Filter by cooking time</span>
                        <select value={time} onChange={(event) => setTime(event.target.value)} className="h-12 w-full appearance-none rounded-xl border border-[#d6ddd0] bg-white px-4 pr-10 font-medium text-[#1f2f17] outline-none focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10">
                            <option value="all">Any cooking time</option>
                            <option value="under-30">Under 30 minutes</option>
                            <option value="30-60">30–60 minutes</option>
                            <option value="over-60">Over 60 minutes</option>
                        </select>
                        <Clock3 size={17} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#54920f]" />
                    </label>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm font-medium text-[#63705c]">{visibleRecipes.length} {visibleRecipes.length === 1 ? "recipe" : "recipes"} found</p>
                    {(search || category !== "all" || time !== "all") && <button type="button" onClick={() => { setSearch(""); setCategory("all"); setTime("all"); }} className="text-sm font-bold text-[#b65313] hover:underline">Clear filters</button>}
                </div>

                {isLoading ? (
                    <div className="mt-5 rounded-2xl border border-[#e1e7dc] bg-white px-6 py-16 text-center text-[#63705c]">Loading recipes...</div>
                ) : visibleRecipes.length ? (
                    <div className="mt-5 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {visibleRecipes.map((recipe) => (
                            <article key={recipe._id ?? recipe.recipeName} className="group overflow-hidden rounded-2xl border border-[#e1e7dc] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                                <div className="relative h-52 overflow-hidden">
                                    <Image src={imageSource(recipe.image)} alt={recipe.recipeName ?? "Recipe image"} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
                                    <span className="absolute left-4 top-4 rounded-full bg-[#54920f] px-3 py-1 text-xs font-bold text-white">{recipe.category}</span>
                                    <span className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#b65313]">{recipe.difficulty}</span>
                                </div>
                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-sm font-semibold text-[#54920f]"><Clock3 size={16} /> {recipe.cookingTime} min</div>
                                    <h2 className="mt-3 text-xl font-bold text-[#1f2f17]">{recipe.recipeName}</h2>
                                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#61705a]"><span className="font-semibold text-[#3d4b36]">Ingredients: </span>{recipe.ingredients}</p>
                                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#61705a]"><span className="font-semibold text-[#3d4b36]">Instructions: </span>{recipe.instructions}</p>
                                    <div className="mt-4 flex flex-wrap gap-2 border-t border-[#edf0e9] pt-4">
                                        {String(recipe.tags ?? "").split(",").filter(Boolean).map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-[#eff7e9] px-2.5 py-1 text-xs font-semibold text-[#447a0c]"><Tag size={12} />{tag.trim()}</span>)}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="mt-5 rounded-2xl border border-dashed border-[#b8c9aa] bg-white px-6 py-16 text-center">
                        <h2 className="text-xl font-bold text-[#1f2f17]">No recipes match those filters</h2>
                        <p className="mt-2 text-[#63705c]">Try another search term or clear your filters.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
