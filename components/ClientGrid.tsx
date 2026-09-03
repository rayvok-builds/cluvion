"use client";

const CLIENTS = [
  { name: "WISH U",          sub: "Luxury Fashion"    },
  { name: "AURAASHÈ",        sub: "Haute Joaillerie"  },
  { name: "HASTUTII CRAFT",  sub: "Heritage Apparel"  },
  { name: "[CLIENT]",        sub: "D2C Cosmetics",    placeholder: true },
  { name: "[CLIENT]",        sub: "Automotive EV",    placeholder: true },
  { name: "[CLIENT]",        sub: "Fintech & Meta",   placeholder: true },
];

export default function ClientGrid() {
  // Duplicate array so marquee loops infinitely and seamlessly
  const marqueeCards = [...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="relative w-full py-10 sm:py-14 bg-[#050608] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 mb-6">
        {/* Label — minimal, top-left */}
        <p className="font-inter font-normal text-[12px] text-white/30 tracking-widest uppercase select-none">
          Trusted by
        </p>
      </div>

      {/* Cards marquee row + edge fade masks */}
      <div className="relative w-full overflow-hidden">
        {/* Left fade mask - wide dark gradient to cover much more left */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-48 sm:w-72 md:w-96 lg:w-[460px] z-10 bg-gradient-to-r from-[#050608] via-[#050608]/95 via-35% to-transparent" />

        {/* Right fade mask */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 sm:w-56 md:w-72 z-10 bg-gradient-to-l from-[#050608] via-[#050608]/90 via-35% to-transparent" />

        {/* Infinite Left Marquee Track */}
        <div className="flex gap-3 sm:gap-4 w-max animate-marquee hover:[animation-play-state:paused] py-1">
          {marqueeCards.map((c, i) => (
            <div
              key={i}
              className={`
                flex-shrink-0 flex flex-col items-center justify-center
                w-[160px] sm:w-[190px] h-[90px] sm:h-[105px]
                rounded-none border transition-all duration-300 select-none
                ${c.placeholder
                  ? "bg-[#0A0B0E] border-white/[0.06]"
                  : "bg-[#0D0E11] border-white/[0.09] hover:border-white/20 hover:bg-[#111215]"
                }
              `}
            >
              {c.placeholder ? (
                <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">
                  [CLIENT]
                </span>
              ) : (
                <>
                  <span className="font-switzer font-medium text-[13px] tracking-[0.18em] text-white/70 uppercase">
                    {c.name}
                  </span>
                  <span className="font-inter text-[10px] text-white/25 mt-1 tracking-wide">
                    {c.sub}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
