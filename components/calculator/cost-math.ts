import type { BlendResult } from "./blend-math";
import type { BuildMath } from "./build-math";
import { combineMinMax, mapMinMax, type MinMax } from "./math-utils";
import type { StepOneValues } from "./types";

export type CostBreakdown = {
  artistDays: number;
  aiToolsCost: MinMax;
  artistCost: number;
  editorCost: number;
  softwareCost: number;
  totalCost: MinMax;
  profitMarginPercent: number;
  sellingPrice: MinMax;
  profit: MinMax;
  effectiveMarginPercent: MinMax;
  costPerSecond: MinMax;
};

export function computeCostBreakdown(
  values: StepOneValues,
  blend: BlendResult,
  build: BuildMath,
): CostBreakdown {
  const { costPerCredit, imageCredits } = build;

  const aiToolsCost: MinMax =
    costPerCredit === null
      ? { min: null, max: null }
      : {
          min: (blend.blended.totalMinCredits + imageCredits) * costPerCredit,
          max: (blend.blended.totalMaxCredits + imageCredits) * costPerCredit,
        };

  const artistDays = (values.videoLengthSeconds / 60) * values.artistDaysPerMinute;
  const artistCost =
    values.workingDaysPerMonth > 0
      ? artistDays * (values.artistSalaryPerMonth / values.workingDaysPerMonth)
      : 0;
  const fixedCost = artistCost + values.editorCostPerVideo + values.softwareCostPerVideo;

  const totalCost = mapMinMax(aiToolsCost, (ai) => ai + fixedCost);
  const sellingPrice = mapMinMax(totalCost, (cost) => cost * (1 + values.profitMarginPercent / 100));
  const profit = combineMinMax(sellingPrice, totalCost, (price, cost) => price - cost);

  return {
    artistDays,
    aiToolsCost,
    artistCost,
    editorCost: values.editorCostPerVideo,
    softwareCost: values.softwareCostPerVideo,
    totalCost,
    profitMarginPercent: values.profitMarginPercent,
    sellingPrice,
    profit,
    effectiveMarginPercent: combineMinMax(profit, sellingPrice, (p, price) =>
      price > 0 ? (p / price) * 100 : 0,
    ),
    costPerSecond: mapMinMax(totalCost, (cost) =>
      values.videoLengthSeconds > 0 ? cost / values.videoLengthSeconds : null,
    ),
  };
}
