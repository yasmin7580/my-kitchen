import { Clock3, ImagePlus, Tag } from "lucide-react";
import UploadImage from "./UploadImage";
import SubmitForm from "./SubmitForm";


export default function AddRecipe() {


    return (
        <section className="min-h-screen bg-[#f7f6ef] px-5 py-12 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-4xl">
                <div className="mb-8">
                    <p className="font-semibold uppercase tracking-[0.16em] text-[#b65313]">Share your favourite dish</p>
                    <h1 className="mt-2 text-3xl font-bold text-[#1f2f17] sm:text-4xl">Add a new recipe</h1>
                    <p className="mt-3 text-[#52604b]">Give fellow home cooks everything they need to make it beautifully.</p>
                </div>
                <SubmitForm>
                    <div className="grid gap-6 md:grid-cols-2">
                        <UploadImage />

                        <div className="md:col-span-2">
                            <label htmlFor="recipe-name" className="mb-2 block font-semibold text-[#1f2f17]">Recipe name</label>
                            <input id="recipe-name" name="recipeName" type="text" placeholder="e.g. Creamy garlic pasta" required className="h-12 w-full rounded-xl border border-[#d6ddd0] px-4 text-[#1f2f17] outline-none transition placeholder:text-[#9ba694] focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" />
                        </div>

                        <div>
                            <label htmlFor="category" className="mb-2 block font-semibold text-[#1f2f17]">Category</label>
                            <select id="category" name="category" required defaultValue="" className="h-12 w-full rounded-xl border border-[#d6ddd0] bg-white px-4 text-[#1f2f17] outline-none transition focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10">
                                <option value="" disabled>Select a category</option>
                                <option>Breakfast</option>
                                <option>Lunch</option>
                                <option>Dinner</option>
                                <option>Dessert</option>
                                <option>Snacks</option>
                                <option>Drinks</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="difficulty" className="mb-2 block font-semibold text-[#1f2f17]">Difficulty</label>
                            <select id="difficulty" name="difficulty" required defaultValue="" className="h-12 w-full rounded-xl border border-[#d6ddd0] bg-white px-4 text-[#1f2f17] outline-none transition focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10">
                                <option value="" disabled>Choose difficulty</option>
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="cooking-time" className="mb-2 block font-semibold text-[#1f2f17]">Cooking time</label>
                            <div className="relative">
                                <Clock3 size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#54920f]" />
                                <input id="cooking-time" name="cookingTime" type="number" min="1" placeholder="Minutes" required className="h-12 w-full rounded-xl border border-[#d6ddd0] py-2 pl-11 pr-4 text-[#1f2f17] outline-none transition placeholder:text-[#9ba694] focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="tags" className="mb-2 block font-semibold text-[#1f2f17]">Tags</label>
                            <div className="relative">
                                <Tag size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#54920f]" />
                                <input id="tags" name="tags" type="text" placeholder="vegetarian, quick, spicy" className="h-12 w-full rounded-xl border border-[#d6ddd0] py-2 pl-11 pr-4 text-[#1f2f17] outline-none transition placeholder:text-[#9ba694] focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" />
                            </div>
                            <p className="mt-2 text-xs text-[#778270]">Separate tags with commas.</p>
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="ingredients" className="mb-2 block font-semibold text-[#1f2f17]">Ingredients</label>
                            <textarea id="ingredients" name="ingredients" rows="5" required placeholder={"List each ingredient on a new line\ne.g. 250g pasta\n2 cloves garlic"} className="w-full resize-y rounded-xl border border-[#d6ddd0] px-4 py-3 text-[#1f2f17] outline-none transition placeholder:text-[#9ba694] focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="instructions" className="mb-2 block font-semibold text-[#1f2f17]">Instructions</label>
                            <textarea id="instructions" name="instructions" rows="6" required placeholder={"Write the steps in order\n1. Bring a pot of water to boil..."} className="w-full resize-y rounded-xl border border-[#d6ddd0] px-4 py-3 text-[#1f2f17] outline-none transition placeholder:text-[#9ba694] focus:border-[#54920f] focus:ring-4 focus:ring-[#54920f]/10" />
                        </div>


                    </div>


                    <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#edf0e9] pt-6 sm:flex-row sm:justify-end">
                        <button type="reset" className="rounded-full px-6 py-3 font-semibold text-[#52604b] transition hover:bg-[#f2f4ef]">Clear form</button>
                        <button type="submit" className="rounded-full bg-[#b65313] px-7 py-3 font-bold text-white shadow-md shadow-[#b65313]/20 transition hover:-translate-y-0.5 hover:bg-[#d16c29] focus:outline-none focus:ring-4 focus:ring-[#b65313]/20">Publish recipe</button>
                    </div>
                </SubmitForm>
            </div>
        </section>
    );
}
