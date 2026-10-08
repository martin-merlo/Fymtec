# Spec: sitio de Fymtec

> **Estado:** ✅ aprobada v1.0 · 2026-09-28 · **v1.1 · 2026-10-07:** marca Fymtec definida, paleta, tema claro con selector y nuevas secciones de la home (ver §12)
> **Detalle de secciones:** [`docs/secciones.md`](docs/secciones.md)
> **Intención confirmada:** [`docs/intent/portfolio.md`](docs/intent/portfolio.md). Si esta spec contradice la intención, manda la intención.

---

## 0. Supuestos (aprobados)

1. **Estructura:** una home larga (landing de marca) más **páginas propias por cada caso destacado** (`/proyectos/[slug]`). Las páginas de caso son la "segunda capa" y además suman SEO.
2. **Contenido en el repo, sin CMS en v1:** los casos viven en **MDX**. El contenido global y reutilizable (servicios, proceso, textos de secciones) vive en **módulos TypeScript** en `src/content/es/`. No se abstrae cada microtexto en un diccionario si eso suma complejidad sin beneficio. La regla es que **los componentes no queden acoplados al branding** y que traducir sea sencillo.
3. **Stack:** Next.js (App Router) + TypeScript + Tailwind CSS v4 + shadcn/ui + Motion (el paquete sucesor de Framer Motion). Se verifican la versión estable y la documentación oficial de cada uno al implementar (`source-driven-development`). **Mínimas dependencias:** si algo se resuelve bien con CSS o con APIs nativas del navegador sin sumar peso (scroll-driven animations, `IntersectionObserver`, `<dialog>`, View Transitions), se prioriza eso.
4. **Idioma:** español en `/`. **No hay i18n completa en v1.** La arquitectura la deja preparada: el contenido está separado por idioma (`content/es/`) y los componentes reciben los textos por props o desde esos módulos, así sumar `/en` es agregar `content/en/` y el segmento de ruta.
5. **Contacto en v1:** WhatsApp y email son los canales reales desde el día uno, y WhatsApp es uno de los canales principales de conversión. Tiene un **botón flotante** en una esquina, **integrado al sistema visual**: conserva el ícono reconocible de WhatsApp, pero no es el clásico botón verde genérico, sino que usa los tokens del sitio. Además aparece en el CTA del header y en el CTA final. El formulario queda **construido pero desactivado** detrás de un flag (`brand.contact.formEnabled = false`). Cuando se active, se envía con un Route Handler + Resend. No hay base de datos.
6. **Marca: Fymtec** (definida en v1.1, con logo propio). El nombre sigue sin escribirse en ningún componente, texto ni asset: se lee siempre de `src/config/brand.ts`.
7. **Tema:** **dark-first, con opción de modo claro en v1.** El oscuro es el tema por defecto; un selector en el header permite pasar al claro y la elección se recuerda. Todos los colores salen de tokens semánticos; un color literal en un componente solo se admite como excepción justificada y comentada en el código.
8. **Gestor de paquetes:** `pnpm`.
9. **Identidad desacoplada (prioridad arquitectónica):** nombre, logo y paleta ya están definidos (§3.1); la tipografía sigue provisoria. Igual que antes, ninguna sección depende rígidamente de ellos: todo el sistema consume tokens, `brand.ts` y el componente de logo.
10. **Principio comercial:** la experiencia principal está diseñada para el potencial cliente. La home sigue el orden **Inicio → Metodología → Clientes → Proyectos → Contacto** (problema y solución → confianza en el proceso → prueba social → evidencia → contacto). Para quien quiera profundizar, en la segunda capa: **stack → decisiones técnicas → implementación → GitHub/código** cuando corresponda.

---

## 1. Objetivo

Construir el sitio de una marca de software independiente que:

- **Venda** soluciones digitales a negocios. La primera capa tiene que ser entendible para alguien no técnico.
- **Demuestre** calidad técnica. El sitio es la demo, y la segunda capa (casos completos, stack, GitHub) respalda esa demostración.
- **Convierta** en conversaciones con la menor fricción posible. El CTA principal es WhatsApp.
- Se perciba **como estudio (Fymtec)**. La persona detrás aparece de forma discreta en Contacto, en el footer y en `/estudio`.

### Historias de usuario

- **Como dueño de un negocio** que llega desde Instagram o Google, quiero entender en menos de 10 segundos qué problemas me pueden resolver, para decidir si sigo mirando.
- **Como dueño de un negocio**, quiero ver trabajos reales parecidos a mi necesidad, para confiar en que lo pueden hacer.
- **Como dueño de un negocio**, quiero escribir por WhatsApp con un clic, para empezar a hablar sin llenar formularios.
- **Como líder técnico**, quiero entender en menos de un minuto quién está detrás, con qué stack trabaja y cómo toma decisiones, para evaluar su nivel.
- **Como líder técnico**, quiero abrir un caso completo y ver decisiones concretas (problema, trade-offs, implementación), para distinguir a un profesional de alguien que arma plantillas.

---

## 2. Arquitectura de información

### 2.1 Mapa del sitio

```
/                        Home (landing de marca)
/proyectos               Índice de todos los proyectos (destacados + secundarios)
/proyectos/[slug]        Caso de estudio (completo, visual o breve)
/estudio                 "Detrás del estudio": la persona, el enfoque, el stack y el GitHub (segunda capa)
/contacto                Contacto (WhatsApp, email, formulario). También hay un ancla #contacto en la home
/404                     Página no encontrada con estilo propio
```

Además: `sitemap.xml`, `robots.txt`, imágenes Open Graph por página y `manifest`.

### 2.2 Home: orden de secciones y objetivo de cada una

La navegación y la home tienen **5 secciones, en este orden: Inicio, Metodología, Clientes, Proyectos y Contacto.** Cada una es un ancla de la home (`/#inicio`, `/#metodologia`, `/#clientes`, `/#proyectos`, `/#contacto`). El detalle está en [`docs/secciones.md`](docs/secciones.md).

| #   | Sección                        | Objetivo (qué tiene que lograr)                                          | Capa  | Notas de experiencia                                                                                                                                                                                                                          |
| --- | ------------------------------ | ------------------------------------------------------------------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| —   | **Header**                     | Orientar, dejar el CTA siempre a mano y permitir cambiar de tema         | 1     | Logo Fymtec (isotipo + wordmark), las 5 secciones, selector de tema y botón "Hablemos". Se compacta al hacer scroll.                                                                                                                          |
| 1   | **Inicio**                     | Decir **qué problema resolvés y para quién** y **qué servicios ofrecés** | 1     | Hero con titular orientado al negocio, CTA principal a WhatsApp y secundario "Ver proyectos"; debajo, un bloque breve de servicios (qué resolvés). Es el momento visual más fuerte. El texto se renderiza en el servidor y es visible sin JS. |
| 2   | **Metodología**                | Bajar el riesgo percibido: "sé qué va a pasar si escribo"                | 1     | 4 pasos con nombres propios. Propuesta: _Entender → Proponer → Construir → Acompañar_.                                                                                                                                                        |
| 3   | **Clientes**                   | Prueba social: negocios reales confiaron en Fymtec                       | 1     | Franja breve: nombre del cliente, rubro y qué se hizo en una línea. Sin logos de clientes salvo permiso; sin testimonios inventados. Incluye los 5 clientes.                                                                                  |
| 4   | **Proyectos**                  | Evidencia en profundidad                                                 | 1 → 2 | Tarjetas de los 4 casos destacados (+ La Retama como breve), con imagen, problema y tipo de solución. Clic → `/proyectos/[slug]`.                                                                                                             |
| 5   | **Contacto**                   | Convertir                                                                | 1     | "Contame tu idea". WhatsApp como opción principal y email como secundaria. Una línea discreta presenta a la persona detrás de Fymtec, con link a `/estudio`. El formulario aparece solo si se activa el flag.                                 |
| —   | **Footer**                     | Cerrar y dar confianza                                                   | 1     | Logo, claim, secciones, contacto, GitHub, "Mendoza, Argentina · Trabajo remoto" y año.                                                                                                                                                        |
| —   | **Botón flotante de WhatsApp** | Mantener el contacto a un clic en todo el sitio                          | 1     | Fijo abajo a la derecha. Integrado a los tokens, no el verde genérico. Aparece al pasar el hero (o de entrada si la página no tiene hero) y se oculta sobre Contacto.                                                                         |

**Regla de las dos capas:** cualquier sección de la capa 1 se tiene que poder entender sin saber qué es React. Los términos técnicos (stack, frameworks, arquitectura) solo aparecen en las páginas de caso, en `/estudio` y en etiquetas secundarias pequeñas.

### 2.3 `/estudio` (segunda capa)

- Quién soy, desde qué enfoque trabajo y qué tipo de proyectos busco.
- Stack y herramientas, agrupados por **para qué** los uso y no como una sopa de logos.
- Principios de trabajo: performance, accesibilidad, SEO técnico, código mantenible.
- Link a GitHub y, si aplica, a LinkedIn.
- Una sección **"Cómo está hecho este sitio"**: stack, puntajes de Lighthouse reales medidos y decisiones clave. Cierra el argumento de que "el sitio es la demo".

### 2.4 Casos de estudio

**Formatos flexibles, un mismo modelo de datos.** Los destacados no tienen que tener la misma estructura ni la misma cantidad de contenido: la narrativa se adapta a lo que sea más interesante demostrar en cada proyecto. Los formatos son puntos de partida, no plantillas rígidas.

| Formato      | Para qué                                                   | Estructura                                                                                                                       |
| ------------ | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Completo** | Casos con decisiones técnicas o de negocio interesantes    | Resumen → Contexto/problema → Solución → Proceso → Qué hice yo → Decisiones (2–4, con trade-off) → Tecnologías → Resultado → CTA |
| **Visual**   | Casos donde el valor es principalmente estético o de marca | Resumen → Galería o recorrido visual grande → Qué hice yo (breve) → Tecnologías → CTA                                            |

**Relación entre Clientes y Proyectos:** _Clientes_ es prueba social breve (quién confió, de qué rubro, qué se hizo); _Proyectos_ es la evidencia en profundidad (los casos). Un mismo trabajo puede aparecer en ambas, pero con un nivel de detalle distinto y sin repetir el mismo contenido.

**Asignación (confirmada en v0.2):**

| Caso                                   | Rol en el sitio | Formato  | Por qué                                                                                                                                                     |
| -------------------------------------- | --------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| International Freight Forwarder        | Destacado       | Completo | Rediseño y migración a WordPress con ACF: hay UX, contraste, estructura y una decisión técnica clara (contenido editable).                                  |
| Liga Mendocina de Ajedrez              | Destacado       | Completo | Complejidad funcional: rankings, torneos, clubes, galería y noticias.                                                                                       |
| Roma Barber Club                       | Destacado       | Visual   | Landing comercial con foco en imagen, servicios y turnos.                                                                                                   |
| Salomón Barrios (portfolio de artista) | Destacado       | Visual   | Proyecto de identidad y estética.                                                                                                                           |
| La Retama (auditoría SEO)              | Secundario      | Breve    | Por ahora **solo la auditoría** (diagnóstico y recomendaciones); el trabajo sigue en curso. Se muestra como breve y se amplía si se suma la implementación. |

**Reglas de honestidad (no negociables):**

- Solo se publica material que se pueda mostrar legítimamente. No se inventan logos, testimonios, métricas ni resultados.
- Si no hay números, el resultado se describe de forma cualitativa ("el cliente ahora edita su contenido sin depender de un desarrollador").
- Se aclara qué parte hice yo cuando el trabajo fue compartido o partió de algo existente.
- **Capturas:** material propio de Martín o capturas nuevas de los sitios en vivo, en buena resolución. Si un caso no tiene material suficiente, se muestra con menos imágenes en vez de rellenar con mockups que simulen algo que no existe.

**Modelo de datos (frontmatter MDX):**

```ts
type CaseStudy = {
  slug: string;
  title: string; // "Liga Mendocina de Ajedrez"
  client: string;
  summary: string; // 1 línea, lenguaje de negocio
  problem: string; // 1 línea para la tarjeta
  format: "full" | "visual" | "brief";
  featured: boolean;
  order: number;
  year: number;
  services: ServiceId[]; // relaciona el caso con los servicios de §2.2
  stack: string[]; // capa 2: se muestra de forma secundaria
  role: string; // "Diseño y desarrollo frontend, migración a WordPress"
  liveUrl?: string;
  cover: { src: string; alt: string };
  seo?: { title?: string; description?: string };
};
```

---

## 3. Sistema visual y motion

### 3.1 Identidad, paleta y design tokens

Toda la identidad pasa por tokens. **Ningún componente usa colores, fuentes ni radios literales.**

**Logo.** Isotipo (dos montañas: pizarra y azul, con un sendero en zigzag entre ambas) más el wordmark **FYMTEC** ("FYM" en pizarra, "TEC" en azul). Se implementa como componente SVG (`src/components/brand/Logo.tsx`, trazados en `logo-paths.ts`) redibujado a partir de las imágenes originales de `docs/brand/`, con variantes `full` e `isotype` y colores desde los tokens `--logo-slate` y `--logo-blue`. En tema oscuro, la montaña pizarra y "FYM" pasan a `#F1F5F8` y el azul a `#2678AD` (3.9:1 sobre el fondo, ≥3:1 para gráficos). El favicon (`src/app/icon.svg`) se adapta al tema del sistema y el ícono de iOS (`apple-icon.png`) va sobre blanco.

**Paleta** (colores del logo medidos sobre los originales: azul `#1F6998`, pizarra `#202D34`):

| Rol                           | Oscuro (por defecto)                 | Claro                                |
| ----------------------------- | ------------------------------------ | ------------------------------------ |
| Fondo                         | `#0A1218` azul noche                 | `#F6F8FA`                            |
| Superficie                    | `#111C24`                            | `#FFFFFF`                            |
| Superficie elevada            | `#18252F`                            | `#EDF1F5`                            |
| Texto                         | `#F1F5F8`                            | `#1B262D`                            |
| Texto secundario              | `#9BAAB6`                            | `#52616C`                            |
| Acento de texto (`highlight`) | `#5CB3E8` celeste                    | `#1F6998` azul Fymtec                |
| CTA (fondo / texto)           | `#1F6998` / blanco · hover `#2678AD` | `#1F6998` / blanco · hover `#185A84` |
| Foco                          | `#5CB3E8`                            | `#1F6998`                            |

**Contrastes verificados (WCAG):** texto 17.2:1 (oscuro) y 14.5:1 (claro); texto secundario 7.9:1 y 6.0:1; acento 8.2:1 y 5.6:1; blanco sobre el CTA 5.95:1 (hover 4.8:1 y 7.4:1). **Regla:** el azul Fymtec **no se usa como color de texto sobre fondo oscuro** (3.2:1, no alcanza AA); ahí se usa el celeste. El azul queda para fondos de CTA, formas grandes y el isotipo.

**Tokens:**

- **Dónde viven:** `src/styles/tokens.css` como variables CSS, expuestas a Tailwind v4 con `@theme`.
- **Dos niveles:**
  - **Primitivos de marca** (`--brand-*`): la paleta de Fymtec y las familias tipográficas.
  - **Semánticos**, por tema: `--bg`, `--surface`, `--surface-raised`, `--fg`, `--fg-muted`, `--highlight`, `--cta`, `--cta-hover`, `--cta-fg`, `--border`, `--border-strong`, `--ring`, `--danger`. Tailwind los expone como `bg-surface`, `text-fg-muted`, `text-highlight`, `bg-cta`, etc. Los nombres de shadcn (`--primary`, `--muted`, `--accent`…) son alias de estos; ojo: en shadcn `accent` es el fondo sutil de hover, no el color de marca.
- **Temas:** `data-theme="dark"` (por defecto) o `data-theme="light"` en `<html>`. Los valores semánticos de cada tema son un bloque en `tokens.css`; los componentes no cambian.
- **Selector de tema:** botón en la barra del header, visible en todos los tamaños (en móvil, al lado del menú) con nombre accesible que indica a qué tema cambia. La elección se guarda en `localStorage`; un script mínimo en el `<head>` aplica el tema guardado **antes del primer pintado**, para que no haya parpadeo. Sin elección guardada, el sitio arranca en oscuro.
- Tipografía: `--font-display` y `--font-sans`, con una escala fluida con `clamp()`. **Provisorias** (Space Grotesk y Geist) hasta definir la tipografía de marca.
- Espaciado, radios, sombras y z-index.
- **Motion:** `--motion-duration-fast|base|slow` y `--motion-ease-out|in-out|emphasized` (en Tailwind: `ease-out`, `ease-in-out`, `ease-emphasized`). En TypeScript se espejan en `src/lib/motion.ts`.
- **Marca:** nombre, claim, contactos, ubicación, redes y flags (por ejemplo `formEnabled`) en `src/config/brand.ts`.
- **Imágenes generadas (OG):** Satori no lee variables CSS, así que `src/config/og-theme.ts` espeja en hex los primitivos del tema oscuro.

**Valores iniciales de `brand.ts`:**

| Campo                 | Valor                                                                     |
| --------------------- | ------------------------------------------------------------------------- |
| `name`                | `Fymtec`                                                                  |
| `tagline` / `claim`   | `Software a medida` / `Software que resuelve`                             |
| `contact.whatsapp`    | `+54 261 416 0956` → formato `wa.me`: `5492614160956` _(ver §12, nota 1)_ |
| `contact.email`       | `martinmerlo360@gmail.com`                                                |
| `contact.formEnabled` | `false`                                                                   |
| `location`            | `Mendoza, Argentina · Trabajo remoto`                                     |

### 3.2 Uso de 21st.dev y Uiverse

- Se usan como **punto de partida**, nunca se pegan tal cual. Cada componente adoptado:
  1. Se reescribe con los tokens del sistema (colores, radios, tiempos, curvas).
  2. Se adapta a las convenciones del proyecto (TypeScript, estructura y nombres).
  3. Pasa el checklist de motion (§3.3) y el de accesibilidad.
  4. Queda registrado en `docs/components-origin.md` con su origen y su licencia.
- **Presupuesto de "piezas firma":** hay como máximo 2 o 3 efectos protagonistas en todo el sitio (por ejemplo, el hero y la transición a los casos). El resto son microinteracciones sutiles del mismo lenguaje.

### 3.3 Principios de motion

El sitio tiene **muchas animaciones y microinteracciones** y tiene que destacar visualmente, pero no hay animación por animación. Cada una cumple al menos una de estas funciones:

1. **Jerarquía**: revelar el contenido en el orden en que se lee.
2. **Feedback**: hover, foco, press, copiar, envío.
3. **Storytelling**: acompañar la narrativa (por ejemplo, el antes y después de un rediseño).
4. **Orientación**: mostrar de dónde viene y a dónde va algo (transición de la home a un caso).
5. **Profundidad**: capas, parallax sutil y luz para dar espacialidad.
6. **Sensación de calidad**: transiciones y detalles que hacen que el sitio se sienta cuidado.

**Prioridad cuando hay conflicto:** performance, accesibilidad y legibilidad están por encima de cualquier efecto. Las piezas firma (§3.2) se definen en la etapa de diseño.

**Reglas técnicas:**

- Solo se animan `transform` y `opacity`, salvo una justificación explícita.
- El contenido es visible y legible **sin JS**. La animación solo se suma encima (progressive enhancement).
- Con `prefers-reduced-motion: reduce` se eliminan los desplazamientos, el parallax y los loops. Se mantienen, como mucho, fundidos cortos.
- No se secuestra el scroll (nada de scroll-jacking) ni se bloquea la lectura esperando una animación.
- Los efectos pesados (canvas, WebGL, partículas) se cargan de forma diferida (`next/dynamic` + IntersectionObserver), se pausan fuera del viewport y tienen un fallback estático.

---

## 4. SEO técnico

- Metadata API de Next: `title`, `description`, `canonical` y Open Graph/Twitter por página.
- `sitemap.ts` y `robots.ts` generados.
- **JSON-LD**: `ProfessionalService` u `Organization` para el estudio, `Person` en `/estudio` y `CreativeWork` en cada caso. Se valida con el Rich Results Test.
- HTML semántico: un solo `h1` por página, jerarquía de títulos correcta, `alt` descriptivos y `lang="es"`.
- Imágenes OG generadas por página (`opengraph-image.tsx`).
- URLs en español y estables (`/proyectos/liga-mendocina-de-ajedrez`).
- Preparado para `hreflang` cuando exista `/en`.

---

## 5. Stack técnico

| Área             | Elección                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Framework        | Next.js (App Router), React Server Components por defecto                                                                      |
| Lenguaje         | TypeScript en modo `strict`                                                                                                    |
| Estilos          | Tailwind CSS v4 + tokens CSS                                                                                                   |
| Componentes base | shadcn/ui (copiados al repo y adaptados a los tokens)                                                                          |
| Animación        | Motion (`motion/react`)                                                                                                        |
| Contenido        | MDX para los casos (con validación de frontmatter vía Zod)                                                                     |
| i18n             | Sin librería en v1: contenido separado en `src/content/es/`. Cuando se sume inglés se evalúa `next-intl` o una solución propia |
| Contacto         | Links a WhatsApp (`wa.me`) y `mailto:` en v1. Formulario construido pero desactivado; cuando se active: Route Handler + Resend |
| Analítica        | Vercel Web Analytics + Speed Insights desde el día uno                                                                         |
| Deploy           | Vercel                                                                                                                         |

---

## 6. Comandos

```bash
pnpm install          # instalar dependencias
pnpm dev              # servidor de desarrollo (http://localhost:3000)
pnpm build            # build de producción
pnpm start            # servir el build
pnpm lint             # ESLint
pnpm typecheck        # tsc --noEmit
pnpm format           # Prettier --write
pnpm test             # Vitest (unit y componentes)
pnpm test:e2e         # Playwright (e2e + accesibilidad con axe)
pnpm lighthouse       # Lighthouse CI contra producción (usa el Chromium de Playwright si no hay Chrome)
```

---

## 7. Estructura del proyecto

```
src/
  app/                    → Rutas (App Router)
    (site)/page.tsx       → Home
    proyectos/            → Índice y [slug]
    estudio/              → Segunda capa
    contacto/
    api/contact/route.ts  → Envío del formulario
    sitemap.ts, robots.ts, opengraph-image.tsx
  components/
    ui/                   → Primitivas (shadcn adaptadas)
    sections/             → Secciones de la home (Hero, Services, Methodology, Clients, Projects, FinalCta)
    case-study/           → Bloques de los casos
    motion/               → Wrappers de animación reutilizables (Reveal, Stagger…)
  config/brand.ts         → Nombre, claim, contactos y redes (única fuente)
  components/brand/       → Logo (isotipo + wordmark) y Wordmark
  content/es/             → Contenido en español
    site.ts               → Textos globales (navegación, hero, servicios, metodología, CTA)
    proyectos/*.mdx       → Casos de estudio
  lib/                    → Utilidades (motion.ts, seo.ts, content.ts)
  styles/tokens.css       → Design tokens
public/                   → Assets estáticos (imágenes optimizadas)
tests/                    → Vitest
e2e/                      → Playwright
docs/                     → Intención, decisiones (ADRs) y origen de componentes
```

---

## 8. Estilo de código

- Server Components por defecto. `"use client"` solo en hojas interactivas o animadas.
- Componentes en `PascalCase.tsx` y utilidades en `camelCase.ts`. Un componente por archivo. Excepción: las primitivas de shadcn en `components/ui/` mantienen su nombre en minúscula (`button.tsx`) para que el CLI de shadcn las siga reconociendo.
- Los textos de secciones salen de `content/es/` o del MDX, no se escriben dentro de los componentes de sección. Los microtextos triviales de una primitiva (por ejemplo, un `aria-label` genérico) pueden vivir en el componente si no dependen de la marca.
- Nada de valores de diseño literales: salen de los tokens. Una excepción debe estar justificada con un comentario.
- Nada de dependencias nuevas si CSS o una API nativa lo resuelve bien.

```tsx
// src/components/motion/Reveal.tsx
"use client";

import { motion, useReducedMotion } from "motion/react";
import { duration, ease } from "@/lib/motion";

type RevealProps = { children: React.ReactNode; delay?: number };

export function Reveal({ children, delay = 0 }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: duration.base, ease: ease.out, delay }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 9. Estrategia de testing

| Nivel             | Herramienta              | Qué cubre                                                                                          |
| ----------------- | ------------------------ | -------------------------------------------------------------------------------------------------- |
| Unit              | Vitest                   | Validación del frontmatter de casos, helpers de SEO y el armado del link de WhatsApp               |
| Componentes       | Vitest + Testing Library | Formulario de contacto (estados y errores) y componentes con lógica                                |
| E2E               | Playwright               | Recorrido home → caso → contacto, links de CTA, 404 y comportamiento con `reducedMotion: "reduce"` |
| Accesibilidad     | `@axe-core/playwright`   | Sin violaciones serias ni críticas en todas las rutas                                              |
| Performance y SEO | Lighthouse CI            | Umbrales de §10 en cada PR                                                                         |

No se busca un porcentaje de cobertura: se prueba lo que puede romperse (contenido, contacto, SEO y accesibilidad).

---

## 10. Criterios de éxito

**Negocio y experiencia**

- [ ] En la home, sin hacer scroll y en un móvil de 375 px, se lee qué se ofrece y hay un CTA de contacto visible.
- [ ] El CTA de WhatsApp abre la conversación con un mensaje precargado, en 1 clic desde cualquier página, gracias al botón flotante.
- [ ] El botón flotante nunca tapa contenido interactivo ni el CTA del hero en un móvil de 375 px.
- [ ] Ningún texto de la capa 1 requiere conocimiento técnico. Se revisa con una persona no técnica.
- [ ] La persona detrás de Fymtec solo aparece en Contacto, el footer y `/estudio`, nunca en Inicio, Metodología, Clientes ni Proyectos.
- [ ] La sección Clientes no muestra logos ni testimonios sin permiso del cliente.
- [ ] Hay 4 casos destacados y La Retama como secundario publicados, solo con material mostrable legítimamente y sin métricas no verificables.
- [ ] Con `formEnabled = false` no se renderiza ningún formulario ni endpoint accesible.

**Performance** (móvil, Lighthouse en modo mobile, en producción)

- [ ] Lighthouse: Performance ≥ 90; Accesibilidad, Buenas prácticas y SEO ≥ 95.
- [ ] LCP < 2.5 s, INP < 200 ms, CLS < 0.1.
- [ ] JS inicial de la home ≤ 170 KB gzip (a ajustar cuando se conozcan las piezas firma).
- [ ] Todas las imágenes pasan por `next/image` con tamaños responsivos.

**Motion y accesibilidad**

- [ ] Con `prefers-reduced-motion: reduce` no hay desplazamientos, parallax ni loops.
- [ ] El sitio se puede usar completo con teclado, con foco visible.
- [ ] Contraste AA en todos los textos, en los dos temas.
- [ ] Cambiar de tema no produce parpadeo al cargar y la elección se recuerda entre visitas.
- [ ] El selector de tema se puede operar con teclado y anuncia a qué tema cambia.
- [ ] Con JS desactivado, el contenido principal es legible.

**Mantenibilidad**

- [ ] Cambiar la marca (nombre, logo, paleta y tipografía) toca solo los primitivos de `tokens.css`, `brand.ts`, `fonts.ts` y el componente de logo.
- [ ] Los dos temas salen de bloques de valores semánticos; ningún componente tiene lógica por tema.
- [ ] Sumar un caso nuevo consiste en agregar un archivo MDX y sus imágenes, sin tocar componentes.
- [ ] Sumar inglés no requiere modificar los componentes de las secciones.

**SEO**

- [ ] JSON-LD válido en el Rich Results Test para la home, `/estudio` y cada caso.
- [ ] `sitemap.xml` y `robots.txt` correctos, con canonical en cada página.

---

## 11. Límites

**Siempre**

- Usar tokens y `brand.ts`; nunca colores, fuentes ni nombre de marca hardcodeados.
- Correr `pnpm lint`, `pnpm typecheck` y `pnpm test` antes de dar una tarea por terminada.
- Respetar `prefers-reduced-motion` y el enfoque de progressive enhancement en todo componente animado.
- Registrar el origen y la licencia de los componentes tomados de 21st.dev o Uiverse.

**Consultar antes**

- Sumar dependencias nuevas (sobre todo librerías de animación, 3D o WebGL).
- Sumar una "pieza firma" nueva, fuera del presupuesto de §3.2.
- Publicar nombres, capturas o datos de un cliente.
- Cambiar la estructura de rutas o el modelo de datos de los casos.
- Inicializar git, crear el repositorio remoto o conectar Vercel.

**Nunca**

- Inventar testimonios, métricas, clientes o resultados.
- Copiar el diseño o los textos de Salvatore Informatics.
- Commitear secretos (API keys de Resend y similares van en variables de entorno de Vercel).
- Ocultar contenido detrás de animaciones que dependan de JS.

---

## 12. Decisiones y preguntas abiertas

### Resueltas en v0.2

| #   | Tema              | Decisión                                                                                                          |
| --- | ----------------- | ----------------------------------------------------------------------------------------------------------------- |
| 1   | Nombre provisorio | ~~`Mertech`~~ → reemplazado por **Fymtec** (v1.1)                                                                 |
| 2   | Contacto          | WhatsApp (con botón flotante) + email en v1. Formulario construido pero desactivado; cuando se active, con Resend |
| 3   | Casos             | 4 destacados (Roma Barber, Freight Forwarder, Liga Mendocina, Salomón Barrios) y La Retama como secundario        |
| 4   | Material          | Solo material mostrable legítimamente, con capturas propias o nuevas de los sitios en vivo                        |
| 5   | Datos de contacto | Cargados en §3.1                                                                                                  |
| 6   | Tema              | Dark-first, solo el tema oscuro en v1, tokens preparados para un tema claro                                       |
| 7   | Analítica         | Vercel Web Analytics + Speed Insights desde el día uno                                                            |
| 8   | Ubicación         | "Mendoza, Argentina · Trabajo remoto"                                                                             |

### Notas

1. **Formato del número de WhatsApp:** en los links `wa.me`, los celulares de Argentina se escriben `549` + código de área sin 0 + número sin 15. Supuse `5492614160956`; conviene probar el link una vez antes de lanzar.
2. **Email:** una dirección personal funciona para v1. Cuando exista el dominio de la marca, conviene pasarla a una del dominio (y ese mismo dominio sirve para verificar Resend). Es un cambio de una línea en `brand.ts`.

### Resueltas en v1.0

| #   | Tema                | Decisión                                                                                                     |
| --- | ------------------- | ------------------------------------------------------------------------------------------------------------ |
| 9   | Mensaje de WhatsApp | _"Hola, vi el sitio de {brand.name} y quiero contarte sobre un proyecto."_ (el nombre se toma de `brand.ts`) |
| 10  | Piezas firma        | Se definen en la etapa de diseño                                                                             |
| 11  | Dominio             | `*.vercel.app` en v1                                                                                         |

### Resueltas en v1.1 (2026-10-07)

| #   | Tema               | Decisión                                                                                                                 |
| --- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| 12  | Marca              | **Fymtec**, con logo propio (isotipo de montañas + wordmark). Tagline "Software a medida", claim "Software que resuelve" |
| 13  | Paleta             | Derivada del logo; ver §3.1                                                                                              |
| 14  | Tema               | Dark-first con selector para pasar a modo claro (en v1)                                                                  |
| 15  | Secciones          | Inicio, Metodología, Clientes, Proyectos y Contacto, en ese orden                                                        |
| 16  | Clientes/Proyectos | Clientes = prueba social breve; Proyectos = casos de estudio en `/proyectos/[slug]`                                      |
| 17  | Servicios          | Bloque breve dentro de Inicio                                                                                            |
| 18  | Detrás del estudio | Se elimina de la home; la persona aparece en Contacto, footer y `/estudio`, que se mantiene                              |
| 19  | Logo               | Se redibuja como SVG a partir de las imágenes; Martín valida que quede idéntico                                          |

### Resueltas el 2026-10-07 (cont.)

| #   | Tema       | Decisión                                                                                                                                                                                                |
| --- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 20  | La Retama  | Cliente real; por ahora **solo auditoría SEO** (sin implementación). No se presenta como implementado ni con resultados                                                                                 |
| 21  | Tipografía | No hay fuente de marca: se propone una en la etapa de diseño (T29), que acompañe al wordmark geométrico                                                                                                 |
| 22  | Fotografía | Se usan fotos de montaña de bancos con licencia libre para uso comercial (por ejemplo Unsplash o Pexels), registradas en `docs/components-origin.md` con autor y licencia; optimizadas con `next/image` |

### Abiertas

1. Qué 2–3 piezas firma usar (etapa de diseño).
