"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { buttonVariants } from "@/components/ui/button";
import type { NavItem } from "@/content/es/site";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  items: readonly NavItem[];
  active?: string;
  cta: ReactNode;
  labels: { open: string; close: string; nav: string };
};

/**
 * Menú móvil sobre <dialog> nativo: showModal() vuelve inerte el resto de la
 * página (el foco queda adentro) y Esc lo cierra sin código extra.
 */
export function MobileNav({ items, active, cta, labels }: MobileNavProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        ref={trigger}
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-label={labels.open}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon-lg" }),
          "md:hidden",
        )}
      >
        <Menu aria-hidden="true" />
      </button>

      <dialog
        ref={dialog}
        aria-label={labels.nav}
        onClose={() => trigger.current?.focus()}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg p-0 text-fg backdrop:bg-bg/80 open:flex open:flex-col md:hidden"
      >
        <div className="flex justify-end px-4 pt-4">
          <button
            type="button"
            onClick={close}
            aria-label={labels.close}
            className={buttonVariants({ variant: "ghost", size: "icon-lg" })}
          >
            <X aria-hidden="true" />
          </button>
        </div>

        <nav
          aria-label={labels.nav}
          className="flex flex-1 flex-col justify-center px-8"
        >
          <ul className="flex flex-col gap-2">
            {items.map((item, i) => (
              <li
                key={item.href}
                className="animate-in duration-500 ease-out fill-mode-both fade-in slide-in-from-bottom-3"
                style={{ animationDelay: `${80 + i * 60}ms` }}
              >
                <Link
                  href={item.href}
                  onClick={close}
                  aria-current={
                    item.section && item.section === active ? "true" : undefined
                  }
                  className="block py-2 font-display text-h2 text-fg-muted transition-colors hover:text-fg aria-[current=true]:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-8 pb-10" onClick={close}>
          {cta}
        </div>
      </dialog>
    </>
  );
}
