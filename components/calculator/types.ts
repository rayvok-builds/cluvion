export type Provider = {
  id: string;
  name: string;
  website: string;
  docs?: string;
  currency: string;
};

export type Plan = {
  id: string;
  name: string;
  monthly_cost: number;
  yearly_cost?: number;
  credits_per_month: number;
  credits_per_year?: number;
};

export type Pricing = {
  source: string;
  last_verified: string;
  plans: Plan[];
};

export type ParamValue = string | number | boolean;

export type EnumParam = {
  type: "enum";
  values: ParamValue[];
  default: ParamValue;
};

export type RangeParam = {
  type: "range";
  min: number;
  max: number;
  default: number;
};

export type Param = EnumParam | RangeParam;

export type CostRate = {
  resolution: string;
  rate: number;
  audio_multiplier?: number;
};

export type LookupCostTier = {
  resolution: string;
  duration: number;
  credits: number;
};

export type VideoCost =
  | { pricing_model: "linear"; rates: CostRate[] }
  | { pricing_model: "lookup"; tiers: LookupCostTier[] };

export type VideoModel = {
  id: string;
  name: string;
  job_type: string;
  last_verified: string;
  fixed_params?: Record<string, string>;
  type: "video";
  params: Record<string, Param> & {
    duration: Param;
    resolution?: Param;
  };
  cost: VideoCost;
};

export type ImageCostTier = {
  resolution: string;
  quality?: string;
  credits: number;
  [key: string]: unknown;
};

export type ImageCost = {
  pricing_model: "lookup";
  priced_by: string[];
  tiers: ImageCostTier[];
};

export type ImageModel = {
  id: string;
  name: string;
  job_type: string;
  last_verified: string;
  fixed_params?: Record<string, string>;
  type: "image";
  params: Record<string, Param>;
  cost: ImageCost;
};

export type Catalog = {
  providers: Record<string, Provider>;
  pricing: Record<string, Pricing>;
  models: {
    video: Record<string, VideoModel>;
    image: Record<string, ImageModel>;
  };
};

export type ModelAllocation = {
  id: string;
  modelId: string;
  modelParams: Record<string, string>;
  secondsAllocated: number;
};

export type ImageAllocation = {
  id: string;
  modelId: string;
  modelParams: Record<string, string>;
  percent: number;
};

export type StepOneValues = {
  videoLengthSeconds: number;
  allocations: ModelAllocation[];
  minRetake: number;
  maxRetake: number;
  imagesPerMinute: number;
  imageAllocations: ImageAllocation[];
  planId: string;
  monthlyCost: number;
  monthlyCredits: number;
  artistSalaryPerMonth: number;
  workingDaysPerMonth: number;
  artistDaysPerMinute: number;
  editorCostPerVideo: number;
  softwareCostPerVideo: number;
  profitMarginPercent: number;
  numberOfVideos: number;
  deadlineMonths: number;
  volumeDiscountPercent: number;
};

export const DEFAULT_STEP_ONE: StepOneValues = {
  videoLengthSeconds: 1,
  allocations: [],
  minRetake: 1,
  maxRetake: 1,
  imagesPerMinute: 0,
  imageAllocations: [],
  planId: "",
  monthlyCost: 0,
  monthlyCredits: 0,
  artistSalaryPerMonth: 0,
  workingDaysPerMonth: 5,
  artistDaysPerMinute: 0,
  editorCostPerVideo: 0,
  softwareCostPerVideo: 0,
  profitMarginPercent: 0,
  numberOfVideos: 1,
  deadlineMonths: 0.5,
  volumeDiscountPercent: 0,
};

export type CalculatorFormData = {
  stepOne: StepOneValues;
};

export const DEFAULT_CALCULATOR_DATA: CalculatorFormData = {
  stepOne: DEFAULT_STEP_ONE,
};
