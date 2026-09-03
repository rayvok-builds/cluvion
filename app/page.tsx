import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ClientGrid from "../components/ClientGrid";
import Statement from "../components/Statement";
import WhatWeDo from "../components/WhatWeDo";
import HowWeWork from "../components/HowWeWork";
import CaseStudy from "../components/CaseStudy";
import WorkGrid from "../components/WorkGrid";
import ImpossibleShot from "../components/ImpossibleShot";
import QualityControl from "../components/QualityControl";
import WhyItWorks from "../components/WhyItWorks";
import TasteManifesto from "../components/TasteManifesto";
import Numbers from "../components/Numbers";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import GradualBlur from "../components/GradualBlur";

export default function Home() {
  return (
    <main className="relative w-full bg-[#050608] text-[#F4F4F6] overflow-x-clip">
      {/* 00 · Top Film-House Navbar */}
      <Navbar />

      {/* 01 · Hero Section: Minimal Fullscreen Cinema & Pixel Typography */}
      <Hero />

      {/* 02 · Selected Clients: Editorial Credits Wall with Hover Previews */}
      <ClientGrid />

      {/* 03 · The Statement: Brutalist Typographic Manifesto */}
      <Statement />

      {/* 04 · Services: Interactive Production Console (5 Visual Modes) */}
      <WhatWeDo />

      {/* 05 · The Process: From Idea to Frame Production Timeline */}
      <HowWeWork />

      {/* 06 · Selected Work: Featured Client Production Dossier */}
      <CaseStudy />

      {/* 06.2 · 2-Column Film Showcase Archive */}
      <WorkGrid />

      {/* 07 · The Impossible Shot: Layer Deconstruction Reveal */}
      <ImpossibleShot />

      {/* 08 · Quality Control: Studio Inspection HUD */}
      <QualityControl />

      {/* 09 · Why Cluvion: "The Signal" Connected Intelligence System */}
      <WhyItWorks />

      {/* 10 · The Taste Manifesto: Huge Typographic Statement */}
      <TasteManifesto />

      {/* 11 · Investments: Transparent Minute-Based Cost Model */}
      <Numbers />

      {/* 12 · FAQ: Minimal Editorial Policy List */}
      <FAQ />

      {/* 13 · Final CTA: "The Frame" Brief Convergence Experience */}
      <FinalCTA />

      {/* 14 · Footer: Film Studio Directory with Live IST Clock */}
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
