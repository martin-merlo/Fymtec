import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("home", () => {
  test("carga en español, con tema oscuro y un único h1", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("el primer elemento enfocable es 'Saltar al contenido' y lleva al main", async ({
    page,
    isMobile,
  }) => {
    test.skip(isMobile, "La navegación por teclado se prueba en desktop");
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.getByRole("link", { name: "Saltar al contenido" });
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute("href", "#contenido");
    await expect(page.locator("main#contenido")).toHaveCount(1);
  });

  test("no tiene violaciones de accesibilidad serias ni críticas", async ({
    page,
  }) => {
    await page.goto("/");
    const { violations } = await new AxeBuilder({ page }).analyze();
    const serious = violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
});
