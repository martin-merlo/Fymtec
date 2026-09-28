/**
 * Tokens de motion para Motion (JS). Espejan los de src/styles/tokens.css
 * (--motion-duration-*, --motion-ease-*); si cambia uno, cambia el otro.
 * Motion usa segundos y curvas como arrays de cubic-bezier.
 */
export const duration = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
} as const;

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  emphasized: [0.16, 1, 0.3, 1],
} as const satisfies Record<string, readonly [number, number, number, number]>;
