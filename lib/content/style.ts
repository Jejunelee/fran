import type { CSSProperties } from "react";
import type { SectionStyles } from "./types";
import { mediaUrl } from "./media";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const raw = hex.trim().replace("#", "");
  const full =
    raw.length === 3
      ? raw
          .split("")
          .map((c) => c + c)
          .join("")
      : raw;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

/** Cream on dark fills, burgundy on light fills (pink buttons, etc.). */
export function contrastOn(background: string, light = "#F7F1E7", dark = "#750000") {
  const rgb = hexToRgb(background);
  if (!rgb) return dark;
  const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255;
  return luminance > 0.55 ? dark : light;
}

export function cmsStyleVars(styles?: SectionStyles): CSSProperties {
  if (!styles) return {};
  const accent = styles.accentColor || "#F5B7C4";
  return {
    "--cms-heading": styles.headingColor,
    "--cms-body": styles.bodyColor,
    "--cms-script": styles.scriptColor,
    "--cms-accent": accent,
    "--cms-on-accent": contrastOn(accent),
  } as CSSProperties;
}

export function cmsBg(url?: string): CSSProperties {
  const src = mediaUrl(url);
  if (!src) return {};
  return { backgroundImage: `url(${JSON.stringify(src)})` };
}
