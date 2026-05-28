// ─── Color Palette ──────────────────────────────────────────────────────────
export const accent = "#e84545";
export const accentLight = "#ff6b6b";
export const dark = "#0f0f0f";
export const darkAlt = "#141414";
export const card = "#1a1a1a";
export const cardHover = "#1f1f1f";
export const border = "#2a2a2a";
export const borderLight = "#333";
export const muted = "#888";
export const textPrimary = "#f0f0f0";
export const textSecondary = "#bbb";
export const textMuted = "#777";

// ─── Day Colors ─────────────────────────────────────────────────────────────
export const dayColors = {
  red: "#e84545",
  orange: "#f5a623",
  teal: "#50e3c2",
  purple: "#7b68ee",
  green: "#2ecc71",
};

// ─── Shadows ────────────────────────────────────────────────────────────────
export const shadow = {
  sm: "0 1px 3px rgba(0,0,0,0.3)",
  md: "0 4px 16px rgba(0,0,0,0.4)",
  lg: "0 8px 32px rgba(0,0,0,0.5)",
  glow: (color) => `0 0 20px ${color}22, 0 4px 16px rgba(0,0,0,0.4)`,
};

// ─── Border Radii ───────────────────────────────────────────────────────────
export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  pill: 9999,
};

// ─── Font Stacks ────────────────────────────────────────────────────────────
export const font = {
  body: "'Inter', system-ui, -apple-system, sans-serif",
  display: "'Playfair Display', Georgia, serif",
  mono: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
};

// ─── Transitions ────────────────────────────────────────────────────────────
export const transition = {
  fast: "all 0.15s ease",
  base: "all 0.25s ease",
  slow: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
};
