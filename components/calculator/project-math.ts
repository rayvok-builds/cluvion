import type { CostBreakdown } from "./cost-math";
import { ceilWhole, combineMinMax, mapMinMax, type MinMax } from "./math-utils";
import type { StepOneValues } from "./types";

export type ProjectCost = {
  workingDaysAvailable: number;
  totalArtistDays: number;
  artistsNeeded: number | null;
  payrollCost: number | null;
  aiToolsCost: MinMax;
  editorCost: number;
  softwareCost: number;
  totalCost: MinMax;
  grossPrice: MinMax;
  discountAmount: MinMax;
  finalPrice: MinMax;
  profit: MinMax;
  effectiveMarginPercent: MinMax;
};

export function computeProjectCost(values: StepOneValues, cost: CostBreakdown): ProjectCost {
  const workingDaysAvailable = values.deadlineMonths * values.workingDaysPerMonth;
  const totalArtistDays = values.numberOfVideos * cost.artistDays;

  const artistsNeeded =
    workingDaysAvailable > 0 ? ceilWhole(totalArtistDays / workingDaysAvailable) : null;
  const payrollMonths = Math.max(1, ceilWhole(values.deadlineMonths));
  const payrollCost =
    artistsNeeded === null ? null : artistsNeeded * values.artistSalaryPerMonth * payrollMonths;

  const aiToolsCost = mapMinMax(cost.aiToolsCost, (ai) => ai * values.numberOfVideos);
  const editorCost = values.numberOfVideos * values.editorCostPerVideo;
  const softwareCost = values.numberOfVideos * values.softwareCostPerVideo;

  const totalCost = mapMinMax(aiToolsCost, (ai) =>
    payrollCost === null ? null : ai + editorCost + softwareCost + payrollCost,
  );
  const grossPrice = mapMinMax(totalCost, (total) =>
    total * (1 + values.profitMarginPercent / 100),
  );
  const discountAmount = mapMinMax(grossPrice, (price) =>
    price * (values.volumeDiscountPercent / 100),
  );
  const finalPrice = combineMinMax(grossPrice, discountAmount, (price, discount) => price - discount);
  const profit = combineMinMax(finalPrice, totalCost, (price, total) => price - total);

  return {
    workingDaysAvailable,
    totalArtistDays,
    artistsNeeded,
    payrollCost,
    aiToolsCost,
    editorCost,
    softwareCost,
    totalCost,
    grossPrice,
    discountAmount,
    finalPrice,
    profit,
    effectiveMarginPercent: combineMinMax(profit, finalPrice, (p, price) =>
      price > 0 ? (p / price) * 100 : 0,
    ),
  };
}
