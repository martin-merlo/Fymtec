import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("se renderiza como botón accesible y responde al clic", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Enviar</Button>);

    const button = screen.getByRole("button", { name: "Enviar" });
    expect(button).toBeInTheDocument();

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
