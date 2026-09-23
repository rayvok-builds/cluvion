import { computeImageBlend, imagesNeededFor, type ImageBlendResult } from "./image-blend-math";
import type { Catalog, StepOneValues } from "./types";

export type BuildMath = {
  imagesNeeded: number;
  imageBlend: ImageBlendResult;
  imageCredits: number;
  creditsPerImage: number;
  costPerCredit: number | null;
};

export function computeBuildMath(values: StepOneValues, catalog: Catalog | undefined): BuildMath {
  const imageBlend = computeImageBlend(values, catalog);

  return {
    imagesNeeded: imagesNeededFor(values),
    imageBlend,
    imageCredits: imageBlend.blended.totalCredits,
    creditsPerImage: imageBlend.blended.creditsPerImage,
    costPerCredit: values.monthlyCredits > 0 ? values.monthlyCost / values.monthlyCredits : null,
  };
}
