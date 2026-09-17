"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [isRemoved, setIsRemoved] = useState(false);

  const preloaderWrapRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const centerLogoRef = useRef<HTMLDivElement>(null);
  const percentageIntroRef = useRef<HTMLDivElement>(null);
  const percentageValRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock body scroll during preloading
    document.body.style.overflow = "hidden";

    const wrap = preloaderWrapRef.current;
    const bar = progressBarRef.current;
    const logo = centerLogoRef.current;
    const intro = percentageIntroRef.current;
    const valElem = percentageValRef.current;

    if (!wrap || !bar || !logo || !intro || !valElem) return;

    const progressObj = { value: 0 };

    // GSAP master progress animation from 0 to 100%
    const tween = gsap.to(progressObj, {
      value: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        const current = Math.round(progressObj.value);
        setPercent(current);
        if (bar) {
          bar.style.width = `${current}%`;
        }
      },
      onComplete: () => {
        const exitTl = gsap.timeline({
          onComplete: () => {
            setIsRemoved(true);
            document.body.style.overflow = "";
          },
        });

        // 1. Bottom loading text and percentage fade out with slight upward shift
        exitTl.to([intro, valElem], {
          duration: 0.3,
          opacity: 0,
          y: -10,
          ease: "power2.inOut",
        });

        // 2. Center logo glides up and fades out
        exitTl.to(
          logo,
          {
            duration: 0.5,
            opacity: 0,
            y: -40,
            ease: "power2.inOut",
          },
          "-=0.15"
        );

        // 3. Top progress bar fades out
        exitTl.to(
          bar,
          {
            duration: 0.25,
            opacity: 0,
            ease: "power2.inOut",
          },
          "-=0.3"
        );

        // 4. Whole preloader wrap slides UP off the screen (yPercent: -101)
        exitTl.to(
          wrap,
          {
            duration: 0.75,
            yPercent: -101,
            ease: "power2.inOut",
            onStart: () => {
              // Notify Navbar and Hero sections right as curtain lifts
              window.dispatchEvent(new CustomEvent("preloaderComplete"));
            },
          },
          "-=0.2"
        );
      },
    });

    return () => {
      tween.kill();
      document.body.style.overflow = "";
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      ref={preloaderWrapRef}
      className="preloader-wrap fixed inset-0 w-full h-full bg-[#000000] z-[1800] text-center will-change-transform select-none overflow-hidden"
    >
      {/* ── Top Edge Progress Bar (Matches User Screenshot) ── */}
      <div className="absolute top-0 left-0 right-0 w-full h-[2.5px] bg-transparent overflow-hidden pointer-events-none z-30">
        <div
          ref={progressBarRef}
          className="h-full bg-white will-change-[width] transition-none"
          style={{ width: "0%" }}
        />
      </div>

      {/* ── Outer / Inner Vertical Centering Container ── */}
      <div className="outer table w-full h-full">
        <div className="inner table-cell align-middle box-border">
          {/* ── Center: Cluvion Logo ── */}
          <div
            ref={centerLogoRef}
            className="flex items-center justify-center pointer-events-none z-20 will-change-transform"
          >
            <Image
              src="/logo.webp"
              alt="Cluvion"
              width={56}
              height={56}
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain brightness-100 drop-shadow-[0_0_25px_rgba(255,255,255,0.18)]"
              priority
            />
          </div>
        </div>
      </div>

      {/* ── Bottom Meta Row: [LOADING] on Left, [PERCENTAGE %] on Right ── */}
      <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-14 right-6 sm:right-14 flex items-center justify-between pointer-events-none z-20">
        <div
          ref={percentageIntroRef}
          className="percentage-intro font-secondary text-[11px] sm:text-xs font-medium uppercase tracking-[0.25em] text-white/60 will-change-transform"
        >
          Loading
        </div>
        <div
          ref={percentageValRef}
          className="percentage-wrapper font-secondary text-[11px] sm:text-xs font-medium tracking-wider text-white/60 min-w-[40px] text-right will-change-transform"
        >
          {percent}%
        </div>
      </div>
    </div>
  );
}
