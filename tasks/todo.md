# Tareas: sitio de marca / estudio de software

> Plan: [`tasks/plan.md`](plan.md) · Spec: [`SPEC.md`](../SPEC.md) · Secciones: [`docs/secciones.md`](../docs/secciones.md)
> **Definición de terminado (todas las tareas):** `pnpm lint`, `pnpm typecheck` y `pnpm test` en verde; sin colores, fuentes ni nombre de marca hardcodeados; con `prefers-reduced-motion` respetado si hay animación; accesible por teclado.
> Tamaños: **S** = 1–2 archivos · **M** = 3–5 archivos.

---

## Fase 1: Base

- [x] **T1. Proyecto base** · M · ✅ 2026-09-28 (Next 16.3.6, React 19.2.8, Tailwind 4.3.3, pnpm 12.6.0)
  - **Qué:** crear el proyecto Next.js (App Router, TypeScript strict, Tailwind v4, pnpm), con ESLint y Prettier y los scripts de §6 de la spec. Verificar las versiones estables y la documentación oficial actuales. Inicializar git.
  - **Aceptación:**
    - `pnpm dev` levanta una página vacía en `/` con `lang="es"`.
    - Existen `lint`, `typecheck`, `format` y `build`, y pasan.
    - `.gitignore` incluye `.env*`, `.next` y `node_modules`.
  - **Verificar:** `pnpm build` · `pnpm lint` · `pnpm typecheck`.
  - **Archivos:** `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `src/app/layout.tsx`.

- [x] **T2. Tokens, marca y layout raíz** · M · ✅ 2026-09-28
  - **Qué:** crear `tokens.css` con primitivos de marca y tokens semánticos (solo dark), expuestos a Tailwind con `@theme`. Crear `brand.ts` (nombre, contacto, ubicación, redes, `formEnabled`), `lib/motion.ts` (duraciones y curvas) y las fuentes provisorias con `next/font`. El layout raíz lleva el link "Saltar al contenido". Instalar shadcn/ui y adaptar su tema a los tokens.
  - **Aceptación:**
    - Cambiar un primitivo (por ejemplo, el acento) cambia todo el sitio sin tocar componentes.
    - Cambiar `brand.name` cambia el nombre en todo el sitio.
    - Un test falla si aparece el nombre de la marca o un color literal (`#`, `rgb(`, `oklch(`) dentro de `src/components/`.
  - **Verificar:** `pnpm test` (test anti-hardcodeo) · revisión visual en `pnpm dev`.
  - **Archivos:** `src/styles/tokens.css`, `src/app/globals.css`, `src/config/brand.ts`, `src/lib/motion.ts`, `tests/no-hardcoded-brand.test.ts`.

- [x] **T3. Infraestructura de tests** · M · ✅ 2026-09-28
  - **Qué:** configurar Vitest con Testing Library, Playwright con `@axe-core/playwright` y un smoke test e2e de la home.
  - **Aceptación:**
    - `pnpm test` y `pnpm test:e2e` corren.
    - El e2e de la home pasa sin violaciones de axe serias ni críticas.
    - Hay un proyecto de Playwright con `reducedMotion: "reduce"`.
  - **Verificar:** `pnpm test` · `pnpm test:e2e`.
  - **Archivos:** `vitest.config.ts`, `playwright.config.ts`, `e2e/home.spec.ts`, `tests/setup.ts`.

- [x] **T4. SEO base** · M · ✅ 2026-09-28
  - **Qué:** crear un helper de metadata por página (title, description, canonical, OG), junto con `sitemap.ts`, `robots.ts`, el JSON-LD `ProfessionalService` y una imagen OG genérica generada. Todo sale de `brand.ts`.
  - **Aceptación:**
    - `/sitemap.xml` y `/robots.txt` responden correctamente.
    - La home tiene canonical, OG y JSON-LD válido.
    - El helper tiene tests unitarios.
  - **Verificar:** `pnpm test` · abrir `/sitemap.xml` · validar el JSON-LD con el validador de Schema.org.
  - **Archivos:** `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/opengraph-image.tsx`, `tests/seo.test.ts`.

### ✅ Checkpoint fase 1

- [x] `pnpm build`, `pnpm test` y `pnpm test:e2e` en verde.
- [x] Cambiar el acento y el nombre en un solo lugar se refleja en todo el sitio.
- [ ] **Revisión tuya** antes de seguir.

---

## Fase 2: Camino de conversión

- [ ] **T5. Helpers y CTAs de contacto** · M · Depende de: T2
  - **Qué:** crear el helper `whatsappUrl(mensaje)` (formato `wa.me` y codificación del texto), el componente `Button` (base shadcn adaptada) y los componentes `WhatsAppCta` y `EmailCta` (con copiar al portapapeles y feedback de "Copiado"). El ícono de WhatsApp es un SVG inline, sin librería de íconos solo para eso.
  - **Aceptación:**
    - El helper genera `https://wa.me/5492614160956?text=…` con el mensaje de la spec y el nombre tomado de `brand.ts`. Tiene tests.
    - Copiar el email muestra un feedback accesible (`aria-live`).
  - **Verificar:** `pnpm test` · **manual: abrir el link en un celular y confirmar que abre el chat correcto.**
  - **Archivos:** `src/lib/contact.ts`, `src/components/ui/Button.tsx`, `src/components/contact/WhatsAppCta.tsx`, `src/components/contact/EmailCta.tsx`, `tests/contact.test.ts`.

- [ ] **T6. Header** · M · Depende de: T5
  - **Qué:** header con wordmark, navegación por anclas, sección activa, compactación al scrollear y CTA "Hablemos". En móvil, menú con `<dialog>` nativo.
  - **Aceptación:**
    - El menú móvil atrapa el foco, cierra con Esc y devuelve el foco al botón.
    - `aria-current` en la sección activa.
    - En móvil el header se oculta al bajar y reaparece al subir.
  - **Verificar:** `pnpm test:e2e` (navegación con teclado en el menú móvil) · manual en 375 px.
  - **Archivos:** `src/components/layout/Header.tsx`, `src/components/layout/MobileNav.tsx`, `src/content/es/site.ts`, `e2e/header.spec.ts`.

- [ ] **T7. Botón flotante de WhatsApp** · S · Depende de: T5
  - **Qué:** botón fijo, integrado al sistema visual, que aparece después del hero y se oculta mientras el CTA final está en pantalla. En desktop se expande con el hover.
  - **Aceptación:**
    - Está presente en todas las páginas.
    - Nunca tapa botones en 375 px y respeta `safe-area-inset`.
    - Con reduced-motion aparece sin desplazamiento.
    - Tiene `aria-label` y un área táctil ≥ 44 px.
  - **Verificar:** `pnpm test:e2e` (visible tras scroll y oculto en el CTA final) · manual en un celular.
  - **Archivos:** `src/components/contact/FloatingWhatsApp.tsx`, `src/app/layout.tsx`, `e2e/floating-whatsapp.spec.ts`.

- [ ] **T8. Footer, CTA final y `/contacto`** · M · Depende de: T5
  - **Qué:** crear la sección `FinalCta` (WhatsApp como opción principal y email como secundaria), el footer (ubicación, email copiable, GitHub y año) y la página `/contacto` que reutiliza `FinalCta`.
  - **Aceptación:**
    - Desde `/`, `/contacto` y la 404 se puede iniciar WhatsApp en 1 clic.
    - El footer muestra "Mendoza, Argentina · Trabajo remoto" tomado de `brand.ts`.
  - **Verificar:** `pnpm test:e2e` (el recorrido de contacto funciona) · `pnpm build`.
  - **Archivos:** `src/components/sections/FinalCta.tsx`, `src/components/layout/Footer.tsx`, `src/app/contacto/page.tsx`, `src/content/es/site.ts`.

- [ ] **T9. Deploy en Vercel y analítica** · S · Depende de: T8 · ⚠️ _Consultar antes (conectar Vercel)_
  - **Qué:** conectar el repo a Vercel, sumar Vercel Web Analytics y Speed Insights y configurar Lighthouse CI con los umbrales de §10 de la spec.
  - **Aceptación:**
    - El sitio está en `*.vercel.app`.
    - Analytics y Speed Insights registran visitas.
    - `pnpm lighthouse` corre contra el build local con los umbrales configurados.
  - **Verificar:** abrir la URL de producción · panel de Vercel · `pnpm lighthouse`.
  - **Archivos:** `src/app/layout.tsx`, `lighthouserc.json`, `package.json`.

### ✅ Checkpoint fase 2

- [ ] En la URL de Vercel, desde un celular, se puede abrir WhatsApp y copiar el email desde cualquier página.
- [ ] Lighthouse mobile ≥ 95 en las 4 categorías (todavía no hay contenido pesado).
- [ ] **Revisión tuya.**

---

## Fase 3: Home

- [ ] **T10. Primitivas de motion** · M · Depende de: T2
  - **Qué:** crear `Reveal`, `Stagger` y `TextReveal` (con Motion, respetando reduced-motion) y utilidades CSS para scroll-driven animations con fallback. El contenido siempre viene renderizado en el servidor y es visible sin JS.
  - **Aceptación:**
    - Con JS desactivado, todo el contenido envuelto es visible.
    - Con reduced-motion no hay desplazamientos.
    - Solo se animan `transform` y `opacity`.
  - **Verificar:** `pnpm test` (tests de componentes con reduced-motion) · manual con JS desactivado.
  - **Archivos:** `src/components/motion/Reveal.tsx`, `src/components/motion/Stagger.tsx`, `src/components/motion/TextReveal.tsx`, `src/styles/motion.css`, `tests/motion.test.tsx`.

- [ ] **T11. Hero** · M · Depende de: T10, T5
  - **Qué:** hero con texto superior, titular, bajada y CTAs (principal a WhatsApp y secundario "Ver trabajos"), sobre un fondo provisorio estático. La pieza firma se suma en la fase 6.
  - **Aceptación:**
    - En 375 px, el titular, la bajada y el CTA principal están en la primera pantalla.
    - El titular es el elemento LCP y es visible en el primer render.
    - Sin tecnicismos (se revisa contra la regla de voz).
  - **Verificar:** `pnpm test:e2e` · Lighthouse en la preview: LCP < 2.5 s.
  - **Archivos:** `src/components/sections/Hero.tsx`, `src/content/es/site.ts`, `src/app/page.tsx`.

- [ ] **T12. Qué resolvemos** · M · Depende de: T10
  - **Qué:** 4 bloques problema → solución → caso relacionado, con automatización como mención menor. Entrada escalonada y feedback en hover.
  - **Aceptación:**
    - Los textos salen de `content/es/services.ts`.
    - Los links a casos solo aparecen si el caso está `published`.
    - Cada bloque se entiende sin conocimiento técnico.
  - **Verificar:** `pnpm test` · revisión de textos con vos.
  - **Archivos:** `src/components/sections/Services.tsx`, `src/content/es/services.ts`, `src/app/page.tsx`.

- [ ] **T13. Pipeline de contenido de casos** · M · Depende de: T1
  - **Qué:** crear el esquema Zod de `CaseStudy` (con `status: draft | published`), el loader de MDX (lista, por slug, destacados y secundarios) y fixtures de test. En producción solo se exponen los `published`.
  - **Aceptación:**
    - Un frontmatter inválido rompe `pnpm build` con un mensaje claro.
    - Los casos `draft` no aparecen en producción.
    - El loader tiene tests.
  - **Verificar:** `pnpm test` · `pnpm build` con un fixture inválido falla.
  - **Archivos:** `src/lib/content.ts`, `src/lib/case-schema.ts`, `tests/content.test.ts`, `tests/fixtures/*.mdx`.

- [ ] **T14. Trabajos destacados y otros trabajos en la home** · M · Depende de: T13, T10
  - **Qué:** tarjetas de casos (imagen, negocio, problema, tipo de solución), en el orden y con el peso definidos en `secciones.md` §3.3, más la franja de "Otros trabajos". Revelado con máscara y feedback en hover. Las imágenes van con `next/image`.
  - **Aceptación:**
    - Con 0 casos publicados, la sección no se renderiza.
    - En móvil hay una tarjeta por fila y la información es visible sin hover.
    - Las imágenes tienen `sizes` responsivos y `alt` descriptivo.
  - **Verificar:** `pnpm test:e2e` con fixtures · Lighthouse CLS < 0.1.
  - **Archivos:** `src/components/sections/FeaturedWork.tsx`, `src/components/case-study/CaseCard.tsx`, `src/components/sections/OtherWork.tsx`, `src/app/page.tsx`.

- [ ] **T15. Cómo trabajo** · S · Depende de: T10
  - **Qué:** los 4 pasos con un camino que se dibuja con el scroll, hecho con scroll-driven animations de CSS y fallback estático.
  - **Aceptación:**
    - Funciona sin JS.
    - Con reduced-motion los pasos son estáticos.
    - En navegadores sin soporte se ve la versión estática completa.
  - **Verificar:** manual en Chrome y en Safari o Firefox · `pnpm test:e2e` (reduced-motion).
  - **Archivos:** `src/components/sections/Process.tsx`, `src/content/es/site.ts`.

- [ ] **T16. Detrás del estudio** · S · Depende de: T10
  - **Qué:** bloque breve de texto en primera persona, sin foto, con link a `/estudio`. Es el primer lugar donde aparece "Martín".
  - **Aceptación:**
    - Un test e2e verifica que "Martín" no aparece en el DOM antes de esta sección.
    - El link a `/estudio` funciona (puede mostrar un placeholder hasta T26).
  - **Verificar:** `pnpm test:e2e`.
  - **Archivos:** `src/components/sections/BehindStudio.tsx`, `src/content/es/site.ts`, `e2e/home.spec.ts`.

### ✅ Checkpoint fase 3

- [ ] La home completa sigue el orden problema → solución → evidencia → confianza → contacto.
- [ ] Lighthouse mobile en la preview: Performance ≥ 90 y el resto ≥ 95.
- [ ] Una persona no técnica entiende qué se ofrece con solo ver el hero.
- [ ] **Revisión tuya** (textos y ritmo de la home).

---

## Fase 4: Casos de estudio

- [ ] **T17. Plantilla de caso** · M · Depende de: T13
  - **Qué:** crear `/trabajos/[slug]` con bloques MDX opcionales (Portada, Contexto, Solución, Proceso, QuéHiceYo, Decisiones, Tecnologías, Resultado, Galería), navegación al siguiente caso y CTA. Incluye metadata, OG por caso y JSON-LD `CreativeWork`.
  - **Aceptación:**
    - Un caso puede usar cualquier subconjunto de bloques y en cualquier orden.
    - Las rutas se generan estáticamente.
    - JSON-LD válido.
    - Un slug inexistente devuelve 404.
  - **Verificar:** `pnpm test:e2e` con fixtures · `pnpm build` (generación estática).
  - **Archivos:** `src/app/trabajos/[slug]/page.tsx`, `src/components/case-study/blocks.tsx`, `src/components/case-study/CaseHero.tsx`, `src/app/trabajos/[slug]/opengraph-image.tsx`.

- [ ] **T18. Comparador antes/después** · S · Depende de: T17
  - **Qué:** componente para comparar dos imágenes, accesible (control con `input type="range"` nativo), para el caso de Freight Forwarder.
  - **Aceptación:**
    - Se opera con teclado, mouse y touch.
    - Tiene un label accesible.
    - Sin JS se ven las dos imágenes, una al lado de la otra.
  - **Verificar:** `pnpm test` · manual en el celular.
  - **Archivos:** `src/components/case-study/BeforeAfter.tsx`, `tests/before-after.test.tsx`.

- [ ] **T19. Índice `/trabajos`** · S · Depende de: T14, T17
  - **Qué:** página con los destacados (mismas tarjetas) y la lista de otros trabajos.
  - **Aceptación:** lista todos los casos publicados y tiene metadata propia.
  - **Verificar:** `pnpm test:e2e`.
  - **Archivos:** `src/app/trabajos/page.tsx`.

- [ ] **T20. Caso: International Freight Forwarder** · M · Depende de: T17, T18 · 🧑 _Necesita tu material_
- [ ] **T21. Caso: Liga Mendocina de Ajedrez** · M · Depende de: T17 · 🧑 _Necesita tu material_
- [ ] **T22. Caso: Roma Barber Club** · S · Depende de: T17 · 🧑 _Necesita tu material_
- [ ] **T23. Caso: Salomón Barrios** · S · Depende de: T17 · 🧑 _Necesita tu material_
- [ ] **T24. Caso breve: La Retama (SEO)** · S · Depende de: T17 · 🧑 _Necesita tu material_
  - **Qué (T20–T24):** redactar cada caso con el enfoque de `secciones.md` §4.2, a partir de lo que me pases: contexto real, alcance de tu trabajo, stack, año, link y capturas. Las imágenes se optimizan (AVIF o WebP, tamaños responsivos).
  - **Aceptación:**
    - Ningún dato inventado: cada afirmación sale de tu material.
    - Pasa a `published` solo con tu aprobación.
    - Las imágenes tienen `alt` descriptivo.
  - **Verificar:** revisión tuya del texto · `pnpm build` · Lighthouse de la página del caso.
  - **Archivos:** `src/content/es/trabajos/<slug>.mdx`, `public/trabajos/<slug>/*`.

- [ ] **T25. Transición home → caso** · S · Depende de: T14, T17
  - **Qué:** la imagen de la tarjeta se transforma en la portada del caso, con la View Transitions API. Sin soporte o con reduced-motion, la navegación es normal.
  - **Aceptación:**
    - Funciona en Chrome.
    - En otros navegadores no rompe nada.
    - Sin dependencias nuevas, salvo consulta previa.
  - **Verificar:** manual en Chrome y en Safari o Firefox · `pnpm test:e2e`.
  - **Archivos:** `src/components/case-study/CaseCard.tsx`, `src/components/case-study/CaseHero.tsx`, `src/app/layout.tsx`.

### ✅ Checkpoint fase 4

- [ ] 4 casos destacados y La Retama publicados con contenido real aprobado por vos.
- [ ] Lighthouse de cada página de caso dentro de los umbrales.
- [ ] **Revisión tuya.**

---

## Fase 5: Segunda capa

- [ ] **T26. `/estudio`** · M · Depende de: T4
  - **Qué:** las secciones de `secciones.md` §6: quién soy, cómo trabajo, stack agrupado por para qué, "cómo está hecho este sitio" y código. JSON-LD `Person`.
  - **Aceptación:**
    - El stack no es una "sopa de logos".
    - Los puntajes de Lighthouse son reales y tienen fecha (se actualizan en T35).
    - Hay link a GitHub.
  - **Verificar:** `pnpm test:e2e` · validar el JSON-LD.
  - **Archivos:** `src/app/estudio/page.tsx`, `src/content/es/studio.ts`, `src/components/sections/StackGroups.tsx`.

- [ ] **T27. Página 404** · S · Depende de: T8
  - **Aceptación:** tiene el estilo del sitio, links a la home, a Trabajos y a WhatsApp, y devuelve estado 404.
  - **Verificar:** `pnpm test:e2e` en una ruta inexistente.
  - **Archivos:** `src/app/not-found.tsx`.

- [ ] **T28. Formulario de contacto (apagado)** · M · Depende de: T8 · ⚠️ _Consultar antes (dependencia Resend)_
  - **Qué:** crear el formulario (validación con Zod y estados: enviando, éxito, error) y el Route Handler que envía con Resend. Todo queda detrás de `formEnabled`. Incluye honeypot y rate limit básico. La API key va en variables de entorno.
  - **Aceptación:**
    - Con `formEnabled = false`, no se renderiza el formulario y el endpoint responde 404.
    - Con el flag activo en local, el envío funciona.
    - Hay tests de validación.
  - **Verificar:** `pnpm test` · prueba local con el flag activo.
  - **Archivos:** `src/components/contact/ContactForm.tsx`, `src/app/api/contact/route.ts`, `src/lib/contact-schema.ts`, `tests/contact-form.test.tsx`.

### ✅ Checkpoint fase 5

- [ ] La segunda capa está completa y se llega desde la home.
- [ ] **Revisión tuya.**

---

## Fase 6: Diseño y piezas firma

- [ ] **T29. Selección de piezas firma** · S · Depende de: fase 3 · 🧑 _Sesión con vos_
  - **Qué:** revisar juntos los componentes de 21st.dev y Uiverse que te gustan y elegir 2–3 piezas firma, con su función, costo de performance y fallback. Se registra en `docs/components-origin.md` y se actualiza el mapa de motion de `secciones.md` §9.
  - **Aceptación:** hay una lista aprobada con origen, licencia, función, peso estimado y fallback de cada pieza.
  - **Verificar:** tu aprobación.
  - **Archivos:** `docs/components-origin.md`, `docs/secciones.md`.

- [ ] **T30. Pieza firma: hero** · M · Depende de: T29, T11
- [ ] **T31. Pieza firma: CTA final** · M · Depende de: T29, T8
- [ ] **T32. Pieza firma opcional (trabajos o transición)** · M · Depende de: T29
  - **Qué (T30–T32):** implementar cada pieza reescrita con tokens, con carga diferida, pausada fuera del viewport y con fallback estático para reduced-motion o dispositivos modestos.
  - **Aceptación:**
    - No empeora el LCP ni el CLS respecto del checkpoint de la fase 3.
    - El JS inicial de la home se mantiene ≤ 170 KB gzip.
    - Tiene fallback verificado.
  - **Verificar:** Lighthouse antes y después · análisis del bundle · manual con reduced-motion.

### ✅ Checkpoint fase 6

- [ ] El sitio se siente como un producto cuidado y los componentes no parecen de distintas páginas.
- [ ] Los umbrales de performance se mantienen.
- [ ] **Revisión tuya.**

---

## Fase 7: Calidad y lanzamiento

- [ ] **T33. Auditoría de performance** · M · Depende de: fase 6
  - **Qué:** auditoría con el agente `web-performance-auditor`: bundle, imágenes, fuentes y Core Web Vitals en producción.
  - **Aceptación:** se cumplen todos los criterios de performance de §10 de la spec, medidos en producción.
  - **Verificar:** `/webperf` · Speed Insights.

- [ ] **T34. Auditoría de accesibilidad y SEO** · M · Depende de: fase 6
  - **Qué:** axe en todas las rutas, teclado, contraste AA, JSON-LD con el Rich Results Test, sitemap y canonical.
  - **Aceptación:** se cumplen los criterios de accesibilidad y SEO de §10 de la spec.
  - **Verificar:** `pnpm test:e2e` · Rich Results Test · revisión manual con teclado.

- [ ] **T35. Lanzamiento** · S · Depende de: T33, T34
  - **Qué:** checklist `/ship`, actualizar los puntajes reales en `/estudio`, probar WhatsApp en un celular y revisión final de los textos.
  - **Aceptación:** decisión explícita de lanzamiento (go) de tu parte.
  - **Verificar:** `/ship`.

### ✅ Checkpoint final

- [ ] Todos los criterios de éxito de §10 de la spec están cumplidos.
- [ ] **Tu aprobación para lanzar.**
