import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import "./globals.css";
import { FloatingWhatsApp } from "@/components/contact/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { brand } from "@/config/brand";
import { fontVariables } from "@/config/fonts";
import { isIndexable, siteUrl } from "@/config/site";
import { common } from "@/content/es/common";
import { contact } from "@/content/es/contact";
import { whatsappUrl } from "@/lib/contact";
import { DEFAULT_THEME, themeScript } from "@/lib/theme";

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
    // suppressHydrationWarning: el script del <head> puede cambiar data-theme
    // antes de hidratar (guía "Preventing flash before hydration" de Next).
    <html
      lang="es"
      data-theme={DEFAULT_THEME}
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          {common.skipToContent}
        </a>
        <Header />
        {children}
        <Footer />
        <FloatingWhatsApp
          href={whatsappUrl(contact.whatsappMessage(brand.name))}
          label={contact.whatsappAria}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
