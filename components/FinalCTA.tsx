"use client";

import { useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export default function FinalCTA() {
  const calContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "15min" });
        cal("ui", {
          theme: "dark",
          styles: {
            branding: {
              brandColor: "#ffffff",
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (err) {
        console.error("Failed to initialize Cal API", err);
      }
    })();
  }, []);

  const scrollToCal = () => {
    calContainerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 sm:py-28 lg:py-32 flex flex-col items-center justify-center select-none overflow-hidden bg-[#0A0A0C]"
    >
      {/* Background Subtle Ambience (Clean dark gradient, no distracting objects) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.03),transparent)]" />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Heading Stack: Matches user image typography */}
        <div className="space-y-3 sm:space-y-4 mb-8 sm:mb-10">
          <p className="font-secondary text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-normal tracking-tight">
            Got a brief?
          </p>

          <h2 className="font-primary font-bold uppercase tracking-tight text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none">
            WE&apos;VE GOT THE FRAMES
          </h2>

          <p className="font-secondary text-white/70 text-sm sm:text-base md:text-lg font-normal max-w-xl mx-auto pt-1">
            Tell us what you&apos;re building. We&apos;ll take it from there.
          </p>
        </div>

        {/* Glossy Dark Pill Button (Matches the reference image pill design) */}
        <div className="mb-12 sm:mb-16">
          <button
            type="button"
            onClick={scrollToCal}
            className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-secondary text-white font-medium text-base sm:text-lg tracking-tight transition-all duration-300 cursor-pointer overflow-hidden"
            style={{
              background:
                "radial-gradient(120% 120% at 50% 0%, rgba(255, 255, 255, 0.18) 0%, rgba(30, 30, 36, 0.95) 45%, rgba(10, 10, 14, 0.98) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.22)",
              boxShadow:
                "0 8px 32px -4px rgba(0, 0, 0, 0.8), inset 0 1px 1px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 1px 0 rgba(0, 0, 0, 0.6)",
            }}
          >
            {/* Top specular highlight streak */}
            <span
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Hover light wash - pure monochrome/white, NO gold */}
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.08] transition-colors duration-300 rounded-full pointer-events-none" />

            <span className="relative z-10 transition-transform duration-200 group-hover:scale-[1.02]">
              Book A 15-Min Call
            </span>
          </button>
        </div>

        {/* Embedded Cal.com Widget Card Container */}
        <div
          ref={calContainerRef}
          id="cal-embed"
          className="w-full overflow-hidden"
        >
          <div className="w-full min-h-[580px] sm:min-h-[640px] flex items-center justify-center p-1 sm:p-2">
            <Cal
              namespace="15min"
              calLink="cluvion/15min"
              style={{ width: "100%", height: "100%", minHeight: "560px", overflow: "auto" }}
              config={{
                layout: "month_view",
                theme: "dark",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
