"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import type { Catalog, ModelAllocation, StepOneValues } from "./types";
import { computeBlend, secondsForPercent } from "./blend-math";
import {
  getModels,
  getDurationParam,
  getAudioParam,
  audioToggleValues,
  formatParamValue,
} from "./model-cost";

function fmt(value: number | null): string {
  if (value === null) return "—";
  return Number.isInteger(value) ? String(value) : (Math.round(value * 100) / 100).toFixed(2);
}

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

export function AllocationTable({
  values,
  onChange,
  catalog,
}: {
  values: StepOneValues;
  onChange: (patch: Partial<StepOneValues>) => void;
  catalog: Catalog;
}) {
  const blend = computeBlend(values, catalog);
  const models = getModels(catalog);

  function addRow() {
    const defaultModel = models[0];
    if (!defaultModel) return;
    const durationParam = getDurationParam(defaultModel);
    const newAllocation: ModelAllocation = {
      id: genId(),
      modelId: defaultModel.id,
      modelParams: { duration: String(durationParam.default) },
      secondsAllocated: 0,
    };
    onChange({ allocations: [...values.allocations, newAllocation] });
  }

  function updateRow(id: string, patch: Partial<ModelAllocation>) {
    onChange({
      allocations: values.allocations.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    });
  }

  function removeRow(id: string) {
    onChange({ allocations: values.allocations.filter((a) => a.id !== id) });
  }

  const borderClass = "border-b border-r border-white/10";
  const headerBase = "border-b border-r border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-white/70 whitespace-nowrap";

  return (
    <div className="space-y-3">
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
                Seconds
              </th>
              <th rowSpan={2} className={`${headerBase} text-center min-w-[110px]`}>
                <div className="flex flex-col items-center leading-tight">
                  <span>Clip Duration</span>
                  <span className="text-[10px] text-white/40 font-normal">(seconds)</span>
                </div>
              </th>
              <th rowSpan={2} className={`${headerBase} text-right`}>
                Base Clips
              </th>
              <th rowSpan={2} className={`${headerBase} text-right`}>
                Credits / Clip
              </th>
              <th colSpan={2} className={`${headerBase} text-center`}>
                Retakes
              </th>
              <th colSpan={2} className={`${headerBase} text-center`}>
                Credits
              </th>
              <th rowSpan={2} className={`${headerBase} w-8`}></th>
            </tr>
            <tr>
              <th className={`${headerBase} min-w-[90px]`}>Resolution</th>
              <th className={`${headerBase} text-center w-14`}>Audio</th>
              <th className={`${headerBase} text-right min-w-[60px]`}>Min</th>
              <th className={`${headerBase} text-right min-w-[60px]`}>Max</th>
              <th className={`${headerBase} text-right min-w-[70px]`}>Min</th>
              <th className={`${headerBase} text-right min-w-[70px]`}>Max</th>
            </tr>
          </thead>
          <tbody>
            {blend.rows.length === 0 ? (
              <tr>
                <td colSpan={13} className="py-6 text-center text-xs text-white/40 border-b border-r border-white/10">
                  No models allocated yet — add one below.
                </td>
              </tr>
            ) : (
              blend.rows.map((row) => {
                const model = catalog.models.video[row.modelId];
                const resolutionParam = model?.params.resolution;
                const audio = model ? getAudioParam(model) : undefined;
                const durationParam = model ? getDurationParam(model) : undefined;

                const [audioKey, audioParam] = audio ?? [];
                const toggle = audioParam ? audioToggleValues(audioParam) : null;
                const isAudioOn =
                  audioKey && toggle ? row.modelParams[audioKey] === toggle.on : false;

                return (
                  <tr key={row.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Model dropdown */}
                    <td className={`px-2.5 py-1.5 ${borderClass}`}>
                      <select
                        value={row.modelId}
                        onChange={(e) => {
                          const newId = e.target.value;
                          const newModel = catalog.models.video[newId];
                          const dp = newModel ? getDurationParam(newModel) : undefined;
                          updateRow(row.id, {
                            modelId: newId,
                            modelParams: dp ? { duration: String(dp.default) } : {},
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
                      {resolutionParam && resolutionParam.type === "enum" ? (
                        <select
                          value={row.modelParams.resolution ?? String(resolutionParam.default)}
                          onChange={(e) =>
                            updateRow(row.id, {
                              modelParams: { ...row.modelParams, resolution: e.target.value },
                            })
                          }
                          className="h-7 w-full bg-[#121318] border border-white/15 text-white text-xs px-2 rounded focus:outline-none focus:border-white/40 cursor-pointer"
                        >
                          {resolutionParam.values.map((v) => (
                            <option key={String(v)} value={String(v)} className="bg-[#121318]">
                              {formatParamValue(v)}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-white/30 text-xs px-2">—</span>
                      )}
                    </td>

                    {/* Audio */}
                    <td className={`px-2 py-1.5 text-center ${borderClass}`}>
                      {audioKey && toggle ? (
                        <input
                          type="checkbox"
                          checked={isAudioOn}
                          onChange={(e) =>
                            updateRow(row.id, {
                              modelParams: {
                                ...row.modelParams,
                                [audioKey]: e.target.checked ? toggle.on : toggle.off,
                              },
                            })
                          }
                          className="h-4 w-4 rounded border-white/20 accent-[#E5A93C] cursor-pointer"
                          aria-label="Toggle audio"
                        />
                      ) : (
                        <span className="text-white/30 text-xs">—</span>
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
                            updateRow(row.id, {
                              secondsAllocated: secondsForPercent(clamped, values.videoLengthSeconds),
                            });
                          }}
                          min={0}
                          max={row.maxPercent}
                          step={1}
                          className="w-9 bg-transparent text-right text-xs text-white tabular-nums focus:outline-none"
                        />
                        <span className="text-xs text-white/50">%</span>
                      </div>
                    </td>

                    {/* Seconds */}
                    <td className={`px-3 py-1.5 text-right tabular-nums text-white/70 ${borderClass}`}>
                      {fmt(row.secondsAllocated)}
                    </td>

                    {/* Clip Duration */}
                    <td className={`px-2 py-1.5 text-center ${borderClass}`}>
                      {durationParam?.type === "enum" ? (
                        <select
                          value={String(row.duration)}
                          onChange={(e) =>
                            updateRow(row.id, {
                              modelParams: { ...row.modelParams, duration: e.target.value },
                            })
                          }
                          className="h-7 bg-[#121318] border border-white/15 text-white text-xs px-2 rounded focus:outline-none focus:border-white/40 cursor-pointer"
                        >
                          {durationParam.values.map((v) => (
                            <option key={String(v)} value={String(v)} className="bg-[#121318]">
                              {v}
                            </option>
                          ))}
                        </select>
                      ) : durationParam?.type === "range" ? (
                        <input
                          type="number"
                          value={row.duration}
                          min={durationParam.min}
                          max={durationParam.max}
                          onChange={(e) =>
                            updateRow(row.id, {
                              modelParams: { ...row.modelParams, duration: e.target.value },
                            })
                          }
                          className="h-7 w-14 bg-[#121318] border border-white/15 text-white text-xs px-1 text-center rounded focus:outline-none focus:border-white/40 tabular-nums"
                        />
                      ) : (
                        <span className="text-white/50 text-xs">{row.duration}</span>
                      )}
                    </td>

                    {/* Base Clips */}
                    <td className={`px-3 py-1.5 text-right tabular-nums text-white/80 ${borderClass}`}>
                      {fmt(row.baseClipsNeeded)}
                    </td>

                    {/* Credits / Clip */}
                    <td className={`px-3 py-1.5 text-right tabular-nums text-white/80 ${borderClass}`}>
                      {fmt(row.creditsPerClip)}
                    </td>

                    {/* Retakes Min */}
                    <td className={`px-3 py-1.5 text-right tabular-nums text-white/70 ${borderClass}`}>
                      {fmt(row.minRetakeClips)}
                    </td>

                    {/* Retakes Max */}
                    <td className={`px-3 py-1.5 text-right tabular-nums text-white/70 ${borderClass}`}>
                      {fmt(row.maxRetakeClips)}
                    </td>

                    {/* Credits Min */}
                    <td className={`px-3 py-1.5 text-right tabular-nums text-white/90 ${borderClass}`}>
                      {fmt(row.totalMinCredits)}
                    </td>

                    {/* Credits Max */}
                    <td className={`px-3 py-1.5 text-right tabular-nums text-white/90 ${borderClass}`}>
                      {fmt(row.totalMaxCredits)}
                    </td>

                    {/* Remove */}
                    <td className={`px-2 py-1.5 text-center ${borderClass}`}>
                      <button
                        type="button"
                        onClick={() => removeRow(row.id)}
                        className="text-white/30 hover:text-red-400 transition-colors p-1"
                        aria-label="Remove model"
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
          {blend.rows.length > 0 && (
            <tfoot>
              <tr className="bg-white/[0.04] font-medium text-xs text-white">
                <td className={`px-3 py-2 font-semibold ${borderClass}`}>
                  Total / Blended
                </td>
                <td colSpan={2} className={borderClass}></td>
                <td className={`px-3 py-2 tabular-nums ${borderClass} text-[#E5A93C]`}>
                  {Math.round(blend.totalPercent * 10) / 10}%
                </td>
                <td className={`px-3 py-2 text-right tabular-nums ${borderClass}`}>
                  {fmt(values.videoLengthSeconds)}
                </td>
                <td className={borderClass}></td>
                <td className={`px-3 py-2 text-right tabular-nums ${borderClass}`}>
                  {fmt(blend.blended.baseClipsNeeded)}
                </td>
                <td className={`px-3 py-2 text-right tabular-nums ${borderClass}`}>
                  {fmt(blend.blended.creditsPerClip)}
                </td>
                <td className={`px-3 py-2 text-right tabular-nums ${borderClass}`}>
                  {fmt(blend.blended.minRetakeClips)}
                </td>
                <td className={`px-3 py-2 text-right tabular-nums ${borderClass}`}>
                  {fmt(blend.blended.maxRetakeClips)}
                </td>
                <td className={`px-3 py-2 text-right tabular-nums ${borderClass} font-semibold text-[#E5A93C]`}>
                  {fmt(blend.blended.totalMinCredits)}
                </td>
                <td className={`px-3 py-2 text-right tabular-nums ${borderClass} font-semibold text-[#E5A93C]`}>
                  {fmt(blend.blended.totalMaxCredits)}
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
          Add Model
        </button>
      </div>
    </div>
  );
}
