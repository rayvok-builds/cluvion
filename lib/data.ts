export interface WorkItem {
  id: string;
  client: string;
  isPlaceholder?: boolean;
  tagline: string;
  category: string;
  duration: string;
  aspectRatio: "16:9" | "9:16" | "2.39:1" | "4:5";
  videoUrl: string;
  posterUrl: string;
  metrics?: string;
  year: string;
}

export const WORK_ITEMS: WorkItem[] = [
  {
    id: "wish-u",
    client: "WISH U",
    isPlaceholder: false,
    tagline: "Brand film, shot nowhere.",
    category: "Brand Film",
    duration: "0:45",
    aspectRatio: "2.39:1",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349391/6.hevc_q4albe.mp4",
    posterUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    metrics: "4.8M Views · 0 Flights",
    year: "2026"
  },
  {
    id: "auraashe",
    client: "AURAASHÈ",
    isPlaceholder: false,
    tagline: "Paris to Jaipur. Zero flights.",
    category: "Haute Couture & Fine Jewelry",
    duration: "0:52",
    aspectRatio: "16:9",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349406/2.hevc_vmuagc.mp4",
    posterUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    metrics: "78% Lower Cost · Global Campaign",
    year: "2026"
  },
  {
    id: "client-perf",
    client: "[CLIENT]",
    isPlaceholder: true,
    tagline: "14 ad variations. One week.",
    category: "Performance Variations",
    duration: "0:30",
    aspectRatio: "9:16",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349395/7.hevc_fltmal.mp4",
    posterUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1200&auto=format&fit=crop",
    metrics: "14 Iterations · 3.2x ROAS",
    year: "2026"
  },
  {
    id: "client-prod",
    client: "[CLIENT]",
    isPlaceholder: true,
    tagline: "Product film. No sample shipped.",
    category: "Photoreal Packshot",
    duration: "0:38",
    aspectRatio: "16:9",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349390/9.hevc_d5gmk6.mp4",
    posterUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    metrics: "100% Digital Asset · 4K Macro",
    year: "2026"
  },
  {
    id: "client-drama",
    client: "[CLIENT]",
    isPlaceholder: true,
    tagline: "AI micro-drama, Episode 01.",
    category: "Episodic Micro-Drama",
    duration: "1:15",
    aspectRatio: "9:16",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788350306/4-tujvmy.hevc_pg3wkf.mp4",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    metrics: "30-Shot Consistency · 1.2M Completions",
    year: "2026"
  },
  {
    id: "client-ugc",
    client: "[CLIENT]",
    isPlaceholder: true,
    tagline: "UGC set, built for performance.",
    category: "Creative Testing Set",
    duration: "0:25",
    aspectRatio: "9:16",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349388/coffee.hevc_jkd40a.mp4",
    posterUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    metrics: "8 Hook Variations · Direct Response",
    year: "2026"
  }
];

export const MARQUEE_CLIENTS = [
  "WISH U",
  "AURAASHÈ",
  "HASTUTII CRAFT",
  "[CLIENT]",
  "[CLIENT]",
  "[CLIENT]",
  "WISH U",
  "AURAASHÈ",
  "HASTUTII CRAFT",
  "[CLIENT]",
  "[CLIENT]",
  "[CLIENT]"
];

export const CAPABILITIES = [
  {
    num: "01",
    title: "Brand Films",
    items: ["Launch films", "Founder stories", "Festive campaigns", "Concept films"],
    leadTime: "7–14 days",
    focus: "Hero identity & narrative scale"
  },
  {
    num: "02",
    title: "Performance & UGC",
    items: ["AI UGC ads", "Hook variations at scale", "Meta & TikTok-ready", "Creative testing"],
    leadTime: "3–5 days",
    focus: "Direct conversion & rapid iteration"
  },
  {
    num: "03",
    title: "Product Films & Stills",
    items: ["Photoreal packshots", "Lifestyle scenes", "Fashion & jewellery", "Any location on earth"],
    leadTime: "4–7 days",
    focus: "Zero sample shipping required"
  },
  {
    num: "04",
    title: "AI Micro-Dramas",
    items: ["Episodic content", "Consistent characters", "Branded storytelling", "The format eating the feed"],
    leadTime: "10–14 days",
    focus: "Recurring characters across 30+ shots"
  },
  {
    num: "05",
    title: "Growth",
    items: ["Meta Ads management", "Social mandates", "We make it, we run it, we scale it"],
    leadTime: "Ongoing Mandate",
    focus: "Full-funnel creative to ad spend"
  }
];

export const PROCESS_STEPS = [
  {
    code: "BR",
    num: "01",
    name: "Brief",
    desc: "Tell us the brand and the goal. Concept and fixed quote back in 48 hours.",
    eta: "48 Hours"
  },
  {
    code: "SB",
    num: "02",
    name: "Storyboard",
    desc: "Script, shots, characters, product locks — approved by you before a single frame exists.",
    eta: "Day 3–4"
  },
  {
    code: "PR",
    num: "03",
    name: "Production",
    desc: "We direct the models, frame by frame, until it's undeniable.",
    eta: "Day 5–9"
  },
  {
    code: "DL",
    num: "04",
    name: "Delivery",
    desc: "Every ratio, every platform, variations on demand.",
    eta: "Day 10"
  }
];

export const FAQS = [
  {
    q: "Will it look AI?",
    a: "If it looks AI, it doesn't leave the studio."
  },
  {
    q: "Can you show my actual product?",
    a: "Yes — exact textures, stones, logos, stitching. You approve the product lock before we produce anything."
  },
  {
    q: "How fast?",
    a: "UGC sets in 3–5 days. Brand films in 7–14."
  },
  {
    q: "Who owns it?",
    a: "You. Everything. Forever."
  },
  {
    q: "How much do I actually save?",
    a: "Typically 60–90% versus an equivalent shoot, with no location, casting, or travel cost to begin with."
  },
  {
    q: "Do you run the ads too?",
    a: "Yes — same team, production to performance. It's why our films convert."
  }
];
