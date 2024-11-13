export const themes = {
  "corporate-grey": {
    name: "Corporate Grey",
    category: "Corporativo",
    colors: {
      background: "#f8f9fa",
      foreground: "#1a1c1e",
      primary: "#374151",
      secondary: "#4b5563",
      accent: "#6b7280",
      muted: "#9ca3af"
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
    name: "Escuro",
    themes: Object.entries(themes)
      .filter(([_, theme]) => theme.category === "Escuro")
      .map(([value, theme]) => ({ name: theme.name, value }))
  }
];