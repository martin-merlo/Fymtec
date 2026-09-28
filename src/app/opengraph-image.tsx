import { ImageResponse } from "next/og";
import { brand } from "@/config/brand";
import { ogTheme } from "@/config/og-theme";

export const alt = brand.tagline;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen OG genérica del sitio. Las páginas de caso tendrán la suya. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: ogTheme.background,
        color: ogTheme.foreground,
      }}
    >
      <div style={{ fontSize: 36, color: ogTheme.highlight }}>{brand.name}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2 }}>
          {brand.tagline}
        </div>
        <div style={{ fontSize: 30, color: ogTheme.muted }}>
          {brand.location}
        </div>
      </div>
    </div>,
    size,
  );
}
