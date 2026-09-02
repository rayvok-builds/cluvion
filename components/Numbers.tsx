"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DollarSign, Zap, Sparkles, SlidersHorizontal } from "lucide-react";

export default function Numbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const [traditionalBudget, setTraditionalBudget] = useState(40); // 40 Lakhs

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Counter 1: 90%
      const counter1 = { val: 0 };
      const el1 = document.getElementById("num-counter-1");
      if (el1) {
        gsap.to(counter1, {
          val: 90,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            el1.innerText = `${Math.floor(counter1.val)}%`;
          },
        });
      }

      // Counter 2: 10
      const counter2 = { val: 0 };
      const el2 = document.getElementById("num-counter-2");
      if (el2) {
        gsap.to(counter2, {
          val: 10,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            el2.innerText = `${Math.floor(counter2.val)}`;
          },
        });
      }

      // Counter 3: 100+
      const counter3 = { val: 0 };
      const el3 = document.getElementById("num-counter-3");
      if (el3) {
        gsap.to(counter3, {
          val: 100,
          duration: 2.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
          onUpdate: () => {
            el3.innerText = `${Math.floor(counter3.val)}+`;
          },
        });
      }

      // Cards staggered fade in
      gsap.from(".number-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cluvion delivers at ~10% (90% savings)
  const cluvionCost = (traditionalBudget * 0.1).toFixed(1);
  const savings = (traditionalBudget * 0.9).toFixed(1);

  return (
    <section
      id="numbers"
      ref={sectionRef}
      className="relative w-full py-24 sm:py-32 bg-[#070709] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent tracking-widest font-semibold">04</span>
            <span className="text-xs font-secondary uppercase tracking-[0.25em] text-cinema-muted">
              STUDIO METRICS // PRODUCTION ECONOMICS
            </span>
          </div>
          <div className="text-[11px] font-mono text-cinema-dim hidden sm:block">
            AUDITED STATS
          </div>
        </div>

        {/* 4 Big Animated Metric Blocks (Exact Copy) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Metric 1 */}
          <div className="number-card relative p-8 rounded-lg bg-[#0A0B0E] border border-white/10 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between min-h-[220px] group">
            <span className="text-xs font-mono text-cinema-dim uppercase tracking-wider">
              [ EFFICIENCY ]
            </span>
            <div>
              <div
                id="num-counter-1"
                className="font-primary font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight group-hover:text-accent transition-colors"
              >
                0%
              </div>
              <p className="mt-3 font-secondary text-sm sm:text-base text-cinema-muted font-normal">
                of production cost, gone
              </p>
            </div>
            <div className="h-1 w-8 bg-accent/40 group-hover:w-full transition-all duration-500 rounded-full" />
          </div>

          {/* Metric 2 */}
          <div className="number-card relative p-8 rounded-lg bg-[#0A0B0E] border border-white/10 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between min-h-[220px] group">
            <span className="text-xs font-mono text-cinema-dim uppercase tracking-wider">
              [ VELOCITY ]
            </span>
            <div>
              <div
                id="num-counter-2"
                className="font-primary font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight group-hover:text-accent transition-colors"
              >
                0
              </div>
              <p className="mt-3 font-secondary text-sm sm:text-base text-cinema-muted font-normal">
                days from brief to final film
              </p>
            </div>
            <div className="h-1 w-8 bg-accent/40 group-hover:w-full transition-all duration-500 rounded-full" />
          </div>

          {/* Metric 3 */}
          <div className="number-card relative p-8 rounded-lg bg-[#0A0B0E] border border-white/10 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between min-h-[220px] group">
            <span className="text-xs font-mono text-cinema-dim uppercase tracking-wider">
              [ VOLUME ]
            </span>
            <div>
              <div
                id="num-counter-3"
                className="font-primary font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight group-hover:text-accent transition-colors"
              >
                0+
              </div>
              <p className="mt-3 font-secondary text-sm sm:text-base text-cinema-muted font-normal">
                films delivered
              </p>
            </div>
            <div className="h-1 w-8 bg-accent/40 group-hover:w-full transition-all duration-500 rounded-full" />
          </div>

          {/* Metric 4 */}
          <div className="number-card relative p-8 rounded-lg bg-[#0A0B0E] border border-white/10 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between min-h-[220px] group">
            <span className="text-xs font-mono text-cinema-dim uppercase tracking-wider">
              [ LATITUDE ]
            </span>
            <div>
              <div className="font-primary font-black text-5xl sm:text-6xl lg:text-7xl text-accent tracking-tight">
                ∞
              </div>
              <p className="mt-3 font-secondary text-sm sm:text-base text-cinema-muted font-normal">
                locations, models, variations
              </p>
            </div>
            <div className="h-1 w-8 bg-accent/40 group-hover:w-full transition-all duration-500 rounded-full" />
          </div>
        </div>

        {/* Interactive Production Cost Calculator Widget */}
        <div className="mt-12 p-6 sm:p-8 rounded-lg bg-[#0A0B0E]/80 border border-white/[0.08] backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest mb-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Shoot Cost Comparator</span>
              </div>
              <h4 className="font-primary font-bold text-lg sm:text-xl text-white">
                Traditional ₹-Lakh Production vs Cluvion AI Film Studio
              </h4>
            </div>

            {/* Slider */}
            <div className="flex items-center gap-4">
              <span className="text-xs font-secondary text-cinema-muted whitespace-nowrap">
                Traditional Budget:
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="5"
                  value={traditionalBudget}
                  onChange={(e) => setTraditionalBudget(Number(e.target.value))}
                  className="w-32 sm:w-44 accent-[#E5A93C] cursor-pointer"
                  aria-label="Traditional budget slider"
                />
                <span className="font-primary font-bold text-white text-base min-w-[70px]">
                  ₹{traditionalBudget}L
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-center sm:text-left">
            <div>
              <span className="text-xs font-secondary text-cinema-dim uppercase tracking-wider block mb-1">
                Traditional Crew &amp; Shoot
              </span>
              <span className="font-primary font-bold text-2xl text-white/60 line-through">
                ₹{traditionalBudget} Lakhs
              </span>
              <span className="block text-[11px] font-secondary text-cinema-dim mt-1">
                4-8 weeks, physical permits, flights
              </span>
            </div>

            <div>
              <span className="text-xs font-secondary text-accent uppercase tracking-wider block mb-1">
                Cluvion Studio Pipeline
              </span>
              <span className="font-primary font-bold text-3xl text-accent">
                ₹{cluvionCost} Lakhs
              </span>
              <span className="block text-[11px] font-secondary text-cinema-muted mt-1">
                10 days, infinite revisions, 4K locked
              </span>
            </div>

            <div>
              <span className="text-xs font-secondary text-emerald-400 uppercase tracking-wider block mb-1">
                Retained Capital Saved
              </span>
              <span className="font-primary font-bold text-2xl text-emerald-400">
                +₹{savings} Lakhs
              </span>
              <span className="block text-[11px] font-secondary text-cinema-dim mt-1">
                90% reinvested into distribution
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
