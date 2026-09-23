"use client";

import React, { useState, useCallback, useId } from "react";
import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { DEFAULT_CATALOG } from "./catalog-data";
import {
  DEFAULT_CALCULATOR_DATA,
  type StepOneValues,
  type ModelAllocation,
  type ImageAllocation,
  type Catalog,
} from "./types";
import { computeBlend } from "./blend-math";
import { computeImageBlend } from "./image-blend-math";
import { computeBuildMath } from "./build-math";
import { computeCostBreakdown } from "./cost-math";
import { computeProjectCost } from "./project-math";
import {
  getModels,
  getDurationParam,
  getAudioParam,
  audioToggleValues,
  formatParamValue,
} from "./model-cost";
import { getImageModels, getPricedParams, getParamValue } from "./image-cost";
import type { MinMax } from "./math-utils";

// ─── Tiny UI Primitives ───────────────────────────────────────────────────────

function fmt2(v: number | null): string {
  if (v === null) return "—";
  return v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmt1(v: number | null): string {
  if (v === null) return "—";
  return v.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

function MinMaxCell({
  mm,
  kind = "money",
}: {
  mm: MinMax | number | null;
  kind?: "money" | "percent" | "quantity";
}) {
  if (mm === null) return <span className="text-white/30">—</span>;
  if (typeof mm === "number") {
    const formatted =
      kind === "money" ? `$${fmt2(mm)}` : kind === "percent" ? `${fmt1(mm)}%` : fmt2(mm);
    return <span className="tabular-nums">{formatted}</span>;
  }
  const { min, max } = mm;
  const format = (v: number | null) =>
    v === null
      ? "—"
      : kind === "money"
      ? `$${fmt2(v)}`
      : kind === "percent"
      ? `${fmt1(v)}%`
      : fmt2(v);
  return (
    <span className="tabular-nums">
      {format(min)} <span className="text-white/30 mx-1">→</span> {format(max)}
    </span>
  );
}

// Number input with optional suffix/prefix
function NumInput({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  suffix,
  prefix,
  allowDecimal = true,
  widthClass = "w-28",
}: {
  id: string;
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  prefix?: string;
  allowDecimal?: boolean;
  widthClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-[11px] text-white/50 uppercase tracking-widest font-primary">
        {label}
      </label>
      <div className="flex items-center gap-0">
        {prefix && (
          <span className="px-2 h-8 flex items-center border border-r-0 border-white/10 bg-white/5 text-white/50 text-sm rounded-l-md">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const raw = allowDecimal ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
            if (!isNaN(raw)) onChange(Math.max(min, max !== undefined ? Math.min(max, raw) : raw));
          }}
          className={`${widthClass} h-8 bg-white/5 border border-white/10 text-white text-sm px-2 focus:outline-none focus:border-[#E5A93C]/50 transition-colors ${
            prefix ? "rounded-none" : "rounded-l-md"
          } ${suffix ? "rounded-r-none" : "rounded-r-md"}`}
        />
        {suffix && (
          <span className="px-2 h-8 flex items-center border border-l-0 border-white/10 bg-white/5 text-white/50 text-sm rounded-r-md">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

// Stepper with +/- buttons
function Stepper({
  id,
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  allowDecimal = true,
}: {
  id: string;
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
      <label htmlFor={id} className="text-[11px] text-white/50 uppercase tracking-widest font-primary">
        {label}
      </label>
      <div className="flex items-center">
        <button
          type="button"
          onClick={decrement}
          className="w-8 h-8 flex items-center justify-center border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all rounded-l-md"
        >
          <ChevronDown className="w-3 h-3" />
        </button>
        <div
          id={id}
          className="h-8 w-14 flex items-center justify-center border-y border-white/10 bg-white/5 text-white text-sm tabular-nums"
        >
          {display}
        </div>
        <button
          type="button"
          onClick={increment}
          className="w-8 h-8 flex items-center justify-center border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all rounded-r-md"
        >
          <ChevronUp className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}

// Native select dropdown styled dark
function DarkSelect({
  value,
  onChange,
  options,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`h-8 bg-[#0d0d10] border border-white/10 text-white text-sm px-2 rounded-md focus:outline-none focus:border-[#E5A93C]/50 transition-colors cursor-pointer appearance-none pr-6 ${className}`}
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

// Section label
function SectionLabel({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-4">
      <h3 className="font-primary text-xs uppercase tracking-[0.2em] text-[#E5A93C]">{title}</h3>
      {description && <p className="text-white/40 text-xs mt-0.5 font-secondary">{description}</p>}
    </div>
  );
}

// Card container
function CalcCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

// Results table row
function ResultRow({
  label,
  value,
  kind = "money",
  highlight = false,
}: {
  label: string;
  value: MinMax | number | null;
  kind?: "money" | "percent" | "quantity";
  highlight?: boolean;
}) {
  return (
    <tr
      className={`border-b border-white/5 ${highlight ? "bg-[#E5A93C]/5" : ""}`}
    >
      <td
        className={`py-2.5 pr-6 text-sm ${highlight ? "text-white font-medium" : "text-white/60"}`}
      >
        {label}
      </td>
      <td
        className={`py-2.5 text-right text-sm ${highlight ? "text-[#E5A93C] font-semibold" : "text-white/80"}`}
      >
        <MinMaxCell mm={value} kind={kind} />
      </td>
    </tr>
  );
}

// ─── Allocation Rows ──────────────────────────────────────────────────────────

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

function VideoAllocationRows({
  values,
  onChange,
  catalog,
}: {
  values: StepOneValues;
  onChange: (patch: Partial<StepOneValues>) => void;
  catalog: Catalog;
}) {
  const models = getModels(catalog);

  function addRow() {
    const defaultModel = models[0];
    if (!defaultModel) return;
    const durationParam = getDurationParam(defaultModel);
    const newAlloc: ModelAllocation = {
      id: genId(),
      modelId: defaultModel.id,
      modelParams: { duration: String(durationParam.default) },
      secondsAllocated: values.videoLengthSeconds * 0.25,
    };
    onChange({ allocations: [...values.allocations, newAlloc] });
  }

  function updateRow(id: string, patch: Partial<ModelAllocation>) {
    onChange({
      allocations: values.allocations.map((a) =>
        a.id === id ? { ...a, ...patch } : a,
      ),
    });
  }

  function removeRow(id: string) {
    onChange({ allocations: values.allocations.filter((a) => a.id !== id) });
  }

  const blend = computeBlend(values, catalog);
  const totalPercent = Math.round(blend.totalPercent * 10) / 10;

  return (
    <div className="space-y-3">
      {values.allocations.map((alloc) => {
        const blendRow = blend.rows.find((r) => r.id === alloc.id);
        const model = catalog.models.video[alloc.modelId];
        const audioParam = model ? getAudioParam(model) : undefined;
        const durationParam = model ? getDurationParam(model) : undefined;
        const resolutionParam = model?.params.resolution;

        const durationOptions =
          durationParam?.type === "enum"
            ? durationParam.values.map((v) => ({ value: String(v), label: `${v}s` }))
            : [];

        const resolOptions =
          resolutionParam?.type === "enum"
            ? resolutionParam.values.map((v) => ({
                value: String(v),
                label: formatParamValue(v),
              }))
            : [];

        const audioToggle = audioParam ? audioToggleValues(audioParam[1]) : null;
        const audioKey = audioParam?.[0];
        const audioOn = audioKey ? alloc.modelParams[audioKey] === audioToggle?.on : false;

        const percent = blendRow ? Math.round(blendRow.percent * 10) / 10 : 0;

        return (
          <div
            key={alloc.id}
            className="flex flex-wrap items-end gap-3 p-3 rounded-lg border border-white/8 bg-white/[0.02]"
          >
            {/* Model Selector */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-white/50 uppercase tracking-widest font-primary">Model</span>
              <DarkSelect
                value={alloc.modelId}
                onChange={(modelId) => {
                  if (!modelId) return;
                  const newModel = catalog.models.video[modelId];
                  if (!newModel) return;
                  const dp = getDurationParam(newModel);
                  updateRow(alloc.id, {
                    modelId,
                    modelParams: { duration: String(dp.default) },
                  });
                }}
                options={models.map((m) => ({ value: m.id, label: m.name }))}
                className="w-40"
              />
            </div>

            {/* Duration */}
            {durationParam?.type === "enum" && durationOptions.length > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-white/50 uppercase tracking-widest font-primary">Clip Length</span>
                <DarkSelect
                  value={alloc.modelParams.duration ?? String(durationParam.default)}
                  onChange={(v) =>
                    updateRow(alloc.id, { modelParams: { ...alloc.modelParams, duration: v } })
                  }
                  options={durationOptions}
                  className="w-20"
                />
              </div>
            )}
            {durationParam?.type === "range" && (
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-white/50 uppercase tracking-widest font-primary">Duration (sec)</span>
                <input
                  type="number"
                  min={durationParam.min}
                  max={durationParam.max}
                  step={1}
                  value={alloc.modelParams.duration ?? durationParam.default}
                  onChange={(e) =>
                    updateRow(alloc.id, {
                      modelParams: {
                        ...alloc.modelParams,
                        duration: e.target.value,
                      },
                    })
                  }
                  className="w-20 h-8 bg-white/5 border border-white/10 text-white text-sm px-2 rounded-md focus:outline-none focus:border-[#E5A93C]/50"
                />
              </div>
            )}

            {/* Resolution */}
            {resolOptions.length > 0 && (
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-white/50 uppercase tracking-widest font-primary">Resolution</span>
                <DarkSelect
                  value={alloc.modelParams.resolution ?? String(resolutionParam?.default ?? "")}
                  onChange={(v) =>
                    updateRow(alloc.id, {
                      modelParams: { ...alloc.modelParams, resolution: v },
                    })
                  }
                  options={resolOptions}
                  className="w-24"
                />
              </div>
            )}

            {/* Audio toggle */}
            {audioParam && audioToggle && audioKey && (
              <div className="flex flex-col gap-1">
                <span className="text-[11px] text-white/50 uppercase tracking-widest font-primary">Audio</span>
                <button
                  type="button"
                  onClick={() =>
                    updateRow(alloc.id, {
                      modelParams: {
                        ...alloc.modelParams,
                        [audioKey]: audioOn ? audioToggle.off : audioToggle.on,
                      },
                    })
                  }
                  className={`h-8 px-3 rounded-md border text-sm transition-all ${
                    audioOn
                      ? "border-[#E5A93C]/60 bg-[#E5A93C]/10 text-[#E5A93C]"
                      : "border-white/10 bg-white/5 text-white/50"
                  }`}
                >
                  {audioOn ? "On" : "Off"}
                </button>
              </div>
            )}

            {/* % share */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-white/50 uppercase tracking-widest font-primary">% Share</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={percent}
                  onChange={(e) => {
                    const newPct = Number(e.target.value);
                    updateRow(alloc.id, {
                      secondsAllocated: (newPct / 100) * values.videoLengthSeconds,
                    });
                  }}
                  className="w-24 accent-[#E5A93C]"
                />
                <span className="text-white/60 text-sm tabular-nums w-10">{percent}%</span>
              </div>
            </div>

            {/* Clip info */}
            {blendRow && (
              <div className="flex flex-col gap-0.5 ml-auto text-right">
                <span className="text-[11px] text-white/30 uppercase tracking-widest font-primary">Credits</span>
                <span className="text-sm text-white/70 tabular-nums">
                  {blendRow.totalMinCredits !== null
                    ? `${fmt2(blendRow.totalMinCredits)} – ${fmt2(blendRow.totalMaxCredits)}`
                    : "—"}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={() => removeRow(alloc.id)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/30 hover:text-red-400 hover:border-red-400/30 transition-all ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}

      <div className="flex items-center justify-between mt-2">
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1.5 text-sm text-white/50 hover:text-[#E5A93C] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Video Model
        </button>
        <span
          className={`text-xs tabular-nums ${
            Math.abs(totalPercent - 100) < 1
              ? "text-green-400/70"
              : totalPercent > 100
              ? "text-red-400/70"
              : "text-white/30"
          }`}
        >
          {totalPercent}% allocated
        </span>
      </div>
    </div>
  );
}

function ImageAllocationRows({
  values,
  onChange,
  catalog,
}: {
  values: StepOneValues;
  onChange: (patch: Partial<StepOneValues>) => void;
  catalog: Catalog;
}) {
  const models = getImageModels(catalog);

  function addRow() {
    const defaultModel = models[0];
    if (!defaultModel) return;
    const newAlloc: ImageAllocation = {
      id: genId(),
      modelId: defaultModel.id,
      modelParams: {},
      percent: 100 - values.imageAllocations.reduce((s, a) => s + a.percent, 0),
    };
    onChange({ imageAllocations: [...values.imageAllocations, newAlloc] });
  }

  function updateRow(id: string, patch: Partial<ImageAllocation>) {
    onChange({
      imageAllocations: values.imageAllocations.map((a) =>
        a.id === id ? { ...a, ...patch } : a,
      ),
    });
  }

  function removeRow(id: string) {
    onChange({ imageAllocations: values.imageAllocations.filter((a) => a.id !== id) });
  }

  const imageBlend = computeImageBlend(values, catalog);
  const totalPercent = Math.round(imageBlend.totalPercent * 10) / 10;

  return (
    <div className="space-y-3">
      {values.imageAllocations.map((alloc) => {
        const model = catalog.models.image[alloc.modelId];
        const pricedParams = model ? getPricedParams(model) : [];

        return (
          <div
            key={alloc.id}
            className="flex flex-wrap items-end gap-3 p-3 rounded-lg border border-white/8 bg-white/[0.02]"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-white/50 uppercase tracking-widest font-primary">Model</span>
              <DarkSelect
                value={alloc.modelId}
                onChange={(modelId) => {
                  if (!modelId) return;
                  updateRow(alloc.id, { modelId, modelParams: {} });
                }}
                options={models.map((m) => ({ value: m.id, label: m.name }))}
                className="w-40"
              />
            </div>

            {pricedParams.map(([key, param]) => (
              <div key={key} className="flex flex-col gap-1">
                <span className="text-[11px] text-white/50 uppercase tracking-widest font-primary">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <DarkSelect
                  value={
                    getParamValue(model!, alloc.modelParams, key) ?? String(param.default)
                  }
                  onChange={(v) =>
                    updateRow(alloc.id, {
                      modelParams: { ...alloc.modelParams, [key]: v },
                    })
                  }
                  options={param.values.map((v) => ({
                    value: String(v),
                    label: formatParamValue(v),
                  }))}
                  className="w-24"
                />
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <span className="text-[11px] text-white/50 uppercase tracking-widest font-primary">% Share</span>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={1}
                  value={alloc.percent}
                  onChange={(e) => updateRow(alloc.id, { percent: Number(e.target.value) })}
                  className="w-24 accent-[#E5A93C]"
                />
                <span className="text-white/60 text-sm tabular-nums w-10">{alloc.percent}%</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeRow(alloc.id)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/30 hover:text-red-400 hover:border-red-400/30 transition-all ml-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}

      <div className="flex items-center justify-between mt-2">
        <button
          type="button"
          onClick={addRow}
          className="flex items-center gap-1.5 text-sm text-white/50 hover:text-[#E5A93C] transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Image Model
        </button>
        <span
          className={`text-xs tabular-nums ${
            Math.abs(totalPercent - 100) < 1
              ? "text-green-400/70"
              : totalPercent > 100
              ? "text-red-400/70"
              : "text-white/30"
          }`}
        >
          {totalPercent}% allocated
        </span>
      </div>
    </div>
  );
}

// ─── Tab System ───────────────────────────────────────────────────────────────

const TABS = [
  { id: "inputs", label: "Inputs" },
  { id: "video-models", label: "Video Models" },
  { id: "image-models", label: "Image Models" },
  { id: "single-cost", label: "Per Video Cost" },
  { id: "project-cost", label: "Project Cost" },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ─── Main Calculator ──────────────────────────────────────────────────────────

export function PricingCalculator() {
  const catalog: Catalog = DEFAULT_CATALOG;
  const [data, setData] = useState(DEFAULT_CALCULATOR_DATA);
  const [activeTab, setActiveTab] = useState<TabId>("inputs");

  function patchStepOne(patch: Partial<StepOneValues>) {
    setData((prev) => ({ ...prev, stepOne: { ...prev.stepOne, ...patch } }));
  }

  const values = data.stepOne;
  const blend = computeBlend(values, catalog);
  const build = computeBuildMath(values, catalog);
  const cost = computeCostBreakdown(values, blend, build);
  const project = computeProjectCost(values, cost);

  const plans = Object.values(catalog.pricing)[0]?.plans ?? [];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-white/8 pb-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs font-primary uppercase tracking-widest transition-all rounded-t-lg ${
              activeTab === tab.id
                ? "text-[#E5A93C] border-b-2 border-[#E5A93C] bg-[#E5A93C]/5"
                : "text-white/40 hover:text-white/70 border-b-2 border-transparent"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Inputs Tab ── */}
      {activeTab === "inputs" && (
        <div className="space-y-6">
          <CalcCard>
            <SectionLabel
              title="Subscription Plan"
              description="Your monthly AI credit budget — sets the credit cost rate."
            />
            <div className="flex flex-wrap gap-3">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() =>
                    patchStepOne({
                      planId: plan.id,
                      monthlyCost: plan.monthly_cost,
                      monthlyCredits: plan.credits_per_month,
                    })
                  }
                  className={`px-4 py-3 rounded-lg border text-left transition-all ${
                    values.planId === plan.id
                      ? "border-[#E5A93C]/60 bg-[#E5A93C]/8 text-white"
                      : "border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20"
                  }`}
                >
                  <div className="text-sm font-medium">{plan.name}</div>
                  <div className="text-xs text-white/40 mt-0.5">
                    ${plan.monthly_cost}/mo · {plan.credits_per_month.toLocaleString()} credits
                  </div>
                </button>
              ))}
            </div>
          </CalcCard>

          <CalcCard>
            <SectionLabel
              title="Video Parameters"
              description="The finished video specs and retake assumptions."
            />
            <div className="flex flex-wrap gap-4">
              <NumInput
                id="video-length"
                label="Video Length"
                value={values.videoLengthSeconds}
                onChange={(v) => patchStepOne({ videoLengthSeconds: v })}
                min={1}
                allowDecimal={false}
                suffix="sec"
                widthClass="w-24"
              />
              <Stepper
                id="min-retake"
                label="Min Retake ×"
                value={values.minRetake}
                onChange={(v) => patchStepOne({ minRetake: v })}
                min={1}
                max={values.maxRetake}
                step={1}
                allowDecimal={false}
              />
              <Stepper
                id="max-retake"
                label="Max Retake ×"
                value={values.maxRetake}
                onChange={(v) => patchStepOne({ maxRetake: v })}
                min={values.minRetake}
                step={1}
                allowDecimal={false}
              />
              <Stepper
                id="images-per-minute"
                label="Images / Min"
                value={values.imagesPerMinute}
                onChange={(v) => patchStepOne({ imagesPerMinute: v })}
                min={0}
                step={5}
                allowDecimal={false}
              />
            </div>
          </CalcCard>

          <CalcCard>
            <SectionLabel
              title="Labor & Overhead"
              description="Artist, editing, and software costs per video."
            />
            <div className="flex flex-wrap gap-4">
              <NumInput
                id="artist-salary"
                label="Artist Salary / Month"
                value={values.artistSalaryPerMonth}
                onChange={(v) => patchStepOne({ artistSalaryPerMonth: v })}
                min={0}
                prefix="$"
                widthClass="w-24"
              />
              <Stepper
                id="working-days"
                label="Working Days / Month"
                value={values.workingDaysPerMonth}
                onChange={(v) => patchStepOne({ workingDaysPerMonth: v })}
                min={1}
                max={31}
                step={1}
                allowDecimal={false}
              />
              <Stepper
                id="artist-days-per-minute"
                label="Artist Days / Min"
                value={values.artistDaysPerMinute}
                onChange={(v) => patchStepOne({ artistDaysPerMinute: v })}
                min={0}
                step={0.5}
              />
              <NumInput
                id="editor-cost"
                label="Editor Cost / Video"
                value={values.editorCostPerVideo}
                onChange={(v) => patchStepOne({ editorCostPerVideo: v })}
                min={0}
                prefix="$"
                widthClass="w-24"
              />
              <NumInput
                id="software-cost"
                label="Software Cost / Video"
                value={values.softwareCostPerVideo}
                onChange={(v) => patchStepOne({ softwareCostPerVideo: v })}
                min={0}
                prefix="$"
                widthClass="w-24"
              />
              <NumInput
                id="profit-margin"
                label="Profit Margin"
                value={values.profitMarginPercent}
                onChange={(v) => patchStepOne({ profitMarginPercent: v })}
                min={0}
                max={99}
                allowDecimal={false}
                suffix="%"
                widthClass="w-16"
              />
            </div>
          </CalcCard>
        </div>
      )}

      {/* ── Video Models Tab ── */}
      {activeTab === "video-models" && (
        <CalcCard>
          <SectionLabel
            title="Blended Video Model Allocation"
            description="Split the video's runtime across models by percentage. 100% = fully allocated."
          />
          <VideoAllocationRows values={values} onChange={patchStepOne} catalog={catalog} />

          {blend.rows.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/8">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Base Clips", value: fmt2(blend.blended.baseClipsNeeded) },
                  { label: "Min Credits", value: fmt2(blend.blended.totalMinCredits) },
                  { label: "Max Credits", value: fmt2(blend.blended.totalMaxCredits) },
                  { label: "Allocation", value: `${Math.round(blend.totalPercent * 10) / 10}%` },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/8">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-primary">{stat.label}</div>
                    <div className="text-base text-[#E5A93C] font-semibold tabular-nums mt-1">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CalcCard>
      )}

      {/* ── Image Models Tab ── */}
      {activeTab === "image-models" && (
        <CalcCard>
          <SectionLabel
            title="Blended Image Model Allocation"
            description="Split the images this video needs across models — resolution & quality set credits per image."
          />
          <ImageAllocationRows values={values} onChange={patchStepOne} catalog={catalog} />

          {build.imageBlend.rows.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Images Needed", value: String(build.imagesNeeded) },
                  { label: "Credits / Image", value: fmt2(build.creditsPerImage) },
                  { label: "Total Image Credits", value: fmt2(build.imageCredits) },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-lg bg-white/[0.03] border border-white/8">
                    <div className="text-[10px] text-white/40 uppercase tracking-widest font-primary">{stat.label}</div>
                    <div className="text-base text-[#E5A93C] font-semibold tabular-nums mt-1">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CalcCard>
      )}

      {/* ── Single Video Cost Tab ── */}
      {activeTab === "single-cost" && (
        <CalcCard>
          <SectionLabel
            title="Single Video Cost Breakdown"
            description="What one video costs to produce and what to charge — Min Retake (best case) → Max Retake (worst case)."
          />
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 text-xs text-white/40 font-primary uppercase tracking-widest">Cost Item</th>
                  <th className="text-right py-2 text-xs text-white/40 font-primary uppercase tracking-widest">Best → Worst Case</th>
                </tr>
              </thead>
              <tbody>
                <ResultRow label="AI Generation Cost" value={cost.aiToolsCost} />
                <ResultRow label="Artist Cost" value={cost.artistCost} />
                <ResultRow label="Editor Cost" value={cost.editorCost} />
                <ResultRow label="Software & Tools" value={cost.softwareCost} />
                <ResultRow label="Total Production Cost / Video" value={cost.totalCost} highlight />
                <ResultRow label="Target Profit Margin" value={cost.profitMarginPercent} kind="percent" />
                <ResultRow label="Selling Price / Video" value={cost.sellingPrice} highlight />
                <ResultRow label="Profit / Video" value={cost.profit} highlight />
                <ResultRow label="Effective Margin %" value={cost.effectiveMarginPercent} kind="percent" />
                <ResultRow label="Cost per Second" value={cost.costPerSecond} />
              </tbody>
            </table>
          </div>
          {build.costPerCredit === null && (
            <p className="text-xs text-[#E5A93C]/70 mt-3">⚠ Set monthly credits above 0 to calculate AI cost.</p>
          )}
        </CalcCard>
      )}

      {/* ── Project Cost Tab ── */}
      {activeTab === "project-cost" && (
        <div className="space-y-5">
          <CalcCard>
            <SectionLabel title="Project Scale" description="Scale one video to a multi-video project." />
            <div className="flex flex-wrap gap-4">
              <Stepper
                id="num-videos"
                label="Number of Videos"
                value={values.numberOfVideos}
                onChange={(v) => patchStepOne({ numberOfVideos: v })}
                min={1}
                step={1}
                allowDecimal={false}
              />
              <Stepper
                id="deadline-months"
                label="Deadline (Months)"
                value={values.deadlineMonths}
                onChange={(v) => patchStepOne({ deadlineMonths: v })}
                min={0.5}
                step={0.5}
              />
              <NumInput
                id="volume-discount"
                label="Volume Discount"
                value={values.volumeDiscountPercent}
                onChange={(v) => patchStepOne({ volumeDiscountPercent: v })}
                min={0}
                max={100}
                suffix="%"
                widthClass="w-16"
              />
            </div>
          </CalcCard>

          <CalcCard>
            <SectionLabel title="Project Cost Breakdown" description="Staffing, total production cost, pricing and net profit." />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 text-xs text-white/40 font-primary uppercase tracking-widest">Item</th>
                    <th className="text-right py-2 text-xs text-white/40 font-primary uppercase tracking-widest">Best → Worst Case</th>
                  </tr>
                </thead>
                <tbody>
                  <ResultRow label="Working Days Available" value={project.workingDaysAvailable} kind="quantity" />
                  <ResultRow label="Total Artist-Days Needed" value={project.totalArtistDays} kind="quantity" />
                  <ResultRow label="Artists Needed (Staffing)" value={project.artistsNeeded} kind="quantity" />
                  <ResultRow label="AI Generation Cost (All)" value={project.aiToolsCost} />
                  <ResultRow label="Editor Cost (All)" value={project.editorCost} />
                  <ResultRow label="Software Cost (All)" value={project.softwareCost} />
                  <ResultRow label="Artist Payroll Cost" value={project.payrollCost} />
                  <ResultRow label="Total Project Cost" value={project.totalCost} highlight />
                  <ResultRow label="Gross Selling Price" value={project.grossPrice} />
                  <ResultRow label="Volume Discount Amount" value={project.discountAmount} />
                  <ResultRow label="Final Project Price" value={project.finalPrice} highlight />
                  <ResultRow label="Net Project Profit" value={project.profit} highlight />
                  <ResultRow label="Effective Project Margin %" value={project.effectiveMarginPercent} kind="percent" />
                </tbody>
              </table>
            </div>
          </CalcCard>
        </div>
      )}
    </div>
  );
}

export default PricingCalculator;
