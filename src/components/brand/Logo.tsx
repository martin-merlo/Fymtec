import { brand } from "@/config/brand";
import { cn } from "@/lib/utils";
import { BLUE, ISOTYPE_WIDTH, LOGO_VIEWBOX, SLATE } from "./logo-paths";

type LogoProps = {
  /** "full": isotipo + wordmark. "isotype": solo las montañas. */
  variant?: "full" | "isotype";
  /** Si el logo está dentro de un link o botón con su propio nombre accesible. */
  decorative?: boolean;
  className?: string;
};

/** Logo de la marca. Los colores salen de los tokens --logo-*, por tema. */
export function Logo({
  variant = "full",
  decorative = false,
  className,
}: LogoProps) {
  const full = variant === "full";
  const width = full ? LOGO_VIEWBOX.width : ISOTYPE_WIDTH;

  return (
    <svg
      viewBox={`0 0 ${width} ${LOGO_VIEWBOX.height}`}
      className={cn("h-7 w-auto shrink-0", className)}
      {...(decorative
        ? { "aria-hidden": true, focusable: false }
        : { role: "img", "aria-label": brand.name })}
    >
      <path
        className="fill-logo-slate"
        d={full ? SLATE.isotype + SLATE.letters : SLATE.isotype}
      />
      <path
        className="fill-logo-blue"
        d={full ? BLUE.isotype + BLUE.letters : BLUE.isotype}
      />
    </svg>
  );
}
