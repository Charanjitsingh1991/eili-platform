export const tokens = {
  colors: {
    background: "#FAFAF7",
    surface: "#FFFFFF",
    ink: {
      primary: "#0B1B2B",
      secondary: "#3F4B5B",
    },
    border: "#E2E6EB",
    accent: "#0F4C5C",
    scorecard: {
      low: "#C2410C",
      moderate: "#A16207",
      strong: "#15803D",
    },
  },

  typography: {
    fontFamily: {
      serif: [
        "Source Serif Pro",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "serif",
      ],
      sans: [
        "Inter",
        "system-ui",
        "-apple-system",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ],
    },
    fontSize: {
      xs: ["0.875rem", { lineHeight: "1.25rem" }] as [
        string,
        { lineHeight: string },
      ],
      sm: ["1rem", { lineHeight: "1.5rem" }] as [
        string,
        { lineHeight: string },
      ],
      base: ["1.125rem", { lineHeight: "1.75rem" }] as [
        string,
        { lineHeight: string },
      ],
      lg: ["1.25rem", { lineHeight: "1.75rem" }] as [
        string,
        { lineHeight: string },
      ],
      xl: ["1.5rem", { lineHeight: "2rem" }] as [
        string,
        { lineHeight: string },
      ],
      "2xl": ["1.875rem", { lineHeight: "2.25rem" }] as [
        string,
        { lineHeight: string },
      ],
      "3xl": ["2.25rem", { lineHeight: "2.5rem" }] as [
        string,
        { lineHeight: string },
      ],
      "4xl": ["3rem", { lineHeight: "1.1" }] as [
        string,
        { lineHeight: string },
      ],
    },
  },

  spacing: {
    "1": "4px",
    "2": "8px",
    "3": "12px",
    "4": "16px",
    "6": "24px",
    "8": "32px",
    "12": "48px",
    "16": "64px",
  },

  radius: {
    card: "4px",
    input: "2px",
  },

  shadow: {
    card: "0 1px 2px rgba(11, 27, 43, 0.06)",
  },
} as const;
