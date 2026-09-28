"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { MobileNav } from "@/components/layout/MobileNav";
import type { NavItem } from "@/content/es/site";
import { useActiveSection } from "@/hooks/useActiveSection";

type HeaderShellProps = {
  wordmark: ReactNode;
  homeLabel: string;
  items: readonly NavItem[];
  cta: ReactNode;
  mobileCta: ReactNode;
  labels: { open: string; close: string; nav: string };
};

const COMPACT_AFTER = 24;
const HIDE_AFTER = 120;

/**
 * Parte interactiva del header: se compacta al scrollear, en móvil se oculta al
 * bajar y reaparece al subir, y marca la sección activa de la home.
 */
export function HeaderShell({
  wordmark,
  homeLabel,
  items,
  cta,
  mobileCta,
  labels,
}: HeaderShellProps) {
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const active = useActiveSection(
    items.flatMap((item) => (item.section ? [item.section] : [])),
  );

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setCompact(y > COMPACT_AFTER);
      setHidden(mobile.matches && y > lastY && y > HIDE_AFTER);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      data-compact={compact}
      data-hidden={hidden}
      className="group/header fixed inset-x-0 top-0 z-40 border-b border-transparent transition-[translate,background-color,border-color] duration-300 ease-out focus-within:translate-y-0 data-[compact=true]:border-border data-[compact=true]:bg-bg/75 data-[compact=true]:backdrop-blur-lg data-[hidden=true]:-translate-y-full"
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-4 transition-[height] duration-300 ease-out group-data-[compact=true]/header:h-14 sm:px-6 lg:px-8">
        <Link href="/" aria-label={homeLabel} className="rounded-sm">
          {wordmark}
        </Link>

        <nav aria-label={labels.nav} className="hidden md:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={
                    item.section && item.section === active ? "true" : undefined
                  }
                  className="rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg aria-[current=true]:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">{cta}</div>
        <MobileNav
          items={items}
          active={active}
          cta={mobileCta}
          labels={labels}
        />
      </div>
    </header>
  );
}
