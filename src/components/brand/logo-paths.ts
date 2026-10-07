/**
 * Trazados del logo de la marca, redibujados como SVG a partir de los
 * originales (docs/brand/logo-horizontal.webp): isotipo trazado del original y
 * letras reconstruidas con geometría limpia (trazo 25, altura 173, la C con arcos).
 * Coordenadas en el viewBox del logo completo (1506 × 215).
 */

export const LOGO_VIEWBOX = { width: 1506, height: 215 } as const;

/** Ancho del isotipo dentro del mismo sistema de coordenadas. */
export const ISOTYPE_WIDTH = 399;

/** Parte pizarra: montaña izquierda y "FYM". */
export const SLATE = {
  isotype: "M205 103 153 84 136 65 130 65 0 215 180 215 133 153Z",
  letters:
    "M433 42 568 42 568 67 433 67ZM433 67 458 67 458 105 433 105ZM433 117 560 117 560 142 433 142ZM433 142 458 142 458 215 433 215ZM571 42 599 42 647 119 633 140ZM717 42 746 42 669 158 669 215 644 215 644 152ZM762 42 790 42 846 138 831 160 787 90 787 215 762 215ZM921 42 946 42 946 215 921 215 921 89 867 175 839 175Z",
} as const;

/** Parte azul: montaña derecha y "TEC". */
export const BLUE = {
  isotype:
    "M228.5 0 162 75 198 88 229 80 215 93 236 103 187 154 292 215 399 215Z",
  letters:
    "M970 42 1129 42 1129 67 970 67ZM1036 67 1061 67 1061 215 1036 215ZM1155 42 1300 42 1300 67 1155 67ZM1155 67 1180 67 1180 80 1155 80ZM1155 117 1289 117 1289 142 1155 142ZM1155 142 1180 142 1180 176 1155 176ZM1155 190 1300 190 1300 215 1155 215ZM1505 42H1404.5A86.5 86.5 0 0 0 1404.5 215H1505V190H1404.5A61.5 61.5 0 0 1 1404.5 67H1505Z",
} as const;
