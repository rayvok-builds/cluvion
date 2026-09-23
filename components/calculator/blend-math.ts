import { getDurationParam, getEffectiveRate } from "./model-cost";
import type { Catalog, ModelAllocation, StepOneValues } from "./types";
import { ceilWhole } from "./math-utils";

const VALID_EPSILON = 0.01;

export function secondsForPercent(percent: number, videoLengthSeconds: number): number {
  return (percent / 100) * videoLengthSeconds;
}

export function percentForSeconds(seconds: number, videoLengthSeconds: number): number {
  return videoLengthSeconds > 0 ? (seconds / videoLengthSeconds) * 100 : 0;
}

export type AllocationRow = {
  id: string;
  modelId: string;
  modelParams: Record<string, string>;
  secondsAllocated: number;
  percent: number;
  maxPercent: number;
  duration: number;
  baseClipsNeeded: number;
  creditsPerClip: number | null;
  minRetakeClips: number;
  maxRetakeClips: number;
  totalMinCredits: number | null;
  totalMaxCredits: number | null;
};

export type BlendResult = {
  rows: AllocationRow[];
  totalPercent: number;
  remainingPercent: number;
  isValid: boolean;
  blended: {
    baseClipsNeeded: number;
    creditsPerClip: number;
    minRetakeClips: number;
    maxRetakeClips: number;
    totalMinCredits: number;
    totalMaxCredits: number;
  };
};

function computeRow(
  allocation: ModelAllocation,
  effectiveSeconds: number,
  otherEffectiveSeconds: number,
  values: StepOneValues,
  catalog: Catalog | undefined,
): AllocationRow {
  const percent = percentForSeconds(effectiveSeconds, values.videoLengthSeconds);

  const model = catalog?.models.video[allocation.modelId];
  const durationParam = model ? getDurationParam(model) : undefined;
  const duration = durationParam ? Number(allocation.modelParams.duration ?? durationParam.default) : 0;
  const baseClipsNeeded =
    duration > 0
      ? durationParam?.type === "enum"
        ? ceilWhole(effectiveSeconds / duration)
        : effectiveSeconds / duration
      : 0;

  const rate = model ? getEffectiveRate(model, allocation.modelParams) : null;
  const creditsPerClip = rate ? rate.ratePerSecond * duration : null;

  const minRetakeClips = baseClipsNeeded * values.minRetake;
  const maxRetakeClips = baseClipsNeeded * values.maxRetake;

  return {
    id: allocation.id,
    modelId: allocation.modelId,
    modelParams: allocation.modelParams,
    secondsAllocated: effectiveSeconds,
    percent,
    maxPercent: Math.max(0, 100 - percentForSeconds(otherEffectiveSeconds, values.videoLengthSeconds)),
    duration,
    baseClipsNeeded,
    creditsPerClip,
    minRetakeClips,
    maxRetakeClips,
    totalMinCredits: creditsPerClip === null ? null : minRetakeClips * creditsPerClip,
    totalMaxCredits: creditsPerClip === null ? null : maxRetakeClips * creditsPerClip,
  };
}

export function computeBlend(
  values: StepOneValues,
  catalog: Catalog | undefined,
): BlendResult {
  const effectiveAllocations = values.allocations.map((a) => a.secondsAllocated);
  const totalSeconds = effectiveAllocations.reduce((sum, s) => sum + s, 0);
  const totalPercent = percentForSeconds(totalSeconds, values.videoLengthSeconds);

  const rows = values.allocations.map((a, i) => {
    const otherSeconds = totalSeconds - effectiveAllocations[i];
    return computeRow(a, effectiveAllocations[i], otherSeconds, values, catalog);
  });

  const isValid = Math.abs(totalPercent - 100) < VALID_EPSILON;

  const baseClipsNeeded = rows.reduce((sum, r) => sum + r.baseClipsNeeded, 0);
  const totalMinCredits = rows.reduce((sum, r) => sum + (r.totalMinCredits ?? 0), 0);
  const totalMaxCredits = rows.reduce((sum, r) => sum + (r.totalMaxCredits ?? 0), 0);
  const minRetakeClips = rows.reduce((sum, r) => sum + r.minRetakeClips, 0);
  const maxRetakeClips = rows.reduce((sum, r) => sum + r.maxRetakeClips, 0);

  const creditsPerClip =
    baseClipsNeeded > 0
      ? rows.reduce((sum, r) => sum + (r.creditsPerClip ?? 0) * r.baseClipsNeeded, 0) /
        baseClipsNeeded
      : 0;

  return {
    rows,
    totalPercent,
    remainingPercent: Math.max(0, 100 - totalPercent),
    isValid,
    blended: {
      baseClipsNeeded,
      creditsPerClip,
      minRetakeClips,
      maxRetakeClips,
      totalMinCredits,
      totalMaxCredits,
    },
  };
}
