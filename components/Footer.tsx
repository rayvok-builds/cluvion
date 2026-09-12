"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useFilm } from "./FilmContext";
import { ArrowUp, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const { openProjectModal } = useFilm();
  const [istTime, setIstTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setIstTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050608] text-white pt-16 pb-12">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Top Tier: Multi-column Links & Location Info (Matching Screenshot Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/[0.08]">
          
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 flex items-center justify-center bg-black">
                <Image
                  src="/logo.webp"
                  alt="CLUVION"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="font-primary font-bold text-xl tracking-[0.2em] uppercase">
                CLUVION
              </span>
            </div>
            <p className="font-secondary text-xs sm:text-sm text-cinema-muted uppercase tracking-wider mb-4">
              The AI Film House
            </p>
            <p className="font-secondary text-xs text-cinema-dim max-w-sm leading-relaxed">
              Boutique cinematic production for brands that think in cinema. Produced frame-by-frame without physical sets, crews, or flights.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cinema-dim block mb-4">
              INDEX
            </span>
            <ul className="space-y-2.5 font-secondary text-xs sm:text-sm text-cinema-muted">
              {[
                { label: "Clients", href: "#clients" },
                { label: "Projects", href: "#work" },
                { label: "Services", href: "#services" },
                { label: "Process", href: "#process" },
                { label: "Case Studies", href: "/case-studies" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onMouseEnter={(e) => e.currentTarget.classList.remove("is-leaving")}
                    onMouseLeave={(e) => {
                      const target = e.currentTarget;
                      target.classList.add("is-leaving");
                      setTimeout(() => target.classList.remove("is-leaving"), 400);
                    }}
                    className="c-animatedLink js-animatedLink hover:text-white transition-colors pb-0.5"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Channels & Live Location */}
          <div className="lg:col-span-4">
            <span className="text-[11px] font-mono uppercase tracking-widest text-cinema-dim block mb-4">
              CHANNELS &amp; HUB
            </span>
            <div className="space-y-3 font-secondary text-xs sm:text-sm text-cinema-muted mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-white text-xs">
                  Jodhpur, IST [{istTime || "16:00:00"}] → Worldwide
                </span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-cinema-muted pt-2">
                {[
                  { label: "Instagram", href: "https://instagram.com" },
                  { label: "YouTube", href: "https://youtube.com" },
                  { label: "WhatsApp", href: "https://wa.me/919999999999" },
                  { label: "LinkedIn", href: "https://linkedin.com" },
                ].map((item, i, arr) => (
                  <span key={item.label} className="inline-flex items-center gap-4">
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={(e) => e.currentTarget.classList.remove("is-leaving")}
                      onMouseLeave={(e) => {
                        const target = e.currentTarget;
                        target.classList.add("is-leaving");
                        setTimeout(() => target.classList.remove("is-leaving"), 400);
                      }}
                      className="c-animatedLink js-animatedLink hover:text-white transition-colors pb-0.5"
                    >
                      {item.label}
                    </a>
                    {i < arr.length - 1 && <span className="text-cinema-dim">·</span>}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={scrollToTop}
              onMouseEnter={(e) => e.currentTarget.classList.remove("is-leaving")}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.classList.add("is-leaving");
                setTimeout(() => target.classList.remove("is-leaving"), 400);
              }}
              className="c-animatedLink js-animatedLink inline-flex items-center gap-2 text-xs font-mono text-cinema-dim hover:text-white transition-colors pb-0.5"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom Giant Brand Wordmark (Matching Screenshot: Massive Bottom Typography) */}
        <div className="pt-10 sm:pt-14 pb-6 overflow-hidden select-none">
          <div className="font-primary font-bold text-6xl sm:text-9xl md:text-[12rem] lg:text-[15rem] tracking-tight uppercase text-white/[0.12] hover:text-white/[0.22] transition-colors leading-none text-center">
            CLUVION
          </div>
        </div>

        {/* Copyright Line (Exact Copy: © 2026 Cluvion) */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-secondary text-cinema-dim border-t border-white/[0.04]">
          <span>© 2026 Cluvion — The AI Film House</span>
          <span className="mt-2 sm:mt-0 font-mono text-[11px]">
            CINEMA WITHOUT CAMERAS
          </span>
        </div>

      </div>
    </footer>
  );
}
