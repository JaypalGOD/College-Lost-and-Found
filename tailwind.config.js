import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Bricolage Grotesque'", "Geist", "ui-sans-serif", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        lost: {
          DEFAULT: "hsl(var(--lost))",
          soft: "hsl(var(--lost-soft))",
          foreground: "hsl(var(--lost-foreground))",
        },
        found: {
          DEFAULT: "hsl(var(--found))",
          soft: "hsl(var(--found-soft))",
          foreground: "hsl(var(--found-foreground))",
        },
        lime: { brand: "hsl(var(--lime))" },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        soft: "0 1px 2px rgb(15 17 40 / 0.04), 0 8px 24px -12px rgb(15 17 40 / 0.12)",
        lift: "0 2px 4px rgb(15 17 40 / 0.04), 0 22px 44px -18px rgb(49 46 129 / 0.28)",
        glow: "0 0 0 4px hsl(var(--ring) / 0.14), 0 12px 32px -12px hsl(var(--ring) / 0.45)",
      },
    },
  },
  plugins: [animate],
};
