"use client";

import React from "react";
import type { Catalog, StepOneValues } from "./types";
import { computeBlend } from "./blend-math";
import { computeBuildMath } from "./build-math";
import { computeCostBreakdown } from "./cost-math";
import { computeProjectCost } from "./project-math";
import { MinMaxTable, type MinMaxRow } from "./MinMaxTable";

function Stepper({
  label,
  value,
  onChange,
  min = 0,
  step = 1,
  allowDecimal = true,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  step?: number;
  allowDecimal?: boolean;
}) {
  const decrement = () => {
    const next = Math.round((value - step) * 1000) / 1000;
    onChange(Math.max(min, next));
  };
  const increment = () => {
    const next = Math.round((value + step) * 1000) / 1000;
    onChange(next);
  };
  const display = allowDecimal ? String(value) : String(Math.round(value));

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-white/50">{label}</span>
      <div className="inline-flex items-center h-7 rounded border border-white/15 bg-white/[0.03]">
        <button
          type="button"
          onClick={decrement}
          className="px-2 h-full text-white/60 hover:text-white hover:bg-white/10 transition-colors rounded-l border-r border-white/10 text-xs"
        >
          −
        </button>
        <span className="px-2.5 min-w-[2.2rem] text-center text-xs text-white tabular-nums">
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

export function ProjectCostBreakdown({
  values,
  onChange,
  catalog,
}: {
  values: StepOneValues;
  onChange: (patch: Partial<StepOneValues>) => void;
  catalog: Catalog;
}) {
  const cost = computeCostBreakdown(
    values,
    computeBlend(values, catalog),
    computeBuildMath(values, catalog),
  );
  const project = computeProjectCost(values, cost);

  const rows: MinMaxRow[] = [
    { label: "Working Days available per Artist", value: project.workingDaysAvailable, kind: "quantity" },
    { label: "Total Artist-Days Needed", value: project.totalArtistDays, kind: "quantity" },
    { label: "Artists Needed", value: project.artistsNeeded, kind: "quantity" },
    { label: "AI Tools Cost (All Videos)", value: project.aiToolsCost },
    { label: "Editor Cost (All Videos)", value: project.editorCost },
    { label: "Software / Tools Cost (All Videos)", value: project.softwareCost },
    { label: "Artist Payroll Cost (Staffing)", value: project.payrollCost },
    { label: "Total Project Cost", value: project.totalCost, highlight: true },
    { label: "Gross Selling Price (Before Discount)", value: project.grossPrice },
    { label: "Volume Discount Amount", value: project.discountAmount },
    { label: "Final Project Selling Price", value: project.finalPrice },
    { label: "Project Net Profit", value: project.profit },
    { label: "Effective Project Margin (%)", value: project.effectiveMarginPercent, kind: "percent" },
  ];

  return (
    <div className="w-fit space-y-3">
      <div className="flex flex-wrap items-end gap-3">
        <Stepper
          label="Number of Videos"
          value={values.numberOfVideos}
          onChange={(numberOfVideos) => onChange({ numberOfVideos })}
          min={1}
          step={1}
          allowDecimal={false}
        />
        <Stepper
          label="Deadline (Months)"
          value={values.deadlineMonths}
          onChange={(deadlineMonths) => onChange({ deadlineMonths })}
          min={0.5}
          step={0.5}
        />
        <div className="flex flex-col gap-1">
          <span className="text-xs text-white/50">Volume Discount</span>
          <div className="flex items-center h-7 rounded border border-white/15 bg-white/[0.03] px-2 w-20">
            <input
              type="number"
              min={0}
              max={100}
              value={values.volumeDiscountPercent}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onChange({ volumeDiscountPercent: isNaN(val) ? 0 : Math.max(0, Math.min(100, val)) });
              }}
              className="w-full bg-transparent text-white text-xs focus:outline-none tabular-nums"
            />
            <span className="text-xs text-white/40 ml-1">%</span>
          </div>
        </div>
      </div>

      <MinMaxTable labelHeader="Project Cost Breakdown" rows={rows} />
    </div>
  );
}
