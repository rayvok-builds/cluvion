"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X , Menu  } from "lucide-react";
import GlassSurface from "./GlassSurface";

const NAV_LINKS = [
  { label: "HOME", href: "/#hero" },
  { label: "CLIENTS", href: "#clients" },
  { label: "PROJECTS", href: "#work" },
  { label: "SERVICES", href: "#services" },
  { label: "PROCESS", href: "#process" },
  { label: "CASE STUDIES", href: "/case-studies" },
  { label: "CONTACT", href: "#contact" },
];

const DESKTOP_LINKS = [
  { label: "CLIENTS", href: "#clients" },
  { label: "PROJECTS", href: "#work" },
  { label: "SERVICES", href: "#services" },
  { label: "PROCESS", href: "#process" },
  { label: "CASE STUDIES", href: "/case-studies" },
  { label: "CONTACT", href: "#contact" },
];

/* ── Custom 2-line hamburger icon ── */
function TwoLineHamburger({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line x1="0" y1="2" x2="22" y2="2" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="0" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function Navbar() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Preloader visibility
  useEffect(() => {
    const handleComplete = () => setTimeout(() => setVisible(true), 150);
    window.addEventListener("preloaderComplete", handleComplete);
    const timer = setTimeout(() => setVisible(true), 4000);
    return () => {
      window.removeEventListener("preloaderComplete", handleComplete);
      clearTimeout(timer);
    };
  }, []);

  // Body scroll lock when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Collapse nav links after scrolling past hero
  useEffect(() => {
    const check = () => {
      const threshold = window.innerHeight * 0.8;
      setCollapsed(window.scrollY > threshold);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href === "/#hero" || href === "#hero" || href === "#") {
      if (window.location.pathname === "/" || window.location.pathname === "") {
        const el = document.getElementById("hero");
        el ? el.scrollIntoView({ behavior: "smooth" }) : window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.location.href = "/#hero";
      }
      return;
    }
    if (href.startsWith("/")) { window.location.href = href; return; }
    const el = document.querySelector(href);
    el ? el.scrollIntoView({ behavior: "smooth" }) : (window.location.href = `/${href}`);
  };

  return (
    <>
      <header
        style={{ zIndex: 40 }}
        className={`fixed top-0 left-0 right-0 transition-all duration-700 pointer-events-none ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
        }`}
      >
        <div className="w-full px-6 sm:px-10 pt-6 sm:pt-8 flex items-start justify-between">

          {/* ── Top Left: Expanded links (hero) → 2-line hamburger (past hero) ── */}
          <div className="hidden md:block pointer-events-auto" style={{ minWidth: 90, position: "relative" }}>

            {/* Expanded vertical links — visible in hero with rich hover effects */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
                transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                opacity: collapsed ? 0 : 1,
                transform: collapsed ? "translateX(-12px) scale(0.9)" : "translateX(0) scale(1)",
                pointerEvents: collapsed ? "none" : "auto",
                visibility: collapsed ? "hidden" : "visible",
              }}
            >
              {DESKTOP_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="hero-nav-link w-fit font-secondary font-semibold text-[11px] lg:text-[14px] uppercase leading-tight select-none cursor-pointer"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* 2-line hamburger — visible past hero, no bg/border */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                opacity: collapsed ? 1 : 0,
                transform: collapsed ? "translateX(0) scale(1)" : "translateX(-12px) scale(0.85)",
                pointerEvents: collapsed ? "auto" : "none",
                visibility: collapsed ? "visible" : "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open Navigation Menu"
                className="flex items-center justify-center cursor-pointer bg-transparent border-none p-0 outline-none hover:opacity-70 transition-opacity"
                style={{ background: "none", border: "none" }}
              >
                <TwoLineHamburger />
              </button>
            </div>
          </div>

          {/* ── Center: Logo ── */}
          <div className="md:absolute md:left-1/2 md:-translate-x-1/2 md:top-6 pointer-events-auto flex items-center">
            <a
              href="/#hero"
              onClick={(e) => { e.preventDefault(); handleNavClick("/#hero"); }}
              className="group block select-none cursor-pointer"
              aria-label="Cluvion"
            >
              <Image
                src="/logo.webp"
                alt="Cluvion"
                width={34}
                height={34}
                className="w-7 h-7 sm:w-8 sm:h-8 object-contain"
                priority
              />
            </a>
          </div>

          {/* ── Right: CTA + Mobile hamburger (mobile only) ── */}
          <div className="flex items-center gap-2.5 sm:gap-3 pointer-events-auto ml-auto md:ml-0">
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
                className="relative rounded-full px-4 sm:px-7 py-1.5 sm:py-2.5 hover:bg-transparent bg-white text-black hover:text-white font-secondary font-medium text-[11px] sm:text-sm tracking-tight transition-all duration-300 cursor-pointer select-none whitespace-nowrap inline-flex items-center justify-center"
              >
                Book A 15-Min Call
              </a>
            </GlassSurface>

            {/* Mobile-only hamburger (2 lines) */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close Navigation Menu" : "Open Navigation Menu"}
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all cursor-pointer active:scale-95"
            >
              {open
                ? <X className="w-4 h-4" />
                : <Menu className="w-4 h-4" />
              }
            </button>
          </div>
        </div>
      </header>

      {/* ── Slide-in Drawer — works on BOTH desktop and mobile ── */}
      <div
        style={{ zIndex: 50 }}
        className={`fixed inset-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "pointer-events-auto visible opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        {/* Dim backdrop with blur */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Right slide-in drawer panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-[85%] max-w-sm sm:max-w-md bg-[#08080B]/95 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col justify-between p-6 sm:p-10 z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div
            className="flex items-center justify-between w-full pb-4 border-b border-white/10 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-12px)",
              transitionDelay: open ? "100ms" : "0ms",
            }}
          >
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">Navigation</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-colors cursor-pointer active:scale-95"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation links — staggered entrance coming one by one */}
          <nav className="flex flex-col gap-3.5 sm:gap-4 my-auto py-6">
            {NAV_LINKS.map(({ label, href }, index) => (
              <div
                key={label}
                style={{
                  opacity: open ? 1 : 0,
                  transform: open ? "translateX(0)" : "translateX(36px)",
                  transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: open ? `${120 + index * 50}ms` : "0ms",
                }}
              >
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="group flex items-center justify-between text-2xl sm:text-3xl lg:text-4xl font-primary uppercase tracking-tight text-white/70 hover:text-white transition-all duration-300 hover:translate-x-2 select-none"
                >
                  <span className=" hero-nav-link w-fit transition-colors duration-300">{label}</span>
                
                </a>
              </div>
            ))}
          </nav>

          {/* Drawer footer */}
          <div
            className="pt-4 border-t border-white/10 text-[11px] font-mono text-white/40 uppercase tracking-wider flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(12px)",
              transitionDelay: open ? `${120 + NAV_LINKS.length * 50}ms` : "0ms",
            }}
          >
           
          </div>
        </div>
      </div>
    </>
  );
}
