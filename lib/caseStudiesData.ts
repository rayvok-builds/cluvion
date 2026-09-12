export interface CaseStudyData {
  id: string;
  client: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  duration: string;
  aspectRatio: "16:9" | "9:16";
  videoUrl: string;
  posterUrl: string;
  mandate: string;
  stats: {
    label: string;
    value: string;
    note: string;
  }[];
  overview: string;
  challenge: string;
  pipeline: {
    title: string;
    detail: string;
  }[];
  deliverables: string[];
  results: string[];
}

export const CASE_STUDIES: CaseStudyData[] = [
  {
    id: "wish-u",
    client: "WISH U",
    title: "The Zero-Flight Haute Couture Campaign",
    subtitle: "Shot Nowhere. Delivered Everywhere.",
    category: "Luxury Fashion",
    year: "2026",
    duration: "0:45",
    aspectRatio: "9:16",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349391/6.hevc_q4albe.mp4",
    posterUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
    mandate: "Global Brand Film & 14 Vertical Variations",
    stats: [
      { label: "AD VARIATIONS", value: "14", note: "TESTED IN WEEK 01" },
      { label: "TURNAROUND", value: "07", note: "DAYS BRIEF TO FINAL" },
      { label: "FORMATS", value: "06", note: "16:9, 9:16, 4:5, 1:1" },
      { label: "FLIGHTS", value: "00", note: "ZERO TRAVEL PERMITS" }
    ],
    overview: "WISH U sought to launch their 2026 couture capsule globally across 12 territories simultaneously without the 6-week lag and multimillion-dollar footprint of a traditional Paris/Milan production.",
    challenge: "High-fashion garments require exact fabric drape, silk sheen, and micro-embroidery that typical AI generators distort into melted pixels. The client required 100% garment fidelity with runway-grade lighting.",
    pipeline: [
      { title: "Mesh & Texture Lock", detail: "Scanned the actual couture patterns with 8K macro texture maps, locking fabric dynamics before animating." },
      { title: "Virtual Paris Synthesized Sets", detail: "Created rain-slicked Haussmann cobblestone streets and neoclassical ballrooms with custom cinematic lighting." },
      { title: "Consistent Model Casting", detail: "Generated a bespoke, brand-exclusive AI muse maintained identically across 14 distinct angles and scenes." },
      { title: "Dynamic Sound Mastering", detail: "Bespoke spatial sound design featuring Foley textile rustles and an original orchestral score." }
    ],
    deliverables: [
      "1x 45s Cinematic Master Film (9:16 4K)",
      "14x Meta & TikTok Hook Iterations",
      "8x Ultra-Hi-Res Editorial Packshots",
      "Global Multi-Language Subtitle Masters"
    ],
    results: [
      "4.8M View-Throughs across Meta & TikTok in first 14 days",
      "68% reduction in total campaign production expenditure",
      "3.4x higher click-to-cart conversion rate vs. previous live-action ads",
      "Zero logistical delays or weather rescheduling"
    ]
  },
  {
    id: "auraashe",
    client: "AURAASHÈ",
    title: "Light & Refraction: High Jewellery Odyssey",
    subtitle: "Paris to Jaipur. Zero flights.",
    category: "Haute Joaillerie",
    year: "2026",
    duration: "0:52",
    aspectRatio: "9:16",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349406/2.hevc_vmuagc.mp4",
    posterUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop",
    mandate: "High-Jewellery Solitaire Masterpiece & Macro Stills",
    stats: [
      { label: "DIAMOND CUTS", value: "100%", note: "PHOTOREAL REFRACTION" },
      { label: "TURNAROUND", value: "05", note: "DAYS FROM 3D CAD" },
      { label: "COST SAVED", value: "78%", note: "VS PHYSICAL INSURED SHOOT" },
      { label: "GLOBAL REACH", value: "3.2M", note: "TARGETED HNW AUDIENCE" }
    ],
    overview: "AURAASHÈ needed a cinema film capturing the unearthly brilliance of their heritage emerald and diamond solitaire necklace without risking millions in transit insurance and armored security transport.",
    challenge: "Gemstone caustics, prism dispersion, and skin subsurface scattering are notoriously challenging. The film required optical accuracy down to individual facet cuts and pavé prong settings.",
    pipeline: [
      { title: "Optical Dispersion Simulation", detail: "Calibrated refractive indexes for D-flawless diamonds and Colombian emeralds under virtual studio fresnel lights." },
      { title: "Macro Camera Choreography", detail: "Programmed impossible virtual probe-lens camera sweeps passing through the heart of the gemstone mounting." },
      { title: "Skin Micro-Texture Synthesis", detail: "Synthesized realistic porcelain skin pores and micro-vellus hair to prevent the 'plastic doll' AI appearance." }
    ],
    deliverables: [
      "1x 52s Master Brand Showcase (9:16 4K)",
      "6x Extreme Macro Loop Videos",
      "12x Billboard-Resolution Print Stills",
      "Instagram Stories & Reels Cutdowns"
    ],
    results: [
      "Total campaign delivered 78% below historical budget",
      "Sold out the entire 12-piece limited run within 72 hours of launch",
      "Zero security or insurance expenditure incurred"
    ]
  },
  {
    id: "hastutii",
    client: "HASTUTII CRAFT",
    title: "Heritage Weaves in Cinematic Light",
    subtitle: "Ancient Indian Crafts meet Next-Gen Cinema",
    category: "Heritage Apparel",
    year: "2026",
    duration: "1:15",
    aspectRatio: "9:16",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788350306/4-tujvmy.hevc_pg3wkf.mp4",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop",
    mandate: "Heritage Royal Apparel Episodic Micro-Drama",
    stats: [
      { label: "SEQUENTIAL SHOTS", value: "30+", note: "CONSISTENT CHARACTER" },
      { label: "PRODUCTION TIME", value: "09", note: "DAYS TO COMPLETION" },
      { label: "ENGAGEMENT", value: "+84%", note: "COMPLETION RATE" },
      { label: "HERITAGE PALACES", value: "05", note: "SYNTHESIZED ARCHITECTURE" }
    ],
    overview: "HASTUTII CRAFT represents generations of artisanal zardozi hand-loom weavers. They required a narrative mini-film conveying royal ancestry, craftsmanship, and regal poise.",
    challenge: "Recreating intricate gold-wire embroidery (zari) that glints organically with natural sun movement, set against historical sandstone palace courtyards without tourist interference or shooting fees.",
    pipeline: [
      { title: "Zari Thread Shader", detail: "Engineered a custom metallic reflection shader that captures the raw hand-woven imperfections of gold thread." },
      { title: "Architectural Synthesis", detail: "Modeled grand Rajasthani jharokhas and step-wells with golden-hour dust-mote volumetric lighting." },
      { title: "Episodic Story Arc", detail: "Structured 30 sequential scenes telling a cohesive emotional story of an empress selecting her coronation drape." }
    ],
    deliverables: [
      "1x 75s Micro-Drama Episode Master",
      "10x Social Hook Variations",
      "4K Vertical Campaign Cutdowns"
    ],
    results: [
      "84% video completion rate on Instagram and YouTube Shorts",
      "Elevated brand positioning leading to exclusive luxury retail partnerships in Dubai & London"
    ]
  },
  {
    id: "mercedes",
    client: "MERCEDES-BENZ",
    title: "Electric Luxury in Synthetic Landscapes",
    subtitle: "High-Speed Cinema Without Road Closures",
    category: "Automotive EV",
    year: "2026",
    duration: "0:45",
    aspectRatio: "16:9",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788358969/Copy-of-mercedece.hevc_hhojlb.mp4",
    posterUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop",
    mandate: "Global Concept EV Launch Film & Social Cutdowns",
    stats: [
      { label: "LOCATION PERMITS", value: "00", note: "ZERO ROADS CLOSED" },
      { label: "CHASE CAM SPEED", value: "140", note: "KM/H SIMULATED DYNAMICS" },
      { label: "DELIVERY SPEED", value: "10", note: "DAYS TOTAL TURNAROUND" },
      { label: "ROAS IMPACT", value: "4.2x", note: "TARGET REACH EXCEEDED" }
    ],
    overview: "Mercedes-Benz needed an aggressive, nocturnal launch film for their high-performance electric coupe sweeping through futuristic coastal tunnels and Alpine mountain passes.",
    challenge: "Simulating physical car aerodynamics, wet tarmac reflections, brake-disc heat glow, and high-speed motion blur without the extreme cost of helicopter chase-cams and closed roads.",
    pipeline: [
      { title: "Rigid-Body Car Chassis Lock", detail: "Imported factory CAD vehicle blueprints to ensure millimeter-accurate panel gaps, badges, and headlight arrays." },
      { title: "Atmospheric Weather Simulation", detail: "Synthesized wet midnight asphalt, rain spray from Pirelli tires, and volumetric neon tunnel refractions." },
      { title: "Virtual Russian Arm Rig", detail: "Emulated a 150km/h camera tracking arm with anamorphic lens flares and realistic camera vibration." }
    ],
    deliverables: [
      "1x 45s Full 16:9 4K Cinema Master Film",
      "6x 9:16 Vertical Cutdowns for Meta & YouTube",
      "High-Resolution Press Stills"
    ],
    results: [
      "Over 6.5M impressions across Europe and APAC",
      "Saved an estimated $350,000 in physical production, crew, and vehicle transport costs",
      "Completed in 10 calendar days versus 7 weeks for physical filming"
    ]
  },
  {
    id: "cosmetics",
    client: "LUMEN COSMETICS",
    title: "The 14-Variation Performance UGC Engine",
    subtitle: "1 Master Concept → 14 Converting Ads",
    category: "D2C Performance",
    year: "2026",
    duration: "0:30",
    aspectRatio: "9:16",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349395/7.hevc_fltmal.mp4",
    posterUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1600&auto=format&fit=crop",
    mandate: "Direct Response Meta Ads Scaling Engine",
    stats: [
      { label: "UGC VARIATIONS", value: "14", note: "PRODUCED IN 5 DAYS" },
      { label: "ROAS TARGET", value: "3.8x", note: "META CAMPAIGN BLENDED" },
      { label: "CREATOR FEES", value: "00", note: "ZERO PHYSICAL INFLUENCERS" },
      { label: "TESTING VELOCITY", value: "3x", note: "FASTER CREATIVE ROTATION" }
    ],
    overview: "LUMEN COSMETICS required an aggressive creative testing engine for their serum launch, testing 14 different hooks, aesthetic backgrounds, and voiceover tones simultaneously on Meta.",
    challenge: "Hiring 14 different beauty influencers requires shipping samples, negotiating contracts, waiting weeks for raw footage, and hoping for good lighting. LUMEN needed instant creative agility.",
    pipeline: [
      { title: "Virtual Creator Personas", detail: "Created 4 distinct photorealistic female creators spanning different skin types, hair textures, and vocal cadences." },
      { title: "Modular Hook Variations", detail: "Generated 14 opening 3-second visual hooks testing problem-aware vs. solution-aware angles." },
      { title: "Micro-Droplet Physics", detail: "Simulated viscous serum dropper physics, skin absorption, and radiant glass-skin glow." }
    ],
    deliverables: [
      "14x Unique 9:16 Performance Ads",
      "A/B Testing Matrix with Native TikTok & IG Captions",
      "Raw Hook Library for ongoing iteration"
    ],
    results: [
      "Achieved 3.8x blended ROAS within the first 10 days of ad deployment",
      "Eliminated 100% of influencer management overhead and sample shipping delays",
      "Winning hook generated over $240,000 in direct revenue"
    ]
  },
  {
    id: "okapi-swim",
    client: "OKAPI SWIM",
    title: "Mediterranean Sun Without the Flight",
    subtitle: "Coastal Summer Campaign Shot in Mid-Winter",
    category: "Coastal Apparel",
    year: "2026",
    duration: "0:50",
    aspectRatio: "16:9",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788358987/okapiswim.hevc_wgp3od.mp4",
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
    mandate: "Summer Capsule Cinema Campaign & Social Cutdowns",
    stats: [
      { label: "LOCATION", value: "AMALFI", note: "SYNTHESIZED COASTLINE" },
      { label: "DELIVERY", value: "6 DAYS", note: "BRIEF TO DELIVERY" },
      { label: "ROAS", value: "3.2x", note: "SUMMER PRE-ORDER REVENUE" },
      { label: "CARBON SAVED", value: "100%", note: "ZERO FLIGHTS" }
    ],
    overview: "OKAPI SWIM needed to shoot their summer 2026 resortwear collection in December to prepare for February retail pre-orders, when Mediterranean coasts were freezing and overcast.",
    challenge: "Water interaction, salt spray on wet skin, and sunlight refracting through turquoise Mediterranean swells without booking winter flights to the Southern Hemisphere.",
    pipeline: [
      { title: "Synthesized Amalfi Coastline", detail: "Recreated sun-drenched Positano cliffs, vintage Riva speedboats, and private yacht decks." },
      { title: "Swimwear Fabric Dynamics", detail: "Simulated wet-look Lycra sheen and realistic water droplet roll-off." },
      { title: "Golden Hour Grading", detail: "Infused Kodak 35mm film grain and warm Mediterranean amber highlights." }
    ],
    deliverables: [
      "1x 50s 16:9 Landscape Brand Film",
      "8x 9:16 Reels and Story Variations",
      "High-Res Lookbook Stills"
    ],
    results: [
      "Pre-order campaign sold out in 14 days",
      "Saved over $120,000 in international travel and location permit costs"
    ]
  },
  {
    id: "elysian",
    client: "ELYSIAN HOROLOGY",
    title: "Micro-Mechanical Tourbillon Symphony",
    subtitle: "Swiss Precision Captured at 100x Scale",
    category: "Swiss Watchmaking",
    year: "2026",
    duration: "0:38",
    aspectRatio: "9:16",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349390/9.hevc_d5gmk6.mp4",
    posterUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
    mandate: "High-Horology Product Film & Exploded 3D Mechanism",
    stats: [
      { label: "PARTS ACCURACY", value: "312", note: "INDIVIDUAL GEAR TEETH" },
      { label: "MACRO ZOOM", value: "100x", note: "PHYSICALLY IMPOSSIBLE SHOT" },
      { label: "LEAD TIME", value: "5 DAYS", note: "ZERO PROTOTYPE SHIPPING" },
      { label: "COLLECTOR SALES", value: "100%", note: "ALLOCATION FILLED" }
    ],
    overview: "ELYSIAN HOROLOGY crafted an ultra-exclusive double-axis tourbillon watch with only 10 pieces worldwide. They could not risk physically shipping the fragile prototype to a film studio.",
    challenge: "Capturing the hypnotic escapement movement, rubies, Geneva stripes (Côtes de Genève), and anti-reflective sapphire crystal coating with absolute horological perfection.",
    pipeline: [
      { title: "CAD Micro-Assembly", detail: "Imported watchmaker schematics to animate 312 oscillating escapement gears with physical friction tolerances." },
      { title: "Sapphire Anti-Reflective Shaders", detail: "Accurately duplicated the subtle violet sheen of double-sided sapphire crystal." },
      { title: "Macro Cinematic Flythrough", detail: "A continuous camera swoop entering the escapement spring balance wheel." }
    ],
    deliverables: [
      "1x 38s 4K Macro Showcase",
      "6x Slow-Motion Detail Stills",
      "Private VIP Presentation Cut"
    ],
    results: [
      "All 10 timepieces allocated to private collectors before public press release",
      "Zero physical wear or transport hazard to the master prototype"
    ]
  }
];

export function getCaseStudyById(id: string): CaseStudyData | undefined {
  return CASE_STUDIES.find((item) => item.id.toLowerCase() === id.toLowerCase());
}
