export const themes = {
  "corporate": {
    name: "Corporate",
    category: "Corporativo",
    colors: {
      background: "#ffffff",
      foreground: "#1a1c1e",
      primary: "#374151",
      secondary: "#4b5563",
      accent: "#6b7280",
      muted: "#9ca3af"
    }
  },
  "corporate-blue": {
    name: "Corporate Blue",
    category: "Corporativo",
    colors: {
      background: "#f0f9ff",
      foreground: "#0c4a6e",
      primary: "#0369a1",
      secondary: "#0284c7",
      accent: "#38bdf8",
      muted: "#7dd3fc"
    }
  },
  "corporate-green": {
    name: "Corporate Green",
    category: "Corporativo",
    colors: {
      background: "#f0fdf4",
      foreground: "#166534",
      primary: "#15803d",
      secondary: "#16a34a",
      accent: "#4ade80",
      muted: "#86efac"
    }
  },
  "light-modern": {
    name: "Modern Light",
    category: "Claro",
    colors: {
      background: "#ffffff",
      foreground: "#18181b",
      primary: "#3f3f46",
      secondary: "#52525b",
      accent: "#71717a",
      muted: "#a1a1aa"
    }
  },
  "light-warm": {
    name: "Warm Light",
    category: "Claro",
    colors: {
      background: "#fffbeb",
      foreground: "#78350f",
      primary: "#92400e",
      secondary: "#b45309",
      accent: "#f59e0b",
      muted: "#fbbf24"
    }
  },
  "dark-professional": {
    name: "Professional Dark",
    category: "Escuro",
    colors: {
      background: "#18181b",
      foreground: "#fafafa",
      primary: "#e4e4e7",
      secondary: "#d4d4d8",
      accent: "#a1a1aa",
      muted: "#71717a"
    }
  },
  "dark-ocean": {
    name: "Ocean Dark",
    category: "Escuro",
    colors: {
      background: "#0f172a",
      foreground: "#f8fafc",
      primary: "#e2e8f0",
      secondary: "#cbd5e1",
      accent: "#94a3b8",
      muted: "#64748b"
    }
  },
  "vibrant-blue": {
    name: "Vibrant Blue",
    category: "Vibrante",
    colors: {
      background: "#eff6ff",
      foreground: "#1e3a8a",
      primary: "#2563eb",
      secondary: "#3b82f6",
      accent: "#60a5fa",
      muted: "#93c5fd"
    }
  },
  "vibrant-purple": {
    name: "Vibrant Purple",
    category: "Vibrante",
    colors: {
      background: "#faf5ff",
      foreground: "#581c87",
      primary: "#9333ea",
      secondary: "#a855f7",
      accent: "#c084fc",
      muted: "#d8b4fe"
    }
  }
};

export const themeCategories = [
  {
    name: "Corporativo",
    themes: Object.entries(themes)
      .filter(([_, theme]) => theme.category === "Corporativo")
      .map(([value, theme]) => ({ name: theme.name, value }))
  },
  {
    name: "Claro",
    themes: Object.entries(themes)
      .filter(([_, theme]) => theme.category === "Claro")
      .map(([value, theme]) => ({ name: theme.name, value }))
  },
  {
    name: "Escuro",
    themes: Object.entries(themes)
      .filter(([_, theme]) => theme.category === "Escuro")
      .map(([value, theme]) => ({ name: theme.name, value }))
  },
  {
    name: "Vibrante",
    themes: Object.entries(themes)
      .filter(([_, theme]) => theme.category === "Vibrante")
      .map(([value, theme]) => ({ name: theme.name, value }))
  }
];