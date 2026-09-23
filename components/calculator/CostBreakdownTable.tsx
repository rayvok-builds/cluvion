"use client";

import React from "react";
import type { Catalog, StepOneValues } from "./types";
import { computeBlend } from "./blend-math";
import { computeBuildMath } from "./build-math";
import { computeCostBreakdown } from "./cost-math";
import { MinMaxTable, type MinMaxRow } from "./MinMaxTable";

export function CostBreakdownTable({
  values,
  catalog,
}: {
  values: StepOneValues;
  catalog: Catalog;
}) {
  const blend = computeBlend(values, catalog);
  const build = computeBuildMath(values, catalog);
  const cost = computeCostBreakdown(values, blend, build);

  const rows: MinMaxRow[] = [
    { label: "AI Tools Cost (Blended Generation + Images)", value: cost.aiToolsCost },
    { label: "Artist Cost", value: cost.artistCost },
    { label: "Editor Cost", value: cost.editorCost },
    { label: "Software / Tools Cost", value: cost.softwareCost },
    { label: "Total Cost / Video", value: cost.totalCost, highlight: true },
    { label: "Target Profit Margin", value: cost.profitMarginPercent, kind: "percent" },
    { label: "Selling Price / Video", value: cost.sellingPrice },
    { label: "Profit / Video", value: cost.profit },
    { label: "Effective Profit Margin (%)", value: cost.effectiveMarginPercent, kind: "percent" },
    { label: "Cost per Video Second", value: cost.costPerSecond },
  ];

  return (
    <div className="w-fit space-y-2">
      <MinMaxTable labelHeader="Cost Item" rows={rows} />

      <div className="flex flex-col items-end gap-0.5 pr-1 text-xs font-medium text-amber-400">
        {build.costPerCredit === null && (
          <span>⚠ Monthly credits is 0 — AI cost can’t be calculated</span>
        )}
        {blend.rows.length > 0 && !blend.isValid && (
          <span>
            ⚠ Allocation is at {Math.round(blend.totalPercent * 100) / 100}% — costs assume the model allocation split
          </span>
        )}
        {build.imageBlend.rows.length > 0 && !build.imageBlend.isValid && (
          <span>
            ⚠ Image allocation is at {Math.round(build.imageBlend.totalPercent * 100) / 100}% — image credits assume the image model split
          </span>
        )}
      </div>
    </div>
  );
}
