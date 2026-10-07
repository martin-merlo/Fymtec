# Plan de implementación: sitio de Fymtec

> **Estado:** v0.2 · 2026-10-07 · actualizado por la marca Fymtec (fase 2.5 nueva, fase 3 reordenada)
> **Fuentes:** [`SPEC.md`](../SPEC.md) (v1.1) · [`docs/secciones.md`](../docs/secciones.md) (v1.1) · [`docs/intent/portfolio.md`](../docs/intent/portfolio.md)
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
 │                                ├── T36 Marca y paleta ── T37 Logo SVG, T38 Selector de tema
 │                                └── T10 Primitivas de motion ── T11 Hero, T12 Servicios, T15 Metodología, T16 Clientes
 ├── T3 Testing
 └── T9 Deploy en Vercel + analítica (necesita T8)

T13 Pipeline de contenido (MDX + Zod) ── T14 Proyectos en la home ── T17 Plantilla de caso ── T18 Antes/después
                                                                    ├── T19 /proyectos
                                                                   ├── T20–T24 Contenido de cada caso
                                                                   └── T25 Transición home → caso
T39 Línea de la persona en Contacto · T26 /estudio · T27 404 · T28 Formulario (flag apagado)
T29 Selección de piezas firma ── T30–T32 Piezas firma
T33 Auditoría de performance · T34 Auditoría de accesibilidad y SEO · T35 Lanzamiento
```

## Fases (índice)

| Fase                         | Tareas       | Resultado verificable                                                                       |
| ---------------------------- | ------------ | ------------------------------------------------------------------------------------------- |
| **1. Base**                  | T1–T4        | El proyecto compila y tiene tokens, marca, tests y SEO base                                 |
| **2. Camino de conversión**  | T5–T9        | En la URL de Vercel se puede navegar y escribir por WhatsApp o email desde cualquier página |
| **2.5. Identidad Fymtec**    | T36–T38      | Marca, paleta, logo SVG y selector de tema                                                  |
| **3. Home**                  | T10–T16, T39 | La home completa: Inicio → Metodología → Clientes → Proyectos → Contacto                    |
| **4. Casos**                 | T17–T25      | 4 casos destacados y 1 secundario publicados con contenido real                             |
| **5. Segunda capa**          | T26–T28      | `/estudio`, 404 y formulario listo detrás de un flag                                        |
| **6. Diseño: piezas firma**  | T29–T32      | 2–3 efectos protagonistas integrados al sistema visual                                      |
| **7. Calidad y lanzamiento** | T33–T35      | Criterios de §10 de la spec cumplidos y el sitio lanzado                                    |

Hay un **checkpoint con revisión tuya** al final de cada fase (ver `todo.md`).

## Paralelización

- **Seguro de paralelizar:** dentro de la fase 3, las secciones T11, T12, T15 y T16 son independientes una vez hecha T10. T37 y T38 también son independientes entre sí. En la fase 4, la carga de contenido de cada caso (T20–T24) también es independiente.
- **Secuencial:** T1 → T2 → T5 (todo depende de los tokens y de `brand.ts`). T13 → T17 (la plantilla depende del modelo de datos).
- **Depende de vos:** T37 necesita tu validación del logo; T16 necesita el rubro de La Retama; T20–T24 necesitan tu material de cada caso; T29 necesita que elijas los componentes de 21st.dev y Uiverse.

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
