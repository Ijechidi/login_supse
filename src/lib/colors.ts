export const colors = {
  // Thème clair
  light: {
    // Arrière-plans principaux
    background: {
      primary: "#ffffff",
      secondary: "#f8fafc",
      tertiary: "#f1f5f9",
      card: "#ffffff",
      calendar: "#ffffff",
      modal: "#ffffff",
    },

    // Textes
    text: {
      primary: "#0f172a",
      secondary: "#475569",
      tertiary: "#64748b",
      muted: "#94a3b8",
      inverse: "#ffffff",
    },

    // Bordures
    border: {
      primary: "#e2e8f0",
      secondary: "#cbd5e1",
      focus: "#3b82f6",
      hover: "#94a3b8",
    },

    // États des créneaux
    slot: {
      available: {
        background: "#f0fdf4",
        border: "#bbf7d0",
        hover: "#dcfce7",
        text: "#166534",
      },
      occupied: {
        background: "#f8fafc",
        border: "#e2e8f0",
        hover: "#f1f5f9",
        text: "#475569",
      },
    },

    // Jours du calendrier
    calendar: {
      day: {
        current: {
          background: "#f8fafc",
          text: "#0f172a",
          hover: "#f1f5f9",
        },
        other: {
          background: "#f8fafc",
          text: "#94a3b8",
          hover: "#f1f5f9",
        },
        selected: {
          background: "#dbeafe",
          border: "#3b82f6",
          text: "#1e40af",
        },
        header: {
          background: "#64748b",
          text: "#ffffff",
        },
      },
      counter: {
        background: "#3b82f6",
        text: "#ffffff",
      },
    },

    // Statuts des rendez-vous
    status: {
      confirme: {
        background: "#f0fdf4",
        text: "#166534",
        border: "#bbf7d0",
        icon: "#22c55e",
      },
      en_attente: {
        background: "#fefce8",
        text: "#a16207",
        border: "#fde047",
        icon: "#eab308",
      },
      annule: {
        background: "#fef2f2",
        text: "#dc2626",
        border: "#fecaca",
        icon: "#ef4444",
      },
      termine: {
        background: "#f8fafc",
        text: "#475569",
        border: "#e2e8f0",
        icon: "#64748b",
      },
    },

    // Types de rendez-vous (couleurs par défaut)
    types: {
      consultation: "#3b82f6",
      suivi: "#10b981",
      urgence: "#ef4444",
      specialise: "#8b5cf6",
      pediatrie: "#f59e0b",
    },
  },

  // Thème sombre
  dark: {
    // Arrière-plans principaux
    background: {
      primary: "#000000",
      secondary: "#0f172a",
      tertiary: "#1e293b",
      card: "#1e1e1e",
      calendar: "#000000",
      modal: "#1e293b",
    },

    // Textes
    text: {
      primary: "#f8fafc",
      secondary: "#cbd5e1",
      tertiary: "#94a3b8",
      muted: "#64748b",
      inverse: "#0f172a",
    },

    // Bordures
    border: {
      primary: "#334155",
      secondary: "#475569",
      focus: "#3b82f6",
      hover: "#475569",
    },

    // États des créneaux
    slot: {
      available: {
        background: "#064e3b",
        border: "#059669",
        hover: "#065f46",
        text: "#6ee7b7",
      },
      occupied: {
        background: "#1e293b",
        border: "#334155",
        hover: "#334155",
        text: "#cbd5e1",
      },
    },

    // Jours du calendrier
    calendar: {
      day: {
        current: {
          background: "#1e1e1e",
          text: "#f8fafc",
          hover: "#374151",
        },
        other: {
          background: "rgba(113, 113, 122, 0.2)",
          text: "#64748b",
          hover: "rgba(113, 113, 122, 0.3)",
        },
        selected: {
          background: "rgba(59, 130, 246, 0.3)",
          border: "#3b82f6",
          text: "#93c5fd",
        },
        header: {
          background: "#323232",
          text: "#ffffff",
        },
      },
      counter: {
        background: "#71717a",
        text: "#ffffff",
      },
    },

    // Statuts des rendez-vous
    status: {
      confirme: {
        background: "rgba(34, 197, 94, 0.1)",
        text: "#4ade80",
        border: "rgba(34, 197, 94, 0.2)",
        icon: "#22c55e",
      },
      en_attente: {
        background: "rgba(234, 179, 8, 0.1)",
        text: "#facc15",
        border: "rgba(234, 179, 8, 0.2)",
        icon: "#eab308",
      },
      annule: {
        background: "rgba(239, 68, 68, 0.1)",
        text: "#f87171",
        border: "rgba(239, 68, 68, 0.2)",
        icon: "#ef4444",
      },
      termine: {
        background: "rgba(100, 116, 139, 0.1)",
        text: "#94a3b8",
        border: "rgba(100, 116, 139, 0.2)",
        icon: "#64748b",
      },
    },

    // Types de rendez-vous (couleurs adaptées pour le sombre)
    types: {
      consultation: "#60a5fa",
      suivi: "#34d399",
      urgence: "#f87171",
      specialise: "#a78bfa",
      pediatrie: "#fbbf24",
    },
  },
} as const

export type Theme = keyof typeof colors
export type ColorScheme = typeof colors.light
