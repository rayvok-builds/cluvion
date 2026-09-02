"use client";

import { useState } from "react";
import { FAQS } from "../lib/data";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#070709] border-b border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent tracking-widest font-semibold">09</span>
            <span className="text-xs font-secondary uppercase tracking-[0.25em] text-cinema-muted">
              FREQUENTLY ANSWERED // CLEAR CUT
            </span>
          </div>
          <div className="text-[11px] font-mono text-cinema-dim hidden sm:block">
            06 ANSWERS
          </div>
        </div>

        {/* Cheeky Header (Exact Copy: NOT AI-GENERATED ANSWERS. REAL ONES.) */}
        <h2 className="font-primary font-black text-3xl sm:text-5xl md:text-6xl uppercase text-white tracking-tight leading-tight mb-12 sm:mb-16">
          NOT AI-GENERATED ANSWERS.{" "}
          <span className="accent-italic text-accent">REAL ONES</span>.
        </h2>

        {/* Accordion List */}
        <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="group py-6 sm:py-8 transition-colors">
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between gap-6 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="font-mono text-xs text-cinema-dim">0{idx + 1}</span>
                    <h3 className="font-secondary font-medium text-lg sm:text-2xl text-white group-hover:text-accent transition-colors">
                      {faq.q}
                    </h3>
                  </div>
                  <div className="shrink-0 w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/80 group-hover:border-accent group-hover:text-accent transition-colors">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 pl-8 sm:pl-12 pr-6 animate-in fade-in duration-200">
                    <p className="font-secondary text-base sm:text-lg text-cinema-muted leading-relaxed max-w-3xl">
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

