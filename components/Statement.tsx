"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(subtextRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[85vh] lg:min-h-screen flex flex-col justify-center items-center bg-[#070709] border-b border-white/[0.08] py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Subtle Light Glow */}
      <div className="absolute w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 text-center relative z-10">
        {/* Section Marker */}
        <div className="inline-flex items-center gap-2 mb-8 sm:mb-12">
          <span className="text-xs font-mono text-accent tracking-widest font-semibold">03</span>
          <span className="text-xs font-secondary uppercase tracking-[0.25em] text-cinema-dim">
            // THE STATEMENT
          </span>
        </div>

        {/* Big Bold Headline (Exact Copy: SAME CINEMA. *A FRACTION* OF THE INVOICE.) */}
        <h2
          ref={headlineRef}
          className="font-primary font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase text-white leading-[1.08] sm:leading-[1.05] mb-8 sm:mb-10 max-w-5xl mx-auto"
        >
          SAME CINEMA.{" "}
          <span className="accent-italic font-bold text-accent px-1">
            A FRACTION
          </span>{" "}
          OF THE INVOICE.
        </h2>

        {/* Subtext (Exact Copy: Everything a ₹40-lakh shoot delivers — the light, the skin, the story — without the sets, the crew, or the flights.) */}
        <p
          ref={subtextRef}
          className="font-secondary text-lg sm:text-2xl md:text-3xl text-cinema-muted leading-relaxed sm:leading-normal max-w-3xl mx-auto font-light tracking-wide"
        >
          Everything a ₹40-lakh shoot delivers — the light, the skin, the story — without the sets, the crew, or the flights.
        </p>
      </div>
    </section>
  );
}
