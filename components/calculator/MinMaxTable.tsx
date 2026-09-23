"use client";

import React from "react";
import type { MinMax } from "./math-utils";

function fmtMoney(v: number | null): string {
  if (v === null) return "—";
  return v.toFixed(2);
}

function fmtPercent(v: number | null): string {
  if (v === null) return "—";
  return `${Number.isInteger(v) ? v : v.toFixed(1)}%`;
}

function fmtQuantity(v: number | null): string {
  if (v === null) return "—";
  return Number.isInteger(v) ? String(v) : String(v);
}

export type MinMaxRow = {
  label: string;
  value: MinMax | number | null;
  kind?: "money" | "percent" | "quantity";
  highlight?: boolean;
};

function isSingle(value: MinMaxRow["value"]): value is number | null {
  return value === null || typeof value === "number";
}

export function MinMaxTable({
  labelHeader,
  rows,
}: {
  labelHeader: string;
  rows: MinMaxRow[];
}) {
  function formatVal(v: number | null, kind: MinMaxRow["kind"] = "money") {
    if (kind === "money") return fmtMoney(v);
    if (kind === "percent") return fmtPercent(v);
    return fmtQuantity(v);
  }

  const borderClass = "border-b border-r border-white/10";
  const headerClass = `${borderClass} bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-white/70 whitespace-nowrap`;

  return (
    <div className="w-fit max-w-full overflow-x-auto border-t border-l border-white/10 rounded-lg">
      <table className="border-collapse text-sm">
        <thead>
          <tr>
            <th className={`${headerClass} text-left min-w-[260px] sm:min-w-[320px]`}>
              {labelHeader}
            </th>
            <th className={`${headerClass} text-right min-w-[120px] sm:min-w-[140px]`}>
              Min Retake (Best Case)
            </th>
            <th className={`${headerClass} text-right min-w-[120px] sm:min-w-[140px]`}>
              Max Retake (Worst Case)
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const highlightClass = row.highlight
              ? "bg-[#E5A93C]/[0.08] font-medium text-white"
              : "text-white/80 hover:bg-white/[0.02]";

            return (
              <tr key={row.label} className={`transition-colors ${highlightClass}`}>
                <td className={`${borderClass} px-3.5 py-1.5 text-left text-xs sm:text-sm text-white/90`}>
                  {row.label}
                </td>
                {isSingle(row.value) ? (
                  <td
                    colSpan={2}
                    className={`${borderClass} px-3.5 py-1.5 text-center tabular-nums text-xs sm:text-sm text-white/80`}
                  >
                    {formatVal(row.value, row.kind)}
                  </td>
                ) : (
                  <>
                    <td className={`${borderClass} px-3.5 py-1.5 text-right tabular-nums text-xs sm:text-sm text-white/80`}>
                      {formatVal(row.value.min, row.kind)}
                    </td>
                    <td className={`${borderClass} px-3.5 py-1.5 text-right tabular-nums text-xs sm:text-sm text-white/80`}>
                      {formatVal(row.value.max, row.kind)}
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
