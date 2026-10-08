import { Logo } from "@/components/brand/Logo";
import { WhatsAppCta } from "@/components/contact/WhatsAppCta";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { brand } from "@/config/brand";
import { contact } from "@/content/es/contact";
import { nav } from "@/content/es/site";

/** Header global. Compone en el servidor lo que HeaderShell anima en el cliente. */
export function Header() {
  return (
    <HeaderShell
      wordmark={<Logo decorative className="h-6 sm:h-7" />}
      homeLabel={`${brand.name} · ${nav.homeLink}`}
      items={nav.items}
      themeToggle={<ThemeToggle />}
      cta={<WhatsAppCta label={contact.whatsappShort} size="default" />}
      mobileCta={<WhatsAppCta size="xl" className="w-full" />}
      labels={{ open: nav.openMenu, close: nav.closeMenu, nav: nav.label }}
    />
  );
}
