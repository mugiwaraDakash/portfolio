import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        foreground: "#ffffff",
        cyber: {
          black: "#050505",
          gray: "#101010",
          blue: "#3B82F6",
          cyan: "#06B6D4",
          green: "#22C55E",
          darkBlue: "#1E3A8A",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "spin-slow": "spin 25s linear infinite",
        "spin-reverse-slow": "spin-reverse 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-pulse": "glow 3s ease-in-out infinite alternate",
        "matrix-fade": "matrix-fade 2s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.3), 0 0 10px rgba(59, 130, 246, 0.2)" },
          "100%": { boxShadow: "0 0 15px rgba(6, 182, 212, 0.6), 0 0 30px rgba(6, 182, 212, 0.4)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
