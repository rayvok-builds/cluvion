"use client";

import { useState } from "react";
import { useFilm } from "./FilmContext";
import { X, Check, Send, Sparkles, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export default function ProjectModal() {
  const { isProjectModalOpen, closeProjectModal, selectedCategory } = useFilm();

  const [category, setCategory] = useState(selectedCategory || "Brand Films");
  const [brandName, setBrandName] = useState("");
  const [timeline, setTimeline] = useState("Standard (7-10 Days)");
  const [budgetTier, setBudgetTier] = useState("₹2L - ₹5L ($2.5k - $6k)");
  const [contactMethod, setContactMethod] = useState("");
  const [briefNotes, setBriefNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isProjectModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#E5A93C", "#ffffff", "#8E8E98"],
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 800);
  };

  const handleWhatsAppRedirect = () => {
    const text = encodeURIComponent(
      `Hi Cluvion Team, I would like to brief a project for ${brandName || "my brand"}. Category: ${category}, Timeline: ${timeline}.`
    );
    window.open(`https://wa.me/919999999999?text=${text}`, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      {/* Container */}
      <div className="relative w-full max-w-2xl bg-[#0C0D12] border border-white/15 rounded-xl shadow-2xl p-6 sm:p-10 my-8">
        {/* Close Button */}
        <button
          onClick={closeProjectModal}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/[0.06] hover:bg-white/15 text-white/80 hover:text-white transition-colors"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/40 flex items-center justify-center text-accent mb-6">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="font-primary font-bold text-3xl sm:text-4xl text-white uppercase mb-3">
              Brief Received.
            </h3>
            <p className="font-secondary text-base text-cinema-muted max-w-md mb-8">
              Our directors will review <span className="text-white font-medium">{brandName || "your brand"}</span> and send a locked concept + fixed quote within 48 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleWhatsAppRedirect}
                className="btn-primary px-6 py-3 bg-[#25D366] text-black font-bold uppercase tracking-wider text-xs rounded-sm hover:brightness-110 transition-all font-primary flex items-center justify-center gap-2"
              >
                <span>Instant WhatsApp Connect</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={closeProjectModal}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-secondary text-xs uppercase tracking-wider rounded-sm transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-8">
              <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
                [ STUDIO INTAKE PROTOCOL ]
              </span>
              <h3 className="font-primary font-bold text-3xl sm:text-4xl text-white uppercase tracking-tight">
                Start a Project
              </h3>
              <p className="font-secondary text-xs sm:text-sm text-cinema-muted mt-2">
                Fixed quote &amp; directorial concept delivered back in 48 hours.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category selector */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-cinema-muted mb-2">
                  01 // Capability Scope
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    "Brand Films",
                    "Performance & UGC",
                    "Product Films",
                    "AI Micro-Dramas",
                    "Growth Mandate",
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-2 text-xs font-secondary text-left rounded border transition-all ${
                        category === cat
                          ? "bg-accent text-black font-semibold border-accent shadow-sm"
                          : "bg-white/[0.03] text-cinema-muted hover:text-white border-white/10"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand & Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-cinema-muted mb-2">
                    02 // Brand / Company Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Auraashè Jewels"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/15 rounded text-white text-sm focus:outline-none focus:border-accent font-secondary placeholder:text-cinema-dim"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-cinema-muted mb-2">
                    03 // Contact (WhatsApp / Email)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="contact@brand.com or +91..."
                    value={contactMethod}
                    onChange={(e) => setContactMethod(e.target.value)}
                    className="w-full px-4 py-3 bg-white/[0.04] border border-white/15 rounded text-white text-sm focus:outline-none focus:border-accent font-secondary placeholder:text-cinema-dim"
                  />
                </div>
              </div>

              {/* Timeline & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-cinema-muted mb-2">
                    04 // Target Timeline
                  </label>
                  <select
                    value={timeline}
                    onChange={(e) => setTimeline(e.target.value)}
                    className="w-full px-4 py-3 bg-[#111218] border border-white/15 rounded text-white text-sm focus:outline-none focus:border-accent font-secondary"
                  >
                    <option value="Rush (3-5 Days)">Rush (3–5 Days)</option>
                    <option value="Standard (7-10 Days)">Standard (7–10 Days)</option>
                    <option value="Campaign (14+ Days)">Campaign (14+ Days)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-cinema-muted mb-2">
                    05 // Estimated Scale
                  </label>
                  <select
                    value={budgetTier}
                    onChange={(e) => setBudgetTier(e.target.value)}
                    className="w-full px-4 py-3 bg-[#111218] border border-white/15 rounded text-white text-sm focus:outline-none focus:border-accent font-secondary"
                  >
                    <option value="₹1.5L - ₹3L ($2k - $4k)">Single Hero Film (₹1.5L–₹3L)</option>
                    <option value="₹3L - ₹6L ($4k - $8k)">Film + 10 Ad Variations (₹3L–₹6L)</option>
                    <option value="₹6L+ ($8k+) Full Campaign">Full Mandate + Meta Ads (₹6L+)</option>
                  </select>
                </div>
              </div>

              {/* Brief Notes */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-cinema-muted mb-2">
                  06 // Brief Vision (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us the story, tone, mood, or references you want us to match..."
                  value={briefNotes}
                  onChange={(e) => setBriefNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/15 rounded text-white text-sm focus:outline-none focus:border-accent font-secondary placeholder:text-cinema-dim resize-none"
                />
              </div>

              {/* Submit CTA (Primary font: Switzer) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-center text-sm font-bold tracking-[0.2em] uppercase text-black bg-accent hover:bg-white transition-all duration-300 rounded-sm shadow-[0_0_30px_rgba(229,169,60,0.3)] font-primary flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>TRANSMITTING BRIEF...</span>
                  ) : (
                    <>
                      <span>SUBMIT BRIEF FOR 48H QUOTE</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
