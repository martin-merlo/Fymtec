import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { EmailCta } from "@/components/contact/EmailCta";
import { WhatsAppCta } from "@/components/contact/WhatsAppCta";
import { brand } from "@/config/brand";
import { contact } from "@/content/es/contact";
import { mailtoUrl, whatsappUrl } from "@/lib/contact";

describe("whatsappUrl", () => {
  it("arma el link wa.me con el número de brand.ts y el mensaje codificado", () => {
    const url = new URL(whatsappUrl("Hola, ¿cómo va?"));
    expect(url.origin).toBe("https://wa.me");
    expect(url.pathname).toBe("/5492614160956");
    expect(url.searchParams.get("text")).toBe("Hola, ¿cómo va?");
  });

  it("descarta espacios, signos y guiones del número", () => {
    expect(whatsappUrl("x", "+54 9 261-416-0956")).toBe(
      "https://wa.me/5492614160956?text=x",
    );
  });

  it("el mensaje por defecto usa el nombre de la marca", () => {
    const text = new URL(
      whatsappUrl(contact.whatsappMessage(brand.name)),
    ).searchParams.get("text");
    expect(text).toBe(
      `Hola, vi el sitio de ${brand.name} y quiero contarte sobre un proyecto.`,
    );
  });
});

describe("mailtoUrl", () => {
  it("incluye el asunto codificado", () => {
    expect(mailtoUrl("Hola mundo", "a@b.com")).toBe(
      "mailto:a@b.com?subject=Hola%20mundo",
    );
  });
});

describe("WhatsAppCta", () => {
  it("es un link que abre WhatsApp en otra pestaña", () => {
    render(<WhatsAppCta />);
    const link = screen.getByRole("link", { name: contact.whatsappCta });
    expect(link).toHaveAttribute(
      "href",
      expect.stringMatching(/^https:\/\/wa\.me\/5492614160956\?text=/),
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});

describe("EmailCta", () => {
  it("copia el email y lo anuncia en una región accesible", async () => {
    const user = userEvent.setup();
    const writeText = vi
      .spyOn(navigator.clipboard, "writeText")
      .mockResolvedValue();
    render(<EmailCta />);

    await user.click(screen.getByRole("button", { name: contact.copyEmail }));

    expect(writeText).toHaveBeenCalledWith(brand.contact.email);
    expect(await screen.findByRole("status")).toHaveTextContent(contact.copied);
  });

  it("si el portapapeles falla, muestra el email para copiarlo a mano", async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(
      new Error("denied"),
    );
    render(<EmailCta />);

    await user.click(screen.getByRole("button", { name: contact.copyEmail }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      brand.contact.email,
    );
  });
});
