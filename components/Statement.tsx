"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProductionVariable {
  id: string;
  name: string;
  meta: string;
  // Starting position offsets (percentage from center)
  initialX: number;
  initialY: number;
}

const PRODUCTION_VARIABLES: ProductionVariable[] = [
  { id: "location", name: "LOCATION", meta: "PARIS · 0 PERMITS", initialX: -38, initialY: -32 },
  { id: "cast", name: "CAST", meta: "TOPOLOGY LOCKED", initialX: 38, initialY: -30 },
  { id: "crew", name: "CREW", meta: "VIRTUAL OPERATORS", initialX: -42, initialY: 0 },
  { id: "set", name: "SET", meta: "SYNTHETIC SCALE", initialX: 42, initialY: 2 },
  { id: "camera", name: "CAMERA", meta: "35MM ANAMORPHIC", initialX: -36, initialY: 32 },
  { id: "light", name: "LIGHT", meta: "RAY-TRACED TWILIGHT", initialX: 36, initialY: 30 },
  { id: "travel", name: "TRAVEL", meta: "$0 FLIGHTS", initialX: -16, initialY: -38 },
  { id: "logistics", name: "LOGISTICS", meta: "0 EQUIPMENT FLEETS", initialX: 16, initialY: 38 },
];

export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [phaseText, setPhaseText] = useState("MANY PRODUCTION VARIABLES");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    if (!container || !sticky) return;

    const ctx = gsap.context(() => {
      // Main scroll-driven timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: sticky,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            if (p < 0.35) {
              setPhaseText("MANY PRODUCTION VARIABLES");
            } else if (p < 0.7) {
              setPhaseText("ONE CONTROLLED SYSTEM");
            } else {
              setPhaseText("ONE FINAL FRAME");
            }
          },
        },
      });

      // Phase 1 (0 -> 0.3): Nodes set at dispersed positions and fade in
      nodesRef.current.forEach((node, i) => {
        if (!node) return;
        const v = PRODUCTION_VARIABLES[i];
        gsap.set(node, {
          xPercent: v.initialX * 2.2,
          yPercent: v.initialY * 2.2,
          opacity: 0,
          scale: 0.85,
        });
      });

      tl.to(
        nodesRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          stagger: 0.03,
          ease: "power2.out",
        },
        0
      );

      // Phase 2 (0.3 -> 0.75): Nodes converge into the center (0,0)
      tl.to(
        nodesRef.current,
        {
          xPercent: 0,
          yPercent: 0,
          opacity: 0,
          scale: 0.25,
          duration: 0.5,
          stagger: 0.02,
          ease: "power2.inOut",
        },
        0.3
      );

      // Central Cinematic Frame expands and reveals as nodes converge
      tl.fromTo(
        frameRef.current,
        {
          scale: 0.65,
          opacity: 0.3,
          borderColor: "rgba(255,255,255,0.1)",
        },
        {
          scale: 1,
          opacity: 1,
          borderColor: "rgba(229,169,60,0.5)",
          duration: 0.5,
          ease: "power2.inOut",
        },
        0.3
      );

      // Phase 3 (0.7 -> 1.0): Final statement text emerges smoothly below frame
      tl.fromTo(
        headlineRef.current,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power3.out",
        },
        0.65
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="statement"
      ref={containerRef}
      className="relative w-full h-[260vh] bg-[#050608]"
    >
      <div id="about" className="absolute top-0 pointer-events-none" />
      {/* Sticky viewport container */}
      <div
        ref={stickyRef}
        className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6 select-none"
      >
        {/* Ambient background glow */}
        <div className="absolute w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-[160px] pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />

        {/* Top Centered Section Eyebrow (Clean, single word, no numbers, no slashes) */}
        <div className="relative z-30 flex flex-col items-center text-center mb-4 sm:mb-6">
          <span className="font-mono text-xs uppercase tracking-[0.35em] text-accent font-semibold mb-2">
            STATEMENT
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] text-white/40 uppercase tracking-widest border border-white/10 px-3 py-1 bg-black/40 backdrop-blur-sm">
            {phaseText}
          </span>
        </div>

        {/* Central Convergence Stage */}
        <div className="relative w-full max-w-4xl h-[340px] sm:h-[420px] md:h-[460px] flex items-center justify-center">
          {/* Subtle Radar / Crosshair Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none border border-white/[0.05] rounded-sm">
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/[0.04]" />
            <div className="absolute top-0 left-1/2 w-px h-full bg-white/[0.04]" />
            {/* Corner Crosshairs */}
            <span className="absolute top-2 left-2 text-[9px] font-mono text-white/20">+</span>
            <span className="absolute top-2 right-2 text-[9px] font-mono text-white/20">+</span>
            <span className="absolute bottom-2 left-2 text-[9px] font-mono text-white/20">+</span>
            <span className="absolute bottom-2 right-2 text-[9px] font-mono text-white/20">+</span>
          </div>

          {/* Central Cinematic Frame */}
          <div
            ref={frameRef}
            className="relative z-20 w-[88%] sm:w-[74%] md:w-[68%] aspect-[16/9] bg-black border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex items-center justify-center transition-shadow"
          >
            {/* Embedded High-Couture Cinematic Video */}
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349406/2.hevc_vmuagc.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-110"
            />
            {/* Cinematic Letterbox / HUD overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute top-3 left-3 z-10 font-mono text-[9px] text-white/70 bg-black/60 backdrop-blur-md px-2 py-0.5 border border-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>REC // 2.39:1 CINEMA</span>
            </div>

            <div className="absolute bottom-3 right-3 z-10 font-mono text-[9px] text-white/50 bg-black/60 backdrop-blur-md px-2 py-0.5 border border-white/10 hidden sm:block">
              ONE CONTROLLED SYSTEM
            </div>
          </div>

          {/* 8 Dispersed Production Variable Cards (Converging on Scroll) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-25">
            {PRODUCTION_VARIABLES.map((item, idx) => (
              <div
                key={item.id}
                ref={(el) => {
                  nodesRef.current[idx] = el;
                }}
                className="absolute p-2.5 sm:p-3 bg-[#08090C]/90 border border-white/15 backdrop-blur-md shadow-lg flex flex-col items-start min-w-[120px] sm:min-w-[145px]"
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="font-mono text-[9px] text-accent font-semibold">
                    VAR.0{idx + 1}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-accent/80" />
                </div>
                <span className="font-switzer font-medium text-xs sm:text-sm text-white uppercase tracking-wider">
                  {item.name}
                </span>
                <span className="font-mono text-[8px] sm:text-[9px] text-white/45 tracking-tight mt-0.5">
                  {item.meta}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Final Statement Message (Revealed upon convergence) */}
        <div
          ref={headlineRef}
          className="relative z-30 text-center max-w-3xl mt-4 sm:mt-6 px-4 pointer-events-auto"
        >
          <h3 className="font-switzer font-medium text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-tight mb-2 sm:mb-3">
            SAME CINEMA.{" "}
            <span className="text-accent ">
              A FRACTION OF THE INVOICE.
            </span>
          </h3>
          <p className="font-dmsans text-xs sm:text-sm md:text-base text-white/60 font-light max-w-xl mx-auto leading-relaxed">
            The light, the texture, the directorial scale — without the permits, the flights, or the physical footprint.
          </p>
        </div>
      </div>
    </section>
  );
}
