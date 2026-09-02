"use client";

import { MARQUEE_CLIENTS } from "../lib/data";

export default function ClientMarquee() {
  return (
    <div className="w-full bg-[#090A0D] border-y border-white/[0.08] py-5 overflow-hidden relative z-20">
      {/* Subtle edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#090A0D] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#090A0D] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max animate-marquee">
        {MARQUEE_CLIENTS.concat(MARQUEE_CLIENTS).map((client, idx) => {
          const isPlaceholder = client === "[CLIENT]";
          return (
            <div
              key={idx}
              className="flex items-center gap-8 mx-6 shrink-0 select-none group"
            >
              {isPlaceholder ? (
                <span className="px-3 py-1 text-xs tracking-widest font-secondary uppercase text-cinema-dim border border-dashed border-white/20 rounded bg-white/[0.02] group-hover:border-accent/40 group-hover:text-cinema-muted transition-colors">
                  [CLIENT]
                </span>
              ) : (
                <span className="font-primary font-bold text-sm md:text-base tracking-[0.25em] text-white/70 uppercase group-hover:text-accent transition-colors">
                  {client}
                </span>
              )}
              <span className="text-white/20 text-xs select-none">·</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

