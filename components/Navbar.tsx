"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useFilm } from "./FilmContext";

const NAV_LINKS = [
  { num: "01", label: "Work",     href: "#work"     },
  { num: "02", label: "Services", href: "#services" },
  { num: "03", label: "Process",  href: "#process"  },
  { num: "04", label: "About",    href: "#about"    },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { openProjectModal } = useFilm();

  useEffect(() => {
    const handleComplete = () => {
      // Navbar comes down first right after preloader finishes
      setTimeout(() => {
        setVisible(true);
      }, 150);
    };

    window.addEventListener("preloaderComplete", handleComplete);
    const timer = setTimeout(() => setVisible(true), 4000);

    return () => {
      window.removeEventListener("preloaderComplete", handleComplete);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* ── Top Bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-12 bg-[#050608] flex items-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="w-full px-6 sm:px-8 grid grid-cols-2 sm:grid-cols-3 items-center">
          {/* Left: ≡ Menu */}
          <button
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 group focus:outline-none w-fit"
            aria-label="Open navigation"
          >
            <Menu className="w-[18px] h-[18px] text-white/60 group-hover:text-white transition-colors" />
            <span className="text-[13px] font-secondary tracking-wide text-white/60 group-hover:text-white transition-colors">
              Menu
            </span>
          </button>

          {/* Center / Right on Mobile: Cluvion Logo */}
          <div className="flex justify-end sm:justify-center">
            <a
              href="#"
              aria-label="Cluvion Home"
              className="opacity-80 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/logo.webp"
                alt="Cluvion"
                width={28}
                height={28}
                className="object-contain"
                priority
              />
            </a>
          </div>

          {/* Right: Book a Strategy Call (Hidden on mobile devices, desktop only) */}
          <div className="hidden sm:flex justify-end">
            <button
              onClick={() => openProjectModal()}
              className="text-[13px] font-secondary tracking-wide text-white/60 hover:text-white transition-colors focus:outline-none whitespace-nowrap"
            >
              Book a Strategy Call
            </button>
          </div>
        </div>
      </header>

      {/* ── Full-Screen Menu Overlay ── */}
      {open && (
        <div className="fixed inset-0 z-[60] bg-[#050608] flex flex-col px-8 pb-10">
          {/* Overlay top bar */}
          <div className="h-12 flex items-center justify-between flex-shrink-0">
            <span className="text-[13px] font-secondary text-white/40 tracking-wide">
              Menu
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-white/50 hover:text-white transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1 mt-10 flex-1">
            {NAV_LINKS.map(({ num, label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-5 py-4 border-b border-white/[0.06] group"
              >
                <span className="text-[11px] font-mono text-white/25 group-hover:text-accent transition-colors">
                  {num}
                </span>
                <span className="font-primary font-medium text-4xl sm:text-5xl text-white/75 group-hover:text-white transition-colors">
                  {label}
                </span>
              </a>
            ))}
          </nav>

          {/* Bottom CTA */}
          <button
            onClick={() => {
              setOpen(false);
              openProjectModal();
            }}
            className="mt-8 w-full py-4 rounded-full border border-white/20 hover:border-white/50 font-switzer font-normal text-[16px] text-white/80 hover:text-white transition-all focus:outline-none"
          >
            Book a Strategy Call
          </button>
        </div>
      )}
    </>
  );
}
