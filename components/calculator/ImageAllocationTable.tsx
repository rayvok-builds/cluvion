"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Catalog, ImageAllocation, StepOneValues } from "./types";
import { computeImageBlend, imagesNeededFor } from "./image-blend-math";
import { getImageModels, getParamValue, getPricedParams } from "./image-cost";

function fmt(value: number | null): string {
  if (value === null) return "—";
  return Number.isInteger(value) ? String(value) : (Math.round(value * 100) / 100).toFixed(2);
}

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

export function ImageAllocationTable({
  values,
  onChange,
  catalog,
}: {
  values: StepOneValues;
  onChange: (patch: Partial<StepOneValues>) => void;
  catalog: Catalog;
}) {
  const imageBlend = computeImageBlend(values, catalog);
  const models = getImageModels(catalog);
  const imagesNeeded = imagesNeededFor(values);

  function addRow() {
    const defaultModel = models[0];
    if (!defaultModel) return;
    const remaining = Math.max(
      0,
      100 - values.imageAllocations.reduce((sum, a) => sum + a.percent, 0),
    );
    const newAllocation: ImageAllocation = {
      id: genId(),
      modelId: defaultModel.id,
      modelParams: {},
      percent: remaining,
    };
    onChange({ imageAllocations: [...values.imageAllocations, newAllocation] });
  }

  function updateRow(id: string, patch: Partial<ImageAllocation>) {
    onChange({
      imageAllocations: values.imageAllocations.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    });
  }

  function removeRow(id: string) {
    onChange({ imageAllocations: values.imageAllocations.filter((a) => a.id !== id) });
  }

  const borderClass = "border-b border-r border-white/10";
  const headerBase = "border-b border-r border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70 whitespace-nowrap";

  return (
    <div className="space-y-2.5">
      {/* Dynamic scope note */}
      <p className="text-xs text-white/40">
        {imagesNeeded} images needed — {values.imagesPerMinute} per minute across {values.videoLengthSeconds}s
      </p>

      <div className="w-full overflow-x-auto border-t border-l border-white/10 rounded-lg">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr>
              <th rowSpan={2} className={`${headerBase} min-w-[140px]`}>
                Model
              </th>
              <th colSpan={2} className={`${headerBase} text-center`}>
                Features
              </th>
              <th rowSpan={2} className={`${headerBase} min-w-[90px]`}>
                Allocation
              </th>
              <th rowSpan={2} className={`${headerBase} text-right`}>
                Base Images
              </th>
              <th rowSpan={2} className={`${headerBase} text-right`}>
                Credits / Image
              </th>
              <th rowSpan={2} className={`${headerBase} text-right min-w-[100px]`}>
                Total Credits
              </th>
              <th rowSpan={2} className={`${headerBase} w-8`}></th>
            </tr>
            <tr>
              <th className={`${headerBase} min-w-[90px]`}>Resolution</th>
              <th className={`${headerBase} min-w-[90px]`}>Quality</th>
            </tr>
          </thead>
          <tbody>
            {imageBlend.rows.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-6 text-center text-xs text-white/40 border-b border-r border-white/10">
                  No image models allocated yet — add one below.
                </td>
              </tr>
            ) : (
              imageBlend.rows.map((row) => {
                const model = catalog.models.image[row.modelId];
                const pricedParams = model ? getPricedParams(model) : [];
                const resolParam = pricedParams.find(([k]) => k === "resolution")?.[1];
                const qualityParam = pricedParams.find(([k]) => k === "quality")?.[1];

                return (
                  <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Model dropdown */}
                    <td className={`px-2.5 py-1.5 ${borderClass}`}>
                      <select
                        value={row.modelId}
                        onChange={(e) => {
                          const newId = e.target.value;
                          updateRow(row.id, {
                            modelId: newId,
                            modelParams: {},
                          });
                        }}
                        className="h-7 w-full bg-[#121318] border border-white/15 text-white text-xs px-2 rounded focus:outline-none focus:border-white/40 cursor-pointer"
                      >
                        {models.map((m) => (
                          <option key={m.id} value={m.id} className="bg-[#121318] text-white">
                            {m.name}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Resolution */}
                    <td className={`px-2 py-1.5 ${borderClass}`}>
                      {model && resolParam ? (
                        <select
                          value={getParamValue(model, row.modelParams, "resolution") ?? String(resolParam.default)}
                          onChange={(e) =>
                            updateRow(row.id, {
                              modelParams: { ...row.modelParams, resolution: e.target.value },
                            })
                          }
                          className="h-7 w-full bg-[#121318] border border-white/15 text-white text-xs px-2 rounded focus:outline-none focus:border-white/40 cursor-pointer"
                        >
                          {resolParam.values.map((v) => (
                            <option key={String(v)} value={String(v)} className="bg-[#121318]">
                              {String(v)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-white/30 text-xs px-2">—</span>
                      )}
                    </td>

                    {/* Quality */}
                    <td className={`px-2 py-1.5 ${borderClass}`}>
                      {model && qualityParam ? (
                        <select
                          value={getParamValue(model, row.modelParams, "quality") ?? String(qualityParam.default)}
                          onChange={(e) =>
                            updateRow(row.id, {
                              modelParams: { ...row.modelParams, quality: e.target.value },
                            })
                          }
                          className="h-7 w-full bg-[#121318] border border-white/15 text-white text-xs px-2 rounded focus:outline-none focus:border-white/40 cursor-pointer"
                        >
                          {qualityParam.values.map((v) => (
                            <option key={String(v)} value={String(v)} className="bg-[#121318]">
                              {String(v)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-white/30 text-xs px-2">—</span>
                      )}
                    </td>

                    {/* Allocation % */}
                    <td className={`px-2.5 py-1.5 ${borderClass}`}>
                      <div className="inline-flex h-7 items-center gap-1 rounded border border-white/15 bg-white/[0.03] px-2">
                        <input
                          type="number"
                          value={Math.round(row.percent * 10) / 10}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            const clamped = isNaN(val) ? 0 : Math.max(0, Math.min(row.maxPercent, val));
                            updateRow(row.id, { percent: clamped });
                          }}
                          min={0}
                          max={row.maxPercent}
                          step={1}
                          className="w-9 bg-transparent text-right text-xs text-white tabular-nums focus:outline-none"
                        />
                        <span className="text-xs text-white/50">%</span>
                      </div>
                    </td>

                    {/* Base Images */}
                    <td className={`px-3 py-1.5 text-right tabular-nums text-white/80 ${borderClass}`}>
                      {fmt(row.baseImages)}
                    </td>

                    {/* Credits / Image */}
                    <td className={`px-3 py-1.5 text-right tabular-nums text-white/80 ${borderClass}`}>
                      {fmt(row.creditsPerImage)}
                    </td>

                    {/* Total Credits */}
                    <td className={`px-3 py-1.5 text-right tabular-nums text-white/90 ${borderClass}`}>
                      {fmt(row.totalCredits)}
                    </td>

                    {/* Remove */}
                    <td className={`px-2 py-1.5 text-center ${borderClass}`}>
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
                        className="text-white/30 hover:text-red-400 transition-colors p-1"
                        aria-label="Remove image model"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

          {/* Table Footer */}
          {imageBlend.rows.length > 0 && (
            <tfoot>
              <tr className="bg-white/[0.04] font-medium text-xs text-white">
                <td className={`px-3 py-2 font-semibold ${borderClass}`}>
                  Total / Blended
                </td>
                <td colSpan={2} className={borderClass}></td>
                <td className={`px-3 py-2 tabular-nums ${borderClass} text-[#E5A93C]`}>
                  {Math.round(imageBlend.totalPercent * 10) / 10}%
                </td>
                <td className={`px-3 py-2 text-right tabular-nums ${borderClass}`}>
                  {fmt(imageBlend.blended.baseImages)}
                </td>
                <td className={`px-3 py-2 text-right tabular-nums ${borderClass}`}>
                  {fmt(imageBlend.blended.creditsPerImage)}
                </td>
                <td className={`px-3 py-2 text-right tabular-nums ${borderClass} font-semibold text-[#E5A93C]`}>
                  {fmt(imageBlend.blended.totalCredits)}
                </td>
                <td className={borderClass}></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <div>
        <button
          type="button"
          onClick={addRow}
          className="inline-flex items-center gap-1 text-xs text-white/80 hover:text-white px-3 py-1.5 rounded border border-white/15 bg-white/[0.03] hover:bg-white/[0.08] transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Image Model
        </button>
      </div>
    </div>
  );
}
