export const COLORS = {
  background: "#08080A", // Deeper, richer black
  surface: "#111115",
  surfaceSoft: "#1A1A24",
  surfaceElevated: "#232330",

  primary: "#00F0FF", // Neon Cyan
  primaryLight: "#5BFFFF",
  primaryDark: "#00B2B2",

  secondary: "#FF0055", // Neon Pink for contrast
  
  textPrimary: "#FFFFFF",
  textSecondary: "#A0A0B0",
  textMuted: "#6B6B7A",

  success: "#00FF66",
  error: "#FF3333",
  border: "rgba(255, 255, 255, 0.05)",
  borderGlow: "rgba(0, 240, 255, 0.3)",
};

// Sleek blue/purple to cyan gradient
export const GRADIENT = ["#6E00FF", "#00F0FF"];
export const GRADIENT_ALT = ["#FF0055", "#FF8A00"];

export const GLASS = {
  background: "rgba(20, 20, 30, 0.6)",
  border: "rgba(255, 255, 255, 0.1)",
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const RADIUS = {
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  full: 9999,
};

export const TYPOGRAPHY = {
  title: { fontSize: 32, fontWeight: "900" as const, letterSpacing: -0.5 },
  subtitle: { fontSize: 20, fontWeight: "700" as const, letterSpacing: 0 },
  h2: { fontSize: 24, fontWeight: "800" as const, letterSpacing: -0.2 },
  body: { fontSize: 16, fontWeight: "500" as const },
  caption: { fontSize: 14, fontWeight: "400" as const, letterSpacing: 0.2 },
};

export const SHADOW = {
  soft: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  glow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 16,
    elevation: 12,
  },
  glowPurple: {
    shadowColor: "#6E00FF",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
  }
};