"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import GlassSurface from "./GlassSurface";

const DESKTOP_LINKS = [
  { label: "CLIENTS", href: "#clients" },
  { label: "PROJECTS", href: "#work" },
  { label: "SERVICES", href: "#services" },
  { label: "PROCESS", href: "#process" },
  { label: "CASE STUDIES", href: "/case-studies" },
  { label: "CONTACT", href: "#contact" },
];

const MOBILE_LINKS = [
  { label: "HOME", href: "/#hero" },
  { label: "CLIENTS", href: "#clients" },
  { label: "PROJECTS", href: "#work" },
  { label: "SERVICES", href: "#services" },
  { label: "PROCESS", href: "#process" },
  { label: "CASE STUDIES", href: "/case-studies" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

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

  // Lock body scroll when mobile drawer is open
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
    if (href === "/#hero" || href === "#hero" || href === "#") {
      if (typeof window !== "undefined") {
        if (window.location.pathname === "/" || window.location.pathname === "") {
          const heroElem = document.getElementById("hero");
          if (heroElem) {
            heroElem.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        } else {
          window.location.href = "/#hero";
        }
      }
      return;
    }
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 pointer-events-none ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="w-full px-6 sm:px-10 pt-6 sm:pt-8 flex items-start justify-between">
          {/* Top Left: Desktop Vertical Stacked Links */}
          <div className="hidden md:flex flex-col gap-1 pointer-events-auto">
            {DESKTOP_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(href);
                }}
                onMouseEnter={(e) => e.currentTarget.classList.remove("is-leaving")}
                onMouseLeave={(e) => {
                  const target = e.currentTarget;
                  target.classList.add("is-leaving");
                  setTimeout(() => target.classList.remove("is-leaving"), 400);
                }}
                className="c-animatedLink js-animatedLink w-fit font-secondary font-semibold text-[11px] lg:text-[14px] font-bold hover:text-white transition-colors uppercase leading-tight select-none pb-0.5 text-white"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Center on Desktop / Left on Mobile: Actual Logo */}
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6 pointer-events-auto flex items-center">
            <a
              href="/#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/#hero");
              }}
              className="group block select-none cursor-pointer"
              aria-label="Cluvion"
            >
              <div>
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

          {/* Top Right: CTA Button redirecting to Cal.com & Mobile Hamburger Menu Button */}
          <div className="flex items-center gap-2.5 sm:gap-3 pointer-events-auto ml-auto md:ml-0">
            {/* CTA Button */}
            <GlassSurface
              as="div"
              borderRadius={9999}
              height="auto"
              width="auto"
              brightness={25}
              backgroundOpacity={0.10}
              saturation={1.2}
              distortionScale={-120}
              className="group p-[4px] sm:p-[5px] border border-white/20 hover:border-white/40 cursor-pointer transition-colors duration-300"
              style={{ display: "inline-flex" }}
            >
              <a
                href="https://cal.com/cluvion/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  relative rounded-full
                  px-4 sm:px-7 py-1.5 sm:py-2.5
                  hover:bg-transparent bg-white
                  text-black hover:text-white
                  font-secondary font-medium text-[11px] sm:text-sm tracking-tight
                  transition-all duration-300
                  cursor-pointer select-none
                  whitespace-nowrap inline-flex items-center justify-center
                "
              >
                Book A 15-Min Call
              </a>
            </GlassSurface>

            {/* Mobile Hamburger Menu Button (placed after CTA button) */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close Navigation Menu" : "Open Navigation Menu"}
              className="md:hidden flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer active:scale-95"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Navigation Drawer ── */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 md:hidden ${
          open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        {/* Dim backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Right Slide Drawer Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[82%] max-w-sm bg-[#08080B] border-l border-white/15 shadow-2xl flex flex-col justify-between p-6 sm:p-8 z-10 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Top Header: Title + Close Button */}
          <div className="flex items-center justify-between w-full pb-4 border-b border-white/10">
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">
              Navigation
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-4 my-auto py-6">
            {MOBILE_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(href);
                }}
                className="group flex items-center justify-between text-2xl sm:text-3xl font-primary uppercase tracking-tight text-white/90 hover:text-white transition-colors"
              >
                <span>{label}</span>
                <span className="text-xs font-mono text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  //
                </span>
              </a>
            ))}
          </nav>

          {/* Drawer Footer */}
          <div className="pt-4 border-t border-white/10 text-[11px] font-mono text-white/40 uppercase tracking-wider flex items-center justify-between">
            <span>CLUVION STUDIO</span>
            <span className="text-accent">2026</span>
          </div>
        </div>
      </div>
    </>
  );
}
