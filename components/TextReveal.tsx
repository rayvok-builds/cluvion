"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextRevealProps {
  /** HTML Tag to render for the title container */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div" | "p" | "span";
  /** Explicit array of lines to animate individually with masks */
  lines?: string[];
  /** Or single text / React node children */
  children?: React.ReactNode;
  /** Container className */
  className?: string;
  /** ClassName applied to each inner revealed text element */
  innerClassName?: string;
  /** Optional subtitle or description paragraph to reveal below the title */
  paragraph?: React.ReactNode;
  paragraphClassName?: string;
  /** Style applied to the heading element */
  style?: React.CSSProperties;
  /** Stagger between lines in seconds (default: 0.1) */
  stagger?: number;
  /** Duration of reveal animation (default: 1.8 matching CodePen) */
  duration?: number;
  /** Initial delay (default: 0) */
  delay?: number;
  /** Whether animation triggers only once (default: false, so it re-triggers when scrolling down again) */
  once?: boolean;
  /** ScrollTrigger start position (default: "top 85%") */
  threshold?: string;
  /** If true, triggers immediately on mount without needing scroll (e.g. Hero title) */
  immediate?: boolean;
}

export default function TextReveal({
  as: Component = "h2",
  lines,
  children,
  className = "",
  innerClassName = "",
  style,
  paragraph,
  paragraphClassName = "",
  stagger = 0.1,
  duration = 1.8,
  delay = 0,
  once = false,
  threshold = "top 85%",
  immediate = false,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    // Collect all inner line spans
    const inners = container.querySelectorAll<HTMLElement>(".text-reveal-inner");
    const pEl = paragraphRef.current;

    if (inners.length === 0 && !pEl) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: delay,
        scrollTrigger: immediate
          ? undefined
          : {
              trigger: container,
              start: threshold,
              // "restart none none reset":
              // 1. onEnter (scrolling down): restarts & plays the reveal animation
              // 2. onLeave (scrolling past): stays revealed
              // 3. onEnterBack (scrolling up): stays revealed ("stuck there")
              // 4. onLeaveBack (scrolled all the way above): quietly resets offscreen
              // so when scrolling down one more time, it triggers again!
              toggleActions: once
                ? "play none none none"
                : "restart none none reset",
            },
      });

      // Animate lines up with luxury editorial ease using fromTo for perfect resets
      tl.fromTo(
        inners,
        {
          yPercent: 125,
          rotateX: 10,
          opacity: 1,
          transformOrigin: "bottom center",
        },
        {
          yPercent: 0,
          rotateX: 0,
          duration: duration,
          ease: "power4.out",
          stagger: stagger,
        }
      );

      // Animate paragraph / subtext smoothly into place
      if (pEl) {
        tl.fromTo(
          pEl,
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: duration * 0.9,
            ease: "power4.out",
          },
          stagger * Math.max(1, inners.length - 1) + 0.15
        );
      }
    }, container);

    return () => ctx.revert();
  }, [lines, children, paragraph, stagger, duration, delay, once, threshold, immediate]);

  // Determine lines to render
  const renderedLines = lines
    ? lines
    : typeof children === "string"
    ? children.split("\n").filter((l) => l.trim().length > 0)
    : null;

  return (
    <div ref={containerRef} className="relative inline-block w-full">
      {/* Title / Heading with individual masked lines */}
      <Component ref={textGroupRef as React.Ref<any>} className={className} style={style}>
        {renderedLines ? (
          renderedLines.map((line, idx) => (
            <span key={idx} className="text-reveal-line block overflow-hidden font-[inherit]">
              <span className={`text-reveal-inner block will-change-transform font-[inherit] ${innerClassName}`}>
                {line}
              </span>
            </span>
          ))
        ) : (
          <span className="text-reveal-line block overflow-hidden font-[inherit]">
            <span className={`text-reveal-inner block will-change-transform font-[inherit] ${innerClassName}`}>
              {children}
            </span>
          </span>
        )}
      </Component>

      {/* Accompanying paragraph / subtext */}
      {paragraph && (
        <div
          ref={paragraphRef}
          className={`will-change-transform ${paragraphClassName}`}
        >
          {paragraph}
        </div>
      )}
    </div>
  );
}
