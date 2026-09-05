import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ClientGrid from "../components/ClientGrid";
import WorkGrid from "../components/WorkGrid";
import Statement from "../components/Statement";
import WhatWeDo from "../components/WhatWeDo";
import HowWeWork from "../components/HowWeWork";
import CaseStudy from "../components/CaseStudy";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import GradualBlur from "../components/GradualBlur";

export default function Home() {
  return (
    <main className="relative w-full bg-[#050608] text-[#F4F4F6] overflow-x-clip">
      {/* 00 · Top Film-House Navbar */}
      <Navbar />

      {/* 01 · Hero Section: Minimal Fullscreen Cinema & Pixel Typography (Untouched) */}
      <Hero />

      {/* 02 · Selected Clients: Editorial Credits Wall (Untouched) */}
      <ClientGrid />

      {/* 03 · Projects: 2-Column Film Showcase Archive (Directly after Clients) */}
      <WorkGrid />

      {/* 04 · The Statement: Scroll-Driven Production System Convergence */}
      <Statement />

      {/* 05 · Services: Scroll-Triggered Cinematic Chapters */}
      <WhatWeDo />

      {/* 06 · The Process: Pinned Horizontal Timeline Experience */}
      <HowWeWork />

      {/* 07 · Featured Case Study: Production Dossier (Untouched Composition) */}
      <CaseStudy />

      {/* 08 · FAQ: Progressive Scroll-Driven Editorial Protocols */}
      <FAQ />

      {/* 09 · Final CTA: Brief Convergence Experience */}
      <FinalCTA />

      {/* 10 · Footer: Film Studio Directory */}
      <Footer />

      {/* Gradual Blur at the bottom of the viewport */}
      <GradualBlur
        preset="page-footer"
        height="6rem"
        strength={2}
        curve="bezier"
        divCount={5}
      />
    </main>
  );
}
