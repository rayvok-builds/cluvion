"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import FinalCTA from "../../components/FinalCTA";
import Footer from "../../components/Footer";
import { CASE_STUDIES } from "../../lib/caseStudiesData";

// Categories excluding Luxury Fashion and Automotive EV
const EXCLUDED_CATEGORIES = ["Luxury Fashion", "Automotive EV"];

const FILTER_CATEGORIES = [
  "ALL",
  "Haute Joaillerie",
  "Heritage Apparel",
  "D2C Performance",
  "Coastal Apparel",
  "Swiss Watchmaking",
];

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Base list: exclude removed categories
  const baseStudies = CASE_STUDIES.filter(
    (cs) => !EXCLUDED_CATEGORIES.includes(cs.category)
  );

  const filteredStudies =
    selectedCategory === "ALL"
      ? baseStudies
      : baseStudies.filter((cs) =>
          cs.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  return (
    <main className="relative w-full  min-h-screen overflow-x-clip">
      <Navbar defaultCollapsed />

      {/* ─── Header ───────────────────────────────────────────────── */}
      <section className="w-full pt-36 sm:pt-44 pb-10 px-6 sm:px-10 lg:px-14">
        <div className="max-w-screen-xl mx-auto">
          {/* Stacked column — title then subtext */}
          <div className="flex flex-col items-center gap-4 pb-10">
            <h1 className="font-primary font-bold text-[clamp(3.5rem,9vw,7.5rem)] text-white leading-none tracking-tight uppercase">
              Case Studies.
            </h1>
            <p className="font-secondary text-sm sm:text-base text-white/50 max-w-lg leading-relaxed">
              Visual storytelling, synthetic cinematography &amp; narrative
              design engineered for luxury, heritage, and high-performance
              commerce.
            </p>
          </div>

        </div>
      </section>

      {/* ─── Grid ─────────────────────────────────────────────────── */}
      <section className="w-full pb-16 sm:pb-24">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
            {filteredStudies.map((study) => (
              <Link
                key={study.id}
                href={`/case-studies/${study.id}`}
                className="group block no-underline text-inherit"
              >
                {/* Image */}
                <div
                  className="relative w-full overflow-hidden bg-[#0a0b0d]"
                  style={{ aspectRatio: "16/10" }}
                >
                  <Image
                    src={study.posterUrl}
                    alt={study.client}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03] brightness-90 group-hover:brightness-100"
                  />
                </div>

                {/* Caption — company name + what the video is about */}
                <div className=" px-5 pt-4 pb-6">
                  <p className="font-primary font-bold text-lg sm:text-xl uppercase tracking-wider text-white mb-1.5">
                    {study.client}
                  </p>
                  <p className="font-secondary text-sm text-white/55 leading-snug">
                    {study.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Unified CTA + Footer ─────────────────────────────────── */}
      <FinalCTA />
      <Footer />
    </main>
  );
}
