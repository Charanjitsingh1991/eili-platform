import type { Config } from "tailwindcss";
import { tokens } from "./packages/ui/tokens";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "./packages/ui/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: tokens.colors.background,
        surface: tokens.colors.surface,
        ink: {
          DEFAULT: tokens.colors.ink.primary,
          secondary: tokens.colors.ink.secondary,
        },
        border: tokens.colors.border,
        accent: {
          DEFAULT: tokens.colors.accent,
          foreground: tokens.colors.surface,
        },
        scorecard: {
          low: tokens.colors.scorecard.low,
          moderate: tokens.colors.scorecard.moderate,
          strong: tokens.colors.scorecard.strong,
        },
      },
      fontFamily: {
        serif: [...tokens.typography.fontFamily.serif],
        sans: [...tokens.typography.fontFamily.sans],
      },
      fontSize: tokens.typography.fontSize,
      borderRadius: {
        card: tokens.radius.card,
        input: tokens.radius.input,
      },
      boxShadow: {
        card: tokens.shadow.card,
      },
      spacing: tokens.spacing,
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
