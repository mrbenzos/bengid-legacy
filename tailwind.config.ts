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
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          blue: "#0284c7", // Electric Sky Blue / Cyan (from BG logo 'B' & BENGID LEGACY text)
          "blue-dark": "#0369a1",
          "blue-light": "#38bdf8",
          "blue-subtle": "#f0f9ff",
          green: "#557a2b", // Olive Green (from flyer & logo)
          "green-dark": "#2d4414", // Deep Olive Green
          "green-light": "#7cb342", // Lime / Vibrant Leaf Green (from BG logo 'G')
          "green-subtle": "#f4f8ee",
          navy: "#1e293b", // Slate Navy Plaque
          dark: "#0f172a",
          orange: "#f57c20",
        },
        whatsapp: "#25D366",
      },
    },
  },
  plugins: [],
};
export default config;
