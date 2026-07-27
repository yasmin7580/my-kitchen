"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Clock3, Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
  {
    eyebrow: "Tonight's table",
    title: "Good food makes every day feel special.",
    description: "Fresh ideas, simple ingredients, and recipes worth gathering around.",
    time: "20 min recipes",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1500&q=85",
  },
  {
    eyebrow: "Weekend favourite",
    title: "Make room for a little kitchen magic.",
    description: "From a quick breakfast to a crowd-pleasing dinner, find your next go-to dish.",
    time: "Easy to make",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1500&q=85",
  },
  {
    eyebrow: "Cook with confidence",
    title: "A better meal starts with one good recipe.",
    description: "Explore colourful, comforting dishes made for real life and hungry people.",
    time: "New this week",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1500&q=85",
  },
];

export default function Banner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, []);

  const changeSlide = (direction) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <>
      <section className="relative isolate min-h-[60svh] max-h-[70svh] overflow-hidden bg-[#173308] text-white sm:min-h-[64svh]" aria-label="Featured recipes">
        {slides.map((item, index) => (
          <Image
            key={item.title}
            src={item.image}
            alt=""
            fill
            sizes="100vw"
            priority={index === 0}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${index === activeSlide ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#102608]/95 via-[#173308]/72 to-[#173308]/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102608]/70 via-transparent to-transparent" />
        <div className="absolute -right-24 top-10 h-60 w-60 rounded-full border border-white/20" />
        <div className="absolute -right-8 top-28 h-36 w-36 rounded-full border border-white/15" />

        <div className="relative mx-auto flex min-h-[60svh] max-h-[70svh] w-full max-w-7xl items-center px-5 py-14 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#d9f5be]">
              <Sparkles size={17} className="text-[#b65313]" />
              {slide.eyebrow}
            </div>
            <h1 className="max-w-xl text-4xl font-bold leading-[1.06] sm:text-5xl lg:text-6xl">{slide.title}</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-white/85 sm:text-lg">{slide.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/recipe" className="group inline-flex items-center gap-2 rounded-full bg-[#b65313] px-6 py-3.5 font-bold text-white shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#d16c29] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#173308]">
                Explore recipes <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="#popular-recipes" className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-5 py-3.5 font-semibold backdrop-blur-sm transition hover:bg-white/20">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white text-[#54920f]"><Play size={11} fill="currentColor" /></span>
                See what&apos;s cooking
              </a>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/15 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
              <Clock3 size={16} className="text-[#d9f5be]" /> {slide.time}
            </div>
          </div>

          <div className="absolute bottom-7 left-5 right-5 flex items-center justify-between sm:left-8 sm:right-8 lg:left-12 lg:right-12">
            <div className="flex gap-2" aria-label="Banner slides">
              {slides.map((item, index) => (
                <button key={item.title} type="button" onClick={() => setActiveSlide(index)} aria-label={`Show slide ${index + 1}`} aria-current={index === activeSlide} className={`h-2 rounded-full transition-all ${index === activeSlide ? "w-9 bg-[#b65313]" : "w-2 bg-white/50 hover:bg-white"}`} />
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => changeSlide(-1)} aria-label="Previous slide" className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-black/20 transition hover:bg-white hover:text-[#54920f]"><ChevronLeft size={20} /></button>
              <button type="button" onClick={() => changeSlide(1)} aria-label="Next slide" className="grid h-10 w-10 place-items-center rounded-full border border-white/35 bg-black/20 transition hover:bg-white hover:text-[#54920f]"><ChevronRight size={20} /></button>
            </div>
          </div>
        </div>
      </section>

      {/* <section id="popular-recipes" className="relative overflow-hidden bg-[#f7f6ef] px-5 py-14 text-[#1f2f17] sm:px-8 lg:px-12" aria-labelledby="popular-title">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-semibold uppercase tracking-[0.16em] text-[#b65313]">Keep exploring</p>
            <h2 id="popular-title" className="mt-2 text-3xl font-bold sm:text-4xl">Popular recipes for your table</h2>
          </div>
          <Link href="/all-recipe" className="inline-flex items-center gap-2 font-bold text-[#54920f] transition hover:text-[#b65313]">View all recipes <ArrowRight size={18} /></Link>
        </div>
        <a href="#popular-recipes" className="absolute right-5 top-0 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-[#54920f] text-white shadow-lg sm:right-8 lg:right-12" aria-label="Continue to popular recipes"><ArrowDown size={20} /></a>
      </section> */}
    </>
  );
}
