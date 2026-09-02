"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useFilm } from "./FilmContext";

export default function Hero() {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const heroRef   = useRef<HTMLDivElement>(null);
  const { openProjectModal } = useFilm();

  useEffect(() => {
    // Guarantee mute before play (required by most browsers for autoplay)
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted        = true;
      video.volume       = 0;
      video.play().catch(() => {});
    }

    // Viewport Observer to pause hero video when scrolled past
    const heroEl = heroRef.current;
    let observer: IntersectionObserver | null = null;
    if (heroEl) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (videoRef.current) {
            if (entry.isIntersecting) {
              videoRef.current.play().catch(() => {});
            } else {
              videoRef.current.pause();
            }
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(heroEl);
    }

    // Entrance animations
    const ctx = gsap.context(() => {
      gsap.from(".hero-heading", { opacity: 0, y: 50, duration: 1.3, ease: "power3.out", delay: 0.25 });
      gsap.from(".hero-sub",     { opacity: 0, y: 30, duration: 1.2, ease: "power3.out", delay: 0.45 });
      gsap.from(".hero-cta",     { opacity: 0, y: 20, duration: 1.1, ease: "power3.out", delay: 0.65 });
    }, heroRef);

    return () => {
      if (observer) observer.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    /**
     * Outer shell — sits below the 48px fixed navbar.
     * pt-[50px]  = 48px navbar + 2px top gap
     * px-0.5     = 2px left / right gap
     * pb-0.5     = 2px bottom gap
     * h-screen   = fills the full viewport height
     */
    <section
      ref={heroRef}
      className="h-screen bg-[#050608] flex flex-col pt-[50px] px-0.5 pb-0.5"
    >
      {/* ── Album Card ── */}
      <div className="relative flex-1 rounded-2xl overflow-hidden bg-black">

        {/* Full-cover background video — no audio, autoplay, infinite loop */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="https://res.cloudinary.com/dokrpo5fl/video/upload/so_0,q_auto,f_auto,w_1920/v1788261879/HERO1.hevc_kmkwvs.jpg"
          disablePictureInPicture
          disableRemotePlayback
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        >
          {/* Optimised stream — audio track stripped via ac_none */}
          <source
            src="https://res.cloudinary.com/dokrpo5fl/video/upload/q_auto,f_auto,w_1920,c_limit,ac_none/v1788261879/HERO1.hevc_kmkwvs.mp4"
            type="video/mp4"
          />
          {/* Raw fallback */}
          <source
            src="https://res.cloudinary.com/dokrpo5fl/video/upload/v1788261879/HERO1.hevc_kmkwvs.mp4"
            type="video/mp4"
          />
        </video>

        {/* ── Centered content stack ── */}
        <div className="relative max-w-[60%] mx-auto z-10 w-full h-full flex flex-col items-center justify-center text-center px-6 gap-5 sm:gap-6">

          {/* Heading — Switzer 500, 64px / 64px, #f0f0f0 */}
          <h1 className="hero-heading font-switzer font-medium uppercase text-hero-h1 tracking-tight text-hero-heading select-none drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
            the ai film house for brands that think in cinema
          </h1>

          {/* Subheading — Inter 400, 16px / 19px, #888 */}
          <p className="hero-sub font-inter font-normal text-hero-sub text-[rgb(136,136,136)] max-w-sm drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
         
          </p>

          {/* CTA — Switzer 400, 16px / 19px, #fff */}
          <div className="hero-cta pt-1">
            <button
              onClick={() => openProjectModal()}
              className="font-switzer font-normal text-hero-cta text-white px-7 py-3 rounded-full border border-white/30 hover:border-white/60 bg-white/10 hover:bg-white/[0.15] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              Book a Strategy Call
            </button>
          </div>
        </div>

        {/* Subtle bottom fade — smooth blend into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-28 z-[2] pointer-events-none bg-gradient-to-t from-[#050608] via-[#050608]/50 to-transparent" />
      </div>
    </section>
  );
}
