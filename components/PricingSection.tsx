"use client";

import { PricingCalculator } from "./calculator/PricingCalculator";
import TextReveal from "./TextReveal";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative w-full py-20 sm:py-28 lg:py-32 select-none overflow-hidden"
    >
      {/* Ambient background radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(229,169,60,0.04),transparent)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(255,255,255,0.015),transparent)]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-12 sm:mb-16 max-w-3xl">
          <TextReveal
            as="p"
            lines={["Estimate the cost."]}
            className="font-secondary text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white font-normal tracking-tight mb-2"
          />
          <TextReveal
            as="h2"
            lines={["AI PRODUCTION CALCULATOR"]}
            className="font-primary font-bold uppercase tracking-tight text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-none"
            delay={0.1}
            paragraph={
              <p className="font-secondary text-white/50 text-sm sm:text-base font-normal max-w-xl pt-4">
                Build your production brief — model blend, image volume, artist days, overhead —
                and get a real min/max cost range before you quote.
              </p>
            }
          />
        </div>

        {/* Calculator */}
        <PricingCalculator />
      </div>
    </section>
  );
}
