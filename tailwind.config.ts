import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(20, 14, 10, 0.12)",
        card: "0 14px 30px rgba(30, 20, 12, 0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
