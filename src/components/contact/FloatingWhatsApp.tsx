"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { FINAL_CTA_ATTR, HERO_ATTR } from "@/lib/dom-markers";

type FloatingWhatsAppProps = {
  href: string;
  /** Texto visible al expandirse; también es el nombre accesible. */
  label: string;
};

const DESKTOP_DELAY_MS = 3000;

/**
 * Botón flotante de WhatsApp, integrado al sistema visual (no el verde genérico).
 * - Si la página tiene hero, en móvil aparece recién al pasarlo (nunca tapa su CTA);
 *   en desktop, también tras unos segundos.
 * - Si no hay hero (páginas cortas, 404), aparece de entrada.
 * - Se oculta mientras el CTA final está en pantalla.
 */
export function FloatingWhatsApp({ href, label }: FloatingWhatsAppProps) {
  const pathname = usePathname();
  // Cada estado recuerda para qué ruta es válido: al navegar, arranca oculto.
  const [pastHeroOn, setPastHeroOn] = useState<string | null>(null);
  const [delayOn, setDelayOn] = useState<string | null>(null);
  const [finalCtaInView, setFinalCtaInView] = useState(false);

  useEffect(() => {
    const route = pathname;
    const hero = document.querySelector(`[${HERO_ATTR}]`);
    let frame = 0;

    // "Pasó el hero" = su borde inferior ya subió a la mitad superior de la
    // pantalla: su CTA quedó lejos de la esquina donde vive este botón.
    const heroObserver = new IntersectionObserver(
      ([entry]) => setPastHeroOn(entry?.isIntersecting ? null : route),
      { rootMargin: "-50% 0px 0px 0px" },
    );
    if (hero) heroObserver.observe(hero);
    else frame = requestAnimationFrame(() => setPastHeroOn(route));

    const timer = window.matchMedia("(min-width: 768px)").matches
      ? setTimeout(() => setDelayOn(route), DESKTOP_DELAY_MS)
      : undefined;

    const ctaObserver = new IntersectionObserver((entries) =>
      setFinalCtaInView(entries.some((entry) => entry.isIntersecting)),
    );
    document
      .querySelectorAll(`[${FINAL_CTA_ATTR}]`)
      .forEach((el) => ctaObserver.observe(el));

    return () => {
      heroObserver.disconnect();
      ctaObserver.disconnect();
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [pathname]);

  const visible =
    (pastHeroOn === pathname || delayOn === pathname) && !finalCtaInView;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-visible={visible}
      inert={!visible}
      className="group fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex h-14 min-w-14 items-center justify-center gap-0 rounded-full border border-border-strong bg-surface-raised/90 px-4 text-fg shadow-lg shadow-bg/60 backdrop-blur-md transition-[translate,opacity,gap,background-color,border-color] duration-300 ease-out hover:gap-2.5 hover:border-highlight/60 hover:bg-surface-raised focus-visible:gap-2.5 active:scale-95 data-[visible=false]:pointer-events-none data-[visible=false]:translate-y-4 data-[visible=false]:opacity-0 motion-reduce:data-[visible=false]:translate-y-0"
    >
      <WhatsAppIcon className="size-6 shrink-0 text-highlight" />
      <span className="max-w-0 overflow-hidden text-sm font-medium whitespace-nowrap transition-[max-width] duration-300 ease-out group-hover:max-w-48 group-focus-visible:max-w-48 motion-reduce:transition-none">
        {label}
      </span>
    </a>
  );
}
