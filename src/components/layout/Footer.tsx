import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { brand } from "@/config/brand";
import { contact } from "@/content/es/contact";
import { footer, nav } from "@/content/es/site";
import { mailtoUrl, whatsappUrl } from "@/lib/contact";

export function Footer() {
  const year = new Date().getFullYear();
  const linkClass = "text-fg-muted transition-colors hover:text-fg";

  return (
    <footer className="border-t px-4 pt-16 pb-28 sm:px-6 md:pb-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <Logo className="h-8 self-start" />
          <p className="max-w-xs text-fg-muted">{brand.claim}</p>
          <p className="text-sm text-fg-muted">{brand.location}</p>
        </div>

        <nav
          aria-label={footer.sectionsTitle}
          className="flex flex-col gap-3 text-sm"
        >
          <h2 className="font-medium">{footer.sectionsTitle}</h2>
          <ul className="flex flex-col gap-2">
            {nav.items.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-3 text-sm">
          <h2 className="font-medium">{footer.contactTitle}</h2>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href={whatsappUrl(contact.whatsappMessage(brand.name))}
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a href={mailtoUrl()} className={`${linkClass} break-all`}>
                {brand.contact.email}
              </a>
            </li>
            {brand.social.github && (
              <li>
                <a
                  href={brand.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {footer.github}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-16 max-w-7xl text-xs text-fg-muted">
        © {year} {brand.name}. {footer.rights}
      </p>
    </footer>
  );
}
