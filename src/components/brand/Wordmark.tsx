import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";

/**
 * Logo provisorio: wordmark tipográfico con el nombre de brand.ts.
 * Cuando exista el logo definitivo, se reemplaza solo este componente.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "font-display text-lg font-semibold tracking-tight",
        className,
      )}
    >
      {brand.name}
      <span className="text-highlight" aria-hidden="true">
        .
      </span>
    </span>
  );
}
