import { getImageCredits } from "./image-cost";
import type { Catalog } from "./types";
import type { ImageAllocation, StepOneValues } from "./types";
import { ceilWhole, roundSharesToWhole } from "./math-utils";

const VALID_EPSILON = 0.01;

export function imagesNeededFor(values: StepOneValues): number {
  return ceilWhole(values.imagesPerMinute * (values.videoLengthSeconds / 60));
}

export type ImageAllocationRow = {
  id: string;
  modelId: string;
  modelParams: Record<string, string>;
  percent: number;
  maxPercent: number;
  baseImages: number;
  creditsPerImage: number | null;
  totalCredits: number | null;
};

export type ImageBlendResult = {
  rows: ImageAllocationRow[];
  totalPercent: number;
  remainingPercent: number;
  isValid: boolean;
  imagesNeeded: number;
  blended: {
    baseImages: number;
    creditsPerImage: number;
    totalCredits: number;
  };
};

function computeRow(
  allocation: ImageAllocation,
  effectivePercent: number,
  otherPercent: number,
  baseImages: number,
  catalog: Catalog | undefined,
): ImageAllocationRow {
  const model = catalog?.models.image[allocation.modelId];
  const creditsPerImage = model ? getImageCredits(model, allocation.modelParams) : null;

  return {
    id: allocation.id,
    modelId: allocation.modelId,
    modelParams: allocation.modelParams,
    percent: effectivePercent,
    maxPercent: Math.max(0, 100 - otherPercent),
    baseImages,
    creditsPerImage,
    totalCredits: creditsPerImage === null ? null : baseImages * creditsPerImage,
  };
}

export function computeImageBlend(
  values: StepOneValues,
  catalog: Catalog | undefined,
): ImageBlendResult {
  const imagesNeeded = imagesNeededFor(values);
  const percents = values.imageAllocations.map((a) => a.percent);
  const totalPercent = percents.reduce((sum, p) => sum + p, 0);
  const isValid = Math.abs(totalPercent - 100) < VALID_EPSILON;

  const shares = roundSharesToWhole(percents, imagesNeeded);

  const rows = values.imageAllocations.map((a, i) => {
    const otherPercent = totalPercent - a.percent;
    return computeRow(a, a.percent, otherPercent, shares[i], catalog);
  });

  const totalCredits = rows.reduce((sum, r) => sum + (r.totalCredits ?? 0), 0);
  const creditsPerImage = imagesNeeded > 0 ? totalCredits / imagesNeeded : 0;

  return {
    rows,
    totalPercent,
    remainingPercent: Math.max(0, 100 - totalPercent),
    isValid,
    imagesNeeded,
    blended: {
      baseImages: imagesNeeded,
      creditsPerImage,
      totalCredits,
    },
  };
}
