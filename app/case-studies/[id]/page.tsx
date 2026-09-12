"use client";

import { use, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { CASE_STUDIES, getCaseStudyById } from "../../../lib/caseStudiesData";
import { useFilm } from "../../../components/FilmContext";
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
  CheckCircle2,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface CaseStudyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { id } = use(params);
  const study = getCaseStudyById(id);
  const { openProjectModal } = useFilm();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  if (!study) {
    notFound();
  }

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Find next case study for footer navigation
  const currentIndex = CASE_STUDIES.findIndex((c) => c.id === study.id);
  const nextStudy =
    CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length];

  return (
    <main className="relative w-full bg-[#050608] text-[#F4F4F6] min-h-screen overflow-x-clip">
      <Navbar />

      {/* Top Navigation Breadcrumb */}
      <div className="pt-28 sm:pt-32 px-6 sm:px-12 max-w-7xl mx-auto flex items-center justify-between text-xs font-mono text-white/50 border-b border-white/[0.08] pb-6">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 hover:text-white transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Case Studies</span>
        </Link>
        <span className="uppercase text-accent tracking-widest">
          PROJECT REF // {study.id.toUpperCase()}
        </span>
      </div>

      {/* Hero Section: Header Details */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 pt-10 sm:pt-14 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-white/[0.06] border border-white/15 text-xs font-mono uppercase tracking-wider text-white">
                {study.category}
              </span>
              <span className="font-mono text-xs text-white/50">
                RELEASE YEAR: {study.year}
              </span>
              <span className="font-mono text-xs text-white/50">·</span>
              <span className="font-mono text-xs text-accent">
                {study.duration} DURATION
              </span>
            </div>

            <h1 className="font-primary font-bold uppercase text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-3">
              {study.client}
            </h1>
            <p className="font-secondary text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
              {study.title} — {study.subtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => openProjectModal()}
            className="px-7 py-3.5 bg-white hover:bg-accent text-black font-primary font-bold text-xs sm:text-sm uppercase tracking-[0.2em] transition-colors self-start lg:self-end shrink-0"
          >
            BRIEF SIMILAR FILM
          </button>
        </div>

        {/* ── CINEMA VIDEO PLAYER ── */}
        <div className="relative w-full aspect-video max-h-[750px] bg-black border border-white/15 overflow-hidden shadow-2xl group">
          <video
            ref={videoRef}
            src={study.videoUrl}
            poster={study.posterUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2 bg-black/70 backdrop-blur-md border border-white/20 text-white/90 hover:text-accent hover:border-accent/50 text-xs font-mono uppercase tracking-wider transition-colors"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-accent font-bold">Audio On</span>
              </>
            )}
          </button>

          {/* Video Metadata Tag */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-2 font-mono text-xs text-white/80 bg-black/70 backdrop-blur-md px-3.5 py-1.5 border border-white/15">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>4K CINEMA MASTER // {study.aspectRatio}</span>
          </div>
        </div>
      </section>

      {/* ── AUDITED PRODUCTION METRICS ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-10 sm:py-16 border-t border-white/[0.08]">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-white/[0.08]">
          <span className="font-mono text-xs text-accent uppercase tracking-[0.25em]">
            AUDITED PERFORMANCE METRICS
          </span>
          <span className="font-mono text-[11px] text-white/40 uppercase">
            VERIFIED STUDIO DOSSIER
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {study.stats.map((st) => (
            <div
              key={st.label}
              className="p-6 bg-[#08090C] border border-white/10 flex flex-col justify-between"
            >
              <span className="font-mono text-[10.5px] text-white/50 uppercase tracking-wider block mb-3">
                {st.label}
              </span>
              <span className="font-primary font-bold text-4xl sm:text-5xl text-white tracking-tight">
                {st.value}
              </span>
              <span className="font-mono text-[11px] text-accent block mt-3">
                {st.note}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── THE CHALLENGE & PIPELINE BREAKDOWN ── */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-12 sm:py-16 border-t border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16">
          {/* Left Column: The Mandate & Challenge */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              <span className="font-mono text-xs text-accent uppercase tracking-[0.25em] block mb-3">
                THE BRIEF &amp; MANDATE
              </span>
              <h2 className="font-primary font-bold uppercase text-3xl sm:text-4xl text-white tracking-tight mb-4">
                {study.mandate}
              </h2>
              <p className="font-secondary text-sm sm:text-base text-white/70 leading-relaxed mb-8">
                {study.overview}
              </p>

              <div className="p-6 bg-[#0B0C10] border border-white/10">
                <span className="font-mono text-xs text-white/50 uppercase tracking-wider block mb-2">
                  THE CRITICAL BOTTLENECK
                </span>
                <p className="font-secondary text-sm text-white/80 leading-relaxed">
                  {study.challenge}
                </p>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div>
              <span className="font-mono text-xs text-white/50 uppercase tracking-[0.25em] block mb-4">
                DELIVERABLE ASSETS
              </span>
              <ul className="space-y-3 font-mono text-xs text-white/80">
                {study.deliverables.map((del) => (
                  <li key={del} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: AI Production Pipeline */}
          <div className="lg:col-span-7">
            <span className="font-mono text-xs text-accent uppercase tracking-[0.25em] block mb-3">
              METHODOLOGY &amp; ARCHITECTURE
            </span>
            <h2 className="font-primary font-bold uppercase text-3xl sm:text-4xl text-white tracking-tight mb-8">
              AI FILM HOUSE PIPELINE
            </h2>

            <div className="space-y-6">
              {study.pipeline.map((step, idx) => (
                <div
                  key={step.title}
                  className="p-6 sm:p-8 bg-[#07080B] border border-white/10 hover:border-accent/40 transition-colors"
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="font-mono text-xs text-accent uppercase tracking-wider">
                      PHASE 0{idx + 1}
                    </span>
                    <span className="font-mono text-[10px] text-white/30">
                      SYNTHESIS PROTOCOL
                    </span>
                  </div>
                  <h3 className="font-primary font-bold text-xl sm:text-2xl text-white uppercase tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="font-secondary text-sm text-white/70 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>

            {/* Business Impact & Results */}
            <div className="mt-10 p-6 sm:p-8 bg-[#090A0E] border border-white/15">
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest block mb-4">
                AUDITED COMMERCIAL IMPACT
              </span>
              <ul className="space-y-2.5 font-secondary text-sm text-white/85">
                {study.results.map((res) => (
                  <li key={res} className="flex items-start gap-2.5">
                    <span className="text-accent font-mono font-bold">→</span>
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEXT CASE STUDY NAVIGATION ── */}
      <section className="border-t border-white/[0.08] bg-[#070709] py-16 sm:py-20 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest block mb-1">
              NEXT DOSSIER
            </span>
            <Link
              href={`/case-studies/${nextStudy.id}`}
              className="group inline-flex items-center gap-3 no-underline text-inherit"
            >
              <h3 className="font-primary font-bold text-3xl sm:text-5xl text-white uppercase tracking-tight group-hover:text-accent transition-colors">
                {nextStudy.client}
              </h3>
              <ArrowRight className="w-6 h-6 text-accent transition-transform group-hover:translate-x-2" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/case-studies"
              className="px-6 py-3 border border-white/20 hover:border-white text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              ALL CASE STUDIES
            </Link>
            <button
              type="button"
              onClick={() => openProjectModal()}
              className="px-6 py-3 bg-white hover:bg-accent text-black font-primary font-bold text-xs uppercase tracking-wider transition-colors"
            >
              START PROJECT
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
