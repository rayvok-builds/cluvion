"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useFilm } from "./FilmContext";

interface PricingTier {
  id: number;
  label: string;
  min: number;
  max: number;
  rate: number;
  rateDisplay: string;
}

const PRICING_TIERS: PricingTier[] = [
  { id: 1, label: "3 min or under", min: 1, max: 3, rate: 400, rateDisplay: "$400 / min" },
  { id: 2, label: "4 – 10 minutes", min: 4, max: 10, rate: 350, rateDisplay: "$350 / min" },
  { id: 3, label: "11 – 29 minutes", min: 11, max: 29, rate: 300, rateDisplay: "$300 / min" },
  { id: 4, label: "30 min or longer", min: 30, max: 60, rate: 250, rateDisplay: "$250 / min" },
];

const INCLUDED_FEATURES = [
  "Script adaptation from your book or outline",
  "Character & entity creation",
  "Full scene production",
  "Professional editing, music & sound effects",
  "One round of revisions included",
  "Full ownership of finished film",
];

export default function Numbers() {
  const [minutes, setMinutes] = useState(30);
  const { openProjectModal } = useFilm();

  // Find active tier
  const activeTier =
    PRICING_TIERS.find((t) => minutes >= t.min && minutes <= t.max) ||
    PRICING_TIERS[PRICING_TIERS.length - 1];

  const estimatedTotal = minutes * activeTier.rate;

  return (
    <section
      id="investments"
      className="relative w-full py-20 sm:py-28 bg-[#050608] border-b border-white/[0.08]"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        {/* Minimal Section Label */}
        <div className="flex justify-center mb-4">
          <span className="font-inter font-normal text-[12px] text-white/30 tracking-widest uppercase select-none">
            investments
          </span>
        </div>

        {/* Section Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-switzer font-medium uppercase text-3xl sm:text-5xl text-white tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="font-dmsans text-sm sm:text-base text-white/60 mt-3 leading-relaxed">
            No hourly rates. No hidden fees. You pay per finished minute of film
            — and that includes everything.
          </p>
        </div>

        {/* Main Pricing Card */}
        <div className="mt-10 sm:mt-12 max-w-xl mx-auto bg-[#0A0B0E] border border-white/[0.09] rounded-none p-6 sm:p-9 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          {/* Top: Film Length Slider Header */}
          <div className="flex items-center justify-between mb-3">
            <span className="font-dmsans text-sm sm:text-base text-white/80 font-normal">
              Film length
            </span>
            <span className="font-switzer font-semibold text-base sm:text-lg text-white">
              {minutes} min
            </span>
          </div>

          {/* Range Slider */}
          <div className="relative w-full my-2">
            <input
              type="range"
              min="1"
              max="60"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              aria-label="Film length in minutes"
              className="w-full h-1.5 bg-white/10 rounded-none appearance-none cursor-pointer accent-[#E5A93C] focus:outline-none"
              style={{
                background: `linear-gradient(to right, #E5A93C 0%, #E5A93C ${
                  ((minutes - 1) / 59) * 100
                }%, rgba(255,255,255,0.1) ${
                  ((minutes - 1) / 59) * 100
                }%, rgba(255,255,255,0.1) 100%)`,
              }}
            />
          </div>

          {/* Slider Min / Max Labels */}
          <div className="flex justify-between items-center text-[11px] font-mono text-white/30 mb-6">
            <span>1 min</span>
            <span>10 hrs</span>
          </div>

          {/* 4 Tiered Pricing Rows */}
          <div className="space-y-2 mb-6">
            {PRICING_TIERS.map((tier) => {
              const isActive = activeTier.id === tier.id;
              return (
                <button
                  type="button"
                  key={tier.id}
                  onClick={() => setMinutes(tier.min)}
                  className={`w-full flex items-center justify-between px-4 sm:px-5 py-3 border transition-all duration-200 text-left rounded-none ${
                    isActive
                      ? "bg-accent/10 border-accent/40 shadow-[0_0_20px_rgba(229,169,60,0.08)]"
                      : "bg-[#0D0E12] border-white/[0.06] hover:border-white/15"
                  }`}
                >
                  <span
                    className={`font-dmsans text-xs sm:text-sm ${
                      isActive ? "text-white font-medium" : "text-white/60"
                    }`}
                  >
                    {tier.label}
                  </span>
                  <span
                    className={`font-mono text-xs sm:text-sm ${
                      isActive ? "text-accent font-semibold" : "text-white/80"
                    }`}
                  >
                    {tier.rateDisplay}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Two Metric Summary Boxes */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-5">
            {/* Box 1: Estimated Total */}
            <div className="bg-[#0D0E12] border border-white/[0.08] p-4 sm:p-5 text-center flex flex-col items-center justify-center rounded-none">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-white/40 uppercase">
                ESTIMATED TOTAL
              </span>
              <span className="font-switzer font-bold text-2xl sm:text-3xl lg:text-4xl text-white mt-1.5">
                ${estimatedTotal.toLocaleString()}
              </span>
              <span className="text-[11px] font-mono text-white/40 mt-1">
                {minutes} min × ${activeTier.rate}/min
              </span>
            </div>

            {/* Box 2: Savings */}
            <div className="bg-[#0D0E12] border border-white/[0.08] p-4 sm:p-5 text-center flex flex-col items-center justify-center rounded-none">
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-white/40 uppercase">
                SAVINGS VS. TRADITIONAL
              </span>
              <span className="font-switzer font-bold text-2xl sm:text-3xl lg:text-4xl text-emerald-400 mt-1.5">
                99%+
              </span>
              <span className="text-[11px] font-dmsans text-white/40 mt-1">
                vs. traditional film production
              </span>
            </div>
          </div>

          {/* Subtext info */}
          <p className="text-center font-dmsans text-xs text-white/40 mb-6">
            You only pay for finished minutes. Complexity never costs extra.
          </p>

          {/* Features Included Checklist */}
          <div className="pt-6 border-t border-white/[0.08] space-y-3 mb-7">
            {INCLUDED_FEATURES.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="font-dmsans text-xs sm:text-sm text-white/75 leading-tight">
                  {feat}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            type="button"
            onClick={() => openProjectModal()}
            className="w-full py-3.5 sm:py-4 bg-white hover:bg-accent text-black font-switzer font-medium text-xs sm:text-sm uppercase tracking-widest rounded-none border border-white hover:border-accent transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] shadow-[0_4px_25px_rgba(255,255,255,0.1)]"
          >
            Book My FREE Film Consultation
          </button>

          {/* Guarantee Banner */}
          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-center gap-2.5 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <p className="font-dmsans text-xs text-white/60">
              <strong className="text-white font-medium">100% money-back guarantee.</strong>{" "}
              Don&apos;t love it? You pay nothing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
