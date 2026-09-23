"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import GradualBlur from "../../components/GradualBlur";
import { CalculatorWizard } from "../../components/calculator/CalculatorWizard";

export default function PricingPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#050608] text-[#F4F4F6] overflow-x-clip">
      {/* 00 · Top Film-House Navbar */}
      <Navbar defaultCollapsed />

      

      <div className="relative z-10">
        {/* ─── Calculator Single Page Stack ───────────────────────────── */}
        <section className="w-full pt-32 sm:pt-40 pb-20 sm:pb-28 px-4 sm:px-12 lg:px-16 flex justify-center sm:justify-start">
          <CalculatorWizard />
        </section>

        {/* ─── Studio Footer ─────────────────────────────────────────── */}
        <Footer />

        {/* Gradual Blur at bottom */}
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
