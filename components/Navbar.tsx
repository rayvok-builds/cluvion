"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import GlassSurface from "./GlassSurface";

const DESKTOP_LINKS = [
  { label: "CLIENTS", href: "#clients" },
  { label: "PROJECTS", href: "#work" },
  { label: "SERVICES", href: "#services" },
  { label: "PROCESS", href: "#process" },
  { label: "CASE STUDIES", href: "/case-studies" },
  { label: "CONTACT", href: "#contact" },
];

export default function Navbar() {
  const [visible, setVisible] = useState(false);

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

  const handleNavClick = (href: string) => {
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

        {/* Top Right: CTA Button redirecting to Cal.com */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto ml-auto md:ml-0">
          <GlassSurface
            as="div"
            borderRadius={9999}
            height="auto"
            width="auto"
            brightness={25}
            backgroundOpacity={0.10}
            saturation={1.2}
            distortionScale={-120}
            className="group p-[4px] sm:p-[5px] border border-white/20 hover:
            border-white/40 cursor-pointer transition-colors duration-300"
            style={{ display: "inline-flex" }}
          >
            <a
              href="https://cal.com/cluvion/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative rounded-full
                px-5 sm:px-7 py-2 sm:py-2.5
                hover:bg-transparent bg-white
                text-black hover:text-white
                font-secondary font-medium text-xs sm:text-sm tracking-tight
                transition-all duration-300
                cursor-pointer select-none
                whitespace-nowrap inline-flex items-center justify-center
              "
            >
              Book A 15-Min Call
            </a>
          </GlassSurface>
        </div>
      </div>
    </header>
  );
}
