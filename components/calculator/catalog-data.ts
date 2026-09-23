import type { Catalog, ImageModel, VideoModel } from "./types";

export const seedance2: VideoModel = {
  id: "seedance_2_0",
  name: "Seedance 2.0",
  job_type: "seedance_2_0",
  last_verified: "2026-09-18",
  type: "video",
  params: {
    duration: { type: "range", min: 4, max: 15, default: 5 },
    resolution: { type: "enum", values: ["480p", "720p", "1080p", "4k"], default: "1080p" },
  },
  cost: {
    pricing_model: "linear",
    rates: [
      { resolution: "480p", rate: 3 },
      { resolution: "720p", rate: 4.5 },
      { resolution: "1080p", rate: 9 },
      { resolution: "4k", rate: 22 },
    ],
  },
};

export const kling26: VideoModel = {
  id: "kling2_6",
  name: "Kling 2.6",
  job_type: "kling2_6",
  last_verified: "2026-09-15",
  type: "video",
  params: {
    duration: { type: "enum", values: [5, 10], default: 5 },
    sound: { type: "enum", values: [true, false], default: false },
    resolution: { type: "enum", values: ["720p", "1080p"], default: "1080p" },
  },
  cost: {
    pricing_model: "linear",
    rates: [
      { resolution: "720p", rate: 4.5, audio_multiplier: 1.5 },
      { resolution: "1080p", rate: 7.5, audio_multiplier: 1.8 },
      { resolution: "default", rate: 6, audio_multiplier: 1.6 },
    ],
  },
};

export const veoAudio: VideoModel = {
  id: "veo_audio",
  name: "Veo Generate Audio",
  job_type: "veo_audio",
  last_verified: "2026-09-16",
  type: "video",
  params: {
    duration: { type: "enum", values: [4, 8], default: 8 },
    generate_audio: { type: "enum", values: ["on", "off"], default: "off" },
    resolution: { type: "enum", values: ["720p", "1080p", "4k"], default: "1080p" },
  },
  cost: {
    pricing_model: "linear",
    rates: [
      { resolution: "720p", rate: 6, audio_multiplier: 1.4 },
      { resolution: "1080p", rate: 10, audio_multiplier: 1.5 },
      { resolution: "4k", rate: 25, audio_multiplier: 1.5 },
      { resolution: "default", rate: 8, audio_multiplier: 1.5 },
    ],
  },
};

export const runwayGen3: VideoModel = {
  id: "runway_gen3",
  name: "Runway Gen-3 Alpha",
  job_type: "runway_gen3",
  last_verified: "2026-09-12",
  type: "video",
  params: {
    duration: { type: "enum", values: [5, 10], default: 5 },
    resolution: { type: "enum", values: ["720p", "1080p"], default: "1080p" },
  },
  cost: {
    pricing_model: "linear",
    rates: [
      { resolution: "720p", rate: 5 },
      { resolution: "1080p", rate: 10 },
      { resolution: "default", rate: 8 },
    ],
  },
};

export const gptImage2: ImageModel = {
  id: "gpt_image_2",
  name: "GPT Image 2",
  job_type: "gpt_image_2",
  last_verified: "2026-09-16",
  type: "image",
  params: {
    resolution: { type: "enum", values: ["1k", "2k", "4k"], default: "2k" },
    quality: { type: "enum", values: ["low", "medium", "high"], default: "high" },
    aspect_ratio: { type: "enum", values: ["auto", "1:1", "16:9"], default: "16:9" },
  },
  cost: {
    pricing_model: "lookup",
    priced_by: ["resolution", "quality"],
    tiers: [
      { resolution: "1k", quality: "low", credits: 0.5 },
      { resolution: "1k", quality: "medium", credits: 1 },
      { resolution: "1k", quality: "high", credits: 3.5 },
      { resolution: "2k", quality: "low", credits: 0.5 },
      { resolution: "2k", quality: "medium", credits: 2 },
      { resolution: "2k", quality: "high", credits: 6.5 },
      { resolution: "4k", quality: "low", credits: 0.75 },
      { resolution: "4k", quality: "medium", credits: 2.5 },
      { resolution: "4k", quality: "high", credits: 11 },
    ],
  },
};

export const nanoBanana2: ImageModel = {
  id: "nano_banana_flash",
  name: "Nano Banana 2",
  job_type: "nano_banana_flash",
  last_verified: "2026-09-16",
  type: "image",
  params: {
    resolution: { type: "enum", values: ["1k", "2k", "4k"], default: "2k" },
    is_inpaint: { type: "enum", values: [true, false], default: false },
  },
  cost: {
    pricing_model: "lookup",
    priced_by: ["resolution"],
    tiers: [
      { resolution: "1k", credits: 1.5 },
      { resolution: "2k", credits: 2 },
      { resolution: "4k", credits: 3 },
    ],
  },
};

export const midjourneyV6: ImageModel = {
  id: "midjourney_v6",
  name: "Midjourney v6.1",
  job_type: "midjourney_v6",
  last_verified: "2026-09-18",
  type: "image",
  params: {
    resolution: { type: "enum", values: ["1k", "2k"], default: "2k" },
  },
  cost: {
    pricing_model: "lookup",
    priced_by: ["resolution"],
    tiers: [
      { resolution: "1k", credits: 2 },
      { resolution: "2k", credits: 4 },
    ],
  },
};

export const DEFAULT_CATALOG: Catalog = {
  providers: {
    cluvion_ai: {
      id: "cluvion_ai",
      name: "AI Model Suite",
      website: "https://cluvion.studio",
      currency: "USD",
    },
  },
  pricing: {
    cluvion_ai: {
      source: "internal_rates",
      last_verified: "2026-09-20",
      plans: [
        { id: "starter", name: "Starter Tier", monthly_cost: 29, credits_per_month: 600 },
        { id: "pro", name: "Pro Production", monthly_cost: 79, credits_per_month: 1800 },
        { id: "studio", name: "Studio Enterprise", monthly_cost: 199, credits_per_month: 5000 },
      ],
    },
  },
  models: {
    video: {
      seedance_2_0: seedance2,
      kling2_6: kling26,
      veo_audio: veoAudio,
      runway_gen3: runwayGen3,
    },
    image: {
      gpt_image_2: gptImage2,
      nano_banana_flash: nanoBanana2,
      midjourney_v6: midjourneyV6,
    },
  },
};
