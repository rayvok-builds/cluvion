"use client";

import { useState } from "react";
import { useFilm } from "./FilmContext";
import { Send, Check, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function FinalCTA() {
  const { openProjectModal } = useFilm();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [scope, setScope] = useState("Brand Film");
  const [message, setMessage] = useState("");
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

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#050608] border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Rounded Let's Talk Showcase Card (Exact Match to Screenshot) */}
        <div className="relative rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-br from-[#121319] via-[#0C0D12] to-[#07080B] border border-white/15 p-8 sm:p-14 lg:p-18 overflow-hidden shadow-2xl">
          
          {/* Background Ambient Glow */}
          <div className="absolute -right-20 -bottom-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Col: Clean White Card with Brief Input Form (Matching Screenshot) */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-white text-black rounded-2xl p-7 sm:p-9 shadow-2xl border border-white/20">
                <h3 className="font-primary font-bold text-2xl sm:text-3xl text-black uppercase tracking-tight mb-2">
                  Have a project in mind?
                </h3>
                <p className="font-secondary text-xs sm:text-sm text-neutral-600 mb-6">
                  Tell us your brand &amp; goal. Concept and fixed quote back in 48 hours.
                </p>

                {submitted ? (
                  <div className="py-8 text-center flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                      <Check className="w-6 h-6" />
                    </div>
                    <h4 className="font-primary font-bold text-xl text-black">
                      Brief Sent Successfully
                    </h4>
                    <p className="font-secondary text-xs text-neutral-600 mt-1 mb-4">
                      Our directors will review and respond within 48h.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-secondary underline text-black hover:text-accent"
                    >
                      Send another note
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name / Brand"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-100 border border-neutral-200 rounded-lg text-black text-xs sm:text-sm focus:outline-none focus:border-black font-secondary"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Work Email or Phone"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-100 border border-neutral-200 rounded-lg text-black text-xs sm:text-sm focus:outline-none focus:border-black font-secondary"
                      />
                    </div>

                    <div>
                      <select
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-100 border border-neutral-200 rounded-lg text-black text-xs sm:text-sm focus:outline-none focus:border-black font-secondary"
                      >
                        <option value="Brand Film">01 — Brand Film</option>
                        <option value="Performance UGC">02 — Performance &amp; UGC</option>
                        <option value="Product Packshots">03 — Product Films &amp; Stills</option>
                        <option value="AI Micro-Drama">04 — AI Micro-Drama</option>
                        <option value="Growth Mandate">05 — Full Growth Mandate</option>
                      </select>
                    </div>

                    <div>
                      <textarea
                        rows={3}
                        placeholder="Tell us about the project vision or timeline..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 bg-neutral-100 border border-neutral-200 rounded-lg text-black text-xs sm:text-sm focus:outline-none focus:border-black font-secondary resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-3.5 bg-black hover:bg-neutral-800 text-white font-primary font-bold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2 shadow"
                    >
                      <span>{loading ? "TRANSMITTING..." : "SUBMIT BRIEF"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Col: Giant "Let's talk." Headline + Supporting Info (Matching Screenshot) */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-4">
                10 // FINAL CALL
              </span>

              {/* Exact Copy & Big Screenshot Header */}
              <h2 className="font-primary font-bold text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-none mb-6">
                Let&apos;s talk<span className="text-accent">.</span>
              </h2>

              <div className="space-y-4 mb-8 max-w-xl">
                <p className="font-primary text-2xl sm:text-3xl text-white font-medium">
                  Got a brief? We&apos;ve got the{" "}
                  <span className="accent-italic text-accent">frames</span>.
                </p>
                <p className="font-secondary text-sm sm:text-base text-cinema-muted leading-relaxed font-light">
                  Tell us the brand and the goal. Concept and fixed quote in 48 hours · INR &amp; USD · Worldwide execution.
                </p>
              </div>

              {/* Instant WhatsApp / Schedule Connect Badge (Matching Screenshot White Pill Button) */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 text-xs font-secondary font-medium tracking-wide transition-all flex items-center gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Direct WhatsApp Channel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => openProjectModal()}
                  className="btn-primary px-6 py-2.5 rounded-full bg-accent hover:bg-white text-black font-primary font-bold text-xs uppercase tracking-wider transition-all shadow"
                >
                  Full Brief Intake
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4 text-[11px] font-mono text-cinema-dim">
                <span>48H CONCEPT SLA</span>
                <span>·</span>
                <span>ZERO LOCATION RESTRICTIONS</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
