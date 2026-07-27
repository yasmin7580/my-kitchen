import Link from "next/link";
import { FaEnvelope, FaFacebookF, FaInstagram, FaMapMarkerAlt, FaPhoneAlt, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-auto bg-[#173308] text-[#edf5e9]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-12">
        <div>
          <h2 className="text-2xl font-bold text-white">My Kitchen</h2>
          <p className="mt-3 max-w-xs text-sm leading-6 text-[#cbd9c3]">
            Simple recipes, fresh ideas, and delicious meals for every home kitchen.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook" className="rounded-full bg-white/10 p-2.5 transition hover:bg-[#54920f]"><FaFacebookF size={18} /></a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="rounded-full bg-white/10 p-2.5 transition hover:bg-[#54920f]"><FaInstagram size={18} /></a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube" className="rounded-full bg-white/10 p-2.5 transition hover:bg-[#54920f]"><FaYoutube size={18} /></a>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-white">Quick links</h3>
          <ul className="mt-4 space-y-3 text-sm text-[#cbd9c3]">
            <li><Link href="/" className="transition hover:text-white">Home</Link></li>
            <li><Link href="/all-recipe" className="transition hover:text-white">All recipes</Link></li>
            <li><Link href="/contact" className="transition hover:text-white">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white">Contact us</h3>
          <ul className="mt-4 space-y-4 text-sm text-[#cbd9c3]">
            <li className="flex items-start gap-3"><FaMapMarkerAlt size={18} className="mt-0.5 shrink-0 text-[#91c56a]" /> Dhaka, Bangladesh</li>
            <li><a href="mailto:support@mykitchen.com" className="flex items-center gap-3 transition hover:text-white"><FaEnvelope size={18} className="shrink-0 text-[#91c56a]" /> support@mykitchen.com</a></li>
            <li><a href="tel:+8801700000000" className="flex items-center gap-3 transition hover:text-white"><FaPhoneAlt size={18} className="shrink-0 text-[#91c56a]" /> +880 1700-000000</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-white">Cooking together</h3>
          <p className="mt-4 text-sm leading-6 text-[#cbd9c3]">Save your favorite recipes and make every meal a little more special.</p>
          <Link href="/all-recipe" className="mt-5 inline-block rounded-full bg-[#b65313] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#d16c29]">Explore recipes</Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-[#b8c9ae]">
        © {new Date().getFullYear()} My Kitchen. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
