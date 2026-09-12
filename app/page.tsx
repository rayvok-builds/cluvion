import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ClientGrid from "../components/ClientGrid";
import WorkGrid from "../components/WorkGrid";
import WhatWeDo from "../components/WhatWeDo";
import HowWeWork from "../components/HowWeWork";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import GradualBlur from "../components/GradualBlur";

export default function Home() {
  return (
    <main className="relative w-full bg-[#050608] text-[#F4F4F6] overflow-x-clip">
      {/* 00 · Top Film-House Navbar */}
      <Navbar />

      {/* 01 · Hero Section: Fixed/Pinned Fullscreen Cinema */}
      <div className="fixed top-0 left-0 w-full h-screen z-0">
        <Hero />
      </div>

      {/* Spacer that occupies the hero's height in document flow */}
      <div className="h-screen w-full" aria-hidden="true" />

      {/* Scrollable content — sits above the fixed hero */}
      <div className="relative z-10 bg-[#050608]">
        {/* 02 · Selected Clients: Editorial Credits Wall */}
        <ClientGrid />

        {/* 03 · Projects: Film Showcase Archive */}
        <WorkGrid />

        {/* 04 · Services: Cinematic Chapters */}
        <WhatWeDo />

        {/* 05 · The Process: Interactive Horizontal Pinned Experience */}
        <HowWeWork />

        {/* 06 · Final CTA: Convergence Experience */}
        <FinalCTA />

        {/* 07 · Footer: Film Studio Directory */}
        <Footer />

        {/* Gradual Blur at the bottom of the viewport */}
        <GradualBlur
          preset="page-footer"
          height="6rem"
          strength={2}
          curve="bezier"
          divCount={5}
        />
      </div>
    </main>
  );
}
