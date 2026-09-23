"use client";

import { useEffect, useRef } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import TextReveal from "./TextReveal";
import { Button } from "./ui/Button";

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
        {/* Heading Stack: Matches user image typography with smooth masked text reveal */}
        <div className="w-full max-w-3xl mx-auto mb-8 sm:mb-10 text-center">
          <TextReveal
            as="p"
            lines={["Got a brief?"]}
            className="font-secondary text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-normal tracking-tight mb-2"
          />

          <TextReveal
            as="h2"
            lines={["WE'VE GOT THE FRAMES"]}
            className="font-primary font-bold uppercase tracking-tight text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none"
            delay={0.1}
            paragraph={
              <p className="font-secondary text-white/70 text-sm sm:text-base md:text-lg font-normal max-w-xl mx-auto pt-3 text-center">
                Tell us what you&apos;re building. We&apos;ll take it from there.
              </p>
            }
          />
        </div>

        {/* CTA Button — glass variant */}
        <div className="mb-12 sm:mb-16 flex justify-center">
          <Button
            variant="glass"
            text="Book A 15-Min Call"
            onClick={scrollToCal}
            className="px-8 sm:px-11 py-3.5 sm:py-4 text-base sm:text-lg"
          />
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
