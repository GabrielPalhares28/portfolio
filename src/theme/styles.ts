import { alpha } from "@mui/material";
import type { PaletteMode, Theme } from "@mui/material";

export const BRAND_GRADIENT =
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";

export const SURFACE_COLORS = {
  darkDeep: "#0f172a",
  darkSoft: "#1e293b",
  lightPlain: "#ffffff",
  lightSoft: "#f8fafc",
  lightMuted: "#e2e8f0",
} as const;

const clipTextToBackground = {
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
} as const;

/** Purple/blue brand gradient applied to text (logo, accent titles). */
export const brandGradientText = {
  background: BRAND_GRADIENT,
  ...clipTextToBackground,
} as const;

/** Neutral gradient used by section titles, adapted to the current mode. */
export const headingGradientText = (theme: Theme) => ({
  background:
    theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)"
      : "linear-gradient(135deg, #1e293b 0%, #475569 100%)",
  ...clipTextToBackground,
});

export const subtleBorderColor = (theme: Theme) =>
  theme.palette.mode === "dark"
    ? "rgba(148, 163, 184, 0.1)"
    : "rgba(203, 213, 225, 0.5)";

/** Translucent "glass" card background plus its hairline border. */
export const surface = (
  theme: Theme,
  { dark = 0.5, light = 0.9 }: { dark?: number; light?: number } = {}
) => ({
  background:
    theme.palette.mode === "dark"
      ? `rgba(30, 41, 59, ${dark})`
      : `rgba(255, 255, 255, ${light})`,
  border: `1px solid ${subtleBorderColor(theme)}`,
});

/** Primary tinted panel used for section highlights and calls to action. */
export const tintedPanel = (theme: Theme) => ({
  background:
    theme.palette.mode === "dark"
      ? alpha(theme.palette.primary.main, 0.05)
      : alpha(theme.palette.primary.main, 0.03),
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
});

export const sectionGradient = (
  theme: Theme,
  {
    dark,
    light,
    angle = 180,
  }: { dark: string[]; light: string[]; angle?: number }
) => {
  const colors = theme.palette.mode === "dark" ? dark : light;
  const stops = colors
    .map((color, index) => `${color} ${(index / (colors.length - 1)) * 100}%`)
    .join(", ");
  return `linear-gradient(${angle}deg, ${stops})`;
};

/** Blue accent wash used by the header controls, keyed off the mode only. */
export const accentBackground = (mode: PaletteMode, opacity = 0.1) =>
  mode === "dark"
    ? `rgba(59, 130, 246, ${opacity})`
    : `rgba(37, 99, 235, ${opacity})`;

export const gradientButton = {
  textTransform: "none",
  fontWeight: 600,
  borderRadius: 2,
  background: BRAND_GRADIENT,
  boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 6px 25px rgba(102, 126, 234, 0.6)",
  },
} as const;

/** Tinted, lifting icon button shared by the hero and footer social links. */
export const accentIconButton = (
  color: string,
  mode: PaletteMode,
  {
    idleLight = 0.08,
    lift = 3,
    glow = false,
    tintIcon = false,
  }: {
    idleLight?: number;
    lift?: number;
    glow?: boolean;
    tintIcon?: boolean;
  } = {}
) => ({
  background: alpha(color, mode === "dark" ? 0.1 : idleLight),
  border: `1px solid ${alpha(color, 0.2)}`,
  ...(tintIcon ? { color } : {}),
  transition: "all 0.3s ease",
  "&:hover": {
    background: alpha(color, 0.2),
    transform: `translateY(-${lift}px)`,
    borderColor: color,
    ...(glow ? { boxShadow: `0 4px 20px ${alpha(color, 0.4)}` } : {}),
  },
});

/** Opacity pulse shared by the hero badge dot and the avatar glow. */
export const pulse = ({
  base = 1,
  peak = 0.5,
  duration = 2,
}: { base?: number; peak?: number; duration?: number } = {}) => {
  const name = `pulse_${Math.round(base * 100)}_${Math.round(peak * 100)}`;

  return {
    animation: `${name} ${duration}s ease-in-out infinite`,
    [`@keyframes ${name}`]: {
      "0%, 100%": { opacity: base },
      "50%": { opacity: peak },
    },
  };
};

type FadeDirection = "up" | "left" | "right";

/**
 * Entrance animation shared by every section. Keyframes are named after their
 * parameters so different distances never overwrite each other.
 */
export const fadeIn = ({
  direction = "up",
  distance = 30,
  delay = 0,
  duration = 0.6,
}: {
  direction?: FadeDirection;
  distance?: number;
  delay?: number;
  duration?: number;
} = {}) => {
  const name = `fadeIn_${direction}_${distance}`;
  const from =
    direction === "up"
      ? `translateY(${distance}px)`
      : `translateX(${direction === "left" ? -distance : distance}px)`;

  return {
    animation: `${name} ${duration}s ease-out ${delay}s both`,
    [`@keyframes ${name}`]: {
      from: { opacity: 0, transform: from },
      to: {
        opacity: 1,
        transform: direction === "up" ? "translateY(0)" : "translateX(0)",
      },
    },
  };
};
