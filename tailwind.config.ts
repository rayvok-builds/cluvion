import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cinema: {
          bg: "#070709",
          surface: "#0D0E12",
          card: "#121318",
          elevated: "#181920",
          border: "rgba(255, 255, 255, 0.08)",
          borderHover: "rgba(255, 255, 255, 0.18)",
          text: "#F4F4F6",
          muted: "#8E8E98",
          dim: "#565761",
        },
        accent: {
          DEFAULT: "#E5A93C",
          hover: "#F3B84E",
          glow: "rgba(229, 169, 60, 0.15)",
          subtle: "rgba(229, 169, 60, 0.08)",
        },
        "hero-heading": "rgb(240, 240, 240)",
        "hero-sub": "rgb(136, 136, 136)",
      },
      fontFamily: {
        primary: ["var(--font-thegoodmonolith)", "TheGoodMonolith", "monospace"],
        secondary: ["var(--font-thegoodmonolith)", "TheGoodMonolith", "monospace"],
        switzer: ["var(--font-thegoodmonolith)", "TheGoodMonolith", "monospace"],
        dmsans: ["var(--font-thegoodmonolith)", "TheGoodMonolith", "monospace"],
        inter: ["var(--font-thegoodmonolith)", "TheGoodMonolith", "monospace"],
        mono: ["var(--font-thegoodmonolith)", "TheGoodMonolith", "monospace"],
        thegoodmonolith: ["var(--font-thegoodmonolith)", "TheGoodMonolith", "monospace"],
      },
      fontSize: {
        "hero-h1": ["64px", { lineHeight: "64px" }],
        "hero-sub": ["16px", { lineHeight: "19px" }],
        "hero-cta": ["16px", { lineHeight: "19px" }],
      },
      letterSpacing: {
        cinema: "0.2em",
        tightest: "-0.04em",
        tighter: "-0.02em",
      },
      animation: {
        "marquee-slow": "marquee 32s linear infinite",
        "pulse-subtle": "pulseSubtle 3s ease-in-out infinite",
        "film-grain": "grain 8s steps(10) infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
