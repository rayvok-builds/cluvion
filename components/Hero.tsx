"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const backdropOverlayRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      if (
        scrollContainerRef.current &&
        heroContentRef.current &&
        backdropOverlayRef.current &&
        statementRef.current
      ) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
          },
        });

        // 1. Hero text smoothly fades, scales down and blurs away
        tl.to(
          heroContentRef.current,
          {
            opacity: 0,
            scale: 0.88,
            y: -50,
            filter: "blur(14px)",
            ease: "power2.inOut",
            duration: 0.4,
          },
          0
        )
          // 2. Darkening & frosted glass backdrop overlay intensifies
          .to(
            backdropOverlayRef.current,
            {
              opacity: 1,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              backgroundColor: "rgba(5, 6, 8, 0.78)",
              ease: "power2.inOut",
              duration: 0.45,
            },
            0.05
          )
          // 3. "BOLD AGENCY FOR BOLD BRANDS" emerges cleanly with scale and focus
          .fromTo(
            statementRef.current,
            {
              opacity: 0,
              scale: 0.9,
              y: 40,
              filter: "blur(14px)",
            },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              ease: "power2.out",
              duration: 0.45,
            },
            0.35
          );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scrollContainerRef} className="relative w-full h-[220vh] bg-[#050608] text-white">
      {/* ── Sticky 100vh Cinema Viewport ── */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden select-none">
        {/* Single Fullscreen Background Video (Loop, No Sound, Autoplay) */}
        <video
          ref={videoRef}
          loop
          muted
          autoPlay
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/dokrpo5fl/video/upload/so_0,q_auto,f_auto,w_1920/v1788261879/HERO1.hevc_kmkwvs.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center z-0 will-change-transform"
        >
          <source
            src="https://res.cloudinary.com/dokrpo5fl/video/upload/q_auto,f_auto,w_1920,c_limit,ac_none/v1788261879/HERO1.hevc_kmkwvs.mp4"
            type="video/mp4"
          />
        </video>

        {/* Base Ambient Vignettes */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/70" />

        {/* Dynamic Darkening & Frosted Blur Backdrop (Triggered on Scroll) */}
        <div
          ref={backdropOverlayRef}
          className="absolute inset-0 z-15 pointer-events-none opacity-0 transition-opacity"
        />

        {/* ── STAGE 1: HERO INITIAL CONTENT ── */}
        <div
          ref={heroContentRef}
          className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6 sm:px-12 text-center will-change-transform"
        >
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <h1 className="font-primary font-extrabold text-5xl sm:text-7xl md:text-6xl lg:text-7xl tracking-tight text-white leading-none drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
              THE AI FILM HOUSE
            </h1>

            <p className="font-secondary text-sm sm:text-base md:text-lg text-white/85 font-medium tracking-wide drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] mt-3 sm:mt-4 max-w-2xl">
              Cinematic brand films, ad variations, and AI micro-dramas
            </p>
          </div>
        </div>

        {/* ── STAGE 2: "BOLD AGENCY FOR BOLD BRANDS" (Reveals on Scroll) ── */}
        <div
          ref={statementRef}
          className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center px-6 sm:px-12 pointer-events-none opacity-0 will-change-transform"
        >
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            <h2 className="font-primary uppercase text-5xl sm:text-7xl md:text-8xl lg:text-7xl tracking-tight text-white leading-tight drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
              Bold agency for{" "}
              <span className="text-accent underline decoration-accent/40 underline-offset-8 drop-shadow-[0_0_35px_rgba(229,169,60,0.6)]">
                bold brands
              </span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
