"use client";

import { useEffect, useState, useRef } from "react";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = "hidden";

    const topCurtain = topCurtainRef.current;
    const bottomCurtain = bottomCurtainRef.current;
    const bar = progressBarRef.current;
    const line = progressLineRef.current;

    if (!bar || !line || !topCurtain || !bottomCurtain) return;

    // Counter animation helper with smooth easing
    const animateCount = (start: number, end: number, durationMs: number) => {
      const startTime = performance.now();
      const step = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        // easeOutQuad for smooth counter speed
        const eased = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(start + (end - start) * eased);
        setCount(currentVal);
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    };

    // Stage 1: Progress line moves to 25% and counter to ~25 (after 250ms)
    const t1 = setTimeout(() => {
      line.style.transition = "width 1.1s cubic-bezier(.87,0,.13,1)";
      line.style.width = "25%";
      animateCount(0, 25, 1100);

      // Stage 2: Progress line and bar expand to 100% across screen, counter reaches 100 (after 1200ms)
      const t2 = setTimeout(() => {
        bar.style.transition = "width 1.4s cubic-bezier(.87,0,.13,1)";
        line.style.transition = "width 1.4s cubic-bezier(.87,0,.13,1)";

        bar.style.width = "100vw";
        line.style.width = "100%";
        animateCount(25, 100, 1400);

        // Stage 3: Split curtain opening & reveal hero (after 1500ms)
        const t3 = setTimeout(() => {
          // Fade out the progress text and line
          bar.style.transition = "opacity 0.3s ease";
          line.style.transition = "opacity 0.3s ease";
          bar.style.opacity = "0";
          line.style.opacity = "0";

          // Split open top and bottom solid curtains
          topCurtain.style.transition = "transform 1.1s cubic-bezier(.87,0,.13,1)";
          bottomCurtain.style.transition = "transform 1.1s cubic-bezier(.87,0,.13,1)";

          topCurtain.style.transform = "translateY(-100%)";
          bottomCurtain.style.transform = "translateY(100%)";

          // Notify hero section to animate text sequentially
          window.dispatchEvent(new CustomEvent("preloaderComplete"));

          const t4 = setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = "";

            const t5 = setTimeout(() => {
              setIsRemoved(true);
            }, 500);
            return () => clearTimeout(t5);
          }, 1100);

          return () => clearTimeout(t4);
        }, 1500);

        return () => clearTimeout(t3);
      }, 1200);

      return () => clearTimeout(t2);
    }, 250);

    return () => {
      clearTimeout(t1);
      document.body.style.overflow = "";
    };
  }, []);

  if (isRemoved) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] pointer-events-none ${
        isDone ? "opacity-0 transition-opacity duration-300" : "opacity-100"
      }`}
    >
      {/* Solid Top Curtain Panel */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-[50.5vh] bg-[#050608] pointer-events-auto will-change-transform z-10"
        style={{ transform: "translateY(0%)" }}
      />

      {/* Solid Bottom Curtain Panel */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-[50.5vh] bg-[#050608] pointer-events-auto will-change-transform z-10"
        style={{ transform: "translateY(0%)" }}
      />

      {/* Center Loader Track & UI */}
      <div className="absolute inset-0 flex items-center justify-start pointer-events-none z-20">
        {/* Progress Bar Widget */}
        <div
          ref={progressBarRef}
          className="absolute left-0 flex justify-between items-center px-6 sm:px-12 py-3.5 bg-[#050608] border-y border-white/[0.08] text-accent will-change-transform"
          style={{ width: "25vw" }}
        >
          <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-accent select-none">
            loading
          </p>
          <p className="font-mono text-[11px] sm:text-xs tracking-wider text-accent select-none">
            [<span id="counter" className="inline-block min-w-[24px] text-right">{count}</span>]
          </p>
        </div>

        {/* Progress Line */}
        <div
          ref={progressLineRef}
          className="absolute left-0 h-[2px] bg-accent shadow-[0_0_15px_rgba(229,169,60,0.9)] will-change-transform"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}
