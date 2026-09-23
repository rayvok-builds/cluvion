"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";
import FinalCTA from "../../components/FinalCTA";
import Footer from "../../components/Footer";
import { ArrowLeft } from "lucide-react";

export default function LegalPage() {
  return (
    <main className="relative w-full bg-[#050608] text-[#F4F4F6] min-h-screen overflow-x-clip">
      <Navbar defaultCollapsed />

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
          [ TERMS OF SERVICE &amp; IP TERMS ]
        </span>
        <h1 className="font-primary font-bold uppercase text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-6">
          LEGAL &amp; TERMS
        </h1>
        <p className="font-mono text-xs text-white/50 uppercase tracking-wider mb-12">
          Effective Date: January 1, 2026 · Cluvion Studios
        </p>

        <div className="space-y-10 font-secondary text-sm sm:text-base text-white/75 leading-relaxed border-t border-white/[0.08] pt-10">
          <div>
            <h2 className="text-xl font-bold font-primary text-white uppercase tracking-wide mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, inquiring into our production services, or entering into a Master Services Agreement (MSA) with Cluvion, you acknowledge and agree to be bound by these Terms of Service.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-primary text-white uppercase tracking-wide mb-3">
              2. Intellectual Property &amp; Commercial Rights
            </h2>
            <p className="mb-3">
              All commissioned final video deliverables, render exports, and master masters created under executed Statements of Work (SOW) are assigned to the client upon full payment reconciliation, according to the commercial licensing terms specified in each agreement.
            </p>
            <p>
              Pre-existing models, proprietary prompt schemas, workflow pipelines, and studio showreel showcases remain the intellectual property of Cluvion.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-primary text-white uppercase tracking-wide mb-3">
              3. Representations &amp; Content Warranties
            </h2>
            <p>
              Clients warrant that all trademarks, brand assets, logos, and materials provided to Cluvion for production do not infringe on third-party copyrights or intellectual property rights. Cluvion produces cinematic synthetic media in compliance with international commercial media laws.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-primary text-white uppercase tracking-wide mb-3">
              4. Limitation of Liability
            </h2>
            <p>
              In no event shall Cluvion or its directors, employees, or partners be liable for indirect, incidental, or consequential damages resulting from website downtime or unauthorized third-party access beyond our reasonable security measures.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold font-primary text-white uppercase tracking-wide mb-3">
              5. Legal Notices &amp; Governance
            </h2>
            <p>
              These terms are governed by the laws of India. For commercial notices, legal service, or contractual clarification, contact:
            </p>
            <div className="mt-3 p-4 rounded-lg bg-white/[0.03] border border-white/10 font-mono text-xs text-white/80 space-y-1">
              <p><span className="text-white/40">LEGAL TEAM:</span> cluvionteam@gmail.com</p>
              <p><span className="text-white/40">STUDIO HEADQUARTERS:</span> F390, Sector 57, Gurgaon, Haryana 122001, India</p>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
