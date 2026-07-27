const questions = [
  ["How do I add a recipe?", "Sign in, open Add Recipe from the navbar, fill in the recipe details, and publish it."],
  ["Can I update my recipe later?", "Yes. Go to My Recipe after signing in, select Update, edit the information, and save your changes."],
  ["Can I delete a recipe?", "Yes. In My Recipe, choose Delete on the recipe you no longer want to keep."],
  ["Do I need an account to view recipes?", "No. Everyone can explore recipes. An account is only needed to add and manage your own recipes."],
];

export default function Faq() {
  return (
    <main className="min-h-screen bg-[#f7f6ef] px-5 py-12 sm:px-8 lg:px-12"><section className="mx-auto max-w-3xl"><div className="text-center"><p className="font-semibold uppercase tracking-[0.16em] text-[#b65313]">Need help?</p><h1 className="mt-2 text-3xl font-bold text-[#1f2f17] sm:text-4xl">Frequently asked questions</h1><p className="mt-3 text-[#52604b]">Quick answers to help you use My Kitchen.</p></div><div className="mt-10 space-y-4">{questions.map(([question, answer]) => <details key={question} className="group rounded-2xl border border-[#dfe5d9] bg-white px-5 shadow-sm"><summary className="cursor-pointer list-none py-5 pr-8 font-bold text-[#1f2f17] marker:hidden">{question}<span className="float-right text-xl text-[#54920f] group-open:rotate-45">+</span></summary><p className="border-t border-[#edf0e9] pb-5 pt-4 leading-7 text-[#52604b]">{answer}</p></details>)}</div></section></main>
  );
}
