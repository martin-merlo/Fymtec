import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";

describe("Reveal", () => {
  it("renderiza el contenido visible y el índice como variable CSS", () => {
    render(
      <Reveal as="li" index={2}>
        Hola
      </Reveal>,
    );
    const el = screen.getByText("Hola");
    expect(el.tagName).toBe("LI");
    expect(el).toHaveClass("reveal");
    expect(el.style.getPropertyValue("--i")).toBe("2");
    // Nada de estilos inline que lo oculten: sin JS ni soporte, se ve.
    expect(el.style.opacity).toBe("");
  });
});

describe("TextReveal", () => {
  it("expone el titular como una sola frase accesible", () => {
    render(<TextReveal lines={["Software", "que resuelve."]} />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Software que resuelve." }),
    ).toBeInTheDocument();
  });
});
