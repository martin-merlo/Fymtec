import type { Metadata } from "next";
import "./globals.css";
import { brand } from "@/config/brand";
import { fontVariables } from "@/config/fonts";
import { isIndexable, siteUrl } from "@/config/site";
import { common } from "@/content/es/common";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: brand.name, template: `%s · ${brand.name}` },
  description: brand.tagline,
  applicationName: brand.name,
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" data-theme="dark" className={fontVariables}>
      <body>
        <a
          href="#contenido"
          className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          {common.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
