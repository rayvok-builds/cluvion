"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";
import FinalCTA from "../../components/FinalCTA";
import Footer from "../../components/Footer";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="relative w-full bg-[#050608] text-[#F4F4F6] min-h-screen overflow-x-clip">
      <Navbar />

      <section className="relative w-full pt-36 sm:pt-44 pb-20 sm:pb-32 px-6 sm:px-12 max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-white/50 hover:text-white uppercase tracking-widest transition-colors duration-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO HOME</span>
          </Link>
        </div>

        <span className="font-mono text-xs text-accent uppercase tracking-[0.3em] block mb-3">
          [ LEGAL COMPLIANCE ]
        </span>
        <h1 className="font-primary font-bold uppercase text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-6">
          PRIVACY POLICY
        </h1>
        <p className="font-mono text-xs text-white/50 uppercase tracking-wider mb-12">
          Effective Date: January 1, 2026 · Last Updated: September 2026
        </p>

        <div className="space-y-10 font-secondary text-sm sm:text-base text-white/75 leading-relaxed border-t border-white/[0.08] pt-10">
          <div>
            <h2 className="text-xl font-bold font-primary text-white uppercase tracking-wide mb-3">
              1. Overview
            </h2>
            <p>
              Cluvion (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting the privacy and proprietary assets of our clients, partners, and visitors. This Privacy Policy details how we collect, store, safeguard, and process information obtained through our website, creative intake forms, and commercial client engagements.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-primary text-white uppercase tracking-wide mb-3">
              2. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information that you directly provide when requesting a creative consultation, submitting production briefs, or communicating with our team:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-white/70">
              <li>Contact details including your name, business email address, company name, and phone number.</li>
              <li>Brand guidelines, visual references, 3D models, and proprietary assets submitted for production estimation.</li>
              <li>Anonymous technical telemetry and analytics to optimize site performance and video streaming.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold font-primary text-white uppercase tracking-wide mb-3">
              3. Creative Asset &amp; Model Confidentiality
            </h2>
            <p>
              All proprietary brand collateral, unreleased product blueprints, and visual briefs transmitted to Cluvion are strictly confidential. We maintain strict air-gapped production workflows and never train public models on unreleased client assets without explicit, prior written authorization.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-primary text-white uppercase tracking-wide mb-3">
              4. Cookies &amp; Tracking Technologies
            </h2>
            <p>
              We use minimal essential session cookies to remember your display preferences, audio mute states, and to measure traffic metrics across our project portfolio. You may configure your browser to decline non-essential cookies at any time.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-primary text-white uppercase tracking-wide mb-3">
              5. Contact &amp; Inquiries
            </h2>
            <p>
              For questions concerning this policy or to request data erasure, contact our data protection team:
            </p>
            <div className="mt-3 p-4 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-xs text-white/80 space-y-1">
              <p><span className="text-white/40">EMAIL:</span> cluvionteam@gmail.com</p>
              <p><span className="text-white/40">STUDIO:</span> F390, Sector 57, Gurgaon, Haryana 122001, India</p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
