"use client";

import { useRef, useEffect, useState } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { WorkItem } from "../lib/data";

// Helper to optimize Cloudinary video stream & poster thumbnails
function getCloudinaryMedia(url: string, fallbackPoster: string, isFullWidth?: boolean) {
  if (url.includes("res.cloudinary.com")) {
    const widthParam = isFullWidth ? "w_1280" : "w_720";
    const videoUrl = url.replace("/upload/", `/upload/q_auto:eco,f_auto,${widthParam}/`);
    const posterUrl = url
      .replace("/upload/", `/upload/so_0,q_auto,f_jpg,${widthParam}/`)
      .replace(/\.mp4$/, ".jpg");
    return { videoUrl, posterUrl };
  }
  return { videoUrl: url, posterUrl: fallbackPoster };
}

export default function WorkTile({ 
  item, 
  index,
  isFullWidth = false,
  mobileView = "grid",
}: { 
  item: WorkItem; 
  index?: number; 
  isFullWidth?: boolean; 
  mobileView?: "single" | "grid";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasTriggeredLoad, setHasTriggeredLoad] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const { videoUrl, posterUrl } = getCloudinaryMedia(item.videoUrl, item.posterUrl, isFullWidth);

  // Viewport Intersection Observer (Async lazy loading & auto-pause when scrolled offscreen)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasTriggeredLoad(true);
        }
      },
      { threshold: 0.1, rootMargin: "150px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Smart play/pause depending on viewport visibility & user intent
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasTriggeredLoad) return;

    if (isInView && isPlaying) {
      video.loop = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {});
        });
      }
    } else {
      video.pause();
    }
  }, [isInView, hasTriggeredLoad, isPlaying]);

  const toggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (video.paused && isPlaying) {
      video.play().catch(() => {});
    }
  };

  const togglePlayPause = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const shortDesc = item.shortDescription || `${item.category.toUpperCase()} — "${item.tagline.toUpperCase()}"`;

  return (
    <div
      ref={containerRef}
      className={`group relative w-full overflow-hidden bg-[#0A0B0E] border border-white/[0.06] select-none [transform:translateZ(0)] ${
        isFullWidth 
          ? mobileView === "grid"
            ? "w-full aspect-[16/9] md:h-screen"
            : "w-full h-screen"
          : mobileView === "grid"
            ? "aspect-[9/16] sm:aspect-[3/4]"
            : "aspect-[4/5] sm:aspect-[3/4]"
      }`}
    >
      {/* Skeleton Loading Indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0D0E13] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-shimmer" />
          <div className="w-7 h-7 rounded-full border-2 border-white/10 border-t-accent animate-spin z-20" />
        </div>
      )}

      {/* Instant Poster Image (Fast LCP) */}
      <img
        src={posterUrl}
        alt={item.client}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        loading="lazy"
      />

      {/* Asynchronous Lazy-Loaded Video */}
      {hasTriggeredLoad && (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          onCanPlay={() => {
            setIsLoaded(true);
            if (isInView && isPlaying && videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          }}
          onLoadedData={() => {
            setIsLoaded(true);
            if (isInView && isPlaying && videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          }}
          className={`w-full h-full object-cover transition-opacity duration-500 [transform:translateZ(0)] ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/* Bottom Gradient Scrim Overlay for Clean Readability */}
      <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

      {/* Bottom Info & Controls Bar (Matching Screenshot Layout) */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 md:p-6 flex items-end justify-between gap-3 z-20">
        {/* Bottom Left: Title & One-line Short Description */}
        <div className="flex-1 min-w-0 pr-2">
          <h3 className={`font-primary font-bold text-white tracking-tight leading-tight truncate ${
            isFullWidth 
              ? "text-2xl sm:text-4xl md:text-5xl" 
              : "text-sm sm:text-lg md:text-xl"
          }`}>
            {item.client}
          </h3>
          <p className={`font-mono text-white/70 uppercase tracking-wider truncate mt-0.5 sm:mt-1 ${
            isFullWidth
              ? "text-xs sm:text-sm md:text-base"
              : "text-[9px] sm:text-xs"
          }`}>
            {shortDesc}
          </p>
        </div>

        {/* Bottom Right: Circular Mute/Unmute and Play/Pause Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mute / Unmute Button */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className={`rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg ${
              isFullWidth
                ? "w-10 h-10 sm:w-11 sm:h-11"
                : "w-7 h-7 sm:w-9 sm:h-9"
            }`}
          >
            {isMuted ? (
              <VolumeX className={isFullWidth ? "w-4 h-4 sm:w-5 sm:h-5 text-white/80" : "w-3 h-3 sm:w-4 sm:h-4 text-white/80"} />
            ) : (
              <Volume2 className={isFullWidth ? "w-4 h-4 sm:w-5 sm:h-5 text-white" : "w-3 h-3 sm:w-4 sm:h-4 text-white"} />
            )}
          </button>

          {/* Play / Pause Button */}
          <button
            type="button"
            onClick={togglePlayPause}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className={`rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg ${
              isFullWidth
                ? "w-10 h-10 sm:w-11 sm:h-11"
                : "w-7 h-7 sm:w-9 sm:h-9"
            }`}
          >
            {isPlaying ? (
              <Pause className={isFullWidth ? "w-4 h-4 sm:w-5 sm:h-5 text-white" : "w-3 h-3 sm:w-4 sm:h-4 text-white"} />
            ) : (
              <Play className={isFullWidth ? "w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5" : "w-3 h-3 sm:w-4 sm:h-4 text-white ml-0.5"} />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
