"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useFilm } from "./FilmContext";

const DESKTOP_LINKS = [
  { label: "WORK", href: "#work" },
  { label: "SERVICES", href: "#services" },
  { label: "ABOUT", href: "#about" },
  { label: "BTS", href: "#process" },
];

const DRAWER_LINKS = [
  { label: "HOME", href: "#" },
  { label: "WORK", href: "#work" },
  { label: "SERVICES", href: "#services" },
  { label: "ABOUT", href: "#about" },
  { label: "BTS", href: "#process" },
  { label: "CONTACT", href: "#contact" },
];

const SOCIAL_LINKS = [
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "VIMEO", href: "https://vimeo.com" },
  { label: "LINKEDIN", href: "https://linkedin.com" },
  { label: "FACEBOOK", href: "https://facebook.com" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { openProjectModal } = useFilm();

  useEffect(() => {
    const handleComplete = () => {
      setTimeout(() => setVisible(true), 150);
    };

    window.addEventListener("preloaderComplete", handleComplete);
    const timer = setTimeout(() => setVisible(true), 4000);

    return () => {
      window.removeEventListener("preloaderComplete", handleComplete);
      clearTimeout(timer);
    };
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href === "#contact") {
      openProjectModal();
      return;
    }
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* ── Fixed Floating Top Bar (Matching Screenshots 1 & 3) ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 pointer-events-none ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="w-full px-6 sm:px-10 pt-6 sm:pt-8 flex items-start justify-between">
          {/* Top Left: Desktop Vertical Stacked Links (Screenshot 1) */}
          <div className="hidden md:flex flex-col gap-1 pointer-events-auto">
            {DESKTOP_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(href);
                }}
                className="font-secondary font-semibold text-[11px] lg:text-[12px] tracking-[0.18em] text-white/80 hover:text-white transition-colors uppercase leading-tight select-none"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Center on Desktop / Left on Mobile: Actual Logo */}
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6 pointer-events-auto flex items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group block select-none"
              aria-label="Cluvion"
            >
              <div className="">
                <Image
                  src="/logo.webp"
                  alt="Cluvion"
                  width={34}
                  height={34}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                  priority
                />
              </div>
            </a>
          </div>

          {/* Top Right: Buttons [LET'S TALK] and [MENU] */}
          <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto ml-auto md:ml-0">
            {/* LET'S TALK Button */}
            <button
              type="button"
              onClick={() => openProjectModal()}
              className="px-3.5 sm:px-4 py-1.5 rounded-[3px] bg-black/45 hover:bg-white/15 border border-white/30 hover:border-white/60 text-white font-secondary font-medium text-[11px] sm:text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-200"
            >
              LET&apos;S TALK
            </button>

            {/* MENU Button */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="px-3.5 sm:px-4 py-1.5 rounded-[3px] bg-black/45 hover:bg-white/15 border border-white/30 hover:border-white/60 text-white font-secondary font-medium text-[11px] sm:text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-200"
              aria-label="Open menu"
            >
              MENU
            </button>
          </div>
        </div>
      </header>

      {/* ── Slide-Out Menu Drawer (Matching Screenshot 2) ── */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-400 ${
          open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        {/* Dim backdrop to the left of the drawer */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-400 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Right Drawer Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-full sm:w-[80%] md:w-[50%] lg:w-[40%] bg-[#08080B] border-l border-white/15 shadow-2xl flex flex-col justify-between p-6 sm:p-10 lg:p-12 z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Top Bar: [LET'S TALK] + [CLOSE] */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 w-full">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openProjectModal();
              }}
              className="px-3.5 sm:px-4 py-1.5 rounded-[3px] bg-black/45 hover:bg-white/15 border border-white/30 hover:border-white/60 text-white font-secondary font-medium text-[11px] sm:text-xs uppercase tracking-wider backdrop-blur-md transition-all duration-200"
            >
              LET&apos;S TALK
            </button>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-3.5 sm:px-4 py-1.5 rounded-[3px] bg-white hover:bg-white/90 border border-white text-black font-secondary font-semibold text-[11px] sm:text-xs uppercase tracking-wider shadow-sm transition-all duration-200"
              aria-label="Close menu"
            >
              CLOSE
            </button>
          </div>

          {/* Drawer Links in Huge Condensed Font */}
          <nav className="flex flex-col gap-3 sm:gap-4 my-auto py-8">
            {DRAWER_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(href);
                }}
                className="group flex items-center justify-between text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-primary uppercase tracking-tight text-white/90 hover:text-accent transition-colors leading-[0.95] select-none"
              >
                <span>{label}</span>
                <span className="text-sm sm:text-base font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                  //
                </span>
              </a>
            ))}
          </nav>

          {/* Drawer Footer Socials */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-mono uppercase text-white/60 tracking-wider select-none">
            <span className="text-white/40 font-semibold">SOCIALS:</span>
            {SOCIAL_LINKS.map((item, idx) => (
              <span key={item.label} className="inline-flex items-center">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {item.label}
                </a>
                {idx < SOCIAL_LINKS.length - 1 && (
                  <span className="text-white/30 ml-2 mr-1">,</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
