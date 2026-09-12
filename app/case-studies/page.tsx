"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CASE_STUDIES } from "../../lib/caseStudiesData";
import { useFilm } from "../../components/FilmContext";
import { ArrowRight, ArrowUpRight, Play, Sparkles } from "lucide-react";

export default function CaseStudiesPage() {
  const { openProjectModal } = useFilm();
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = [
    "ALL",
    "Luxury Fashion",
    "Haute Joaillerie",
    "Automotive EV",
    "Heritage Apparel",
    "D2C Performance",
    "Coastal Apparel",
    "Swiss Watchmaking",
  ];

  const filteredStudies =
    selectedCategory === "ALL"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) =>
          cs.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <main className="relative w-full bg-[#050608] text-[#F4F4F6] min-h-screen overflow-x-clip">
      <Navbar />

      {/* Hero Header */}
      <section className="relative w-full pt-36 sm:pt-44 pb-16 sm:pb-24 border-b border-white/[0.08] px-6 sm:px-10 text-center select-none bg-gradient-to-b from-[#0B0C10] to-[#050608]">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-mono text-xs text-accent uppercase tracking-[0.3em] mb-4">
            [ STUDIO PRODUCTION REPERTORY ]
          </span>

          <h1 className="font-primary font-bold uppercase text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-none mb-6">
            CASE STUDIES
          </h1>

          <p className="font-secondary text-sm sm:text-base md:text-lg text-white/70 max-w-2xl leading-relaxed">
            Detailed dossiers, audited metrics, and production pipelines for every brand film, creative variation, and AI micro-drama produced by Cluvion.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-10">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-white text-black font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    : "bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {filteredStudies.map((study, idx) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.id}`}
              className="group relative block bg-[#08090C] border border-white/10 hover:border-white/30 rounded-none overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl no-underline text-inherit"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <Image
                  src={study.posterUrl}
                  alt={study.client}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 font-mono text-[10.5px]">
                  <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/15 text-white/90 uppercase tracking-wider">
                    {study.category}
                  </span>
                  <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/15 text-accent uppercase tracking-wider">
                    {study.duration} · {study.aspectRatio}
                  </span>
                </div>

                {/* Bottom Overlay Title on Hover */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block">
                      CLIENT DOSSIER 0{idx + 1}
                    </span>
                    <h3 className="font-primary font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight leading-tight group-hover:text-accent transition-colors">
                      {study.client}
                    </h3>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black text-white flex items-center justify-center transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <h4 className="font-secondary font-medium text-base sm:text-lg text-white/90 mb-2 leading-snug">
                    {study.title}
                  </h4>
                  <p className="font-secondary text-xs sm:text-sm text-white/60 line-clamp-2 leading-relaxed mb-6">
                    {study.overview}
                  </p>
                </div>

                {/* Key Metrics Row */}
                <div className="pt-4 border-t border-white/[0.08] grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                  {study.stats.slice(0, 4).map((st) => (
                    <div key={st.label} className="p-2 bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[9px] text-white/40 block truncate">{st.label}</span>
                      <span className="font-primary font-bold text-base sm:text-lg text-white mt-0.5 block">
                        {st.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bottom Conversion Banner */}
      <section className="relative w-full py-20 sm:py-28 bg-[#070709] border-t border-white/[0.08] text-center px-6 sm:px-10">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <span className="font-mono text-xs text-accent uppercase tracking-[0.3em] mb-3">
            START YOUR PRODUCTION
          </span>
          <h2 className="font-primary font-bold uppercase text-4xl sm:text-6xl text-white tracking-tight mb-6">
            GOT A BRIEF FOR YOUR BRAND?
          </h2>
          <p className="font-secondary text-sm sm:text-base text-white/65 max-w-xl mb-8">
            Tell us your brand and vision. Receive a treatment concept, storyboard, and fixed estimate in 48 hours.
          </p>
          <button
            type="button"
            onClick={() => openProjectModal()}
            className="px-8 sm:px-10 py-4 bg-white hover:bg-accent text-black font-primary font-bold text-sm sm:text-base uppercase tracking-[0.2em] transition-colors"
          >
            LET&apos;S TALK
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
