"use client";

import { useEffect, useRef, useState } from "react";
import { useFilm } from "./FilmContext";
import { X, Volume2, VolumeX, Play, Pause, Maximize, Check } from "lucide-react";

export default function VideoLightbox() {
  const { activeVideo, closeVideoLightbox, openProjectModal } = useFilm();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeVideoLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeVideoLightbox]);

  if (!activeVideo) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const cur = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      setProgress((cur / dur) * 100);

      const mins = Math.floor(cur / 60);
      const secs = Math.floor(cur % 60);
      setCurrentTime(`${mins}:${secs < 10 ? "0" : ""}${secs}`);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current && videoRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = clickX / rect.width;
      videoRef.current.currentTime = pct * videoRef.current.duration;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 sm:p-8 animate-in fade-in duration-300">
      {/* Close Button */}
      <button
        onClick={closeVideoLightbox}
        className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none"
        aria-label="Close Video Player"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Main Container */}
      <div className="relative w-full max-w-5xl rounded-xl overflow-hidden bg-[#0A0B0E] border border-white/15 shadow-2xl flex flex-col">
        {/* Video Screen */}
        <div className="relative w-full aspect-video bg-black flex items-center justify-center group">
          <video
            ref={videoRef}
            src={activeVideo.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-contain cursor-pointer"
            onClick={togglePlay}
          />

          {/* Central Play/Pause Overlay Flash */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            <div className="p-4 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 fill-current ml-0.5" />}
            </div>
          </button>

          {/* Video Control Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2">
            {/* Scrubber */}
            <div
              onClick={handleSeek}
              className="w-full h-2 bg-white/20 hover:h-3 rounded-full cursor-pointer transition-all relative overflow-hidden"
            >
              <div
                className="h-full bg-accent transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between text-xs font-mono text-white/80 pt-1">
              <div className="flex items-center gap-4">
                <button onClick={togglePlay} className="hover:text-accent transition-colors">
                  {isPlaying ? "PAUSE" : "PLAY"}
                </button>
                <button onClick={toggleMute} className="flex items-center gap-1.5 hover:text-accent transition-colors">
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent" />}
                  <span>{isMuted ? "UNMUTE" : "MUTED OFF"}</span>
                </button>
                <span>
                  {currentTime} / {activeVideo.duration}
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-cinema-dim">
                <span>{activeVideo.aspectRatio}</span>
                <span>·</span>
                <span>PRORES 4K</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Metadata & CTA Footer */}
        <div className="p-6 bg-[#0E0F14] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {activeVideo.isPlaceholder ? (
                <span className="px-2 py-0.5 text-xs font-mono text-cinema-dim border border-dashed border-white/20 rounded">
                  [CLIENT]
                </span>
              ) : (
                <h3 className="font-primary font-bold text-xl text-white">
                  {activeVideo.client}
                </h3>
              )}
              <span className="text-xs font-secondary text-cinema-muted">
                — {activeVideo.category}
              </span>
            </div>
            <p className="font-secondary text-sm text-cinema-muted">
              {activeVideo.tagline}
            </p>
          </div>

          <button
            onClick={() => {
              closeVideoLightbox();
              openProjectModal(activeVideo.category);
            }}
            className="btn-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-accent hover:bg-white transition-colors rounded-sm font-primary shrink-0"
          >
            Brief Similar Film
          </button>
        </div>
      </div>
    </div>
  );
}
