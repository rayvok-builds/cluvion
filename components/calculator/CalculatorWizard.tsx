"use client";

import React, { useState } from "react";
import { DEFAULT_CATALOG } from "./catalog-data";
import {
  DEFAULT_STEP_ONE,
  type StepOneValues,
  type Catalog,
} from "./types";
import { AllocationTable } from "./AllocationTable";
import { ImageAllocationTable } from "./ImageAllocationTable";
import { CostBreakdownTable } from "./CostBreakdownTable";
import { ProjectCostBreakdown } from "./ProjectCostBreakdown";

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
      <p className="text-base text-white/50">{description}</p>
    </div>
  );
}

function StepperField({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  allowDecimal = true,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  allowDecimal?: boolean;
}) {
  const decrement = () => {
    const next = Math.round((value - step) * 1000) / 1000;
    onChange(Math.max(min, next));
  };
  const increment = () => {
    const next = Math.round((value + step) * 1000) / 1000;
    onChange(max !== undefined ? Math.min(max, next) : next);
  };
  const display = allowDecimal ? String(value) : String(Math.round(value));

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-white/50 whitespace-nowrap">{label}</span>
      <div className="inline-flex items-center h-7 rounded border border-white/15 bg-white/[0.03]">
        <button
          type="button"
          onClick={decrement}
          className="px-2 h-full text-white/60 hover:text-white hover:bg-white/10 transition-colors rounded-l border-r border-white/10 text-xs"
        >
          −
        </button>
        <span className="min-w-[1.5rem] text-center text-xs text-white tabular-nums">
          {display}
        </span>
        <button
          type="button"
          onClick={increment}
          className="px-2 h-full text-white/60 hover:text-white hover:bg-white/10 transition-colors rounded-r border-l border-white/10 text-xs"
        >
          +
        </button>
      </div>
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  suffix,
  min = 0,
  widthClass = "w-24",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix?: string;
  min?: number;
  widthClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-white/50 whitespace-nowrap">{label}</span>
      <div className={`flex items-center h-7 rounded border border-white/15 bg-white/[0.03] px-2 ${widthClass}`}>
        <input
          type="number"
          min={min}
          value={value}
          onChange={(e) => {
            const raw = parseFloat(e.target.value);
            if (!isNaN(raw)) onChange(Math.max(min, raw));
          }}
          className="w-full bg-transparent text-white text-xs focus:outline-none tabular-nums"
        />
        {suffix && <span className="text-xs text-white/40 ml-1">{suffix}</span>}
      </div>
    </div>
  );
}

export function CalculatorWizard() {
  const catalog: Catalog = DEFAULT_CATALOG;
  const [values, setValues] = useState<StepOneValues>(DEFAULT_STEP_ONE);

  function patchValues(patch: Partial<StepOneValues>) {
    setValues((prev) => ({ ...prev, ...patch }));
  }

  return (
    <div className="w-full max-w-5xl space-y-8 text-left font-secondary">
      {/* ── Main Header ─────────────────────────────────────────── */}
      <header>
        <h1 className="text-[28px] font-semibold tracking-tight text-white">
          AI Video Cost Calculator
        </h1>
        <p className="mt-1 text-lg text-white/50">
          Sections fill in as they&rsquo;re confirmed — more land below.
        </p>
      </header>


      {/* ── Step 1: Inputs ──────────────────────────────────────── */}
      <div className="space-y-6">
        <SectionHeading
          title="Inputs"
          description="What you're building, image assumptions, and labor & overhead costs."
        />

        {/* Video & Images */}
        <div className="space-y-2">
          <div>
            <h3 className="text-2xl font-semibold text-white/90">Video &amp; Images</h3>
            <p className="text-base text-white/50">
              How long the finished video is, and how many images it needs. Credits per image come from the image model blend.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <NumberField
              label="Video Length"
              value={values.videoLengthSeconds}
              onChange={(v) => patchValues({ videoLengthSeconds: v })}
              suffix="sec"
              widthClass="w-24"
            />
            <StepperField
              label="Min Retake (×)"
              value={values.minRetake}
              onChange={(v) => patchValues({ minRetake: v })}
              min={1}
              max={values.maxRetake}
              step={1}
              allowDecimal={false}
            />
            <StepperField
              label="Max Retake (×)"
              value={values.maxRetake}
              onChange={(v) => patchValues({ maxRetake: v })}
              min={values.minRetake}
              step={1}
              allowDecimal={false}
            />
            <StepperField
              label="Images per Minute"
              value={values.imagesPerMinute}
              onChange={(v) => patchValues({ imagesPerMinute: v })}
              min={0}
              step={5}
              allowDecimal={false}
            />
          </div>
        </div>

        {/* Labor & Overhead */}
        <div className="space-y-2">
          <div>
            <h3 className="text-2xl font-semibold text-white/90">Labor &amp; overhead</h3>
            <p className="text-base text-white/50">
              Artist, editing, and software costs — not modeled by the registry.
            </p>
          </div>
          <div className="flex flex-wrap items-end gap-3">
            <NumberField
              label="Artist Salary / Month"
              value={values.artistSalaryPerMonth}
              onChange={(v) => patchValues({ artistSalaryPerMonth: v })}
              suffix="$"
              widthClass="w-24"
            />
            <StepperField
              label="Working Days / Month"
              value={values.workingDaysPerMonth}
              onChange={(v) => patchValues({ workingDaysPerMonth: v })}
              min={1}
              max={31}
              step={1}
              allowDecimal={false}
            />
            <StepperField
              label="Artist Days / Min"
              value={values.artistDaysPerMinute}
              onChange={(v) => patchValues({ artistDaysPerMinute: v })}
              min={0}
              step={0.5}
            />
            <NumberField
              label="Editor Cost"
              value={values.editorCostPerVideo}
              onChange={(v) => patchValues({ editorCostPerVideo: v })}
              suffix="$"
              widthClass="w-20"
            />
            <NumberField
              label="Software Cost"
              value={values.softwareCostPerVideo}
              onChange={(v) => patchValues({ softwareCostPerVideo: v })}
              suffix="$"
              widthClass="w-20"
            />
            <NumberField
              label="Margin"
              value={values.profitMarginPercent}
              onChange={(v) => patchValues({ profitMarginPercent: v })}
              suffix="%"
              widthClass="w-16"
            />
          </div>
        </div>
      </div>

      {/* ── Step 2: Blended Model Allocation ─────────────────────── */}
      <div className="space-y-3 pt-2">
        <SectionHeading
          title="Blended Model Allocation"
          description="Split the video's runtime across as many models as you like, by percentage."
        />
        <AllocationTable values={values} onChange={patchValues} catalog={catalog} />
      </div>

      {/* ── Step 3: Blended Image Model Allocation ───────────────── */}
      <div className="space-y-3 pt-2">
        <SectionHeading
          title="Blended Image Model Allocation"
          description="Split the images this video needs across models — resolution and quality set the credits each one costs."
        />
        <ImageAllocationTable values={values} onChange={patchValues} catalog={catalog} />
      </div>

      {/* ── Step 4: Single Video Cost Breakdown ──────────────────── */}
      <div className="space-y-3 pt-2">
        <SectionHeading
          title="Single Video Cost Breakdown"
          description="What one video costs to make and what to charge for it, best case vs worst case."
        />
        <CostBreakdownTable values={values} catalog={catalog} />
      </div>

      {/* ── Step 5: Multi-Video Project Cost & Deadline ──────────── */}
      <div className="space-y-3 pt-2">
        <SectionHeading
          title="Multi-Video Project Cost & Deadline"
          description="Scale one video to a full project, staffed to hit the deadline."
        />
        <ProjectCostBreakdown values={values} onChange={patchValues} catalog={catalog} />
      </div>
    </div>
  );
}
