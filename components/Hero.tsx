"use client";

import { useRef, useEffect } from "react";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <section id="hero" className="relative w-full h-screen min-h-[600px] bg-[#050608] text-white overflow-hidden select-none">
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
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Hero Initial Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-6 sm:px-12 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="font-primary font-bold text-5xl sm:text-7xl md:text-6xl lg:text-7xl tracking-tight text-white leading-none drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
            THE AI FILM HOUSE
          </h1>

          <p className="font-secondary text-sm sm:text-base md:text-lg text-white/85 font-medium tracking-wide drop-shadow-[0_2px_15px_rgba(0,0,0,0.95)] mt-3 sm:mt-4 max-w-2xl">
            Cinematic brand films, ad variations, and AI micro-dramas
          </p>
        </div>
      </div>
    </section>
  );
}
