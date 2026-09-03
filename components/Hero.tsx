"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";
import { useFilm } from "./FilmContext";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerContentRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoOverlayRef = useRef<HTMLDivElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const { openProjectModal } = useFilm();

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.volume = 0.8;
      video.play().catch(() => {});
    }

    const ctx = gsap.context(() => {
      // 1. 3D Film Roll Flip-Away on Hero Text
      if (containerRef.current && headerContentRef.current) {
        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "top+=450 top",
            scrub: 1.2,
            markers: false,
          },
        });

        const elements = gsap.utils.toArray<HTMLElement>(
          headerContentRef.current.children
        );

        elements.forEach((element, index) => {
          heroTl.to(
            element,
            {
              rotationX: 90,
              y: -30,
              scale: 0.75,
              opacity: 0,
              filter: "blur(4px)",
              ease: "power3.inOut",
              transformOrigin: "center top",
            },
            index * 0.08
          );
        });
      }

      // 2. Video Expand Timeline (sharp edges, 100vw x 100vh full screen coverage)
      if (
        scrollContainerRef.current &&
        videoContainerRef.current &&
        videoRef.current &&
        overlayRef.current &&
        videoOverlayRef.current &&
        overlayContentRef.current
      ) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            markers: false,
            onEnter: () => {
              if (videoRef.current) {
                videoRef.current.play().catch(() => {});
              }
            },
          },
        });

        // Starts positioned down, then transitions to 100vw x 100vh full screen with sharp edges
        tl.to(
          videoContainerRef.current,
          {
            y: "0%",
            width: "100vw",
            height: "100vh",
            borderRadius: "0px",
            ease: "expo.out",
            duration: 0.5,
          },
          0
        )
          .to(
            videoRef.current,
            {
              scale: 1.08,
              ease: "expo.out",
              duration: 0.5,
            },
            0
          )
          .to(
            overlayRef.current,
            {
              backgroundColor: "rgba(0, 0, 0, 0.55)",
              ease: "power3.inOut",
              duration: 0.5,
            },
            0
          )
          .to(
            videoOverlayRef.current,
            {
              clipPath: "inset(0% 0 0 0)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              ease: "expo.out",
              duration: 0.35,
            },
            0.4
          )
          .to(
            overlayContentRef.current,
            {
              filter: "blur(0px)",
              transform: "scale(1)",
              opacity: 1,
              ease: "expo.out",
              duration: 0.4,
            },
            0.45
          );
      }
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="relative w-full bg-[#050608] text-[#F4F4F6]">
      {/* ──────────────────────────────────────────────────────────
          PART 1: HERO HEADER (Full Visibility with 3D Perspective)
      ────────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative min-h-screen w-full flex flex-col justify-start items-center pt-24 sm:pt-32 pb-16 sm:pb-26 px-6 sm:px-8 text-center"
        style={{ perspective: "800px" }}
      >
        <div
          ref={headerContentRef}
          className="max-w-4xl mx-auto flex flex-col items-center select-none"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Main Headline */}
          <h1
            className="font-switzer font-medium uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white mb-5 leading-[0.95] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              transformOrigin: "center top",
            }}
          >
            The AI Film House
          </h1>

          {/* Subtitle / Description */}
          <p
            className="font-dmsans text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-8 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)]"
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              transformOrigin: "center top",
            }}
          >
            Cinematic brand films, ad variations, and AI micro-dramas without
            physical shoots, sets, crews, or flights.
          </p>

          {/* CTA Button: Sharp edges (no rounded radius) */}
          <div
            style={{
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              transformOrigin: "center top",
            }}
          >
            <button
              type="button"
              onClick={() => openProjectModal()}
              className="px-8 sm:px-10 py-3.5 sm:py-4 bg-white hover:bg-accent text-black font-switzer font-medium text-xs sm:text-sm uppercase tracking-widest rounded-none border border-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-[0_4px_25px_rgba(255,255,255,0.15)]"
            >
              Book a Strategy Call
            </button>
          </div>
        </div>
      </div>

      {/* ──────────────────────────────────────────────────────────
          PART 2: STICKY SCROLL CONTAINER (Video Expand 100vw x 100vh)
      ────────────────────────────────────────────────────────── */}
      <div
        ref={scrollContainerRef}
        className="relative w-full h-[300vh] -mt-[100vh] pointer-events-none z-20"
      >
        <div className="sticky top-0 left-0 w-full h-screen flex justify-center items-center pointer-events-auto overflow-hidden">
          
          {/* Video Container Box: starts down a little so hero text above is fully visible */}
          <div
            id="video-container"
            ref={videoContainerRef}
            className="relative w-[220px] h-[210px] sm:w-[420px] sm:h-[260px] md:w-[280px] md:h-[290px] overflow-hidden bg-[#070709] rounded-none shadow-[0_25px_70px_rgba(0,0,0,0.95)] will-change-transform translate-y-[10vh] sm:translate-y-[32vh]"
            style={{
              borderRadius: "0px",
              clipPath: "inset(0 0 0 0)",
            }}
          >
            {/* Background Video */}
            <video
              id="video"
              ref={videoRef}
              loop
              muted
              playsInline
              autoPlay
              preload="auto"
              poster="https://res.cloudinary.com/dokrpo5fl/video/upload/so_0,q_auto,f_auto,w_1920/v1788261879/HERO1.hevc_kmkwvs.jpg"
              className="absolute inset-0 w-full h-full object-cover object-center z-0 will-change-transform"
            >
              <source
                src="https://res.cloudinary.com/dokrpo5fl/video/upload/q_auto,f_auto,w_1920,c_limit,ac_none/v1788261879/HERO1.hevc_kmkwvs.mp4"
                type="video/mp4"
              />
              <source
                src="https://res.cloudinary.com/dokrpo5fl/video/upload/v1788261879/HERO1.hevc_kmkwvs.mp4"
                type="video/mp4"
              />
            </video>

            {/* Darkening Overlay */}
            <div
              ref={overlayRef}
              className="absolute inset-0 z-10 pointer-events-none bg-black/0 transition-colors duration-300"
            />

          

            {/* Video Frosted Glass Overlay with Reveal Animation */}
            <div
              ref={videoOverlayRef}
              className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6 sm:p-12 text-white bg-black/40"
              style={{
                clipPath: "inset(100% 0 0 0)",
                backdropFilter: "blur(6px)",
                WebkitBackdropFilter: "blur(6px)",
              }}
            >
              {/* Revealed Statement: "Bold agency for bold brands." with brands highlighted */}
              <div
                ref={overlayContentRef}
                className="content flex flex-col justify-center items-center max-w-4xl mx-auto px-6"
                style={{ filter: "blur(10px)", transform: "scale(1.08)" }}
              >
                <h2 className="font-switzer font-medium uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white leading-tight select-none">
                  Bold agency for bold{" "}
                  <span className="text-accent italic font-semibold underline decoration-accent/40 underline-offset-8 drop-shadow-[0_0_35px_rgba(229,169,60,0.6)]">
                    brands
                  </span>
                  .
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
