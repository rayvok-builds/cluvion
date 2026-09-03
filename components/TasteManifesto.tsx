"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TasteManifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (textRef.current && containerRef.current) {
        gsap.from(textRef.current.children, {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 1.2,
          ease: "power3.out",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[85vh] lg:min-h-screen flex flex-col justify-center items-center bg-[#050608] border-b border-white/[0.08] py-28 sm:py-36 overflow-hidden select-none"
    >
      {/* Subtle Warm Ambience */}
      <div className="absolute w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[180px] pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div ref={textRef} className="max-w-6xl mx-auto px-6 sm:px-10 text-center relative z-10">
        {/* Section Marker */}
        <div className="inline-flex items-center gap-2 mb-10 sm:mb-14">
          <span className="text-xs font-mono text-accent tracking-widest font-semibold">09</span>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/40">
            // STUDIO MANIFESTO
          </span>
        </div>

        {/* Giant Typographic Statement */}
        <h2 className="font-switzer font-medium text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight uppercase text-white leading-[0.95] mb-8 sm:mb-12">
          AI Isn&apos;t <br />
          The Advantage. <br />
          <span className="text-accent underline decoration-accent/40 underline-offset-[14px]">
            Taste Is.
          </span>
        </h2>

        {/* Minimal Subtext */}
        <p className="font-dmsans text-lg sm:text-2xl md:text-3xl text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
          Models generate possibilities. <br className="hidden sm:block" />
          Direction decides which one deserves to exist.
        </p>

        <div className="mt-10 sm:mt-14 font-mono text-xs text-white/30 tracking-widest uppercase">
          [ CLUVION · CRAFT OVER COMPUTE ]
        </div>
      </div>
    </section>
  );
}
