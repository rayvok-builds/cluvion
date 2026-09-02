"use client";

import { useRef, useEffect, useState } from "react";
import { WorkItem } from "../lib/data";

// Helper to optimize Cloudinary video stream & poster thumbnails
function getCloudinaryMedia(url: string, fallbackPoster: string) {
  if (url.includes("res.cloudinary.com")) {
    const videoUrl = url.replace("/upload/", "/upload/q_auto:eco,f_auto,w_720/");
    const posterUrl = url
      .replace("/upload/", "/upload/so_0,q_auto,f_jpg,w_720/")
      .replace(/\.mp4$/, ".jpg");
    return { videoUrl, posterUrl };
  }
  return { videoUrl: url, posterUrl: fallbackPoster };
}

export default function WorkTile({ item }: { item: WorkItem; index?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasTriggeredLoad, setHasTriggeredLoad] = useState(false);

  const { videoUrl, posterUrl } = getCloudinaryMedia(item.videoUrl, item.posterUrl);

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

  // Smart play/pause depending on viewport visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasTriggeredLoad) return;

    if (isInView) {
      video.loop = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    } else {
      video.pause();
    }
  }, [isInView, hasTriggeredLoad]);

  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    video.loop = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If unmuted playback is blocked by browser policy before first interaction,
        // revert to muted so video NEVER pauses or freezes!
        video.muted = true;
        video.play().catch(() => {});
      });
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.loop = true;
    video.play().catch(() => {});
  };

  // Toggle sound on tap/click without opening any modal
  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    } else {
      video.muted = true;
      video.play().catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#0A0B0E] border border-white/[0.04] select-none [transform:translateZ(0)] cursor-pointer"
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
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          disableRemotePlayback
          onCanPlay={() => {
            setIsLoaded(true);
            if (isInView && videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          }}
          onLoadedData={() => {
            setIsLoaded(true);
            if (isInView && videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          }}
          className={`w-full h-full object-cover transition-opacity duration-500 [transform:translateZ(0)] ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}




