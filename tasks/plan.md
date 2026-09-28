# Plan de implementación: sitio de marca / estudio de software

> **Estado:** borrador v0.1 · 2026-09-28 · pendiente de aprobación
> **Fuentes:** [`SPEC.md`](../SPEC.md) (v1.0) · [`docs/secciones.md`](../docs/secciones.md) (v1.0) · [`docs/intent/portfolio.md`](../docs/intent/portfolio.md)
> **Tareas en detalle:** [`tasks/todo.md`](todo.md)

## Resumen

Construir el sitio en Next.js con **rebanadas verticales**: primero la base (proyecto, tokens, marca, tests, SEO), después el **camino de conversión completo** (un visitante puede entrar y escribir por WhatsApp), después la home sección por sección, luego los casos, la segunda capa y, al final, las piezas firma y la puesta a punto de performance para el lanzamiento.

El sitio se despliega en Vercel **desde la fase 2**, así Lighthouse y Speed Insights miden producción real durante todo el desarrollo, no solo al final.

## Decisiones de arquitectura

1. **Diseño funcional primero y piezas firma después.** Las secciones se construyen con tokens provisorios y motion básico (reveals y feedback). Las 2–3 piezas firma se eligen e implementan en la fase 6, cuando la estructura ya funciona. Así la identidad y los efectos pueden cambiar sin rehacer secciones.
2. **Primitivos de marca → tokens semánticos → componentes.** Es la única cadena por la que la identidad llega a la interfaz. Un test verifica que ningún componente contenga el nombre de la marca ni colores literales.
3. **Contenido tipado y validado.** El frontmatter MDX se valida con Zod en el build: un caso mal cargado rompe el build y no llega a producción.
4. **Casos con estado `draft | published`.** En producción solo se renderizan los `published`. Así se puede construir la plantilla y cargar casos incompletos sin riesgo de publicar contenido provisorio.
5. **Server Components por defecto.** Todo lo animado vive en componentes cliente pequeños (hojas) que envuelven contenido renderizado en el servidor, para mantener un JS inicial bajo y el contenido visible sin JS.
6. **CSS y APIs nativas antes que dependencias.** El proceso usa scroll-driven animations de CSS, el menú móvil usa `<dialog>` y la transición a los casos usa la View Transitions API (con fallback). Motion se reserva para lo que CSS no resuelve bien.

## Grafo de dependencias

```
T1 Proyecto base
 ├── T2 Tokens + marca + layout ──┬── T4 SEO base
 │                                ├── T5 CTAs de WhatsApp ── T6 Header ── T7 Botón flotante ── T8 Footer + CTA final + /contacto
 │                                └── T10 Primitivas de motion ── T11 Hero, T12 Servicios, T15 Proceso, T16 Detrás del estudio
 ├── T3 Testing
 └── T9 Deploy en Vercel + analítica (necesita T8)

T13 Pipeline de contenido (MDX + Zod) ── T14 Trabajos en la home ── T17 Plantilla de caso ── T18 Antes/después
                                                                   ├── T19 /trabajos
                                                                   ├── T20–T24 Contenido de cada caso
                                                                   └── T25 Transición home → caso
T26 /estudio · T27 404 · T28 Formulario (flag apagado)
T29 Selección de piezas firma ── T30–T32 Piezas firma
T33 Auditoría de performance · T34 Auditoría de accesibilidad y SEO · T35 Lanzamiento
```

## Fases (índice)

| Fase                         | Tareas  | Resultado verificable                                                                       |
| ---------------------------- | ------- | ------------------------------------------------------------------------------------------- |
| **1. Base**                  | T1–T4   | El proyecto compila y tiene tokens, marca, tests y SEO base                                 |
| **2. Camino de conversión**  | T5–T9   | En la URL de Vercel se puede navegar y escribir por WhatsApp o email desde cualquier página |
| **3. Home**                  | T10–T16 | La home completa con el orden problema → solución → evidencia → confianza → contacto        |
| **4. Casos**                 | T17–T25 | 4 casos destacados y 1 secundario publicados con contenido real                             |
| **5. Segunda capa**          | T26–T28 | `/estudio`, 404 y formulario listo detrás de un flag                                        |
| **6. Diseño: piezas firma**  | T29–T32 | 2–3 efectos protagonistas integrados al sistema visual                                      |
| **7. Calidad y lanzamiento** | T33–T35 | Criterios de §10 de la spec cumplidos y el sitio lanzado                                    |

Hay un **checkpoint con revisión tuya** al final de cada fase (ver `todo.md`).

## Paralelización

- **Seguro de paralelizar:** dentro de la fase 3, las secciones T11, T12, T15 y T16 son independientes una vez hecha T10. En la fase 4, la carga de contenido de cada caso (T20–T24) también es independiente.
- **Secuencial:** T1 → T2 → T5 (todo depende de los tokens y de `brand.ts`). T13 → T17 (la plantilla depende del modelo de datos).
- **Depende de vos:** T20–T24 necesitan tu material de cada caso; T29 necesita que elijas los componentes de 21st.dev y Uiverse.

## Riesgos y mitigaciones

| Riesgo                                                                                                                                                                                         | Impacto | Mitigación                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **El proyecto está dentro de OneDrive.** Sincronizar `node_modules` y `.next` (decenas de miles de archivos) vuelve lento el disco, genera bloqueos de archivos y conflictos de sincronización | Alto    | Antes de T1: mover el proyecto fuera de OneDrive (por ejemplo `C:\dev\portfolio`) o excluir esas carpetas de la sincronización. El código queda respaldado en GitHub. _(Pregunta P1)_ |
| Las animaciones degradan LCP, INP o el JS inicial                                                                                                                                              | Alto    | Deploy desde la fase 2, Lighthouse CI con umbrales, piezas firma con carga diferida y fallback estático, y un presupuesto de 170 KB de JS                                             |
| Falta material de los casos cuando llegue la fase 4                                                                                                                                            | Medio   | Estado `draft` para avanzar sin publicar. Los casos se piden de a uno. La plantilla se prueba con datos de test, no con contenido falso en el sitio                                   |
| Cambia la identidad a mitad de camino                                                                                                                                                          | Medio   | Tokens de dos niveles, `brand.ts` y un test anti-hardcodeo (T2)                                                                                                                       |
| Componentes de 21st.dev o Uiverse que no encajan o suman peso                                                                                                                                  | Medio   | Se reescriben con tokens, se registra su origen y licencia, y cada dependencia nueva se consulta antes                                                                                |
| Cambios de API en Next, Tailwind v4 o Motion respecto de lo que se conoce                                                                                                                      | Medio   | Verificar versiones y documentación oficial en T1 (`source-driven-development`)                                                                                                       |
| Soporte parcial de la View Transitions API                                                                                                                                                     | Bajo    | Mejora progresiva: sin soporte, la navegación funciona igual                                                                                                                          |
| Resend requiere un dominio verificado y `*.vercel.app` no se puede verificar                                                                                                                   | Bajo    | El formulario queda apagado en v1. Se activa cuando haya dominio propio                                                                                                               |
| El formato `wa.me` del número está mal                                                                                                                                                         | Bajo    | Test unitario del helper y prueba manual en un celular en T5                                                                                                                          |

## Decisiones (2026-09-28)

- **P1. Ubicación:** el proyecto se queda en OneDrive. Si aparecen problemas de sincronización o bloqueos de archivos, se mueve.
- **P2. GitHub:** git se inicializa en T1 (rama `main`) y Martín crea el repositorio en GitHub.
- **P3. Tipografías:** fuentes provisorias de Google Fonts con `next/font`, reemplazables desde los primitivos.
