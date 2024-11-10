import tailwindcss_animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--background)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--foreground)",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "var(--background)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--foreground)",
        },
        catYellow: "#E4941A",
        neon: {
          DEFAULT: "#00ff00",
          blue: "#00ffff",
          purple: "#ff00ff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      boxShadow: {
        'neo': '12px 12px 24px rgba(0, 0, 0, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.1)',
        'neo-inset': 'inset 12px 12px 24px rgba(0, 0, 0, 0.3), inset -8px -8px 16px rgba(255, 255, 255, 0.1)',
        'neo-sm': '6px 6px 12px rgba(0, 0, 0, 0.3), -4px -4px 8px rgba(255, 255, 255, 0.1)',
        'neo-hover': '16px 16px 32px rgba(0, 0, 0, 0.35), -12px -12px 24px rgba(255, 255, 255, 0.15)',
      },
    },
  },
  plugins: [tailwindcss_animate],
};