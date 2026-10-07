import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "@/components/brand/Logo";
import { ISOTYPE_WIDTH, LOGO_VIEWBOX } from "@/components/brand/logo-paths";
import { brand } from "@/config/brand";

describe("Logo", () => {
  it("se anuncia como imagen con el nombre de la marca", () => {
    render(<Logo />);
    expect(screen.getByRole("img", { name: brand.name })).toBeInTheDocument();
  });

  it("decorativo no se anuncia (lo nombra el link que lo contiene)", () => {
    const { container } = render(<Logo decorative />);
    expect(screen.queryByRole("img")).toBeNull();
    expect(container.querySelector("svg")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  it("la variante isotipo recorta el viewBox a las montañas", () => {
    const { container } = render(<Logo variant="isotype" />);
    expect(container.querySelector("svg")).toHaveAttribute(
      "viewBox",
      `0 0 ${ISOTYPE_WIDTH} ${LOGO_VIEWBOX.height}`,
    );
  });

  it("los colores salen de los tokens del logo", () => {
    const { container } = render(<Logo />);
    const fills = [...container.querySelectorAll("path")].map((p) =>
      p.getAttribute("class"),
    );
    expect(fills).toEqual(["fill-logo-slate", "fill-logo-blue"]);
  });
});
