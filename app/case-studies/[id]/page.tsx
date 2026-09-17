"use client";

import { use, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import FinalCTA from "../../../components/FinalCTA";
import Footer from "../../../components/Footer";
import { CASE_STUDIES, getCaseStudyById } from "../../../lib/caseStudiesData";
import { Volume2, VolumeX } from "lucide-react";

interface CaseStudyDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { id } = use(params);
  const study = getCaseStudyById(id);

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

  // Select next projects for the "Next projects." section (take next 2 distinct studies)
  const otherStudies = CASE_STUDIES.filter((c) => c.id !== study.id);
  const currentIndex = CASE_STUDIES.findIndex((c) => c.id === study.id);
  
  // Choose next 2 sequentially for smooth circular browsing
  const nextProjects = [
    CASE_STUDIES[(currentIndex + 1) % CASE_STUDIES.length],
    CASE_STUDIES[(currentIndex + 2) % CASE_STUDIES.length],
  ].filter((p) => p && p.id !== study.id);

  // Fallback if needed
  if (nextProjects.length < 2 && otherStudies.length >= 2) {
    nextProjects.push(otherStudies[0]);
  }

  return (
    <main className="relative w-full bg-[#050608] text-[#F4F4F6] min-h-screen overflow-x-clip">
      <Navbar />

      {/* ─── Hero Section: Title + Description + Specifications ───── */}
      <section className="w-full pt-32 sm:pt-40 lg:pt-44 pb-10 sm:pb-14 px-6 sm:px-10 lg:px-14">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            {/* Left Column: Big Editorial Heading */}
            <div className="lg:col-span-7 xl:col-span-7">
              <h1 className="font-primary font-bold text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] text-white tracking-tight leading-[1.06]">
                {study.client === "Stately" ? (
                  "Stately Pre launch Video"
                ) : (
                  <>
                    {study.client} {study.title}
                  </>
                )}
              </h1>
            </div>

            {/* Right Column: Paragraph + Metadata Specs Table */}
            <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between pt-1 sm:pt-2">
              <div className="space-y-4">
                <p className="font-secondary text-sm sm:text-base text-white/75 leading-relaxed">
                  {study.overview}
                </p>
                {study.challenge && (
                  <p className="font-secondary text-sm sm:text-base text-white/75 leading-relaxed">
                    {study.challenge}
                  </p>
                )}
              </div>

              {/* Spec Table matching the reference layout */}
              <div className="mt-8 sm:mt-12 border-t border-white/10">
                <div className="flex items-center justify-between py-3.5 border-b border-white/10 text-xs sm:text-sm">
                  <span className="font-secondary text-white/45">Deliverables</span>
                  <span className="font-secondary text-white font-medium text-right">
                    {study.deliverables?.[0] || "AI Product Video"}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3.5 border-b border-white/10 text-xs sm:text-sm">
                  <span className="font-secondary text-white/45">Industry</span>
                  <span className="font-secondary text-white font-medium text-right">
                    {study.category}
                  </span>
                </div>

                <div className="flex items-center justify-between py-3.5 border-b border-white/10 text-xs sm:text-sm">
                  <span className="font-secondary text-white/45">Timeline</span>
                  <span className="font-secondary text-white font-medium text-right">
                    {study.timeline || "1 Week"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ─── Main Media Feature (Rounded Cinema Display) ───────── */}
          <div className="mt-12 sm:mt-16 w-full">
            <div className="relative w-full aspect-video max-h-[760px] bg-black rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center group shadow-2xl">
              {study.videoUrl ? (
                <video
                  ref={videoRef}
                  src={study.videoUrl}
                  poster={study.posterUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className={`h-full ${
                    study.aspectRatio === "9:16"
                      ? "w-auto max-w-full object-contain mx-auto"
                      : "w-full object-cover"
                  }`}
                />
              ) : (
                <Image
                  src={study.posterUrl}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
              )}

              {/* Sound Toggle */}
              {study.videoUrl && (
                <button
                  type="button"
                  onClick={toggleSound}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  className="absolute bottom-5 right-5 z-20 flex items-center gap-2 px-3.5 py-1.5 bg-black/75 hover:bg-black/95 backdrop-blur-md border border-white/20 rounded-full text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-white/60" />
                      <span className="text-white/80">Muted</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-accent animate-pulse" />
                      <span className="text-accent font-semibold">Sound On</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* ─── Next projects. ─────────────────────────────────────── */}
          <section className="mt-20 sm:mt-32 pb-16 sm:pb-24">
            <h2 className="font-primary font-bold text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none mb-8 sm:mb-12">
              Next projects.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
              {nextProjects.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/case-studies/${proj.id}`}
                  className="group block no-underline text-inherit cursor-pointer"
                >
                  {/* Top Bar matching screenshot */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0f1013] border border-white/10 rounded-t-xl sm:rounded-t-2xl transition-colors group-hover:border-white/25">
                    <span className="font-primary font-semibold text-xs sm:text-sm text-white tracking-wide">
                      {proj.client.toLowerCase()}
                    </span>
                    <span className="font-secondary text-[11px] sm:text-xs text-white/45">
                      {proj.deliverables?.[0] || "AI Video"}
                    </span>
                  </div>

                  {/* Poster with rounded bottom */}
                  <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-b-xl sm:rounded-b-2xl border-x border-b border-white/10 bg-[#0a0b0d]">
                    <Image
                      src={proj.posterUrl}
                      alt={proj.client}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>

      {/* ─── Unified CTA & Footer ─────────────────────────────────── */}
      <FinalCTA />
      <Footer />
    </main>
  );
}
