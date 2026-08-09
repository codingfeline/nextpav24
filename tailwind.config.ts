import tailwindTypo from '@tailwindcss/typography';
import type { Config } from "tailwindcss";

// Brand colours resolve from CSS variables ("R G B" channels) defined in
// globals.css. They swap with the [data-theme] attribute on <html>, so every
// `bg-gold`, `text-brown`, `bg-cream-200` etc. (and their /opacity variants)
// follows the active theme.
const themed = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Primary brand accent — navbar, focus states, primary actions
        gold: {
          DEFAULT: themed("--c-gold"),
          light: themed("--c-gold-light"),
          dark: themed("--c-gold-dark"),
        },
        // Surface scale — backgrounds, menu tables, borders (light → dark)
        cream: {
          50: themed("--c-cream-50"),
          100: themed("--c-cream-100"),
          200: themed("--c-cream-200"),
          300: themed("--c-cream-300"),
          400: themed("--c-cream-400"),
          500: themed("--c-cream-500"),
          600: themed("--c-cream-600"),
          700: themed("--c-cream-700"),
        },
        // Deep text colour for headings/body on themed surfaces
        brown: {
          DEFAULT: themed("--c-brown"),
          light: themed("--c-brown-light"),
        },
        // Accent for promotional highlights
        ember: themed("--c-ember"),
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [tailwindTypo],
} satisfies Config;
