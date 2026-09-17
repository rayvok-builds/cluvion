"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";
import TextReveal from "./TextReveal";

/* ─── Storyboard Items (Single Full Widescreen Image) ─────────────────────── */
const STORYBOARD_ITEMS = [
  {
    id: "01",
    tag: "01",
    label: "CHARACTER GENESIS",
    desc: "Facial geometry & styling pass",
    cam: "ESTABLISHING SHOT",
    src: "https://res.cloudinary.com/dokrpo5fl/image/upload/v1789457491/Untitled_Design_sxy9hn.png",
  },
];

/* ─── Production Render Frames ───────────────────────────────────────────── */
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

/* ─── Static Data ─────────────────────────────────────────────────────────── */
const BRIEF_FIELDS = [
  { label: "PROJECT", value: "WISH U" },
  { label: "OBJECTIVE", value: "CAMPAIGN FILM" },
  { label: "FORMAT", value: "16:9 + SOCIAL" },
  { label: "AUDIENCE", value: "LUXURY CONSUMER" },
  { label: "DELIVERABLE", value: "MASTER + CUTDOWNS" },
];

const STEP_LABELS = ["BRIEF", "STORYBOARD", "PRODUCTION", "DELIVERY"];

/* ─── Step Threshold Helpers ─────────────────────────────────────────────── */
const T = [0, 0.18, 0.42, 0.68, 0.90, 1.0];

function getStep(p: number): [number, number] {
  if (p < T[1]) return [-1, p / T[1]];
  if (p < T[2]) return [0, (p - T[1]) / (T[2] - T[1])];
  if (p < T[3]) return [1, (p - T[2]) / (T[3] - T[2])];
  if (p < T[4]) return [2, (p - T[3]) / (T[4] - T[3])];
  return [3, (p - T[4]) / (T[5] - T[4])];
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [stepProgress, setStepProgress] = useState(0);

  const [autoFrameCounter, setAutoFrameCounter] = useState(0);
  const [manualFrame, setManualFrame] = useState<number | null>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const isActive = (step: number) => activeStep >= step;

  const currentFrameIndex =
    manualFrame !== null
      ? manualFrame
      : autoFrameCounter % PRODUCTION_FRAMES.length;

  /* ── Auto-advance production frames every 2 seconds ─────────────────── */
  useEffect(() => {
    if (activeStep !== 2) {
      setAutoFrameCounter(0);
      setManualFrame(null);
      return;
    }
    const interval = setInterval(() => {
      if (manualFrame === null) {
        setAutoFrameCounter((c) => (c + 1) % PRODUCTION_FRAMES.length);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [activeStep, manualFrame]);

  /* ── GSAP Horizontal Pinning & Process Section Class Toggle ─────────── */
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
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onToggle: (self) => {
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

  /* ── Touch scrub support for mobile devices ──────────────────────────── */
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

  return (
    <section
      id="process"
      className="relative w-full bg-[#060708] select-none border-y border-white/[0.06]"
    >
      <div
        ref={containerRef}
        className="relative w-full h-[400vh] overflow-x-clip"
      >
        {/* ── PINNED VIEWPORT (100vh Full Screen) ── */}
        <div
          ref={stickyRef}
          className="w-full h-screen sticky top-0 flex flex-col overflow-hidden bg-[#060708]"
        >
          {/* ── TOP BAR (Minimal Header & Step Counter) ── */}
          <div className="flex items-center justify-between px-4 sm:px-8 lg:px-12 pt-3 sm:pt-4 pb-2.5 sm:pb-3 border-b border-white/[0.06] shrink-0 bg-[#060708] z-30">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="font-mono text-[9px] sm:text-[10px] text-white/50 uppercase tracking-widest">
                HOW WE WORK
              </span>
            </div>

            {/* Step timeline indicator */}
            <div className="flex items-center gap-1 sm:gap-0 font-mono text-[8px] sm:text-[9px] uppercase tracking-widest">
              {STEP_LABELS.map((label, i) => (
                <div key={i} className="flex items-center gap-1 sm:gap-1.5">
                  <span
                    className={`transition-colors duration-500 ${
                      isActive(i) ? "text-accent font-semibold" : "text-white/20"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`hidden md:inline transition-colors duration-500 ${
                      isActive(i) ? "text-white/60" : "text-white/20"
                    }`}
                  >
                    {label}
                  </span>
                  {i < 3 && (
                    <div className="w-3 sm:w-5 lg:w-6 h-px mx-1 sm:mx-1.5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10" />
                      <div
                        className="absolute left-0 top-0 h-full bg-accent/70 transition-all duration-700"
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

            <div className="font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-widest">
              {activeStep < 0
                ? "INTRO"
                : `${String(activeStep + 1).padStart(2, "0")} / 04`}
            </div>
          </div>

          {/* ── HORIZONTAL TRACK: Each Card is 100vw with Centered Proper Viewing View ── */}
          <div className="flex-1 overflow-visible">
            <div
              ref={trackRef}
              className="flex flex-row items-stretch h-full w-max will-change-transform"
            >
              {/* ═══════════════════════════════════════════════════════════════
                  CARD 00: HOW WE WORK (PROPER VIEWING VIEW)
              ═══════════════════════════════════════════════════════════════ */}
              <div className="w-[100vw] h-full shrink-0 flex flex-col justify-between p-4 sm:p-7 lg:p-10 border-r border-white/[0.06] bg-[#060708] relative overflow-hidden">
                <div className="w-full max-w-5xl xl:max-w-6xl mx-auto flex-1 flex flex-col justify-between">
                

                  {/* Main Body: Cinematic center statement */}
                  <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-6">
                    <TextReveal
                      as="h1"
                      lines={["HOW", "WE WORK"]}
                      style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
                      className="font-primary font-bold uppercase text-white tracking-tight leading-[0.88] select-none text-center"
                      innerClassName="text-center"
                      paragraph={
                        <p className="font-mono text-xs sm:text-sm text-white/45 max-w-md mx-auto mt-4 sm:mt-6 leading-relaxed text-center">
                          Four synchronized phases engineered to convert raw creative ambition into cinema-grade production.
                        </p>
                      }
                    />
                  </div>

                  {/* Bottom Row: Steps & Scroll prompt */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] font-mono text-[8px] sm:text-[10px] text-white/30 uppercase tracking-widest shrink-0">
                    <div className="flex items-center gap-3 sm:gap-6">
                      {STEP_LABELS.map((l, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="text-white/50">{String(i + 1).padStart(2, "0")}</span>
                          <span className="hidden sm:inline">{l}</span>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-white/50">
                      <span>SCROLL TO EXPLORE</span>
                      <span className="text-accent font-bold">→</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  CARD 01: BRIEF (ALL DATA VISIBLE)
              ═══════════════════════════════════════════════════════════════ */}
              <div className="w-[100vw] h-full shrink-0 flex flex-col justify-between p-4 sm:p-7 lg:p-10 border-r border-white/[0.06] bg-[#060708] overflow-hidden">
                <div className="w-full max-w-5xl xl:max-w-6xl mx-auto flex-1 flex flex-col justify-between">
                  {/* Top Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 shrink-0 mb-4 sm:mb-6">
                    <div>
                      <h2 className="font-primary font-bold uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-none">
                        1. Brief
                      </h2>
                      <p className="font-mono text-xs sm:text-sm text-white/50 mt-1 sm:mt-1.5">
                        Brand direction, audience, and creative objectives.
                      </p>
                    </div>
                    <div className="font-mono text-[9px] sm:text-xs text-white/40 uppercase tracking-widest sm:text-right">
                      <span className="text-white/30">TURNAROUND: </span>
                      <span className="text-accent font-semibold">48 HOURS</span>
                      <span className="mx-2 text-white/20">·</span>
                      <span>STATUS: LOCKED</span>
                    </div>
                  </div>

                  {/* Main Content Area: All fields triggered & fully visible */}
                  <div className="flex-1 w-full flex flex-col justify-center overflow-hidden py-2">
                    <div className="w-full border border-white/10 overflow-hidden bg-black/40">
                      <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white/[0.03] border-b border-white/[0.08]">
                        <span className="font-mono text-[9px] sm:text-xs text-white/35 uppercase tracking-widest">
                          DIRECTIVE FIELD
                        </span>
                        <span className="font-mono text-[9px] sm:text-xs text-white/35 uppercase tracking-widest">
                          SPECIFICATION VALUE
                        </span>
                      </div>

                      {BRIEF_FIELDS.map((field) => (
                        <div
                          key={field.label}
                          className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/[0.05] last:border-0 font-mono text-xs sm:text-sm"
                        >
                          <span className="text-white/50 uppercase tracking-wider">
                            {field.label}
                          </span>
                          <span className="text-white font-semibold uppercase tracking-wide">
                            {field.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mt-4 font-mono text-[9px] sm:text-xs uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      <span className="text-accent font-semibold">BRIEF PARAMETERS LOCKED</span>
                    </div>
                  </div>

                  {/* Bottom Card Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-widest shrink-0">
                    <span>STAGE 01 // FOUNDATION</span>
                    <span>48H CONCEPT &amp; SCOPE APPROVAL</span>
                  </div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  CARD 02: STORYBOARD (SINGLE IMAGE FULLY VISIBLE)
              ═══════════════════════════════════════════════════════════════ */}
              <div className="w-[100vw] h-full shrink-0 flex flex-col justify-between p-4 sm:p-7 lg:p-10 border-r border-white/[0.06] bg-[#060708] overflow-hidden">
                <div className="w-full max-w-5xl xl:max-w-6xl mx-auto flex-1 flex flex-col justify-between">
                  {/* Top Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 shrink-0  ">
                    <div>
                      <h2 className="font-primary font-bold uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-none">
                        2. Storyboard
                      </h2>
                      <p className="font-mono text-xs sm:text-sm text-white/50 mt-1 sm:mt-1.5">
                        Character stills and cinematic framing.
                      </p>
                    </div>
                    <div className="font-mono text-[9px] sm:text-xs text-white/40 uppercase tracking-widest sm:text-right">
                      <span className="text-white/30">SCHEDULE: </span>
                      <span className="text-accent font-semibold">DAY 3–4</span>
                      <span className="mx-2 text-white/20">·</span>
                      <span>PRE-VISUALIZATION</span>
                    </div>
                  </div>

                  {/* Main Visual: Entire Storyboard Image with border & corner marks snug to the frame */}
                  <div className="flex-1 w-full flex items-center justify-center py-2 overflow-hidden">
                    <div className="relative aspect-[3/2] h-full max-h-[45vh] sm:max-h-[58vh] max-w-full border border-white/15 overflow-hidden shadow-2xl bg-black flex items-center justify-center">
                      <img
                        src={STORYBOARD_ITEMS[0].src}
                        alt="Storyboard Pass"
                        className="w-full h-full object-contain"
                        loading="eager"
                      />

                      {/* Corner marks snug to the image frame */}
                      <span className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/60 pointer-events-none z-10" />
                      <span className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/60 pointer-events-none z-10" />
                      <span className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/60 pointer-events-none z-10" />
                      <span className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/60 pointer-events-none z-10" />
                    </div>
                  </div>

                  {/* Bottom Card Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-widest shrink-0">
                    <span>STAGE 02 // PRE-VISUALIZATION</span>
                    <span>CAMERA DIRECTION &amp; CHARACTER IDENTITY</span>
                  </div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  CARD 03: PRODUCTION (FRAME & SMALL THUMBNAILS ALL VISIBLE)
              ═══════════════════════════════════════════════════════════════ */}
              <div className="w-[100vw] h-full shrink-0 flex flex-col justify-between p-4 sm:p-7 lg:p-10 border-r border-white/[0.06] bg-[#060708] overflow-hidden">
                <div className="w-full max-w-5xl xl:max-w-6xl mx-auto flex-1 flex flex-col justify-between">
                  {/* Top Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 shrink-0 mb-3 sm:mb-4">
                    <div>
                      <h2 className="font-primary font-bold uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-none">
                        3. Production
                      </h2>
                      <p className="font-mono text-xs sm:text-sm text-white/50 mt-1 sm:mt-1.5">
                        Frame-by-frame synthesis and lighting integration.
                      </p>
                    </div>
                    <div className="font-mono text-[9px] sm:text-xs text-white/40 uppercase tracking-widest sm:text-right">
                      <span className="text-white/30">TIMELINE: </span>
                      <span className="text-accent font-semibold">DAY 5–9</span>
                      <span className="mx-2 text-white/20">·</span>
                      <span>FRAME {String(currentFrameIndex + 1).padStart(2, "0")} / 05</span>
                      <span className="mx-2 text-white/20">·</span>
                      <span className="text-accent">
                        {manualFrame === null ? "AUTO 2s" : "HOLD"}
                      </span>
                    </div>
                  </div>

                  {/* Main Visual: Main Frame AND Small Thumbnails Fully Visible */}
                  <div className="flex-1 w-full flex flex-col justify-between py-2 overflow-hidden">
                    {/* Main Render Frame */}
                    <div className="relative aspect-video max-h-[44vh] sm:max-h-[48vh] w-full border border-white/15 overflow-hidden bg-black mx-auto shrink">
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

                      {/* Corner marks */}
                      <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-white/50 pointer-events-none z-10" />
                      <span className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/50 pointer-events-none z-10" />
                      <span className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/50 pointer-events-none z-10" />
                      <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-white/50 pointer-events-none z-10" />

                      {/* Frame title HUD */}
                      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
                        <div className="px-2.5 py-1 bg-black/85 border border-white/10 font-mono text-[8px] sm:text-[10px] text-white/90 uppercase tracking-widest flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          <span>
                            {PRODUCTION_FRAMES[currentFrameIndex].label} · {PRODUCTION_FRAMES[currentFrameIndex].title}
                          </span>
                        </div>
                        {manualFrame !== null && (
                          <button
                            type="button"
                            onClick={() => setManualFrame(null)}
                            className="pointer-events-auto px-2 py-0.5 bg-black/80 border border-accent/40 font-mono text-[7px] sm:text-[8px] text-accent uppercase tracking-widest cursor-pointer hover:bg-accent/10"
                          >
                            RESUME AUTO
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Small Keyframe Thumbnails Strip */}
                    <div className="mt-2.5 pt-2 border-t border-white/[0.06] shrink-0">
                      <div className="flex items-center justify-between mb-1.5 font-mono text-[7px] sm:text-[9px] text-white/35 uppercase tracking-widest">
                        <span>KEYFRAMES · AUTO-CYCLE 2s</span>
                        <span className="text-accent">{currentFrameIndex + 1} OF {PRODUCTION_FRAMES.length}</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                        {PRODUCTION_FRAMES.map((frame, idx) => {
                          const isSelected = idx === currentFrameIndex;
                          return (
                            <button
                              key={frame.id}
                              type="button"
                              onClick={() => setManualFrame(idx === manualFrame ? null : idx)}
                              className={`group relative  overflow-hidden border transition-all duration-300 text-left focus:outline-none cursor-pointer ${
                                isSelected
                                  ? "border-accent ring-1 ring-accent/60"
                                  : "border-white/10 hover:border-white/30 opacity-55 hover:opacity-100"
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
                                      ? "bg-accent/10"
                                      : "bg-black/25 group-hover:bg-transparent"
                                  }`}
                                />
                              </div>
                              <div
                                className={`px-1.5 py-0.5 bg-[#0A0B0E] flex items-center justify-between border-t transition-colors ${
                                  isSelected ? "border-accent/40" : "border-white/5"
                                }`}
                              >
                                <span
                                  className={`font-mono text-[6px] sm:text-[8px] uppercase tracking-wider ${
                                    isSelected ? "text-accent font-bold" : "text-white/40"
                                  }`}
                                >
                                  {frame.id}
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

                  {/* Bottom Card Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-widest shrink-0">
                    <span>STAGE 03 // SYNTHESIS</span>
                    <span>NEURAL RENDERING &amp; LIGHTING INTEGRATION</span>
                  </div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════════════════════
                  CARD 04: DELIVERY (FORMATS & CUTS REMOVED, VIDEO FULLY VISIBLE)
              ═══════════════════════════════════════════════════════════════ */}
              <div className="w-[100vw] h-full shrink-0 flex flex-col justify-between p-4 sm:p-7 lg:p-10 bg-[#060708] overflow-hidden">
                <div className="w-full max-w-5xl xl:max-w-6xl mx-auto flex-1 flex flex-col justify-between">
                  {/* Top Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4 shrink-0 mb-3 sm:mb-4">
                    <div>
                      <h2 className="font-primary font-bold uppercase text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-none">
                        4. Delivery
                      </h2>
                      <p className="font-mono text-xs sm:text-sm text-white/50 mt-1 sm:mt-1.5">
                        Final master film ready for multi-platform distribution.
                      </p>
                    </div>
                    <div className="font-mono text-[9px] sm:text-xs text-white/40 uppercase tracking-widest sm:text-right">
                      <span className="text-white/30">DELIVERABLE: </span>
                      <span className="text-accent font-semibold">DAY 10</span>
                      <span className="mx-2 text-white/20">·</span>
                      <span>4K MASTER · READY TO AIR</span>
                    </div>
                  </div>

                  {/* Main Video Viewport: Formats & Cuts removed, Video fully prominent */}
                  <div className="flex-1 w-full flex items-center justify-center py-2 overflow-hidden">
                    <div className="relative aspect-video w-full max-h-[58vh] sm:max-h-[64vh] border border-white/15 overflow-hidden bg-black mx-auto shadow-2xl">
                      <video
                        ref={videoRef}
                        src={DELIVERY_VIDEO}
                        muted={isVideoMuted}
                        playsInline
                        loop
                        preload="auto"
                        className="w-full h-full object-cover"
                      />

                      {/* Corner marks */}
                      <span className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-white/50 pointer-events-none z-10" />
                      <span className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/50 pointer-events-none z-10" />
                      <span className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/50 pointer-events-none z-10" />
                      <span className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-white/50 pointer-events-none z-10" />

                      {/* Video Top Controls */}
                      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">
                        <div className="flex items-center gap-2 px-2.5 py-1 bg-black/80 backdrop-blur-xs border border-white/10 font-mono text-[8px] sm:text-[9px] text-white/90 uppercase tracking-widest">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          <span>FINAL MASTER AIR FILM · 4K</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsVideoMuted(!isVideoMuted)}
                          className="flex items-center gap-1.5 px-2.5 py-1 bg-black/80 border border-white/15 hover:border-accent text-white/80 hover:text-white font-mono text-[7px] sm:text-[8px] uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          {isVideoMuted ? (
                            <>
                              <VolumeX className="w-3 h-3 text-white/60" />
                              <span>UNMUTE</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3 h-3 text-accent" />
                              <span className="text-accent">AUDIO LIVE</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Card Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-widest shrink-0">
                    <span>STAGE 04 // FINAL DELIVERY</span>
                    <span>4K CINEMA MASTER BROADCAST READY</span>
                  </div>
                </div>
              </div>
              {/* ═══════════════════════════════════════════════════════════════ */}
            </div>
          </div>

          {/* ── BOTTOM OVERALL SCROLL PROGRESS ── */}
          <div className="shrink-0 px-4 sm:px-8 lg:px-12 py-2 sm:py-2.5 border-t border-white/[0.06] flex items-center gap-3 bg-[#060708] z-30">
            <div className="flex-1 h-px bg-white/[0.05] relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-accent/50"
                style={{
                  width: `${scrollProgress * 100}%`,
                  transition: "width 0.1s linear",
                }}
              />
            </div>
            <span className="font-mono text-[8px] sm:text-[9px] text-white/30 uppercase tracking-widest shrink-0 w-8 text-right">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
