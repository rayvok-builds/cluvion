"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface ProcessStep {
  num: string;
  title: string[];
  desc: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "1",
    title: ["Discovery", "Phase"],
    desc: "Understanding your, goals, pain points, audience, and what sets you apart.",
  },
  {
    num: "2",
    title: ["Project", "Kickoff"],
    desc: "Setting up projects, aligning on scope and milestones, and diving into the work.",
  },
  {
    num: "3",
    title: ["Receive", "& Refine"],
    desc: "Sharing initial concepts, gathering your feedback, and fine-tuning details until 100% right.",
  },
  {
    num: "4",
    title: ["Continue", "& Grow"],
    desc: "Final master delivery, seamless asset handover, and ongoing support to help your brand grow.",
  },
];

export default function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!container || !sticky || !track) return;

    const mm = gsap.matchMedia();

    // Desktop
    mm.add("(min-width: 1024px)", () => {
      const getScrollDist = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 96);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: sticky,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            if (p < 0.25) setActiveStep(0);
            else if (p < 0.5) setActiveStep(1);
            else if (p < 0.75) setActiveStep(2);
            else setActiveStep(3);
          },
        },
      });

      tl.to(track, {
        x: () => -getScrollDist(),
        ease: "none",
      });
    });

    // Mobile & Tablet
    mm.add("(max-width: 1023px)", () => {
      const getScrollDist = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 32);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          pin: sticky,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress;
            setScrollProgress(p);
            if (p < 0.25) setActiveStep(0);
            else if (p < 0.5) setActiveStep(1);
            else if (p < 0.75) setActiveStep(2);
            else setActiveStep(3);
          },
        },
      });

      tl.to(track, {
        x: () => -getScrollDist(),
        ease: "none",
      });
    });

    return () => mm.revert();
  }, []);

  // Allow horizontal touch gestures on the cards to smoothly scrub the page scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartX || !touchStartY) return;
      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;
      const diffX = touchStartX - touchCurrentX;
      const diffY = touchStartY - touchCurrentY;

      // If user is predominantly swiping horizontally, scroll page vertically to advance horizontal scroll
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 8) {
        window.scrollBy({ top: diffX * 1.5, behavior: "auto" });
        touchStartX = touchCurrentX;
        touchStartY = touchCurrentY;
      }
    };

    track.addEventListener("touchstart", handleTouchStart, { passive: true });
    track.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      track.removeEventListener("touchstart", handleTouchStart);
      track.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Manual step navigation
  const scrollToProgress = (targetProgress: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const containerTop = container.offsetTop;
    const totalHeight = container.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: containerTop + totalHeight * targetProgress,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative w-full h-[260vh] sm:h-[280vh] lg:h-[300vh] bg-[#070709] border-y border-white/[0.08] select-none overflow-x-clip"
    >
      {/* ── PINNED VIEWPORT (Positioned safely above bottom 6rem gradient blur) ── */}
      <div
        ref={stickyRef}
        className="w-full h-screen sticky top-0 flex flex-col justify-center pt-8 sm:pt-10 lg:pt-12 pb-24 sm:pb-28 lg:pb-28 overflow-hidden"
      >
        {/* Section Header */}
        <div className="w-full pb-4 sm:pb-6 text-center px-4 mb-2">
          <h2 className="font-primary font-bold uppercase text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
            PROCESS
          </h2>
        </div>

        {/* Top Header / Progress Info Bar (Responsive on Mobile & Desktop) */}
        <div className="flex items-center justify-between w-full px-4 sm:px-8 lg:px-10 xl:px-14 mb-2 sm:mb-3 text-[11px] sm:text-xs font-mono text-white/40">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF4438] animate-pulse" />
            <span className="tracking-widest uppercase text-white/60 text-[10px] sm:text-xs">
              WORKFLOW TIMELINE
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <span className="tracking-widest uppercase text-[10px] sm:text-xs">
              STEP 0{activeStep + 1} / 04
            </span>
            <div className="w-16 sm:w-28 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF4438] transition-all duration-150 ease-out"
                style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
              />
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={() =>
                  scrollToProgress(Math.max(0, (activeStep - 1) / 3))
                }
                disabled={activeStep === 0}
                aria-label="Previous Step"
                className="p-1.5 rounded border border-white/10 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() =>
                  scrollToProgress(Math.min(1, (activeStep + 1) / 3))
                }
                disabled={activeStep === 3}
                aria-label="Next Step"
                className="p-1.5 rounded border border-white/10 text-white/60 hover:text-white hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── HORIZONTAL TRACK ── */}
        <div className="w-full overflow-visible px-4 sm:px-8 lg:px-10 xl:px-14">
          <div
            ref={trackRef}
            className="flex flex-row items-stretch border border-white/10 bg-[#090A0D] w-max h-[370px] sm:h-[390px] md:h-[410px] lg:h-[440px] xl:h-[460px]"
          >
            {/* ── LEFT TITLE COLUMN: HOW WE WORK (PROCESS) ── */}
            <div className="w-[280px] sm:w-[330px] md:w-[380px] lg:w-[430px] xl:w-[470px] shrink-0 p-5 sm:p-7 lg:p-8 xl:p-9 flex flex-col justify-between border-r border-white/10 bg-[#07080B] relative">
              {/* Top Title with (PROCESS) */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-0.5">
                  <span className="font-['Anton',sans-serif] text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] text-[#E5E5E5] leading-[0.9] tracking-tight uppercase whitespace-nowrap block">
                    HOW WE
                  </span>
                  <span className="font-mono text-[10px] sm:text-xs text-neutral-400 tracking-wider uppercase pt-1.5 shrink-0">
                    (PROCESS)
                  </span>
                </div>
                <span className="font-['Anton',sans-serif] text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] text-[#E5E5E5] leading-[0.9] tracking-tight uppercase whitespace-nowrap block">
                  WORK
                </span>
              </div>

              {/* Bottom Info / Guidance */}
              <div className="pt-4 sm:pt-6 border-t border-white/[0.08] flex items-center justify-between text-neutral-400 font-mono text-[10px] sm:text-xs">
                <span className="uppercase tracking-widest text-white/50">
                  SCROLL HORIZONTALLY
                </span>
                <span className="text-[#FF4438] flex items-center gap-1 font-semibold">
                  <span>EXPLORE</span>
                  <span>→</span>
                </span>
              </div>
            </div>

            {/* ── STEP CARDS ── */}
            {PROCESS_STEPS.map((step, idx) => (
              <div
                key={step.num}
                className="w-[260px] sm:w-[290px] md:w-[320px] lg:w-[360px] xl:w-[390px] shrink-0 p-5 sm:p-7 lg:p-8 xl:p-9 flex flex-col justify-between border-r border-white/10 bg-[#090A0D] hover:bg-white/[0.02] transition-colors duration-300 relative group"
              >
                {/* Top: STEP X. */}
                <div className="flex items-center justify-between">
                  <div className="font-sans font-medium uppercase tracking-wider text-xs sm:text-sm lg:text-[15px] text-neutral-200 flex items-center">
                    <span>STEP {step.num}</span>
                    <span className="text-[#FF4438] font-bold text-base sm:text-lg leading-none ml-0.5">
                      .
                    </span>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] text-white/30 group-hover:text-white/50 transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* Bottom: Step Title & Description */}
                <div className="pt-4 sm:pt-6 mt-auto">
                  <h3 className="font-sans font-medium text-2xl sm:text-[1.65rem] md:text-[1.85rem] lg:text-[2.1rem] xl:text-[2.3rem] text-white tracking-tight leading-[1.1] mb-2.5 sm:mb-3">
                    {step.title.map((line, lIdx) => (
                      <span key={lIdx} className="block">
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="text-xs sm:text-[13px] lg:text-[13.5px] xl:text-sm text-neutral-400 font-normal leading-relaxed max-w-[310px]">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
