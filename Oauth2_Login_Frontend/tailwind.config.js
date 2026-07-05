/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        space: "#0b0e1a",
        panel: "#0f1226",
        card: "#141830",
        indigo: "#6c5ce7",
        cyan: "#00d9ff",
        ink: "#e8eaf6",
        muted: "#8b93b8",
        line: "#232849",
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "spin-slow": "spin 14s linear infinite",
        "spin-slower": "spin 20s linear infinite reverse",
        "spin-slowest": "spin 28s linear infinite",
      },
    },
  },
  plugins: [],
};