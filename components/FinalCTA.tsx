"use client";

import { useState } from "react";
import { useFilm } from "./FilmContext";
import { ArrowRight, Check, Send } from "lucide-react";
import confetti from "canvas-confetti";

export default function FinalCTA() {
  const { openProjectModal } = useFilm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState("Brand Film");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#E5A93C", "#ffffff", "#000000"],
        });
      } catch (err) {}
    }, 700);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      "Hi Cluvion Studio, I would like to discuss a film project for my brand."
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  const convergenceElements = ["IDEA", "STORY", "CHARACTER", "LOCATION", "CAMERA", "LIGHT"];

  return (
    <section className="relative w-full min-h-screen py-24 sm:py-32 bg-[#050608] border-b border-white/[0.08] flex flex-col justify-center select-none overflow-hidden">
      {/* Background Cinematic Atmosphere */}
      <div className="absolute inset-0 z-0">
        <video
          src="https://res.cloudinary.com/dokrpo5fl/video/upload/v1788261879/HERO1.hevc_kmkwvs.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-[0.25] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-black/60 to-[#050608]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-10 w-full">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-12">
          <span className="text-xs font-mono text-accent tracking-widest font-semibold">12</span>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50">
            // THE FRAME · PROJECT CONVERGENCE
          </span>
        </div>

        {/* ── "THE FRAME" CONVERGENCE HUD ── */}
        <div className="border border-white/15 bg-black/80 backdrop-blur-md p-8 sm:p-14 mb-14 shadow-2xl">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8 font-mono text-[11px] text-white/50">
            <span className="text-accent font-bold">YOUR BRIEF</span>
            <span>→</span>
            {convergenceElements.map((el, i) => (
              <span key={el} className="flex items-center gap-2 sm:gap-4">
                <span className="px-2.5 py-1 bg-white/[0.04] border border-white/10 text-white">
                  {el}
                </span>
                {i < convergenceElements.length - 1 && <span>+</span>}
              </span>
            ))}
            <span>=</span>
            <span className="text-emerald-400 font-bold">THE FINAL FRAME</span>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-switzer font-medium uppercase text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[0.98] mb-6">
              Got A Brief? <br />
              We&apos;ve Got{" "}
              <span className="text-accent underline decoration-accent/40 underline-offset-8">
                The Frames.
              </span>
            </h2>
            <p className="font-dmsans text-base sm:text-lg text-white/60 font-light max-w-xl mx-auto mb-8">
              Tell us your brand and the goal. Concept and fixed quote in 48 hours. Worldwide execution without flights or sets.
            </p>

            {/* Quick Action Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openProjectModal()}
                className="px-8 sm:px-10 py-4 bg-white hover:bg-accent text-black font-switzer font-medium text-xs sm:text-sm uppercase tracking-widest rounded-none border border-white hover:border-accent transition-all duration-200 flex items-center gap-2 group shadow-[0_4px_25px_rgba(255,255,255,0.15)]"
              >
                <span>Start A Project</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="px-6 sm:px-8 py-4 bg-black/60 hover:bg-white/10 text-white font-mono text-xs uppercase tracking-wider border border-white/20 transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Direct WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        {/* Inline Brief Intake Box */}
        <div className="max-w-2xl mx-auto border border-white/10 bg-[#07080B]/90 p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <span className="font-mono text-xs text-white/60 uppercase tracking-widest">
              QUICK BRIEF TRANSMISSION
            </span>
            <span className="font-mono text-[10px] text-accent">SLA: 48 HOURS</span>
          </div>

          {submitted ? (
            <div className="py-8 text-center flex flex-col items-center">
              <div className="w-10 h-10 border border-emerald-400 text-emerald-400 flex items-center justify-center mb-3">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-switzer font-medium text-xl text-white uppercase">
                Brief Sent To Directorial Team
              </h4>
              <p className="font-dmsans text-xs text-white/50 mt-1 mb-4">
                We review every mandate personally and revert within 48h.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-mono text-accent underline uppercase tracking-wider"
              >
                Transmit another note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  required
                  placeholder="Your Name / Brand"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-accent rounded-none"
                />
                <input
                  type="email"
                  required
                  placeholder="Work Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-accent rounded-none"
                />
              </div>

              <div>
                <select
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full px-4 py-3 bg-black/60 border border-white/15 text-white text-xs font-mono focus:outline-none focus:border-accent rounded-none"
                >
                  <option value="Brand Film">01 — Brand Film</option>
                  <option value="Performance UGC">02 — Performance &amp; UGC</option>
                  <option value="Product Packshots">03 — Product Films &amp; Stills</option>
                  <option value="AI Micro-Drama">04 — AI Micro-Drama</option>
                  <option value="Growth Mandate">05 — Full Growth Mandate</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-accent hover:bg-accent-hover text-black font-switzer font-medium text-xs uppercase tracking-widest rounded-none border border-accent transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? "TRANSMITTING..." : "SUBMIT BRIEF → 48H SLA"}</span>
              </button>
            </form>
          )}

          {/* Microcopy */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-[10px] font-mono text-white/30 uppercase tracking-widest">
            <span>CONCEPT + FIXED QUOTE IN 48 HOURS</span>
            <span>INR &amp; USD</span>
            <span>WORLDWIDE EXECUTION</span>
          </div>
        </div>
      </div>
    </section>
  );
}
