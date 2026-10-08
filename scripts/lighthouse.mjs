/**
 * Corre Lighthouse CI contra producción (lighthouserc.json).
 * Si no hay Chrome instalado, usa el Chromium de Playwright.
 *
 * Se mide producción y no localhost: en local todo el JS termina de cargar
 * antes del primer pintado y la simulación de Lighthouse (Lantern) atribuye
 * ese JS al LCP, inflándolo artificialmente (~2.8 s simulado vs 0.4 s real).
 */
import { spawnSync } from "node:child_process";
import { chromium } from "@playwright/test";

const env = {
  ...process.env,
  CHROME_PATH: process.env.CHROME_PATH ?? chromium.executablePath(),
};
const { status } = spawnSync(
  "pnpm",
  ["exec", "lhci", "autorun", ...process.argv.slice(2)],
  {
    stdio: "inherit",
    env,
    shell: true,
  },
);
process.exit(status ?? 1);
