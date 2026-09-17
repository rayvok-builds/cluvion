"use client";

import { useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import GlassSurface from "./GlassSurface";

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
      className="relative w-full py-20 sm:py-28 lg:py-32 flex flex-col items-center justify-center select-none overflow-hidden "
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

        {/* Glass Surface CTA Button — outer dark glass bezel, inner white fill on hover */}
        <div className="mb-12 sm:mb-16">
          <GlassSurface
            as="div"
            borderRadius={9999}
            height="auto"
            width="auto"
            brightness={25}
            backgroundOpacity={0.10}
            saturation={1.2}
            distortionScale={-120}
            className="group p-[5px] border border-white/20 hover:border-white/40 cursor-pointer transition-colors duration-300"
            onClick={scrollToCal}
            style={{ display: "inline-flex" }}
          >
            <button
              type="button"
              onClick={scrollToCal}
              className="
                relative rounded-full
                px-8 sm:px-11 py-3.5 sm:py-4
                bg-transparent hover:bg-white
                text-white hover:text-black
                font-secondary font-medium text-base sm:text-lg tracking-tight
                transition-all duration-300
                cursor-pointer select-none
                whitespace-nowrap
              "
            >
              Book A 15-Min Call
            </button>
          </GlassSurface>
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
