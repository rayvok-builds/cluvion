"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Check, Film, Layers, Play, SlidersHorizontal } from "lucide-react";

export default function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!container || !sticky || !track) return;

    // Responsive check: only apply horizontal pin scroll on desktop (min-width: 1024px)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const scrollWidth = track.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=2600",
          pin: sticky,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.25) setActiveStep(0);
            else if (p < 0.5) setActiveStep(1);
            else if (p < 0.75) setActiveStep(2);
            else setActiveStep(3);
          },
        },
      });

      tl.to(track, {
        x: -scrollWidth,
        ease: "none",
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full lg:h-[360vh] bg-[#050608] border-b border-white/[0.08] select-none"
    >
      {/* ── DESKTOP PINNED VIEWPORT / MOBILE STATIC WRAPPER ── */}
      <div
        ref={stickyRef}
        className="w-full lg:h-screen lg:sticky lg:top-0 flex flex-col justify-between py-12 sm:py-16 lg:py-10 px-4 sm:px-8 lg:px-12 overflow-hidden"
      >
        {/* Top Header: Centered Single-Word Eyebrow + Progress Bar */}
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center mb-6 lg:mb-8 relative z-30">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-accent font-semibold mb-2">
            PROCESS
          </span>
          <h2 className="font-switzer font-medium uppercase text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-none mb-4">
            From Idea <span className="text-accent">To Frame.</span>
          </h2>

          {/* Desktop Horizontal Progress Indicator */}
          <div className="hidden lg:flex items-center gap-6 font-mono text-xs text-white/40 pt-2">
            {[
              { num: "01", name: "BRIEF" },
              { num: "02", name: "STORYBOARD" },
              { num: "03", name: "PRODUCTION" },
              { num: "04", name: "DELIVERY" },
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center gap-4">
                <div
                  className={`flex items-center gap-2 transition-colors duration-300 ${
                    activeStep === idx
                      ? "text-accent font-bold scale-105"
                      : "text-white/30"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full border border-current flex items-center justify-center">
                    {activeStep === idx && (
                      <span className="w-1 h-1 rounded-full bg-accent" />
                    )}
                  </span>
                  <span>
                    {step.num} — {step.name}
                  </span>
                </div>
                {idx < 3 && <div className="w-8 h-px bg-white/15" />}
              </div>
            ))}
          </div>
        </div>

        {/* ── HORIZONTAL TRACK (DESKTOP) / VERTICAL STACK (MOBILE) ── */}
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full lg:w-max items-stretch lg:items-center py-4 lg:py-2"
        >
          {/* ── CARD 01: BRIEF ── */}
          <div className="w-full lg:w-[72vw] max-w-[1000px] bg-[#090A0E] border border-white/15 p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden shrink-0">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <span>01</span>
                <span>//</span>
                <span>TECHNICAL BRIEFING</span>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px]">
                BRIEF LOCKED ✓
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono mb-6">
              {[
                { label: "PROJECT", value: "WISH U" },
                { label: "OBJECTIVE", value: "NEW REBRAND LAUNCH" },
                { label: "FORMAT", value: "BRAND FILM & AD SUITE" },
                { label: "AUDIENCE", value: "LUXURY COUTURE CONSUMER" },
              ].map((item, i) => (
                <div key={i} className="p-3.5 bg-black/60 border border-white/10">
                  <span className="text-[10px] text-white/40 block mb-1">
                    {item.label}
                  </span>
                  <span className="text-xs sm:text-sm text-white font-semibold block">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 sm:p-5 bg-black/40 border border-white/10 font-mono text-xs text-white/70 leading-relaxed mb-6">
              <span className="text-accent block font-semibold mb-1.5">
                // DIRECTORIAL SPECIFICATION:
              </span>
              Parisian architecture paired with heritage couture textures. Controlled volumetric lighting. 0 physical flights required. Fixed scope and turnaround locked within 48 hours.
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] font-mono text-[11px] text-white/40">
              <span>INPUT: CREATIVE INTENT</span>
              <span className="text-accent">STATE: LOCKED</span>
            </div>
          </div>

          {/* ── CARD 02: STORYBOARD ── */}
          <div className="w-full lg:w-[72vw] max-w-[1000px] bg-[#090A0E] border border-white/15 p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden shrink-0">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <span>02</span>
                <span>//</span>
                <span>CINEMATIC STORYBOARD</span>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px]">
                STORY LOCKED ✓
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {[
                { num: "01", type: "WS", label: "PARIS FACADE", focal: "24MM" },
                { num: "02", type: "MS", label: "INTERIOR ATRIUM", focal: "50MM" },
                { num: "03", type: "CU", label: "TEXTURE MACRO", focal: "85MM" },
                { num: "04", type: "DOLLY", label: "MARBLE FOYER", focal: "35MM" },
                { num: "05", type: "LOW", label: "SILHOUETTE", focal: "40MM" },
                { num: "06", type: "WIDE", label: "NIGHT CITYSCAPE", focal: "18MM" },
              ].map((f) => (
                <div
                  key={f.num}
                  className="p-3 bg-black/60 border border-white/10 flex flex-col justify-between min-h-[140px] relative group hover:border-accent/50 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs text-accent font-bold">
                      [{f.num}]
                    </span>
                    <span className="font-mono text-[9px] px-1.5 py-0.2 bg-white/10 border border-white/10 text-white">
                      {f.type}
                    </span>
                  </div>
                  {/* Wireframe framing guide */}
                  <div className="w-full h-12 border border-white/5 relative my-2 flex items-center justify-center">
                    <div className="w-full h-px bg-white/[0.03]" />
                    <div className="h-full w-px bg-white/[0.03] absolute" />
                    <span className="text-[8px] font-mono text-white/30">{f.focal}</span>
                  </div>
                  <div className="font-mono text-[10px] text-white/80 uppercase">
                    {f.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] font-mono text-[11px] text-white/40">
              <span>6/6 FRAMES APPROVED</span>
              <span className="text-accent">ZERO DRIFT GUARANTEE</span>
            </div>
          </div>

          {/* ── CARD 03: PRODUCTION ── */}
          <div className="w-full lg:w-[72vw] max-w-[1000px] bg-[#090A0E] border border-white/15 p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden shrink-0">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <span>03</span>
                <span>//</span>
                <span>PRODUCTION SYNTHESIS</span>
              </div>
              <span className="px-2.5 py-0.5 bg-accent/20 border border-accent/40 text-accent text-[11px] font-bold">
                RENDER 88.4% · FRAME 018 / 024
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center mb-6">
              {/* Active motion viewport */}
              <div className="md:col-span-7 relative aspect-[16/9] bg-black border border-white/15 overflow-hidden">
                <video
                  src="https://res.cloudinary.com/dokrpo5fl/video/upload/v1788358969/Copy-of-mercedece.hevc_hhojlb.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-90"
                />
                <div className="absolute top-2 left-2 font-mono text-[9px] text-emerald-400 bg-black/70 px-2 py-0.5 border border-white/10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SYNTHESIZING FRAME BUFFER
                </div>
              </div>

              {/* Progressive Synthesis Stack */}
              <div className="md:col-span-5 space-y-2 font-mono text-xs">
                {[
                  { name: "STILL FRAME", status: "LOCKED ✓" },
                  { name: "MOTION CADENCE", status: "24.0 FPS LOCKED ✓" },
                  { name: "VOLUMETRIC LIGHT", status: "RAY-TRACED ✓" },
                  { name: "FACIAL TOPOLOGY", status: "100% PERSISTENT ✓" },
                  { name: "CAMERA DYNAMICS", status: "ANAMORPHIC PASS ✓" },
                  { name: "COLOR GRADE", status: "PROCESSING 88%..." },
                ].map((st, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 bg-black/50 border border-white/5"
                  >
                    <span className="text-white/70 text-[11px]">{st.name}</span>
                    <span
                      className={`text-[10px] ${
                        st.status.includes("...") ? "text-accent" : "text-emerald-400"
                      }`}
                    >
                      {st.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] font-mono text-[11px] text-white/40">
              <span>PIPELINE: VIRTUAL DCI 4K</span>
              <span className="text-accent">0 HALLUCINATIONS</span>
            </div>
          </div>

          {/* ── CARD 04: DELIVERY ── */}
          <div className="w-full lg:w-[72vw] max-w-[1000px] bg-[#090A0E] border border-white/15 p-6 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden shrink-0">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono text-xs">
              <div className="flex items-center gap-2 text-accent font-semibold">
                <span>04</span>
                <span>//</span>
                <span>MULTI-ASPECT DELIVERY</span>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px]">
                DELIVERY READY ✓
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 font-mono mb-6">
              {[
                { ratio: "16:9", label: "CINEMATIC BRAND FILM", cut: "45S / 30S", dest: "YOUTUBE & WEB" },
                { ratio: "9:16", label: "TIKTOK & REELS", cut: "15S / 06S", dest: "META & TIKTOK" },
                { ratio: "4:5", label: "FEED CAMPAIGN", cut: "15S / 30S", dest: "INSTAGRAM" },
                { ratio: "1:1", label: "E-COMMERCE HERO", cut: "LOOP PACK", dest: "STOREFRONT" },
              ].map((del, i) => (
                <div key={i} className="p-4 border border-white/15 bg-black/60 text-left">
                  <span className="text-2xl font-bold text-accent block mb-1">{del.ratio}</span>
                  <span className="text-xs text-white block font-semibold">{del.label}</span>
                  <span className="text-[10px] text-white/50 block mt-1">{del.cut}</span>
                  <span className="text-[9px] text-white/30 block mt-3 pt-2 border-t border-white/10 uppercase">
                    DEST: {del.dest}
                  </span>
                </div>
              ))}
            </div>

            {/* Seamless Visual Transition Banner into Case Study */}
            <div className="p-4 bg-accent/[0.08] border border-accent/30 flex flex-col sm:flex-row items-center justify-between text-xs font-mono">
              <span className="text-white font-medium">
                ONE FILM → EVERY FORMAT COMPLETE. ADVANCING TO CASE STUDY PROOF ↓
              </span>
              <a
                href="#work"
                className="text-accent underline uppercase tracking-widest mt-2 sm:mt-0 hover:text-white flex items-center gap-1.5"
              >
                <span>VIEW CASE STUDY</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] font-mono text-[11px] text-white/40">
              <span>OUTPUT: 1 MASTER + MULTI-CUT ASSETS</span>
              <span className="text-accent">READY FOR AIR</span>
            </div>
          </div>
        </div>

        {/* Bottom indicator */}
        <div className="hidden lg:flex items-center justify-between font-mono text-[11px] text-white/30 pt-4 border-t border-white/[0.06]">
          <span>HORIZONTAL TIMELINE SEQUENCE</span>
          <span>SCROLL VERTICALLY TO ADVANCE PIPELINE</span>
        </div>
      </div>
    </section>
  );
}
