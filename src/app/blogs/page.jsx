import Link from "next/link";
import { FaArrowRight, FaClock } from "react-icons/fa";

const posts = [
  { type: "Kitchen tips", title: "Five simple ways to make weeknight cooking easier", time: "4 min read", color: "bg-[#dbeecb]" },
  { type: "Healthy eating", title: "How to build a colorful and balanced dinner plate", time: "5 min read", color: "bg-[#ffe3c8]" },
  { type: "Cooking basics", title: "Small pantry items that bring big flavor", time: "3 min read", color: "bg-[#d9e9df]" },
];

export default function Blogs() {
  return (
    <main className="min-h-screen bg-[#f7f6ef] px-5 py-6 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-6xl"><div className="max-w-2xl"><p className="font-semibold uppercase tracking-[0.16em] text-[#b65313]">From our kitchen</p><h1 className="mt-2 text-3xl font-bold text-[#1f2f17] sm:text-4xl">Food stories and helpful tips</h1><p className="mt-3 text-[#52604b]">Simple articles to help you feel more confident in the kitchen.</p></div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">{posts.map((post) => <article key={post.title} className="overflow-hidden rounded-3xl border border-[#dfe5d9] bg-white shadow-sm"><div className={`h-36 ${post.color} p-6`}><span className="rounded-full bg-white/70 px-3 py-1 text-sm font-bold text-[#35502c]">{post.type}</span></div><div className="p-6"><h2 className="text-xl font-bold leading-7 text-[#1f2f17]">{post.title}</h2><p className="mt-4 flex items-center gap-2 text-sm text-[#63705c]"><FaClock /> {post.time}</p><Link href="/all-recipe" className="mt-6 inline-flex items-center gap-2 font-bold text-[#54920f] transition hover:text-[#b65313]">Explore recipes <FaArrowRight /></Link></div></article>)}</div>
      </section>
    </main>
  );
}
