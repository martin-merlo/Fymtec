"use client";

import { Check, Copy, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { brand } from "@/config/brand";
import { contact } from "@/content/es/contact";
import { mailtoUrl } from "@/lib/contact";
import { cn } from "@/lib/utils";

type CopyState = "idle" | "copied" | "failed";

/** CTA secundario: link mailto más botón para copiar el email. */
export function EmailCta({ className }: { className?: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(brand.contact.email);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2500);
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <a
        href={mailtoUrl(contact.emailSubject)}
        className={buttonVariants({ variant: "outline", size: "lg" })}
      >
        <Mail data-icon="inline-start" aria-hidden="true" />
        {contact.emailCta}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={contact.copyEmail}
        className={buttonVariants({ variant: "ghost", size: "icon-lg" })}
      >
        {state === "copied" ? (
          <Check aria-hidden="true" />
        ) : (
          <Copy aria-hidden="true" />
        )}
      </button>
      <span role="status" aria-live="polite" className="text-sm text-fg-muted">
        {state === "copied" && contact.copied}
        {state === "failed" && `${contact.copyFailed} ${brand.contact.email}`}
      </span>
    </div>
  );
}
