import type { Catalog, EnumParam, Param, ParamValue, VideoModel } from "./types";

export function getModels(catalog: Catalog | undefined): VideoModel[] {
  if (!catalog) return [];
  return Object.values(catalog.models.video).sort((a, b) => a.name.localeCompare(b.name));
}

function getFunctionalityParams(model: VideoModel): [string, EnumParam][] {
  return Object.entries(model.params).filter(
    (entry): entry is [string, EnumParam] => entry[0] !== "duration" && entry[1].type === "enum",
  );
}

const AUDIO_KEYS = new Set(["sound", "generate_audio"]);

function isAudioParamKey(key: string): boolean {
  return AUDIO_KEYS.has(key);
}

export function getAudioParam(model: VideoModel): [string, EnumParam] | undefined {
  return getFunctionalityParams(model).find(([key]) => isAudioParamKey(key));
}

export function getDurationParam(model: VideoModel): Param {
  return model.params.duration;
}

export function audioToggleValues(param: EnumParam): { on: string; off: string } {
  const on = param.values.find((v) => v === true || v === "on");
  const off = param.values.find((v) => v === false || v === "off");
  return { on: String(on ?? true), off: String(off ?? false) };
}

export function formatParamValue(value: ParamValue): string {
  if (typeof value === "boolean") return value ? "On" : "Off";
  const text = String(value);
  if (text === "4k") return "4K";
  if (/^(on|off|std|pro)$/i.test(text)) return text[0]!.toUpperCase() + text.slice(1);
  if (text.includes("_")) {
    return text
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return text;
}

export type EffectiveRate = {
  ratePerSecond: number;
  baseRate: number;
  audioApplied: boolean;
};

export function getEffectiveRate(
  model: VideoModel,
  selected: Record<string, string>,
): EffectiveRate | null {
  if (model.cost.pricing_model !== "linear") return null;

  const resolutionValue = model.params.resolution
    ? (selected.resolution ?? String(model.params.resolution.default))
    : "default";
  const rate =
    model.cost.rates.find((r) => r.resolution === resolutionValue) ?? model.cost.rates[0];
  if (!rate) return null;

  const audioKey = Object.keys(model.params).find((key) => AUDIO_KEYS.has(key));
  const audioOn = audioKey ? ["true", "on"].includes(selected[audioKey] ?? "") : false;
  const multiplier = audioOn && rate.audio_multiplier ? rate.audio_multiplier : 1;

  return {
    ratePerSecond: rate.rate * multiplier,
    baseRate: rate.rate,
    audioApplied: audioOn && !!rate.audio_multiplier,
  };
}
