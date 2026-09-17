"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { WorkItem } from "../lib/data";

// Helper to optimize Cloudinary video stream & poster thumbnails
function getCloudinaryMedia(url: string, fallbackPoster: string) {
  if (url.includes("res.cloudinary.com")) {
    const videoUrl = url.replace("/upload/", "/upload/q_auto:eco,f_auto,w_1920/");
    const posterUrl = url
      .replace("/upload/", "/upload/so_0,q_auto,f_jpg,w_1920/")
      .replace(/\.mp4$/, ".jpg");
    return { videoUrl, posterUrl };
  }
  return { videoUrl: url, posterUrl: fallbackPoster };
}

export default function ExpandingWorkVideo({
  item,
  mobileView = "grid",
}: {
  item: WorkItem;
  mobileView?: "single" | "grid";
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const { videoUrl, posterUrl } = getCloudinaryMedia(item.videoUrl, item.posterUrl);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const scrollContainer = scrollContainerRef.current;
    const videoContainer = videoContainerRef.current;
    const video = videoRef.current;

    if (!scrollContainer || !videoContainer || !video) return;

    // Ensure video starts playing when in view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isPlaying) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(scrollContainer);

    const isMobileGrid = window.innerWidth < 768 && mobileView === "grid";

    const ctx = gsap.context(() => {
      if (!isMobileGrid) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scrollContainer,
            start: "top 75%",
            end: "top top",
            scrub: 1,
            markers: false,
            onEnter: () => {
              if (isPlaying) video.play().catch(() => {});
            },
          },
        });

        tl.to(
          videoContainer,
          {
            width: "100%",
            height: "100%",
            borderRadius: "0px",
            borderColor: "rgba(255, 255, 255, 0)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            ease: "power2.out",
          },
          0
        ).to(
          video,
          {
            scale: 1.06,
            ease: "power2.out",
          },
          0
        );
      }
    }, scrollContainer);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, [isPlaying, mobileView]);

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
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const shortDesc = item.shortDescription || `${item.category.toUpperCase()} — "${item.tagline.toUpperCase()}"`;

  return (
    <div
      ref={scrollContainerRef}
      className={`relative w-full select-none ${
        mobileView === "grid" ? "h-auto md:h-[180vh]" : "h-[180vh]"
      }`}
    >
      {/* Sticky Fullscreen Viewport Wrapper on desktop/single; in mobile grid it's direct landscape */}
      <div
        className={`w-full flex items-center justify-center overflow-hidden z-20 ${
          mobileView === "grid"
            ? "relative h-auto aspect-[16/9] md:aspect-auto md:sticky md:top-0 md:h-screen"
            : "sticky top-0 left-0 h-screen"
        }`}
      >
        {/* Expanding Video Container */}
        <div
          ref={videoContainerRef}
          className={`group relative overflow-hidden bg-[#0A0B0E] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)] [transform:translateZ(0)] ${
            mobileView === "grid"
              ? "w-full h-full rounded-none md:w-[440px] md:h-[440px] md:rounded-2xl md:will-change-[width,height,border-radius]"
              : "w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] rounded-2xl will-change-[width,height,border-radius]"
          }`}
        >
          {/* Skeleton shimmer while loading */}
          {!isLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#0D0E13]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent animate-shimmer" />
              <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-accent animate-spin z-20" />
            </div>
          )}

          {/* Fallback poster image for instant visual */}
          <img
            src={posterUrl}
            alt={item.client}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            loading="eager"
          />

          {/* Autoplaying cinematic video */}
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            onCanPlay={() => setIsLoaded(true)}
            onLoadedData={() => setIsLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-700 [transform:translateZ(0)] will-change-transform ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Bottom Gradient Scrim Overlay */}
          <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-10" />

          {/* Bottom Info & Controls Bar (Matching Screenshot Layout) */}
          <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 md:p-8 flex items-end justify-between gap-4 z-30">
            {/* Bottom Left: Title & One-line Short Description */}
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="font-primary font-bold text-xl sm:text-3xl md:text-5xl text-white tracking-tight leading-tight truncate">
                {item.client}
              </h3>
              <p className="font-mono text-xs sm:text-sm md:text-base text-white/70 uppercase tracking-wider truncate mt-0.5 sm:mt-1">
                {shortDesc}
              </p>
            </div>

            {/* Bottom Right: Circular Mute/Unmute and Play/Pause Controls */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Mute / Unmute Button */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-xl"
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white/80" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                )}
              </button>

              {/* Play / Pause Button */}
              <button
                type="button"
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 hover:border-white/40 text-white flex items-center justify-center transition-all duration-200 active:scale-95 shadow-xl"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
                ) : (
                  <Play className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
