import { Wordmark } from "@/components/brand/Wordmark";
import { WhatsAppCta } from "@/components/contact/WhatsAppCta";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { contact } from "@/content/es/contact";
import { nav } from "@/content/es/site";

/** Header global. Compone en el servidor lo que HeaderShell anima en el cliente. */
export function Header() {
  return (
    <HeaderShell
      wordmark={<Wordmark />}
      homeLabel={nav.homeLink}
      items={nav.items}
      cta={<WhatsAppCta label={contact.whatsappShort} size="default" />}
      mobileCta={<WhatsAppCta size="xl" className="w-full" />}
      labels={{ open: nav.openMenu, close: nav.closeMenu, nav: nav.label }}
    />
  );
}
