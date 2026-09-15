"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";

/* ─── Assets ─────────────────────────────────────────────────────────────── */
const STORYBOARD_ITEMS = [
  {
    id: "01",
    tag: "01",
    label: "CHARACTER GENESIS",
    desc: "Facial geometry & styling pass",
    src: "https://res.cloudinary.com/dokrpo5fl/image/upload/v1789402399/ChatGPT_Image_Sep_13_2026_04_33_49_PM_wcyeov.png",
  },
  {
    id: "02",
    tag: "02",
    label: "IDENTITY LOCK",
    desc: "Consistency across angles",
    src: "https://res.cloudinary.com/dokrpo5fl/image/upload/v1789402399/ChatGPT_Image_Sep_13_2026_04_33_45_PM_lyyiib.png",
  },
  
];

const PRODUCTION_FRAMES = [
  {
    id: "01",
    label: "FRAME 01",
    title: "LIGHT & REFLECTION PASS",
    src: "https://res.cloudinary.com/dokrpo5fl/image/upload/v1789402989/Screenshot_2026-09-14_215156_shicy9.png",
  },
  {
    id: "02",
    label: "FRAME 02",
    title: "NEURAL TEXTURE DETAIL",
    src: "https://res.cloudinary.com/dokrpo5fl/image/upload/v1789402998/Screenshot_2026-09-14_215224_cyoyev.png",
  },
  {
    id: "03",
    label: "FRAME 03",
    title: "CHARACTER & MOTION TRACK",
    src: "https://res.cloudinary.com/dokrpo5fl/image/upload/v1789403002/Screenshot_2026-09-14_215050_rjrftp.png",
  },
  {
    id: "04",
    label: "FRAME 04",
    title: "COLOR GRADING",
    src: "https://res.cloudinary.com/dokrpo5fl/image/upload/v1789402991/Screenshot_2026-09-14_215057_kubl2b.png",
  },
  {
    id: "05",
    label: "FRAME 05",
    title: "MASTER COMPOSITE",
    src: "https://res.cloudinary.com/dokrpo5fl/image/upload/v1789402992/Screenshot_2026-09-14_215109_i2vfch.png",
  },
];

const DELIVERY_VIDEO =
  "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788358969/Copy-of-mercedece.hevc_hhojlb.mp4";

/* ─── Static data ─────────────────────────────────────────────────────────── */
const BRIEF_FIELDS = [
  { label: "PROJECT", value: "WISH U" },
  { label: "OBJECTIVE", value: "CAMPAIGN FILM" },
  { label: "FORMAT", value: "16:9 + SOCIAL" },
  { label: "AUDIENCE", value: "LUXURY CONSUMER" },
  { label: "DELIVERABLE", value: "MASTER + CUTDOWNS" },
];

const PLATFORMS = ["META", "INSTAGRAM", "TIKTOK", "YOUTUBE"];
const DURATIONS = ["6 SEC", "15 SEC", "30 SEC"];
const STEP_LABELS = ["BRIEF", "STORYBOARD", "PRODUCTION", "DELIVERY"];

/* ─── Step threshold helpers ─────────────────────────────────────────────── */
const T = [0, 0.1, 0.33, 0.56, 0.78, 1.0];

function getStep(p: number): [number, number] {
  if (p < T[1]) return [-1, p / T[1]];
  if (p < T[2]) return [0, (p - T[1]) / (T[2] - T[1])];
  if (p < T[3]) return [1, (p - T[2]) / (T[3] - T[2])];
  if (p < T[4]) return [2, (p - T[3]) / (T[4] - T[3])];
  return [3, (p - T[4]) / (T[5] - T[4])];
}

/* ─── Shared card header ─────────────────────────────────────────────────── */
function CardHeader({
  code,
  title,
  active,
  status,
}: {
  code: string;
  title: string;
  active: boolean;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3 sm:py-3.5 border-b border-white/[0.06] shrink-0">
      <div className="flex items-center gap-2.5 sm:gap-3">
        <span className="font-mono text-[9px] sm:text-[10px] text-accent uppercase tracking-widest font-semibold">
          {code}
        </span>
        <span className="w-px h-3 bg-white/15" />
        <span className="font-mono text-[9px] sm:text-[10px] text-white/40 uppercase tracking-widest">
          {title}
        </span>
      </div>
      <div
        className={`flex items-center gap-1.5 sm:gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest transition-colors duration-500 ${
          active ? "text-accent" : "text-white/20"
        }`}
      >
        <span
          className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
            active ? "bg-accent animate-pulse" : "bg-white/20"
          }`}
        />
        <span>{status}</span>
      </div>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────────────────────── */
export default function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [stepProgress, setStepProgress] = useState(0);

  const [manualFrame, setManualFrame] = useState<number | null>(null);
  const [selectedStoryboard, setSelectedStoryboard] = useState(0);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const isActive = (step: number) => activeStep >= step;

  // Auto frame index based on scroll progress in step 2
  const autoFrameIndex = Math.min(
    PRODUCTION_FRAMES.length - 1,
    Math.max(0, Math.floor(stepProgress * PRODUCTION_FRAMES.length))
  );
  const currentFrameIndex = manualFrame !== null ? manualFrame : autoFrameIndex;

  // Reset manual frame if user scrolls away from production
  useEffect(() => {
    if (activeStep !== 2) {
      setManualFrame(null);
    }
  }, [activeStep]);

  /* ── GSAP horizontal pin & process-section class toggle ───────────────── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!container || !sticky || !track) return;

    const getMovement = () => Math.max(0, track.scrollWidth - window.innerWidth);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: sticky,
        scrub: 1.4,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: (self) => {
          // Hide fixed bottom gradual blur specifically in the process section
          if (self.isActive) {
            document.body.classList.add("in-process-section");
          } else {
            document.body.classList.remove("in-process-section");
          }
        },
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);
          const [step, sp] = getStep(p);
          setActiveStep(step);
          setStepProgress(Math.min(1, Math.max(0, sp)));
        },
      },
    });

    tl.to(track, { x: () => -getMovement(), ease: "none" });

    return () => {
      document.body.classList.remove("in-process-section");
      tl.scrollTrigger?.kill();
    };
  }, []);

  /* ── Touch scrub ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let sx = 0,
      sy = 0;
    const ts = (e: TouchEvent) => {
      sx = e.touches[0].clientX;
      sy = e.touches[0].clientY;
    };
    const tm = (e: TouchEvent) => {
      const dx = sx - e.touches[0].clientX;
      const dy = sy - e.touches[0].clientY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 6) {
        window.scrollBy({ top: dx * 1.8, behavior: "auto" });
        sx = e.touches[0].clientX;
      }
    };
    track.addEventListener("touchstart", ts, { passive: true });
    track.addEventListener("touchmove", tm, { passive: true });
    return () => {
      track.removeEventListener("touchstart", ts);
      track.removeEventListener("touchmove", tm);
    };
  }, []);

  /* ── Delivery Video control (Plays on Step 3) ───────────────────────── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (activeStep === 3) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [activeStep]);

  /* ─────────────────────────────────────────────────────────────────────── */
  return (
    <section
      id="process"
      className="relative w-full bg-[#060708] select-none border-y border-white/[0.06]"
    >
      <div
        ref={containerRef}
        className="relative w-full h-[300vh] lg:h-[520vh] overflow-x-clip"
      >
        {/* ── PINNED VIEWPORT ── */}
        <div
          ref={stickyRef}
          className="w-full h-screen sticky top-0 flex flex-col overflow-hidden"
        >
          {/* ── TOP BAR ── */}
          <div className="flex items-center justify-between px-4 sm:px-8 lg:px-14 pt-3.5 sm:pt-4 pb-2.5 sm:pb-3 border-b border-white/[0.06] shrink-0">
            {/* Section label */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-mono text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest">
                THE PROCESS
              </span>
            </div>

            {/* Step timeline indicator */}
            <div className="flex items-center gap-1 sm:gap-0 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest">
              {STEP_LABELS.map((label, i) => (
                <div key={i} className="flex items-center gap-1 sm:gap-1.5">
                  <span
                    className={`transition-colors duration-500 ${
                      isActive(i) ? "text-accent" : "text-white/18"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`hidden md:inline transition-colors duration-500 ${
                      isActive(i) ? "text-white/50" : "text-white/15"
                    }`}
                  >
                    {label}
                  </span>
                  {i < 3 && (
                    <div className="w-3 sm:w-5 lg:w-6 h-px mx-1 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/8" />
                      <div
                        className="absolute left-0 top-0 h-full bg-accent/50 transition-all duration-700"
                        style={{
                          width:
                            activeStep > i
                              ? "100%"
                              : activeStep === i
                              ? `${stepProgress * 100}%`
                              : "0%",
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Current step label */}
            <div className="font-mono text-[8px] sm:text-[9px] text-white/25 uppercase tracking-widest">
              {activeStep < 0
                ? "INTRO"
                : `${String(activeStep + 1).padStart(2, "0")} / 04`}
            </div>
          </div>

          {/* ── HORIZONTAL TRACK ── */}
          <div className="flex-1 overflow-visible">
            <div
              ref={trackRef}
              className="flex flex-row items-stretch h-full w-max will-change-transform"
            >
              {/* ══ INTRO PANEL ════════════════════════════════════════ */}
              <div className="w-[85vw] lg:w-[32vw] shrink-0 flex flex-col justify-between px-5 sm:px-10 lg:px-14 py-6 sm:py-10 border-r border-white/[0.06]">
                <div>
                  <h2 className="font-primary font-bold uppercase text-[clamp(2.4rem,7vw,4.5rem)] lg:text-[clamp(3rem,4vw,4.8rem)] text-white tracking-tight leading-[0.9]">
                    THE<br />PROCESS
                  </h2>
                </div>
                <div>
                  <p className="font-mono text-[10px] sm:text-xs text-white/40 leading-relaxed mb-5 max-w-[240px]">
                    Four stages. One continuous production. Scroll to move through the sequence.
                  </p>
                  <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] text-white/30 uppercase tracking-widest">
                    <span>SCROLL TO EXPLORE</span>
                    <span className="text-accent">→</span>
                  </div>
                </div>
              </div>

              {/* ══ CARD 01 — BRIEF ════════════════════════════════════ */}
              <div className="w-[90vw] lg:w-[75vw] shrink-0 border-r border-white/[0.06] bg-[#060708] flex flex-col overflow-hidden">
                <CardHeader
                  code="01"
                  title="BRIEF"
                  active={isActive(0)}
                  status={
                    activeStep === 0 && stepProgress > 0.88
                      ? "LOCKED"
                      : isActive(0)
                      ? "ACTIVE"
                      : "STANDBY"
                  }
                />

                <div className="flex-1 flex flex-col lg:flex-row items-stretch overflow-hidden">
                  {/* Title col - Multi-row on mobile */}
                  <div className="lg:w-[28%] flex flex-col justify-between items-start px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 border-b lg:border-b-0 lg:border-r border-white/[0.06] shrink-0 gap-3">
                    <div>
                      <h3 className="font-primary font-bold uppercase text-[clamp(1.8rem,5vw,3.2rem)] lg:text-[clamp(2.6rem,3.5vw,4.5rem)] text-white tracking-tight leading-[0.9]">
                        BRIEF
                      </h3>
                      <p className="font-mono text-[10px] sm:text-xs text-white/40 leading-relaxed mt-1.5 max-w-[200px]">
                        Brand direction, audience, and creative objectives.
                      </p>
                    </div>
                    <div className="pt-2 lg:pt-5 lg:border-t lg:border-white/[0.06] w-full">
                      <span className="font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-widest block">
                        TURNAROUND
                      </span>
                      <span className="font-mono text-xs sm:text-sm text-accent font-semibold block mt-0.5">
                        48 HOURS
                      </span>
                    </div>
                  </div>

                  {/* Content col */}
                  <div className="flex-1 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-8 flex flex-col justify-center overflow-hidden">
                    <div className="border border-white/10 overflow-hidden">
                      <div className="flex items-center justify-between px-3.5 sm:px-5 py-2 bg-white/[0.03] border-b border-white/[0.06]">
                        <span className="font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-widest">
                          FIELD
                        </span>
                        <span className="font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-widest">
                          VALUE
                        </span>
                      </div>
                      {BRIEF_FIELDS.map((field, i) => (
                        <div
                          key={field.label}
                          className={`flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-3 border-b border-white/[0.05] last:border-0 transition-all duration-500 ${
                            isActive(0) && stepProgress > i * 0.16
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-2"
                          }`}
                          style={{ transitionDelay: `${i * 50}ms` }}
                        >
                          <span className="font-mono text-[8px] sm:text-[10px] text-white/40 uppercase tracking-widest">
                            {field.label}
                          </span>
                          <span className="font-mono text-[9px] sm:text-[11px] text-white font-semibold uppercase tracking-wide">
                            {field.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div
                      className={`flex items-center gap-2 mt-3 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest transition-opacity duration-500 ${
                        activeStep === 0 && stepProgress > 0.88
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-accent font-semibold">BRIEF LOCKED</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ══ CARD 02 — STORYBOARD (MASONRY LAYOUT) ═════════════ */}
              <div className="w-[92vw] lg:w-[82vw] shrink-0 border-r border-white/[0.06] bg-[#060708] flex flex-col overflow-hidden">
                <CardHeader
                  code="02"
                  title="STORYBOARD"
                  active={isActive(1)}
                  status={
                    activeStep === 1 && stepProgress > 0.88
                      ? "LOCKED"
                      : isActive(1)
                      ? "ACTIVE"
                      : "PENDING"
                  }
                />

                <div className="flex-1 flex flex-col lg:flex-row items-stretch overflow-hidden">
                  {/* Title col - Multi-row on mobile */}
                  <div className="lg:w-[25%] flex flex-col justify-between items-start px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 lg:py-8 border-b lg:border-b-0 lg:border-r border-white/[0.06] shrink-0 gap-2 sm:gap-3">
                    <div>
                      <h3 className="font-primary font-bold uppercase text-[clamp(1.8rem,5vw,3.2rem)] lg:text-[clamp(2.6rem,3.5vw,4.5rem)] text-white tracking-tight leading-[0.9]">
                        STORY<br className="hidden lg:block" />BOARD
                      </h3>
                      <p className="font-mono text-[10px] text-white/40 leading-relaxed mt-1.5 max-w-[190px]">
                        Character stills and cinematic framing.
                      </p>
                    </div>
                    <div className="pt-2 lg:pt-5 lg:border-t lg:border-white/[0.06] w-full">
                      <span className="font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-widest block">
                        SCHEDULE
                      </span>
                      <span className="font-mono text-xs sm:text-sm text-accent font-semibold block mt-0.5">
                        DAY 3–4
                      </span>
                    </div>
                  </div>

                  {/* Storyboard Masonry Layout (16:9 full visibility) */}
                  <div className="flex-1 p-3 sm:p-5 lg:p-6 flex flex-col justify-between overflow-y-auto bg-[#07080B]/60">
                    {/* Top minimal status */}
                    <div className="flex items-center justify-between font-mono text-[7px] sm:text-[9px] text-white/30 uppercase tracking-widest mb-2 shrink-0">
                      <span>KEYFRAME FRAMING</span>
                      <span className="text-accent">
                        {selectedStoryboard + 1} / {STORYBOARD_ITEMS.length}
                      </span>
                    </div>

                    {/* Masonry Layout: Desktop 2-column asymmetric, Mobile stacked rows */}
                    <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 items-center">
                      {/* Featured Keyframe (16:9 aspect-video, 100% visible) */}
                      <div className="lg:col-span-7 flex flex-col">
                        <div className="relative aspect-video w-full rounded-none border border-white/15 overflow-hidden bg-black group">
                          <img
                            src={STORYBOARD_ITEMS[selectedStoryboard].src}
                            alt={STORYBOARD_ITEMS[selectedStoryboard].label}
                            className="w-full h-full object-contain sm:object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            loading="eager"
                          />
                          {/* Corner crop marks */}
                          <span className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/40 pointer-events-none z-10" />
                          <span className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/40 pointer-events-none z-10" />
                          <span className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/40 pointer-events-none z-10" />
                          <span className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/40 pointer-events-none z-10" />

                          <div className="absolute top-2 left-2 z-10">
                            <span className="px-1.5 py-0.5 bg-black/80 font-mono text-[7px] sm:text-[8px] text-accent tracking-widest uppercase">
                              {STORYBOARD_ITEMS[selectedStoryboard].tag}
                            </span>
                          </div>
                          <div className="absolute bottom-2 left-2 right-2 z-10 bg-black/70 px-2 py-1 flex items-center justify-between">
                            <span className="font-mono text-[8px] sm:text-[10px] text-white font-semibold uppercase tracking-wider">
                              {STORYBOARD_ITEMS[selectedStoryboard].label}
                            </span>
                            <span className="font-mono text-[7px] sm:text-[8px] text-white/40 hidden sm:inline">
                              {STORYBOARD_ITEMS[selectedStoryboard].desc}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Secondary Keyframes Stacked (Row 2 on Desktop / Thumbnails on Mobile) */}
                      <div className="lg:col-span-5 grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-2.5">
                        {STORYBOARD_ITEMS.map((item, idx) => {
                          if (idx === selectedStoryboard) return null;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setSelectedStoryboard(idx)}
                              className="relative aspect-video w-full rounded-none border border-white/10 hover:border-accent/60 overflow-hidden bg-black text-left group cursor-pointer transition-all duration-300"
                            >
                              <img
                                src={item.src}
                                alt={item.label}
                                className="w-full h-full object-contain sm:object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="eager"
                              />
                              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

                              <div className="absolute top-1.5 left-1.5 z-10">
                                <span className="px-1 py-0.5 bg-black/80 font-mono text-[6px] sm:text-[7px] text-accent tracking-widest uppercase">
                                  {item.tag}
                                </span>
                              </div>
                              <div className="absolute bottom-1 left-1 right-1 z-10 bg-black/70 px-1.5 py-0.5">
                                <span className="font-mono text-[7px] sm:text-[8px] text-white/80 uppercase tracking-wider block truncate">
                                  {item.label}
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Bottom selector bar for quick access */}
                    <div className="mt-2 pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-[7px] sm:text-[8px] text-white/30 uppercase tracking-widest shrink-0">
                      <div className="flex items-center gap-2">
                        {STORYBOARD_ITEMS.map((it, i) => (
                          <button
                            key={it.id}
                            type="button"
                            onClick={() => setSelectedStoryboard(i)}
                            className={`px-2 py-0.5 rounded-none border transition-colors cursor-pointer ${
                              selectedStoryboard === i
                                ? "border-accent text-accent bg-accent/[0.05]"
                                : "border-white/10 text-white/40 hover:text-white"
                            }`}
                          >
                            SHOT {it.tag}
                          </button>
                        ))}
                      </div>
                      <span className="text-white/40">3 KEYFRAMES</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ══ CARD 03 — PRODUCTION (MULTI-ROW RESPONSIVE) ═══════ */}
              <div className="w-[92vw] lg:w-[82vw] shrink-0 border-r border-white/[0.06] bg-[#060708] flex flex-col overflow-hidden">
                <CardHeader
                  code="03"
                  title="PRODUCTION"
                  active={isActive(2)}
                  status={isActive(2) ? "ACTIVE" : "PENDING"}
                />

                <div className="flex-1 flex flex-col lg:flex-row items-stretch overflow-hidden">
                  {/* Title col - Multi-row on mobile */}
                  <div className="lg:w-[25%] flex flex-col justify-between items-start px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 lg:py-8 border-b lg:border-b-0 lg:border-r border-white/[0.06] shrink-0 gap-2 sm:gap-3">
                    <div>
                      <h3 className="font-primary font-bold uppercase text-[clamp(1.8rem,5vw,3.2rem)] lg:text-[clamp(2.6rem,3.5vw,4.5rem)] text-white tracking-tight leading-[0.9]">
                        PRO<br className="hidden lg:block" />DUC<br className="hidden lg:block" />TION
                      </h3>
                      <p className="font-mono text-[10px] text-white/40 leading-relaxed mt-1.5 max-w-[190px]">
                        Frame-by-frame synthesis and lighting integration.
                      </p>
                    </div>

                    {/* Multi-row progress block */}
                    <div className="pt-2 lg:pt-5 lg:border-t lg:border-white/[0.06] w-full space-y-1.5">
                      <div className="flex items-center justify-between font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-widest">
                        <span>FRAME {String(currentFrameIndex + 1).padStart(2, "0")} / 05</span>
                        <span className={`transition-colors duration-300 ${isActive(2) ? "text-accent font-semibold" : ""}`}>
                          {isActive(2)
                            ? `${Math.round(((currentFrameIndex + 1) / PRODUCTION_FRAMES.length) * 100)}%`
                            : "0%"}
                        </span>
                      </div>
                      <div className="w-full h-1 bg-white/[0.06] rounded-none overflow-hidden">
                        <div
                          className="h-full bg-accent transition-all duration-300"
                          style={{
                            width: isActive(2)
                              ? `${((currentFrameIndex + 1) / PRODUCTION_FRAMES.length) * 100}%`
                              : "0%",
                          }}
                        />
                      </div>
                      <div className="font-mono text-[7px] sm:text-[8px] text-white/30 uppercase tracking-widest flex items-center justify-between pt-0.5">
                        <span>DAY 5–9</span>
                        <span className="text-white/50">{PRODUCTION_FRAMES[currentFrameIndex].title}</span>
                      </div>
                    </div>
                  </div>

                  {/* Frame Sequencer Main + Multi-row Scrubber */}
                  <div className="flex-1 p-3 sm:p-5 lg:p-6 flex flex-col justify-between overflow-y-auto bg-[#07080B]">
                    {/* Main Frame Viewport */}
                    <div className="relative aspect-video max-h-[50vh] w-full rounded-none border border-white/10 overflow-hidden bg-black flex items-center justify-center">
                      {PRODUCTION_FRAMES.map((f, idx) => (
                        <img
                          key={f.id}
                          src={f.src}
                          alt={f.title}
                          className={`absolute inset-0 w-full h-full object-contain sm:object-cover transition-opacity duration-300 ${
                            idx === currentFrameIndex
                              ? "opacity-100"
                              : "opacity-0 pointer-events-none"
                          }`}
                          loading="eager"
                        />
                      ))}

                      {/* Corner crop marks */}
                      <span className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/40 pointer-events-none z-20" />
                      <span className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/40 pointer-events-none z-20" />
                      <span className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/40 pointer-events-none z-20" />
                      <span className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/40 pointer-events-none z-20" />

                      {/* Minimal Overlay */}
                      <div className="absolute top-2.5 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                        <div className="px-2 py-0.5 bg-black/80 font-mono text-[7px] sm:text-[8px] text-white/80 uppercase tracking-widest">
                          {PRODUCTION_FRAMES[currentFrameIndex].label} · {PRODUCTION_FRAMES[currentFrameIndex].title}
                        </div>
                      </div>
                    </div>

                    {/* Frame Timeline - Multi-row on Mobile (3 cols on mobile, 5 on desktop) */}
                    <div className="mt-2.5 pt-2.5 border-t border-white/[0.06] shrink-0">
                      <div className="flex items-center justify-between mb-1.5 font-mono text-[7px] sm:text-[8px] text-white/35 uppercase tracking-widest">
                        <span>SELECT FRAME</span>
                        <span className="text-accent">
                          {currentFrameIndex + 1} OF {PRODUCTION_FRAMES.length}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
                        {PRODUCTION_FRAMES.map((frame, idx) => {
                          const isSelected = idx === currentFrameIndex;
                          return (
                            <button
                              key={frame.id}
                              type="button"
                              onClick={() => setManualFrame(idx)}
                              className={`group relative rounded-none overflow-hidden border transition-all duration-200 text-left focus:outline-none cursor-pointer ${
                                isSelected
                                  ? "border-accent ring-1 ring-accent/60"
                                  : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                              }`}
                            >
                              <div className="relative aspect-video w-full bg-black">
                                <img
                                  src={frame.src}
                                  alt={frame.label}
                                  className="w-full h-full object-cover"
                                  loading="eager"
                                />
                                <div
                                  className={`absolute inset-0 transition-colors ${
                                    isSelected
                                      ? "bg-accent/15"
                                      : "bg-black/25 group-hover:bg-transparent"
                                  }`}
                                />
                              </div>
                              <div
                                className={`px-1.5 py-0.5 bg-[#0A0B0E] flex items-center justify-between border-t transition-colors ${
                                  isSelected
                                    ? "border-accent/40"
                                    : "border-white/5"
                                }`}
                              >
                                <span
                                  className={`font-mono text-[6px] sm:text-[7px] uppercase tracking-wider ${
                                    isSelected
                                      ? "text-accent font-semibold"
                                      : "text-white/40"
                                  }`}
                                >
                                  {frame.label}
                                </span>
                                <span
                                  className={`w-1 h-1 rounded-full ${
                                    isSelected ? "bg-accent" : "bg-white/15"
                                  }`}
                                />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ══ CARD 04 — DELIVERY ════════════════════════════════ */}
              <div className="w-[92vw] lg:w-[82vw] shrink-0 bg-[#060708] flex flex-col overflow-hidden">
                <CardHeader
                  code="04"
                  title="DELIVERY"
                  active={isActive(3)}
                  status={
                    isActive(3) && stepProgress > 0.88
                      ? "READY"
                      : isActive(3)
                      ? "PLAYING"
                      : "PENDING"
                  }
                />

                <div className="flex-1 flex flex-col lg:flex-row items-stretch overflow-hidden">
                  {/* Title col - Multi-row on mobile */}
                  <div className="lg:w-[25%] flex flex-col justify-between items-start px-4 sm:px-6 lg:px-8 py-3.5 sm:py-5 lg:py-8 border-b lg:border-b-0 lg:border-r border-white/[0.06] shrink-0 gap-2 sm:gap-3">
                    <div>
                      <h3 className="font-primary font-bold uppercase text-[clamp(1.8rem,5vw,3.2rem)] lg:text-[clamp(2.6rem,3.5vw,4.5rem)] text-white tracking-tight leading-[0.9]">
                        DELI<br className="hidden lg:block" />VERY
                      </h3>
                      <p className="font-mono text-[10px] text-white/40 leading-relaxed mt-1.5 max-w-[190px]">
                        Final master film ready for multi-platform distribution.
                      </p>
                    </div>

                    <div className="pt-2 lg:pt-5 lg:border-t lg:border-white/[0.06] w-full space-y-2">
                      <span className="font-mono text-[7px] sm:text-[8px] text-white/30 uppercase tracking-widest block">
                        DISTRIBUTION
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {PLATFORMS.map((p) => (
                          <span
                            key={p}
                            className="px-1.5 py-0.5 bg-white/[0.03] border border-white/10 font-mono text-[7px] sm:text-[8px] text-white/60 uppercase tracking-wider"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                      <div className="font-mono text-[7px] sm:text-[8px] text-accent/80 uppercase tracking-widest pt-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>DAY 10 · READY TO AIR</span>
                      </div>
                    </div>
                  </div>

                  {/* Final Video showcase + multi-row deliverable specs */}
                  <div className="flex-1 p-3 sm:p-5 lg:p-6 flex flex-col justify-between overflow-y-auto bg-[#07080B]">
                    {/* Master Video Player (16:9 fully visible) */}
                    <div className="relative aspect-video max-h-[50vh] w-full rounded-none border border-white/10 overflow-hidden bg-black flex items-center justify-center">
                      <video
                        ref={videoRef}
                        src={DELIVERY_VIDEO}
                        muted={isVideoMuted}
                        playsInline
                        loop
                        preload="auto"
                        className="w-full h-full object-cover"
                      />

                      {/* Video Top Controls */}
                      <div className="absolute top-2.5 left-3 right-3 z-20 flex items-center justify-between">
                        <span className="px-2 py-0.5 bg-black/80 font-mono text-[7px] sm:text-[8px] text-white/80 uppercase tracking-widest">
                          FINAL MASTER FILM
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsVideoMuted(!isVideoMuted)}
                          className="flex items-center gap-1.5 px-2 py-0.5 bg-black/80 border border-white/15 hover:border-accent text-white/70 hover:text-white font-mono text-[7px] sm:text-[8px] uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          {isVideoMuted ? (
                            <>
                              <VolumeX className="w-2.5 h-2.5 text-white/60" />
                              <span>UNMUTE</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-2.5 h-2.5 text-accent" />
                              <span className="text-accent">AUDIO LIVE</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Multi-format packaging bar - Multi-row on Mobile */}
                    <div className="mt-2.5 pt-2.5 border-t border-white/[0.06] space-y-1.5 shrink-0">
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[7px] sm:text-[8px] uppercase tracking-widest">
                        <span className="text-white/30">FORMATS:</span>
                        <span className="px-1.5 py-0.5 border border-accent/40 bg-accent/[0.06] text-accent font-semibold">
                          16:9 MASTER
                        </span>
                        <span className="px-1.5 py-0.5 border border-white/10 text-white/60">
                          9:16 VERTICAL
                        </span>
                        <span className="px-1.5 py-0.5 border border-white/10 text-white/60">
                          4:5 SOCIAL
                        </span>
                        <span className="px-1.5 py-0.5 border border-white/10 text-white/60">
                          1:1 SQUARE
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[7px] sm:text-[8px] uppercase tracking-widest">
                        <span className="text-white/30">CUTS:</span>
                        {DURATIONS.map((d) => (
                          <span
                            key={d}
                            className="px-1.5 py-0.5 bg-white/[0.04] text-white/50 border border-white/5"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* ═══════════════════════════════════════════════════════ */}
            </div>
          </div>

          {/* ── BOTTOM SCROLL PROGRESS ── */}
          <div className="shrink-0 px-4 sm:px-8 lg:px-14 py-2 sm:py-2.5 border-t border-white/[0.06] flex items-center gap-3">
            <div className="flex-1 h-px bg-white/[0.05] relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-accent/40"
                style={{
                  width: `${scrollProgress * 100}%`,
                  transition: "width 0.1s linear",
                }}
              />
            </div>
            <span className="font-mono text-[8px] sm:text-[9px] text-white/20 uppercase tracking-widest shrink-0 w-7 sm:w-8 text-right">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
