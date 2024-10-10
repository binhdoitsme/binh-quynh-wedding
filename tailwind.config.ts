import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: "#B91C1C", // Pastel Red
            secondary: "#FFB3B3", // Pastel Blush
            divider: "#D9D9D9", // Soft Gray
            foreground: "#B0B0B0", // Pastel Black
            background: "#E0E0E0", // White
            content1: "#E0E0E0", // White
          },
        },
        dark: {
          colors: {
            primary: "#B91C1C", // Pastel Deep Red
            secondary: "#A05252", // Dark Blush
            divider: "#2C2C2C", // Charcoal Gray
            // default: '#E0E0E0', // Muted White
            foreground: "#E0E0E0", // Muted White
            background: "#B0B0B0", // Black
            content1: "#E0E0E0", // White
          },
        },
      },
    }),
  ],
};
export default config;
