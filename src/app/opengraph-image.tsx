import { ImageResponse } from "next/og";
import { BLUE, LOGO_VIEWBOX, SLATE } from "@/components/brand/logo-paths";
import { brand } from "@/config/brand";
import { ogTheme } from "@/config/og-theme";

export const alt = `${brand.name} · ${brand.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const LOGO_WIDTH = 440;

/** Imagen OG genérica del sitio. Las páginas de proyecto tendrán la suya. */
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
      <svg
        width={LOGO_WIDTH}
        height={(LOGO_WIDTH * LOGO_VIEWBOX.height) / LOGO_VIEWBOX.width}
        viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
      >
        <path fill={ogTheme.logoSlate} d={SLATE.isotype + SLATE.letters} />
        <path fill={ogTheme.logoBlue} d={BLUE.isotype + BLUE.letters} />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 84, lineHeight: 1.05, letterSpacing: -2 }}>
          {brand.claim}
        </div>
        <div style={{ fontSize: 30, color: ogTheme.muted }}>
          {`${brand.tagline} · ${brand.location}`}
        </div>
      </div>
    </div>,
    size,
  );
}
