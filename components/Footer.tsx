"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function MailIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  // Hide the fixed viewport bottom gradual blur when the footer is in view
  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("in-footer-section", entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      document.body.classList.remove("in-footer-section");
    };
  }, []);

  const navLinks = [
    { label: "Clients", href: "/#clients" },
    { label: "Projects", href: "/#work" },
    { label: "Services", href: "/#services" },
    { label: "Process", href: "/#process" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/#contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Legal", href: "/legal" },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#050608] text-white pt-28 sm:pt-36 lg:pt-44 pb-12 sm:pb-16 overflow-hidden z-20"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        {/* Main Content: Two columns matching reference screenshot */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 sm:gap-16 pb-16">
          {/* Left Column: Explore Navigation (Matching navbar links + privacy & legal) */}
          <div className="w-full md:w-auto">
            <span className="text-sm text-[#8E8E98] font-normal block mb-4">
              Explore
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 sm:gap-x-16 gap-y-3 sm:gap-y-3.5">
              {navLinks.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="font-secondary c-animatedLink js-animatedLink w-fit  text-xl sm:text-2xl text-[#EDEDED] hover:text-white transition-colors duration-200 inline-block font-medium tracking-tight"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Address, Direct Email & Socials */}
          <div className="flex flex-col md:items-start max-w-lg">
            {/* Address */}
            <div className="mb-6 sm:mb-8">
              <span className="text-sm text-[#8E8E98] font-normal block mb-2.5">
                Address
              </span>
              <p className="font-secondary text-lg sm:text-xl text-[#EDEDED] leading-snug font-medium">
               Udaipur, Rajasthan, India
              </p>
            </div>

            {/* Email Contact */}
            <div className="mb-8 sm:mb-10">
              <span className="text-sm text-[#8E8E98] font-normal block mb-1.5">
                Email
              </span>
              <a
                href="mailto:cluvionteam@gmail.com"
                className="font-secondary text-base sm:text-lg text-[#EDEDED] hover:text-white transition-colors duration-200 font-medium underline underline-offset-4 decoration-white/30 hover:decoration-white"
              >
                cluvionteam@gmail.com
              </a>
            </div>

            {/* Socials: Instagram, X, LinkedIn, Email */}
            <div>
              <span className="text-sm text-[#8E8E98] font-normal block mb-3">
                Socials
              </span>
              <div className="flex items-center gap-5 text-white/90">
                <a
                  href="https://www.instagram.com/cluvion?igsh=eGZzMjdiejF6dGRq&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:text-white transition-all duration-200 hover:scale-110 p-0.5"
                >
                  <InstagramIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </a>
                <a
                  href="https://x.com/cluvion?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="hover:text-white transition-all duration-200 hover:scale-110 p-0.5"
                >
                  <XIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/company/cluvionagency/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-white transition-all duration-200 hover:scale-110 p-0.5"
                >
                  <LinkedinIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </a>
                <a
                  href="mailto:cluvionteam@gmail.com"
                  aria-label="Email"
                  className="hover:text-white transition-all duration-200 hover:scale-110 p-0.5"
                >
                  <MailIcon className="w-6 h-6 sm:w-7 sm:h-7" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Info Bar: Placed ABOVE the bottom CLUVION wordmark so it is 100% visible */}
        <div className="pt-8 pb-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-secondary text-[#8E8E98]">
          <div className="flex items-center gap-2">
            <span>© 2026 Cluvion. All rights reserved.</span>
          </div>
       

          <div>
            <a
              href="https://rayvok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#8E8E98] hover:text-white transition-colors duration-200 group"
            >
              <span>Website by</span>
              <span className="font-semibold c-animatedLink js-animatedLink w-fit text-[#EDEDED] group-hover:text-[#C9FE34]  decoration-white/30 hover:decoration-white transition-colors">
                RAYVOK
              </span>
            </a>
          </div>
        </div>

        {/* Bottom Giant Brand Wordmark: In last the bottom, add the CLUVION text */}
        <div className="pt-6 sm:pt-10 pb-4 overflow-hidden select-none pointer-events-none sm:pointer-events-auto">
          <div className="font-primary font-bold text-6xl sm:text-9xl md:text-[13rem] lg:text-[17rem] tracking-tight uppercase text-white/[0.12] hover:text-white/[0.22] transition-colors leading-none text-center">
            CLUVION
          </div>
        </div>
      </div>
    </footer>
  );
}
