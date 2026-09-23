import type { Catalog, EnumParam, ImageCostTier, ImageModel } from "./types";

export function getImageModels(catalog: Catalog | undefined): ImageModel[] {
  if (!catalog) return [];
  return Object.values(catalog.models.image).sort((a, b) => a.name.localeCompare(b.name));
}

export function getPricedParams(model: ImageModel): [string, EnumParam][] {
  return model.cost.priced_by.flatMap((key) => {
    const param = model.params[key];
    return param && param.type === "enum" ? [[key, param] as [string, EnumParam]] : [];
  });
}

export function getParamValue(
  model: ImageModel,
  selected: Record<string, string>,
  key: string,
): string | undefined {
  const chosen = selected[key];
  if (chosen !== undefined) return chosen;
  const param = model.params[key];
  return param === undefined ? undefined : String(param.default);
}

function tierValue(tier: ImageCostTier, key: string): string | undefined {
  const value = (tier as Record<string, unknown>)[key];
  return value === undefined ? undefined : String(value);
}

export function getImageCredits(
  model: ImageModel,
  selected: Record<string, string>,
): number | null {
  const match = model.cost.tiers.find((tier) =>
    model.cost.priced_by.every((key) => tierValue(tier, key) === getParamValue(model, selected, key)),
  );
  return match ? match.credits : null;
}
