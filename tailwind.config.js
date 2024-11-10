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
        background: "#1a1a1a", // Changed from black to dark gray
        foreground: "#E4941A",
        primary: {
          DEFAULT: "#E4941A",
          foreground: "#1a1a1a",
        },
        secondary: {
          DEFAULT: "#4A4A4A",
          foreground: "#E4941A",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#1a1a1a",
        },
        muted: {
          DEFAULT: "#2A2A2A",
          foreground: "#E4941A",
        },
        accent: {
          DEFAULT: "#333333",
          foreground: "#E4941A",
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
      },
    },
  },
  plugins: [tailwindcss_animate],
};