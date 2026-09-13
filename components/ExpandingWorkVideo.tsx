"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Volume2, VolumeX } from "lucide-react";
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

export default function ExpandingWorkVideo({ item }: { item: WorkItem }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isMuted, setIsMuted] = useState(true);
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
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(scrollContainer);

    const ctx = gsap.context(() => {
      // Timeline triggers as the video enters the viewport and finishes expanding
      // exactly when it reaches the center of the screen (top top / sticky lock)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainer,
          start: "top 75%",
          end: "top top",
          scrub: 1,
          markers: false,
          onEnter: () => {
            video.play().catch(() => {});
          },
        },
      });

      // Expand the video container to full screen 100% width and 100% height as it scrolls toward center
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
    }, scrollContainer);

    return () => {
      observer.disconnect();
      ctx.revert();
    };
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    video.play().catch(() => {});
  };

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full h-[180vh] select-none"
    >
      {/* Sticky Fullscreen Viewport Wrapper */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden z-20">
        {/* Expanding Video Container */}
        <div
          ref={videoContainerRef}
          onClick={toggleMute}
          className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] md:w-[440px] md:h-[440px] overflow-hidden rounded-2xl bg-[#0A0B0E] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.95)] cursor-pointer [transform:translateZ(0)] will-change-[width,height,border-radius]"
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

          {/* Sound Toggle Control Button (Discreet, bottom right) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleMute();
            }}
            className="absolute bottom-6 right-6 z-30 flex items-center gap-2 px-3.5 py-2 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-[11px] uppercase tracking-wider transition-all duration-300 shadow-xl"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-white/70" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-accent" />
            )}
            <span className="hidden sm:inline">
              {isMuted ? "Sound Off" : "Sound On"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
