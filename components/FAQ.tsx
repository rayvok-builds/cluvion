"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQ_LIST: FAQItem[] = [
  {
    q: "WILL IT LOOK AI?",
    a: "If it looks AI, it doesn't leave the studio. Every facial mesh, product texture, shadow angle, and motion cadence is directed, graded, and held to camera-capture standards.",
  },
  {
    q: "CAN YOU USE MY ACTUAL PRODUCT?",
    a: "Yes. We lock the product before production and build the world around it — exact logos, stitching, stone cuts, and metal reflections without deformation.",
  },
  {
    q: "HOW FAST?",
    a: "UGC & ad sets: 3–5 days. Brand films: 7–14 days. Concept and fixed quote guaranteed within 48 hours.",
  },
  {
    q: "WHO OWNS IT?",
    a: "You. The final delivered assets are yours, forever, subject to the agreed production contract.",
  },
  {
    q: "HOW MUCH DO I SAVE?",
    a: "Savings depend on the production scope. Compared with equivalent traditional production, AI-native workflows remove major location fees, talent flights, casting calls, soundstage hire, and camera equipment overhead.",
  },
  {
    q: "DO YOU RUN THE ADS TOO?",
    a: "Yes. Production continues directly into creative testing, Meta Ads management, and ongoing performance optimisation.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full py-24 sm:py-32 bg-[#050608] border-b border-white/[0.08] select-none">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-8 border-b border-white/[0.12] mb-12">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent tracking-widest font-semibold">11</span>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50">
              // FREQUENTLY ANSWERED · STUDIO POLICIES
            </span>
          </div>
          <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest mt-2 sm:mt-0">
            06 VERIFIED PROTOCOLS
          </span>
        </div>

        {/* Big Minimal Headline */}
        <h2 className="font-switzer font-medium text-3xl sm:text-5xl md:text-6xl uppercase text-white tracking-tight leading-tight mb-12 sm:mb-16">
          Clear-Cut <span className="text-accent">Answers.</span>
        </h2>

        {/* Minimalist Editorial Accordion */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {FAQ_LIST.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`group py-6 sm:py-8 transition-colors ${
                  isOpen ? "bg-white/[0.01]" : ""
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span
                      className={`font-mono text-xs ${
                        isOpen ? "text-accent font-bold" : "text-white/25"
                      }`}
                    >
                      [0{idx + 1}]
                    </span>
                    <h3
                      className={`font-switzer font-medium uppercase text-base sm:text-xl lg:text-2xl transition-colors ${
                        isOpen ? "text-white" : "text-white/70 group-hover:text-white"
                      }`}
                    >
                      {faq.q}
                    </h3>
                  </div>

                  <div
                    className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-all ${
                      isOpen
                        ? "border-accent text-accent bg-accent/10"
                        : "border-white/10 text-white/40 group-hover:border-white/30"
                    }`}
                  >
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pl-9 sm:pl-14 pr-6">
                    <p className="font-dmsans text-sm sm:text-base text-white/70 leading-relaxed max-w-3xl font-light">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
