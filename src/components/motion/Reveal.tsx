import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps<T extends ElementType> = {
  as?: T;
  id?: string;
  /** Orden dentro de un grupo: retrasa la aparición respecto de los anteriores. */
  index?: number;
  className?: string;
  children: ReactNode;
};

/**
 * Aparece al entrar en pantalla (scroll-driven animation, solo CSS).
 * Server Component: no agrega JS y sin soporte el contenido se ve quieto.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  id,
  index = 0,
  className,
  children,
}: RevealProps<T>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      id={id}
      className={cn("reveal", className)}
      style={{ "--i": index } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
