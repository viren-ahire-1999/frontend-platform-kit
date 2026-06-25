/**
 * Programmatic access to design tokens for consumers who build inline styles
 * (each value resolves to the matching CSS custom property at runtime).
 */
export type SpaceStep = 1 | 2 | 3 | 4 | 5 | 6 | 8;

export const tokens = {
  color: {
    bg: "var(--fpk-color-bg)",
    surface: "var(--fpk-color-surface)",
    fg: "var(--fpk-color-fg)",
    muted: "var(--fpk-color-muted)",
    border: "var(--fpk-color-border)",
    primary: "var(--fpk-color-primary)"
  },
  radius: {
    sm: "var(--fpk-radius-sm)",
    md: "var(--fpk-radius-md)",
    lg: "var(--fpk-radius-lg)",
    full: "var(--fpk-radius-full)"
  },
  shadow: {
    sm: "var(--fpk-shadow-sm)",
    md: "var(--fpk-shadow-md)",
    lg: "var(--fpk-shadow-lg)"
  },
  space: (step: SpaceStep): string => `var(--fpk-space-${step})`
} as const;
