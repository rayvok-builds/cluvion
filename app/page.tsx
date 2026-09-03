import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ClientGrid from "../components/ClientGrid";
import WorkGrid from "../components/WorkGrid";
import Statement from "../components/Statement";
import Numbers from "../components/Numbers";
import WhatWeDo from "../components/WhatWeDo";
import HowWeWork from "../components/HowWeWork";
import CaseStudy from "../components/CaseStudy";
import WhyItWorks from "../components/WhyItWorks";
import FAQ from "../components/FAQ";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import GradualBlur from "../components/GradualBlur";

export default function Home() {
  return (
    <main className="relative w-full bg-[#050608] text-[#F4F4F6] overflow-x-clip">
      {/* Top Film-House Navbar */}
      <Navbar />

      {/* 01 · Hero Section with Rounded Bottom Stage & Giant Typography */}
      <Hero />

      {/* 01.2 · Client Cards Grid & Awards Accolades */}
      <ClientGrid />

      {/* 02 · Projects Section: 2-Column Showcase */}
      <WorkGrid />

      {/* 03 · The Statement: Full-viewport type only */}
      <Statement />

      {/* 05 · Services / Capabilities Section */}
      <WhatWeDo />

      {/* 06 · How We Work: 4 Code-Labelled Steps */}
      <HowWeWork />

      {/* 07 · Case Study: Featured Client & Metrics */}

      {/* 04 · Numbers: Animated Counters & Shoot Calculator */}
      <Numbers />

      {/* 09 · FAQ: Accordion */}
      <FAQ />

      {/* 10 · Let's Talk: Split-card brief intake & CTA */}
      <FinalCTA />

      {/* Footer with Giant Bottom Typography */}
      <Footer />

      {/* Gradual Blur at the bottom of the site */}
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
