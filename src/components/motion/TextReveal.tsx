import { Fragment, type CSSProperties, type ElementType } from "react";

type TextRevealProps = {
  as?: ElementType;
  /** Cada string es una línea; se revelan en orden. */
  lines: readonly string[];
  className?: string;
};

/**
 * Titular que entra por líneas (solo CSS). El texto completo está en el HTML
 * del servidor y forma una sola frase para lectores de pantalla y buscadores.
 */
export function TextReveal({
  as: Tag = "h1",
  lines,
  className,
}: TextRevealProps) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <Fragment key={line}>
          {i > 0 && " "}
          <span
            className="text-reveal-line"
            style={{ "--i": i } as CSSProperties}
          >
            {line}
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
