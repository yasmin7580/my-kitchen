import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <main className="min-h-screen bg-[#f7f6ef] px-5 py-12 sm:px-8 lg:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-semibold uppercase tracking-[0.16em] text-[#b65313]">Get in touch</p>
          <h1 className="mt-2 text-3xl font-bold text-[#1f2f17] sm:text-4xl">Let&apos;s talk about food</h1>
          <p className="mt-3 leading-7 text-[#52604b]">Have a recipe question, an idea, or just want to say hello? We would love to hear from you.</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-3xl bg-[#173308] p-7 text-white sm:p-9">
            <h2 className="text-2xl font-bold">Contact information</h2>
            <p className="mt-3 leading-7 text-[#cbd9c3]">Reach us directly using any of the details below.</p>

            <div className="mt-8 space-y-6">
              <a href="mailto:support@mykitchen.com" className="flex items-start gap-4 transition hover:text-[#b7ea92]"><span className="rounded-full bg-white/10 p-3 text-[#b7ea92]"><FaEnvelope /></span><span><span className="block text-sm text-[#cbd9c3]">Email us</span><span className="font-semibold">support@mykitchen.com</span></span></a>
              <a href="tel:+8801700000000" className="flex items-start gap-4 transition hover:text-[#b7ea92]"><span className="rounded-full bg-white/10 p-3 text-[#b7ea92]"><FaPhoneAlt /></span><span><span className="block text-sm text-[#cbd9c3]">Call us</span><span className="font-semibold">+880 1700-000000</span></span></a>
              <div className="flex items-start gap-4"><span className="rounded-full bg-white/10 p-3 text-[#b7ea92]"><FaMapMarkerAlt /></span><span><span className="block text-sm text-[#cbd9c3]">Visit us</span><span className="font-semibold">Dhaka, Bangladesh</span></span></div>
            </div>

            <div className="mt-9 border-t border-white/15 pt-6">
              <p className="text-sm text-[#cbd9c3]">Follow My Kitchen</p>
              <div className="mt-3 flex gap-3">
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full bg-white/10 p-3 transition hover:bg-[#54920f]"><FaFacebookF /></a>
                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-3 transition hover:bg-[#54920f]"><FaInstagram /></a>
              </div>
            </div>
          </div>

          <form action="mailto:support@mykitchen.com" method="post" encType="text/plain" className="rounded-3xl border border-[#dfe5d9] bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-bold text-[#1f2f17]">Send a message</h2>
            <p className="mt-2 text-[#63705c]">Your email app will open when you send the form.</p>
            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label><span className="mb-2 block text-sm font-semibold text-[#1f2f17]">Your name</span><input name="name" required placeholder="Your name" className="h-12 w-full rounded-xl border border-[#d6ddd0] bg-[#f9fcf7] px-4 text-[#1f2f17] outline-none transition focus:border-[#54920f] focus:bg-white focus:ring-4 focus:ring-[#54920f]/10" /></label>
              <label><span className="mb-2 block text-sm font-semibold text-[#1f2f17]">Email address</span><input name="email" type="email" required placeholder="you@example.com" className="h-12 w-full rounded-xl border border-[#d6ddd0] bg-[#f9fcf7] px-4 text-[#1f2f17] outline-none transition focus:border-[#54920f] focus:bg-white focus:ring-4 focus:ring-[#54920f]/10" /></label>
              <label className="sm:col-span-2"><span className="mb-2 block text-sm font-semibold text-[#1f2f17]">Subject</span><input name="subject" required placeholder="What would you like to talk about?" className="h-12 w-full rounded-xl border border-[#d6ddd0] bg-[#f9fcf7] px-4 text-[#1f2f17] outline-none transition focus:border-[#54920f] focus:bg-white focus:ring-4 focus:ring-[#54920f]/10" /></label>
              <label className="sm:col-span-2"><span className="mb-2 block text-sm font-semibold text-[#1f2f17]">Message</span><textarea name="message" required rows="6" placeholder="Write your message here..." className="w-full rounded-xl border border-[#d6ddd0] bg-[#f9fcf7] px-4 py-3 text-[#1f2f17] outline-none transition focus:border-[#54920f] focus:bg-white focus:ring-4 focus:ring-[#54920f]/10" /></label>
            </div>
            <button type="submit" className="mt-6 rounded-full bg-[#b65313] px-7 py-3 font-bold text-white shadow-md shadow-[#b65313]/20 transition hover:-translate-y-0.5 hover:bg-[#d16c29]">Send message</button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Contact;
