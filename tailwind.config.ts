import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: "2rem",
    },
    extend: {
      colors: {
        primary: "#3B00DB",
        onPrimary: "#ffffff",
        secondary: "#64748b",

        border: "#89938f",
        surface: "rgb(24,24,24)",

        error: "#ba1a1a",
        onError: "#ffffff",
        background: "rgb(16,16,16)",
        onBackground: "#fff",
      },
    },
  },
  plugins: [],
};
export default config;
