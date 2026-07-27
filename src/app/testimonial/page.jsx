import { FaQuoteLeft, FaStar } from "react-icons/fa";

const reviews = [
  { name: "Jerin Jahan", role: "Home cook", text: "My Kitchen makes it so easy to find fresh recipe ideas. The instructions are simple and the dishes always turn out delicious." },
  { name: "Sadia Rahman", role: "Food lover", text: "I love saving recipes for busy weekdays. Everything is clear, practical, and made with ingredients I can actually find." },
  { name: "Nafis Ahmed", role: "Weekend chef", text: "The recipe collection gave me confidence to cook more at home. My family has already asked for a few dishes again." },
];

export default function Testimonial() {
  return (
    <main className="min-h-screen bg-[#f7f6ef] px-5 py-6 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center"><p className="font-semibold uppercase tracking-[0.16em] text-[#b65313]">Community stories</p><h1 className="mt-2 text-3xl font-bold text-[#1f2f17] sm:text-4xl">Loved by home cooks</h1><p className="mt-3 text-[#52604b]">See what people are cooking, sharing, and enjoying with My Kitchen.</p></div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => <article key={review.name} className="rounded-3xl border border-[#dfe5d9] bg-white p-6 shadow-sm"><FaQuoteLeft className="text-3xl text-[#b65313]" /><div className="mt-5 flex gap-1 text-[#e9a225]">{[1, 2, 3, 4, 5].map((star) => <FaStar key={star} />)}</div><p className="mt-5 leading-7 text-[#52604b]">“{review.text}”</p><div className="mt-6 border-t border-[#edf0e9] pt-4"><h2 className="font-bold text-[#1f2f17]">{review.name}</h2><p className="mt-1 text-sm text-[#63705c]">{review.role}</p></div></article>)}
        </div>
      </section>
    </main>
  );
}
