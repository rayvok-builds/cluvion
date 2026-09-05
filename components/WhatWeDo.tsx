"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { useFilm } from "./FilmContext";

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  capabilities: string[];
  turnaround: string;
  videoUrl: string;
  posterUrl: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "brand-films",
    num: "01",
    title: "Brand Films",
    desc: "Hero identity, narrative scale, and brand films shot without physical sets or crews.",
    capabilities: ["Launch Films", "Founder Stories", "Festive Campaigns", "Concept Films", "4K Mastering"],
    turnaround: "7–14 Days",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788358969/Copy-of-mercedece.hevc_hhojlb.mp4",
    posterUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "performance-ugc",
    num: "02",
    title: "Performance & UGC",
    desc: "One master creative splitting into multiple high-converting vertical variations. 1 Idea → Multiple variations.",
    capabilities: ["AI UGC Ads", "Hook Variations", "Creative Testing", "Meta Ready", "TikTok Ready"],
    turnaround: "3–5 Days",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349395/7.hevc_fltmal.mp4",
    posterUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "product-stills",
    num: "03",
    title: "Product Films & Stills",
    desc: "Product locked. World unlimited. Photoreal packshots and dynamic scenes with zero physical shipping.",
    capabilities: ["Photoreal Packshots", "Lifestyle Scenes", "Fashion", "Jewellery", "Product Campaigns"],
    turnaround: "4–7 Days",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349390/9.hevc_d5gmk6.mp4",
    posterUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "micro-dramas",
    num: "04",
    title: "AI Micro-Dramas",
    desc: "One consistent character moving seamlessly through 30+ sequential cinematic scenes. The format eating the feed.",
    capabilities: ["Episodic Content", "Consistent Characters", "Branded Storytelling", "Social-First Formats"],
    turnaround: "10–14 Days",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788350306/4-tujvmy.hevc_pg3wkf.mp4",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "growth",
    num: "05",
    title: "Growth & Mandates",
    desc: "Creative → Distribution → Performance. Film to ad variations to Meta Ads to performance optimization.",
    capabilities: ["Meta Ads", "Social Media Mandates", "Creative Testing", "Performance Optimisation"],
    turnaround: "Ongoing Mandate",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788358987/okapiswim.hevc_wgp3od.mp4",
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
];

/** Right panel for Performance & UGC: photorealistic iPhone mockup with active video and UGC overlay */
function UGCPhonePanel({ videoUrl, isPlaying }: { videoUrl: string; isPlaying?: boolean }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.play().catch(() => {});

    const panel = panelRef.current;
    if (!panel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(panel);
    return () => observer.disconnect();
  }, [isMuted]);

  useEffect(() => {
    if (videoRef.current && isPlaying !== undefined) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !videoRef.current.muted;
    videoRef.current.muted = next;
    setIsMuted(next);
    videoRef.current.play().catch(() => {});
  };

  return (
    <div ref={panelRef} className="hidden lg:flex relative flex-1 h-full items-center justify-center bg-[#060709] overflow-hidden select-none">
      {/* Subtle ambient backdrop glow */}
      <div className="absolute w-[440px] h-[440px] bg-accent/[0.08] rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Performance Metric Badges (Desktop) */}
      <div className="hidden 2xl:flex flex-col gap-3 absolute left-10 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="px-3.5 py-2.5 bg-[#0e1015]/90 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl">
          <div className="font-mono text-[9px] text-accent uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            Hook Variation 01
          </div>
          <div className="font-mono text-xs font-semibold text-white mt-0.5">+48% View-Through</div>
        </div>

        <div className="px-3.5 py-2.5 bg-[#0e1015]/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl">
          <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
            Creative Split
          </div>
          <div className="font-mono text-xs text-white/90 mt-0.5">1 Master → 12 Angles</div>
        </div>
      </div>

      <div className="hidden 2xl:flex flex-col gap-3 absolute right-10 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <div className="px-3.5 py-2.5 bg-[#0e1015]/90 backdrop-blur-md border border-white/15 rounded-xl shadow-2xl text-right">
          <div className="font-mono text-[9px] text-emerald-400 uppercase tracking-widest flex items-center justify-end gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Meta &amp; TikTok Ready
          </div>
          <div className="font-mono text-xs font-semibold text-white mt-0.5">3.4x ROAS Target</div>
        </div>

        <div className="px-3.5 py-2.5 bg-[#0e1015]/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl text-right">
          <div className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
            Turnaround
          </div>
          <div className="font-mono text-xs text-white/90 mt-0.5">3–5 Days Delivery</div>
        </div>
      </div>

      {/* ── Realistic Phone Mockup (iPhone Pro Frame) ── */}
      <div className="relative z-10 flex items-center justify-center my-auto">
        {/* Physical Chassis */}
        <div
          className="relative bg-gradient-to-b from-[#2d2e33] via-[#1c1d21] to-[#121316] rounded-[48px] p-[8px] sm:p-[9px] shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.15),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-300"
          style={{
            width: "clamp(240px, 20vw, 280px)",
            height: "clamp(490px, 72vh, 570px)",
          }}
        >
          {/* Side Hardware Buttons */}
          {/* Left: Action button */}
          <span className="absolute -left-[3px] top-[90px] w-[3px] h-[20px] bg-[#3a3b40] rounded-l-sm" />
          {/* Left: Volume Up */}
          <span className="absolute -left-[3px] top-[124px] w-[3px] h-[38px] bg-[#3a3b40] rounded-l-sm" />
          {/* Left: Volume Down */}
          <span className="absolute -left-[3px] top-[172px] w-[3px] h-[38px] bg-[#3a3b40] rounded-l-sm" />
          {/* Right: Power button */}
          <span className="absolute -right-[3px] top-[130px] w-[3px] h-[58px] bg-[#3a3b40] rounded-r-sm" />

          {/* Top ear-speaker slit on chassis */}
          <span className="absolute top-[4px] left-1/2 -translate-x-1/2 w-10 h-[2.5px] bg-[#2b2c30] rounded-full z-40" />

          {/* ── Phone Screen ── */}
          <div className="relative w-full h-full rounded-[40px] overflow-hidden bg-black ring-1 ring-white/10">
            {/* Real Video */}
            <video
              ref={videoRef}
              src={videoUrl}
              autoPlay={isPlaying}
              muted={isMuted}
              playsInline
              loop
              preload="metadata"
              className="w-full h-full object-cover"
            />

            {/* Subtle Screen Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none z-20" />

            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[82px] h-[23px] bg-black rounded-full z-40 flex items-center justify-between px-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#0a0c14] ring-1 ring-white/10 flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-[#1e2742]" />
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0f]" />
            </div>

            {/* Status Bar */}
            <div className="absolute top-3 left-0 right-0 px-5 flex items-center justify-between z-30 pointer-events-none">
              <span className="font-mono text-[10px] font-semibold text-white/90 tracking-tight">9:41</span>
              <div className="flex items-center gap-1.5 text-white/90">
                {/* 5G */}
                <span className="font-mono text-[8px] font-bold tracking-tighter">5G</span>
                {/* Signal bars */}
                <div className="flex items-end gap-[1px] h-2">
                  <span className="w-[2px] h-[2px] bg-white rounded-xs" />
                  <span className="w-[2px] h-[4px] bg-white rounded-xs" />
                  <span className="w-[2px] h-[6px] bg-white rounded-xs" />
                  <span className="w-[2px] h-[8px] bg-white rounded-xs" />
                </div>
                {/* Battery */}
                <div className="w-[16px] h-[8px] border border-white/70 rounded-[2.5px] p-[1px] flex items-center">
                  <div className="h-full w-3/4 bg-white rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* ── UGC Social Layer Overlay ── */}
            {/* Top right mute button */}
            <button
              type="button"
              onClick={toggleMute}
              className="absolute top-10 right-3 z-30 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-accent" />}
            </button>

            {/* Right sidebar action stack (TikTok / Reels style) */}
            <div className="absolute right-2.5 bottom-12 flex flex-col items-center gap-3 z-30 pointer-events-none">
              {/* Avatar */}
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent to-amber-200 ring-1.5 ring-white flex items-center justify-center text-[9px] font-bold text-black uppercase">
                  CL
                </div>
                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 text-white flex items-center justify-center text-[9px] font-bold leading-none">
                  +
                </span>
              </div>

              {/* Heart / Likes */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white fill-white" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="font-mono text-[8px] text-white/90 font-medium">54.2K</span>
              </div>

              {/* Comments */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white fill-white" viewBox="0 0 24 24">
                    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
                  </svg>
                </div>
                <span className="font-mono text-[8px] text-white/90 font-medium">1,480</span>
              </div>

              {/* Bookmark */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white fill-white" viewBox="0 0 24 24">
                    <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
                <span className="font-mono text-[8px] text-white/90 font-medium">12.1K</span>
              </div>

              {/* Share */}
              <div className="flex flex-col items-center gap-0.5">
                <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white fill-white" viewBox="0 0 24 24">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z" />
                  </svg>
                </div>
                <span className="font-mono text-[8px] text-white/90 font-medium">4.2K</span>
              </div>
            </div>

            {/* Bottom info text */}
            <div className="absolute left-3 right-14 bottom-5 z-30 pointer-events-none text-left">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="font-mono text-[10px] font-bold text-white">@cluvion.ai</span>
                <span className="px-1 py-0.2 bg-white/20 text-[7px] font-mono uppercase rounded text-white/90">AD</span>
              </div>
              <p className="font-mono text-[9px] text-white/90 leading-tight line-clamp-2 drop-shadow-md">
                1 core concept → 12 high-converting vertical hooks at scale ⚡
              </p>
              <div className="flex items-center gap-1 mt-1 text-white/70">
                <span className="text-[9px]">♫</span>
                <span className="font-mono text-[8px] tracking-tight truncate">Original Audio — Cluvion</span>
              </div>
            </div>

            {/* Home Indicator Bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/50 rounded-full z-40 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Floating platform labels */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-5 font-mono text-[10px] text-white/40 uppercase tracking-widest z-10">
        <span className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 hover:text-white transition-colors">TIKTOK</span>
        <span className="px-2.5 py-1 rounded bg-accent/[0.12] border border-accent/40 text-accent font-semibold">META ADS</span>
        <span className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 hover:text-white transition-colors">INSTAGRAM</span>
        <span className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 hover:text-white transition-colors">REELS</span>
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  );
}

/** Mobile Video Player shown within the content flow on screens < lg */
function MobileVideoPlayer({ service }: { service: ServiceItem }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    video.play().catch(() => {});

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [isMuted]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !videoRef.current.muted;
    videoRef.current.muted = next;
    setIsMuted(next);
    videoRef.current.play().catch(() => {});
  };

  if (service.id === "performance-ugc") {
    return (
      <div ref={containerRef} className="lg:hidden my-6 w-full flex flex-col items-center justify-center">
        {/* Mobile Phone Mockup */}
        <div
          className="relative bg-gradient-to-b from-[#2d2e33] via-[#1c1d21] to-[#121316] rounded-[36px] p-[6px] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.15)]"
          style={{ width: "min(230px, 70vw)", height: "min(460px, 56vh)" }}
        >
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[72px] h-[19px] bg-black rounded-full z-40 flex items-center justify-between px-2 shadow-md pointer-events-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0a0c14] ring-1 ring-white/10" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#0a0a0f]" />
          </div>

          {/* Screen */}
          <div className="relative w-full h-full rounded-[30px] overflow-hidden bg-black ring-1 ring-white/10">
            <video
              ref={videoRef}
              src={service.videoUrl}
              autoPlay
              muted={isMuted}
              playsInline
              loop
              preload="auto"
              className="w-full h-full object-cover"
            />

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              className="absolute top-8 right-2.5 z-30 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-accent" />}
            </button>

            {/* Social Overlay */}
            <div className="absolute right-2 bottom-9 flex flex-col items-center gap-2.5 z-30 pointer-events-none">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-accent to-amber-200 text-[8px] font-bold text-black flex items-center justify-center">
                CL
              </div>
              <div className="flex flex-col items-center">
                <svg className="w-3.5 h-3.5 text-white fill-white" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span className="font-mono text-[7px] text-white/90">54K</span>
              </div>
            </div>

            {/* Bottom tag */}
            <div className="absolute left-2.5 right-10 bottom-3 z-30 pointer-events-none text-left">
              <div className="flex items-center gap-1 mb-0.5">
                <span className="font-mono text-[9px] font-bold text-white">@cluvion.ai</span>
                <span className="px-1 py-0.2 bg-white/20 text-[6px] font-mono rounded text-white/90">AD</span>
              </div>
              <p className="font-mono text-[8px] text-white/90 truncate drop-shadow-sm">
                1 core concept → 12 vertical hooks ⚡
              </p>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-white/50 rounded-full z-40 pointer-events-none" />
          </div>
        </div>

        {/* Platform tags */}
        <div className="flex items-center gap-3 mt-3 font-mono text-[9px] text-white/40 uppercase tracking-widest">
          <span>TIKTOK</span>
          <span className="text-accent font-semibold">META ADS</span>
          <span>REELS</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="lg:hidden my-6 w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-black relative shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
      <video
        ref={videoRef}
        src={service.videoUrl}
        poster={service.posterUrl}
        autoPlay
        muted={isMuted}
        playsInline
        loop
        preload="auto"
        className="w-full h-full object-cover"
      />

      {/* Subtle bottom shadow gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

      {/* Streaming tag */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/15 font-mono text-[9px] text-white/80 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>PREVIEW</span>
      </div>

      {/* Audio toggle button */}
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded font-mono text-[9px] text-white/80 active:scale-95 transition-transform"
      >
        {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-accent" />}
        <span>{isMuted ? "Audio" : "Muted"}</span>
      </button>
    </div>
  );
}

function ServicePanel({ service }: { service: ServiceItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const { openProjectModal } = useFilm();

  useEffect(() => {
    const video = videoRef.current;
    const panel = panelRef.current;
    if (!panel) return;

    if (video) {
      video.muted = isMuted;
      video.play().catch(() => {});
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
            if (video) video.play().catch(() => {});
            setIsPlaying(true);
          } else {
            if (video) video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: [0.1, 0.25, 0.6] }
    );

    observer.observe(panel);
    return () => observer.disconnect();
  }, [isMuted]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    const next = !videoRef.current.muted;
    videoRef.current.muted = next;
    setIsMuted(next);
  };

  return (
    <div
      ref={panelRef}
      className="relative w-full min-h-screen lg:h-screen flex flex-col lg:flex-row border-b border-white/[0.07] overflow-hidden"
    >
      {/* ── LEFT: Content Panel ── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[48%] h-auto lg:h-full px-6 sm:px-14 lg:px-16 py-12 sm:py-16 bg-[#050608] shrink-0">
        {/* Service index label */}
        <div className="flex items-center gap-2 mb-4 sm:mb-7 font-mono text-[11px] text-white/40 uppercase tracking-widest">
          <span className="text-accent font-semibold">
            [{service.num} / 05]
          </span>
          <span>//</span>
          <span>SERVICE MANDATE</span>
        </div>

        {/* Service Title */}
        <h3 className="font-switzer font-bold uppercase text-[clamp(1.9rem,3.8vw,3.4rem)] text-white tracking-tight leading-[0.95] mb-2 sm:mb-6">
          {service.title}
        </h3>

        {/* ── MOBILE VIDEO PLAYER: Visible on mobile screens (< lg) ── */}
        <MobileVideoPlayer service={service} />

        {/* Description */}
        <p className="font-mono text-sm text-white/60 leading-relaxed max-w-sm mb-6 sm:mb-8">
          {service.desc}
        </p>

        {/* Turnaround Badge */}
        <div className="mb-6 sm:mb-8">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 block mb-1.5">
            Estimated Turnaround:
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-accent border border-accent/40 px-3 py-1 bg-accent/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            {service.turnaround}
          </span>
        </div>

        {/* Capabilities */}
        <div className="mb-8 sm:mb-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 block mb-3">
            Scope &amp; Deliverables
          </span>
          <div className="flex flex-wrap gap-2">
            {service.capabilities.map((cap, i) => (
              <span
                key={i}
                className="font-mono text-[11px] uppercase tracking-wide px-3 py-1.5 border border-white/15 bg-white/[0.03] text-white/80 hover:border-accent/50 hover:text-white transition-colors cursor-default"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={() => openProjectModal(service.title)}
          className="group inline-flex items-center gap-3 px-6 py-3.5 border border-white/30 bg-white/[0.04] text-white font-mono text-xs uppercase tracking-[0.15em] hover:bg-white hover:text-black hover:border-white transition-all duration-300 self-start"
        >
          <span>Brief {service.title}</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>

      {/* ── RIGHT: Panel — Phone mockup for UGC, cinematic video for rest (Desktop >= lg) ── */}
      {service.id === "performance-ugc" ? (
        <UGCPhonePanel videoUrl={service.videoUrl} isPlaying={isPlaying} />
      ) : (
        <div className="hidden lg:block relative flex-1 h-full overflow-hidden">
          {/* Video */}
          <video
            ref={videoRef}
            src={service.videoUrl}
            poster={service.posterUrl}
            muted={isMuted}
            playsInline
            loop
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Subtle left-edge gradient for blending into content */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/70 via-[#050608]/10 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

          {/* Corner HUD markers */}
          <span className="absolute top-5 left-5 text-[10px] font-mono text-white/25 pointer-events-none">+</span>
          <span className="absolute top-5 right-5 text-[10px] font-mono text-white/25 pointer-events-none">+</span>
          <span className="absolute bottom-5 left-5 text-[10px] font-mono text-white/25 pointer-events-none">+</span>
          <span className="absolute bottom-5 right-5 text-[10px] font-mono text-white/25 pointer-events-none">+</span>

          {/* Play / status indicator */}
          <div className="absolute top-5 right-14 flex items-center gap-1.5 font-mono text-[10px] text-white/50 pointer-events-none">
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-emerald-400 animate-pulse" : "bg-white/30"}`} />
            <span>{isPlaying ? "STREAMING" : "STANDBY"}</span>
          </div>

          {/* Mute toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className="absolute bottom-6 right-6 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md border border-white/15 font-mono text-[10px] text-white/70 hover:text-accent hover:border-accent/40 transition-colors uppercase tracking-wider"
          >
            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-accent" />}
            <span>{isMuted ? "Muted" : "Audio"}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function WhatWeDo() {
  return (
    <section id="services" className="relative w-full bg-[#050608] select-none">
      {/* Section Heading */}
      <div className="w-full py-14 sm:py-20 border-b border-white/[0.08] text-center px-4">
        <h2 className="font-switzer font-bold uppercase text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
          Our Services<span className="text-accent">.</span>
        </h2>
      </div>

      {/* Service Panels — each full viewport height */}
      <div className="w-full">
        {SERVICES.map((service) => (
          <ServicePanel key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
