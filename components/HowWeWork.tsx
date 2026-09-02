"use client";

import { useState } from "react";
import { PROCESS_STEPS } from "../lib/data";
import { CheckCircle2, Clock, PlayCircle } from "lucide-react";

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="process" className="relative w-full py-24 sm:py-32 bg-[#070709] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent tracking-widest font-semibold">06</span>
            <span className="text-xs font-secondary uppercase tracking-[0.25em] text-cinema-muted">
              STUDIO PROTOCOL // HOW WE WORK
            </span>
          </div>
          <div className="text-[11px] font-mono text-cinema-dim hidden sm:block">
            04 STEP PIPELINE
          </div>
        </div>

        {/* 4 Code-Labelled Steps (One line each) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.code}
              onMouseEnter={() => setActiveStep(idx)}
              className={`relative p-7 sm:p-8 rounded-lg bg-[#0A0B0E] border transition-all duration-300 flex flex-col justify-between min-h-[280px] group ${
                activeStep === idx
                  ? "border-accent/60 bg-[#0E1015] shadow-[0_0_30px_rgba(229,169,60,0.08)]"
                  : "border-white/10 hover:border-white/25"
              }`}
            >
              {/* Top Code Badge & Step Number */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 font-mono text-xs text-accent font-semibold">
                    ({step.code})
                  </span>
                  <span className="text-xs font-mono text-cinema-dim">
                    {step.num}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-cinema-dim">
                  {step.eta}
                </span>
              </div>

              {/* Title & One-Line Description (Exact Copy) */}
              <div className="my-auto">
                <h4 className="font-primary font-bold text-xl sm:text-2xl text-white tracking-wide mb-3 group-hover:text-accent transition-colors">
                  {step.name}
                </h4>
                <p className="font-secondary text-sm text-cinema-muted leading-relaxed">
                  {step.desc.includes("undeniable") ? (
                    <>
                      We direct the models, frame by frame, until it&apos;s{" "}
                      <span className="accent-italic text-accent font-medium">undeniable</span>.
                    </>
                  ) : (
                    step.desc
                  )}
                </p>
              </div>

              {/* Bottom Line Progress Track */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-cinema-dim uppercase">
                  PHASE 0{idx + 1} // 04
                </span>
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    activeStep === idx ? "bg-accent" : "bg-white/20"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

