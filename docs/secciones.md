# Arquitectura de información y definición de secciones

> **Estado:** ✅ aprobado v1.0 · 2026-09-28 · **v1.1 · 2026-10-07:** marca Fymtec, home con 5 secciones (Inicio, Metodología, Clientes, Proyectos, Contacto) y selector de tema.
> **Depende de:** [`SPEC.md`](../SPEC.md) (v1.1) y [`docs/intent/portfolio.md`](intent/portfolio.md).
> Define **qué** hace cada sección y **cómo se comporta**. El aspecto visual final depende de las piezas firma, que se deciden en la etapa de diseño.

Los textos marcados como _borrador_ son propuestas de wording para iterar, no copy final. `{brand.name}` indica que el valor sale de `brand.ts`. Varios borradores toman frases de las piezas de marca de Fymtec.

---

## 1. Voz y tono

Fymtec se presenta como estudio. La persona detrás aparece de forma discreta en Contacto, el footer y `/estudio`.

| Zona                                                 | Voz                                                                                                                  | Ejemplo                                                   |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Inicio, Metodología, Clientes y Proyectos (tarjetas) | **Centrada en el cliente**: segunda persona ("tu negocio") y frases impersonales. Sin "nosotros" ni "yo".            | "Software que resuelve."                                  |
| Contacto, footer y `/estudio`                        | **Primera persona del singular**, cercana.                                                                           | "Contame tu idea." / "Detrás de Fymtec estoy yo, Martín." |
| Páginas de caso                                      | Primera persona en "Qué hice yo" y en "Decisiones"; el resto, narrativo.                                             | "Decidí migrar a WordPress con ACF porque…"               |
| Tono general                                         | Claro, directo, sin jerga en la capa 1, sin superlativos vacíos ("el mejor", "líderes"). Voseo rioplatense moderado. | —                                                         |

**Metáfora de marca:** el isotipo son dos montañas unidas por un sendero. Se puede usar con moderación ("el próximo paso", "el camino"), sin forzarla en cada texto.

---

## 2. Elementos globales

### 2.1 Header

- **Objetivo:** orientar, tener siempre a mano el CTA y permitir cambiar de tema.
- **Contenido:** logo Fymtec (isotipo + wordmark) → link a `/`. Navegación: _Inicio · Metodología · Clientes · Proyectos · Contacto_. Selector de tema. Botón "Hablemos", que abre WhatsApp.
- **Comportamiento:**
  - Al cargar es transparente sobre el hero. Después de un poco de scroll pasa a una superficie con desenfoque y se compacta (**calidad y orientación**).
  - Se esconde al scrollear hacia abajo y reaparece al subir, solo en móvil.
  - Los links de ancla marcan la sección activa (**orientación**).
- **Móvil:** menú en un panel a pantalla completa (`<dialog>` nativo), con el foco atrapado adentro y cierre con Esc. Los links entran de forma escalonada (**jerarquía**). El selector de tema queda en la barra del header, al lado del botón de menú, siempre visible.
- **Accesibilidad:** link "Saltar al contenido" como primer elemento enfocable y `aria-current` en la sección activa.

### 2.2 Selector de tema

- **Objetivo:** dejar elegir modo claro u oscuro. El oscuro es el predeterminado.
- **Diseño:** botón de ícono (sol / luna) con nombre accesible que dice a qué tema cambia ("Cambiar a modo claro").
- **Ubicación:** barra del header, en todos los tamaños.
- **Comportamiento:** la elección se guarda en `localStorage` y se sincroniza entre pestañas. Un script mínimo en el `<head>` aplica el tema guardado antes del primer pintado (sin parpadeo). El cambio de colores tiene una transición corta de fondo y texto (**calidad**); con reduced-motion es instantáneo.
- **Logo:** cambia de variante según el tema (la montaña pizarra se aclara en fondo oscuro), sin cargar otra imagen.

### 2.3 Botón flotante de WhatsApp

- **Objetivo:** que iniciar una conversación esté siempre a un clic.
- **Diseño:** ícono reconocible de WhatsApp sobre una superficie del sistema, **no** el círculo verde genérico. En desktop, al pasar el mouse se expande y muestra "Escribir por WhatsApp".
- **Comportamiento:**
  - En páginas con hero aparece cuando el final del hero sube a la mitad superior de la pantalla; en desktop también a los 3 segundos. En páginas sin hero aparece de entrada.
  - Se oculta mientras la sección Contacto está en pantalla, para no duplicar el mensaje. Oculto, no recibe foco (`inert`).
  - Microinteracción de hover y press (**feedback**). Nada de pulsos infinitos ni rebotes.
- **Móvil:** respeta `safe-area-inset` y nunca tapa botones. Área táctil ≥ 44×44 px.

### 2.4 Footer

- Logo y claim ("Software que resuelve"), las secciones, WhatsApp, email, GitHub, "Mendoza, Argentina · Trabajo remoto" y © año.
- No lleva CTA propio: ese rol lo cumple Contacto, que va justo antes.

### 2.5 Transiciones entre páginas

- Home → caso: la imagen de la tarjeta se transforma en la portada del caso (**orientación**), con la **View Transitions API** nativa si el soporte lo permite; si no, un fundido simple. Sin dependencias nuevas solo para esto.

---

## 3. Home

Cinco secciones, en este orden: **Inicio → Metodología → Clientes → Proyectos → Contacto.**

### 3.1 Inicio (`#inicio`): problema, solución y servicios

**a) Hero**

- **Objetivo:** que en menos de 10 segundos un dueño de negocio entienda **qué problema resolvés y que es para él**.
- **Contenido:**
  - Texto superior: "{brand.tagline}" → "Software a medida".
  - **Titular** (una sola idea, sin tecnicismos). Opciones _borrador_:
    1. "Software que resuelve." (claim de marca)
    2. "Tu próximo paso empieza acá."
    3. "Ideas reales. Soluciones a medida."
  - Bajada de 1–2 líneas que concrete: webs, sistemas a medida y SEO para negocios que quieren verse profesionales y operar mejor.
  - CTA principal: **"Contame tu idea"** → WhatsApp. CTA secundario: "Ver proyectos" → `#proyectos`.
  - Indicador de scroll.
- **Visual:** el **momento más fuerte del sitio**, candidato a pieza firma. La forma de las montañas del isotipo es un recurso natural (capas que dan profundidad, el sendero en zigzag como línea que guía la mirada).
- **Motion:** el titular se revela por líneas (**jerarquía**) y el fondo tiene profundidad (**profundidad y calidad**). **El titular y los CTA vienen en el HTML del servidor y son legibles en el primer render**, para no perjudicar el LCP.
- **Móvil (375 px):** titular, bajada y CTA principal entran en la primera pantalla. El efecto de fondo se simplifica o queda estático.

**b) Qué resolvemos (servicios)**

- **Objetivo:** traducir los servicios a problemas que el cliente reconoce como propios.
- **Estructura:** 4 bloques + automatización como mención menor. Cada bloque: **problema** (en palabras del cliente), **qué se hace** y **proyecto relacionado** (link cuando exista).

| Bloque                           | Problema (_borrador_)                                                                     | Solución                                                  | Proyecto relacionado              |
| -------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------- | --------------------------------- |
| Presencia que convierte          | "Mi negocio no se ve profesional en internet" / "La gente no me encuentra ni me contacta" | Sitios y landings pensados para generar consultas         | Roma Barber Club, Salomón Barrios |
| Sitios que podés gestionar       | "Mi web está vieja y depende de otro para cualquier cambio"                               | Rediseño y migración a plataformas editables              | International Freight Forwarder   |
| Sistemas y plataformas a medida  | "Manejo todo con planillas, mensajes y papeles"                                           | Aplicaciones y sistemas con funciones propias del negocio | Liga Mendocina de Ajedrez         |
| Visibilidad en buscadores        | "No aparezco en Google"                                                                   | Auditoría e implementación de SEO técnico                 | La Retama                         |
| _Automatización e integraciones_ | "Pierdo tiempo en tareas repetitivas"                                                     | Automatizar procesos y conectar herramientas              | Mención menor, sin proyecto       |

- **Motion:** los bloques entran escalonados (**jerarquía**) y reaccionan al hover (**feedback**).
- **Listo cuando:** una persona no técnica, viendo solo Inicio, puede decir qué ofrece Fymtec, y cada bloque se entiende sin conocer ninguna tecnología.

### 3.2 Metodología (`#metodologia`): confianza en el proceso

- **Objetivo:** bajar el riesgo percibido ("sé qué va a pasar si escribo").
- **Pasos** (nombres _borrador_, propios):
  1. **Entender:** una charla para conocer tu negocio y lo que necesitás.
  2. **Proponer:** alcance, tiempos y una propuesta clara antes de empezar.
  3. **Construir:** avances visibles durante el desarrollo, con tu feedback.
  4. **Acompañar:** publicación y soporte después del lanzamiento.
- **No promete** nada que todavía no esté definido comercialmente (ni diagnóstico gratis, ni plazos fijos, ni garantías).
- **Motion:** el sendero del isotipo como línea que se dibuja con el scroll y va activando cada paso (**storytelling y orientación**), con **scroll-driven animations de CSS** y fallback estático.
- **Listo cuando:** se lee en menos de 15 segundos y responde "¿cómo sería trabajar juntos?".

### 3.3 Clientes (`#clientes`): prueba social

- **Objetivo:** mostrar que negocios reales confiaron en Fymtec, en un vistazo.
- **Contenido:** una franja o grilla con los 5 clientes. Por cada uno: **nombre**, **rubro** y **qué se hizo** en una línea.

| Cliente                         | Rubro (_borrador_)           | Qué se hizo (_borrador_)                   |
| ------------------------------- | ---------------------------- | ------------------------------------------ |
| International Freight Forwarder | Logística                    | Rediseño del sitio y migración a WordPress |
| Liga Mendocina de Ajedrez       | Institución deportiva        | Sitio institucional con ranking y torneos  |
| Roma Barber Club                | Barbería                     | Landing comercial con turnos y contacto    |
| Salomón Barrios                 | Arte                         | Portfolio de artista                       |
| La Retama                       | _a confirmar con el cliente_ | Auditoría SEO (en curso)                   |

- **Reglas:** sin logos de clientes salvo permiso explícito (sin logos, se usa una tipografía cuidada); **sin testimonios inventados**. Si más adelante hay testimonios reales con permiso, esta sección es su lugar.
- **Motion:** entrada escalonada (**jerarquía**); en desktop, el hover resalta el cliente y, si tiene caso, ofrece "Ver proyecto" (**feedback**).
- **Listo cuando:** se entiende en menos de 5 segundos que hay clientes reales y de rubros distintos.

### 3.4 Proyectos (`#proyectos`): evidencia

- **Objetivo:** probar con trabajos reales, en profundidad, que Fymtec resuelve necesidades de negocios.
- **Contenido por tarjeta:** imagen de portada, nombre, **tipo de negocio**, **problema en una línea**, tipo de solución (etiquetas en lenguaje de negocio, no de stack) y "Ver proyecto →" → `/proyectos/[slug]`.
- **Orden y peso:**

| Orden | Proyecto                        | Peso visual   | Argumento que aporta                                        |
| ----- | ------------------------------- | ------------- | ----------------------------------------------------------- |
| 1     | International Freight Forwarder | Grande        | Empresa real, rediseño y autonomía para editar el contenido |
| 2     | Liga Mendocina de Ajedrez       | Grande        | Funcionalidad compleja (ranking, torneos, clubes)           |
| 3     | Roma Barber Club                | Medio         | Presencia comercial, imagen, turnos                         |
| 4     | Salomón Barrios                 | Medio         | Sensibilidad estética e identidad                           |
| —     | La Retama (breve)               | Fila compacta | Auditoría SEO en curso: muestra diagnóstico, sin resultados |

- **Motion:** imágenes con revelado por máscara (**storytelling**), profundidad sutil en hover y cursor contextual "Ver proyecto" en desktop (**feedback**). Al hacer clic, transición a la portada del caso (**orientación**).
- **Móvil:** una tarjeta por fila; la información es visible sin hover.
- **Listo cuando:** cada tarjeta comunica negocio + problema sin tener que abrirla. Link a `/proyectos` con el listado completo.

### 3.5 Contacto (`#contacto`): conversión

- **Objetivo:** convertir.
- **Contenido:**
  - Titular _borrador_: "¿Tenés un proyecto en mente?" o "Tu próximo paso empieza acá."
  - Bajada: "Contame qué necesitás y lo charlamos, sin compromiso." (_borrador_; no es una oferta de diagnóstico gratis).
  - **Botón principal: WhatsApp.** Secundario: email (link `mailto:` más un botón de copiar).
  - **Una línea discreta sobre la persona detrás:** "Detrás de Fymtec estoy yo, Martín: trabajás directo con quien hace el trabajo." (_borrador_) con link "Conocé cómo trabajo →" a `/estudio`.
  - Con `formEnabled = true`, aparece el formulario como tercera opción. En v1 está apagado.
- **Motion:** segundo momento visual fuerte, candidato a pieza firma. Microinteracción de calidad en el botón principal (**feedback**).
- El botón flotante se oculta mientras esta sección está en pantalla.

---

## 4. `/proyectos/[slug]`: casos de estudio (segunda capa)

### 4.1 Estructura base

Los bloques son opcionales y reordenables por caso: cada caso usa los que le sirven.

| Bloque                       | Contenido                                                                                      | Función                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------- |
| **Portada**                  | Nombre, tipo de negocio, resumen en una línea, imagen grande, año, rol y link al sitio en vivo | Continuidad con la tarjeta de la home |
| **Contexto / problema**      | Qué pasaba antes, en lenguaje de negocio                                                       | Problema                              |
| **Solución**                 | Qué se propuso y por qué                                                                       | Solución                              |
| **Proceso**                  | Cómo se llegó (etapas, bocetos, iteraciones)                                                   | Confianza                             |
| **Qué hice yo**              | Alcance real del trabajo propio                                                                | Honestidad                            |
| **Decisiones**               | 2–4 decisiones con su trade-off                                                                | Capa técnica                          |
| **Tecnologías**              | Stack, agrupado por para qué se usó                                                            | Capa técnica                          |
| **Resultado**                | Visual o funcional, cualitativo si no hay métricas                                             | Evidencia                             |
| **Galería**                  | Capturas desktop y móvil, antes y después                                                      | Evidencia visual                      |
| **Siguiente proyecto + CTA** | Navegación al próximo caso y "¿Algo así para tu negocio?"                                      | Contacto                              |

### 4.2 Enfoque propuesto por caso

| Caso                                | Formato  | Qué conviene demostrar                                                                                                                          | Bloques clave                                                                                                          | Recurso visual                                                     |
| ----------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **International Freight Forwarder** | Completo | Rediseño de un sitio empresarial existente: estructura visual, contraste, UX y migración a WordPress con ACF para que el contenido sea editable | Contexto → Qué hice yo → Decisiones (por qué WordPress con ACF, cómo se organizaron los campos editables) → Resultado  | **Antes y después** con un deslizador o comparación (storytelling) |
| **Liga Mendocina de Ajedrez**       | Completo | Sitio institucional con funcionalidad real: ranking, torneos, clubes afiliados, galería y noticias                                              | Contexto → Solución (módulos) → Decisiones (modelo de datos del ranking, cómo se actualiza el contenido) → Tecnologías | Recorrido por módulos, con capturas por sección                    |
| **Roma Barber Club**                | Visual   | Presencia comercial con foco en imagen, servicios y turnos o contacto                                                                           | Portada → Galería grande → Qué hice yo (breve) → Tecnologías                                                           | Recorrido visual de la landing, desktop y móvil                    |
| **Salomón Barrios**                 | Visual   | Sensibilidad estética: un sitio que se pone al servicio de la obra del artista                                                                  | Portada → Galería → Qué hice yo (breve)                                                                                | Presentación inmersiva de la obra y la navegación                  |
| **La Retama** _(secundario)_        | Breve    | Auditoría SEO: qué se revisó y qué se recomendó (sin implementación ni resultados todavía)                                                      | Contexto → Qué se auditó → Qué se implementó → Resultado cualitativo                                                   | Checklist o hallazgos resumidos                                    |

> ❓ **Decisión pendiente (V4):** para completar los casos necesito, por cada uno, el **contexto real** (qué tenía antes el cliente, qué pidió), el **alcance de tu trabajo**, el **stack**, el **año**, el **link en vivo** y el material visual. Te lo pido caso por caso cuando lleguemos a esa tarea.

---

## 5. `/proyectos`

- Encabezado corto, grilla con los destacados (mismas tarjetas que en la home) y la lista de proyectos breves.
- Filtros por tipo de solución **solo** si hay más de 6 trabajos. En v1 no hacen falta.

## 6. `/estudio` (segunda capa)

Para el líder técnico o para el cliente que quiere saber más. Voz en primera persona.

1. **Quién soy:** trayectoria breve y enfoque.
2. **Cómo trabajo:** principios (performance, accesibilidad, SEO técnico, código mantenible) explicados con ejemplos concretos de los casos, no como una lista de palabras clave.
3. **Stack:** agrupado por **para qué** (interfaces, contenido editable, sistemas, SEO y performance). Nada de sopa de logos ni barras de "nivel".
4. **Cómo está hecho este sitio:** stack, decisiones clave (tokens desacoplados, dos temas sin lógica en componentes, motion con propósito, progressive enhancement) y **puntajes de Lighthouse reales**, medidos en producción y con fecha.
5. **Código:** GitHub y, si aplica, LinkedIn.
6. CTA de cierre.

## 7. `/contacto`

- Página liviana con las mismas opciones que el CTA final. Sirve para links directos (bio de Instagram, firma de email).
- Muestra el formulario solo si `formEnabled = true`.

## 8. 404

- Mensaje con personalidad, sin chistes forzados, con links a la home, a Proyectos y a WhatsApp. Reutiliza el lenguaje visual del sitio.

---

## 9. Mapa de motion por sección

Resumen para validar que cada efecto tiene una función y que no se acumulan piezas protagonistas.

| Sección            | Efecto (tentativo)                                       | Función                         | Candidato a pieza firma | Fallback con reduced-motion        |
| ------------------ | -------------------------------------------------------- | ------------------------------- | ----------------------- | ---------------------------------- |
| Inicio (hero)      | Revelado del titular + montañas en capas con profundidad | Jerarquía, profundidad, calidad | ✅                      | Texto y fondo estáticos            |
| Inicio (servicios) | Entrada escalonada + hover                               | Jerarquía, feedback             | —                       | Aparición directa                  |
| Header             | Compactación y sección activa                            | Orientación, calidad            | —                       | Sin transición                     |
| Selector de tema   | Transición corta de colores                              | Calidad, feedback               | —                       | Cambio instantáneo                 |
| Metodología        | Sendero que se dibuja con el scroll                      | Storytelling, orientación       | Posible                 | Pasos estáticos                    |
| Clientes           | Entrada escalonada + resaltado en hover                  | Jerarquía, feedback             | —                       | Aparición directa                  |
| Proyectos          | Revelado con máscara + profundidad en hover + cursor     | Storytelling, feedback          | Posible                 | Imágenes visibles, sin inclinación |
| Home → proyecto    | Transición de la imagen a la portada                     | Orientación                     | Posible                 | Navegación normal                  |
| Contacto           | Momento visual + microinteracción del botón              | Calidad, feedback               | ✅                      | Botón estático                     |
| Botón de WhatsApp  | Aparición, expansión en hover, press                     | Feedback                        | —                       | Aparece sin desplazamiento         |

**Presupuesto:** máximo 3 piezas firma. Hoy hay 2 fijas (Inicio y Contacto) y 3 posibles (Metodología, Proyectos y la transición al proyecto); se elige en la etapa de diseño.

---

## 10. Decisiones de este documento

| #   | Pregunta                      | Propuesta                                                                                                      |
| --- | ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| V1  | Regla de voz                  | ✅ Centrada en el cliente en la capa 1; primera persona en Contacto, footer y `/estudio` (actualizada en v1.1) |
| V2  | Automatización                | ✅ Mención menor hasta tener un caso                                                                           |
| V3  | Orden de los destacados       | ✅ Freight Forwarder → Liga → Roma Barber → Salomón Barrios                                                    |
| V4  | Datos y material de cada caso | ✅ Se piden por caso al llegar a esa tarea                                                                     |
| V5  | Foto                          | ✅ Sin foto. ~~"Detrás del estudio"~~ se elimina en v1.1: la persona aparece en una línea de Contacto          |
| V6  | Secciones (v1.1)              | ✅ Inicio, Metodología, Clientes, Proyectos, Contacto                                                          |
| V7  | Clientes vs Proyectos (v1.1)  | ✅ Clientes = prueba social breve; Proyectos = casos en profundidad                                            |
| V8  | La Retama                     | ✅ Cliente real, solo auditoría por ahora; el rubro se muestra cuando lo confirmes                             |
