import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { describe, expect, it } from "vitest";
import { brand } from "@/config/brand";

/**
 * Guardián de la identidad desacoplada (SPEC §3.1 y §10).
 * Ningún componente ni página puede contener el nombre de la marca ni
 * colores literales: todo sale de brand.ts y de los tokens.
 */

const ROOTS = ["src/components", "src/app"];
const EXTENSIONS = /\.(tsx?|jsx?|mdx)$/;

const COLOR_LITERAL =
  /(?<![\w&/-])#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(/;

function sourceFiles(dir: string): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }
  return entries.flatMap((entry) => {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) return sourceFiles(path);
    return EXTENSIONS.test(entry) ? [path] : [];
  });
}

const files = ROOTS.flatMap(sourceFiles);

describe("identidad desacoplada", () => {
  it("encuentra archivos para revisar", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it.each(files.map((f) => [relative(".", f)]))(
    "%s no contiene el nombre de la marca",
    (file) => {
      const source = readFileSync(file, "utf8");
      expect(source.toLowerCase()).not.toContain(brand.name.toLowerCase());
    },
  );

  it.each(files.map((f) => [relative(".", f)]))(
    "%s no contiene colores literales",
    (file) => {
      const offending = readFileSync(file, "utf8")
        .split("\n")
        .map((line, i) => ({ line: line.trim(), n: i + 1 }))
        .filter(
          ({ line }) =>
            COLOR_LITERAL.test(line) && !line.includes("token-exception"),
        );
      expect(offending).toEqual([]);
    },
  );
});
