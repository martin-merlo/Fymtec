# Arquitectura de información y definición de secciones

> **Estado:** ✅ aprobado v1.0 · 2026-09-28
> **Depende de:** [`SPEC.md`](../SPEC.md) (aprobada v1.0) y [`docs/intent/portfolio.md`](intent/portfolio.md).
> Define **qué** hace cada sección y **cómo se comporta**. No define el aspecto visual final: eso depende de la identidad y de las piezas firma, que se deciden en la etapa de diseño.

Los textos marcados como _borrador_ son propuestas de wording para iterar, no copy final. `{brand.name}` indica que el valor sale de `brand.ts`.

---

## 1. Voz y tono

La marca se percibe primero como estudio y después como persona. Eso plantea un problema de voz: "nosotros" sugiere un equipo que no existe, y "yo" rompe la revelación antes de tiempo.

**Propuesta:**

| Zona                                        | Voz                                                                                                                          | Ejemplo                                          |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| Capa 1 (hero, servicios, trabajos, proceso) | **Centrada en el cliente**: segunda persona ("tu negocio") y frases impersonales. Sin "nosotros" ni "yo".                    | "Tu negocio, funcionando mejor en digital."      |
| Desde "Detrás del estudio" en adelante      | **Primera persona del singular**, cercana.                                                                                   | "Soy Martín, y detrás de {brand.name} estoy yo." |
| Casos de estudio                            | Primera persona en "Qué hice yo" y en "Decisiones"; el resto, narrativo.                                                     | "Decidí migrar a WordPress con ACF porque…"      |
| Tono general                                | Claro, directo, sin jerga en la capa 1, sin superlativos vacíos ("el mejor", "líderes"). Tuteo o voseo rioplatense moderado. | —                                                |

> ❓ **Decisión pendiente (V1):** ¿te cierra esta regla de voz? La alternativa es usar "yo" desde el hero (más honesto y cercano, pero adelanta la revelación).

---

## 2. Elementos globales

### 2.1 Header

- **Objetivo:** orientar y tener siempre a mano el CTA.
- **Contenido:** wordmark (`brand.name`) → link a `/`. Navegación: _Servicios · Trabajos · Proceso · Estudio_. Botón "Hablemos", que abre WhatsApp.
- **Comportamiento:**
  - Al cargar es transparente sobre el hero. Después de un poco de scroll pasa a una superficie con desenfoque y se compacta (**calidad y orientación**).
  - Se esconde al scrollear hacia abajo y reaparece al subir, solo en móvil.
  - Los links de ancla marcan la sección activa (**orientación**).
- **Móvil:** menú en un panel a pantalla completa (usando `<dialog>` nativo), con el foco atrapado adentro y cierre con Esc. Los links entran de forma escalonada (**jerarquía**).
- **Accesibilidad:** link "Saltar al contenido" como primer elemento enfocable y `aria-current` en la sección activa.

### 2.2 Botón flotante de WhatsApp

- **Objetivo:** que iniciar una conversación esté siempre a un clic.
- **Diseño:** ícono reconocible de WhatsApp sobre una superficie del sistema (tokens de superficie, borde y acento), **no** el círculo verde genérico. En desktop, al pasar el mouse se expande y muestra una etiqueta ("Escribime por WhatsApp", _borrador_).
- **Comportamiento:**
  - Aparece después de que el visitante pasa el hero, o tras unos 3 segundos (**jerarquía**: no compite con el CTA del hero).
  - Se oculta mientras la sección de CTA final está en pantalla, para no duplicar el mensaje.
  - Microinteracción de hover y press (**feedback**). Nada de pulsos infinitos ni rebotes para llamar la atención.
- **Link:** `https://wa.me/{whatsapp}?text={mensaje}` con el mensaje precargado de la spec, codificado.
- **Móvil:** respeta `safe-area-inset` y deja una distancia mínima respecto del contenido. Nunca tapa botones.
- **Accesibilidad:** `aria-label="Escribir por WhatsApp"` y un área táctil ≥ 44×44 px.

### 2.3 Footer

- Wordmark y claim corto, las secciones, email (con botón de copiar y un feedback breve de "Copiado"), WhatsApp, GitHub, "Mendoza, Argentina · Trabajo remoto" y © año.
- No lleva CTA propio: ese rol lo cumple la sección de CTA final, que va justo antes.

### 2.4 Transiciones entre páginas

- Home → caso: la imagen de la tarjeta se transforma en la portada del caso (**orientación**). Se implementa con la **View Transitions API** nativa si el soporte de Next y del navegador lo permite. Si no, hay un fundido simple. No se suma una dependencia solo para esto.

---

## 3. Home

Orden narrativo: **problema → solución → evidencia → confianza → contacto.**

### 3.1 Hero (problema)

- **Objetivo:** que en menos de 10 segundos un dueño de negocio entienda **qué problema resolvés y que es para él**.
- **Contenido:**
  - Pequeño texto superior: "Soluciones digitales para negocios" (_borrador_).
  - **Titular** (una sola idea, sin tecnicismos). Opciones _borrador_:
    1. "Tu negocio, funcionando mejor en digital."
    2. "Webs y sistemas que trabajan para tu negocio."
    3. "Menos trabajo manual. Más clientes. Mejor presencia."
  - Bajada de 1–2 líneas que concrete: web, sistemas a medida y SEO para negocios que quieren verse profesionales y operar mejor.
  - CTA principal: **"Contame tu idea"** → WhatsApp. CTA secundario: "Ver trabajos" → ancla a Trabajos.
  - Indicador de scroll.
- **Visual:** es el **momento más fuerte del sitio**, candidato a pieza firma (se define en diseño). Puede tener profundidad (capas y luz que reaccionan sutilmente al cursor o al scroll).
- **Motion:** el titular se revela palabra por palabra o línea por línea (**jerarquía**) y el fondo tiene profundidad (**profundidad y calidad**). **El titular y los CTA vienen en el HTML del servidor y son legibles en el primer render**: la animación arranca desde un estado visible o casi visible, para no perjudicar el LCP.
- **Móvil (375 px):** el titular, la bajada y el CTA principal entran en la primera pantalla. El efecto de fondo se simplifica o se reemplaza por una versión estática.
- **Listo cuando:** una persona no técnica, al ver solo esta pantalla, puede decir qué ofrece el sitio.

### 3.2 Qué resolvemos (solución)

- **Objetivo:** traducir los servicios a problemas que el cliente reconoce como propios.
- **Estructura:** 4 bloques principales, más automatización como mención (ver V2). Cada bloque tiene **problema** (en palabras del cliente), **qué hago** y **ejemplo relacionado** (link a un caso cuando exista).

| Bloque                           | Problema (_borrador_)                                                                     | Solución                                                  | Caso relacionado                                     |
| -------------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| Presencia que convierte          | "Mi negocio no se ve profesional en internet" / "La gente no me encuentra ni me contacta" | Sitios y landings pensados para generar consultas         | Roma Barber Club, Salomón Barrios                    |
| Sitios que podés gestionar       | "Mi web está vieja y depende de otro para cualquier cambio"                               | Rediseño y migración a plataformas editables              | International Freight Forwarder                      |
| Sistemas y plataformas a medida  | "Manejo todo con planillas, mensajes y papeles"                                           | Aplicaciones y sistemas con funciones propias del negocio | Liga Mendocina de Ajedrez                            |
| Visibilidad en buscadores        | "No aparezco en Google"                                                                   | Auditoría e implementación de SEO técnico                 | La Retama                                            |
| _Automatización e integraciones_ | "Pierdo tiempo en tareas repetitivas"                                                     | Automatizar procesos y conectar herramientas              | Se muestra como "también" o "próximamente", sin caso |

> ❓ **Decisión pendiente (V2):** ¿la automatización va como bloque propio o como mención menor? No hay caso que la respalde todavía.

- **Motion:** los bloques entran escalonados (**jerarquía**) y reaccionan al hover (**feedback**). Posible formato bento o lista con reveal (se define en diseño).
- **Listo cuando:** cada bloque se entiende sin conocer ninguna tecnología y al menos 3 de 4 tienen un caso real enlazado.

### 3.3 Trabajos destacados (evidencia)

- **Objetivo:** probar con trabajos reales que el estudio puede resolver necesidades de negocios.
- **Contenido por tarjeta:** imagen de portada, nombre del cliente o proyecto, **tipo de negocio**, **problema en una línea**, tipo de solución (etiquetas en lenguaje de negocio, no de stack) y "Ver caso →".
- **Orden propuesto y peso:**

| Orden | Caso                            | Peso visual | Argumento que aporta                                        |
| ----- | ------------------------------- | ----------- | ----------------------------------------------------------- |
| 1     | International Freight Forwarder | Grande      | Empresa real, rediseño y autonomía para editar el contenido |
| 2     | Liga Mendocina de Ajedrez       | Grande      | Funcionalidad compleja (ranking, torneos, clubes)           |
| 3     | Roma Barber Club                | Medio       | Presencia comercial, imagen, turnos                         |
| 4     | Salomón Barrios                 | Medio       | Sensibilidad estética e identidad                           |

> ❓ **Decisión pendiente (V3):** ¿te cierra este orden? Priorizo los dos casos con más sustancia de negocio y función, y después los dos más visuales.

- **Motion:** las imágenes se revelan con máscara o clip al entrar (**storytelling**), con una profundidad sutil en hover (inclinación leve o parallax interno) y el cursor contextual "Ver caso" en desktop (**feedback**). Al hacer clic, transición a la portada del caso (**orientación**).
- **Móvil:** una tarjeta por fila. No hay efectos de hover; las mismas señales aparecen siempre visibles.
- **Listo cuando:** cada tarjeta comunica negocio + problema sin tener que abrirla.

### 3.4 Otros trabajos (cierra la evidencia)

- Franja compacta, tipo lista: nombre, qué se hizo en una línea, año y link.
- En v1: **La Retama, auditoría e implementación de SEO.** Si durante el diseño aporta variedad, se promueve a destacado.
- **Motion:** al pasar el mouse por una fila se muestra una vista previa (**feedback**). Con una sola fila, puede combinarse con Trabajos como "y además…".
- Link a `/trabajos` con el listado completo.

### 3.5 Cómo trabajo (confianza)

- **Objetivo:** bajar el riesgo percibido ("sé qué va a pasar si escribo").
- **Pasos** (nombres _borrador_, propios):
  1. **Entender:** una charla para conocer tu negocio y lo que necesitás.
  2. **Proponer:** alcance, tiempos y una propuesta clara antes de empezar.
  3. **Construir:** avances visibles durante el desarrollo, con feedback de tu parte.
  4. **Acompañar:** publicación y soporte después del lanzamiento.
- **No promete** nada que todavía no esté definido comercialmente (ni diagnóstico gratis, ni plazos fijos, ni garantías).
- **Motion:** una línea o camino que se dibuja con el scroll y va activando cada paso (**storytelling y orientación**). Se puede resolver con **scroll-driven animations de CSS**, sin JS, y con un fallback estático.
- **Listo cuando:** se lee en menos de 15 segundos y responde "¿cómo sería trabajar juntos?".

### 3.6 Detrás del estudio (confianza y revelación)

- **Objetivo:** la revelación, de forma discreta. El protagonismo lo tienen los proyectos: el cliente los recorre por su cuenta y se convence con la evidencia. Esta sección solo confirma que detrás hay una persona alcanzable.
- **Sin foto** (decisión V5).
- **Contenido:**
  - Un bloque breve, **solo texto**: "Detrás de {brand.name} estoy yo, Martín." (_borrador_), seguido de 1–2 líneas en primera persona sobre enfoque y forma de trabajar: trato directo, sin intermediarios, cuidado por el detalle.
  - Datos concretos y verificables, sin métricas infladas: ubicación ("Mendoza, Argentina · Trabajo remoto") y los tipos de proyectos que busca.
  - Link a la segunda capa: "Conocé cómo trabajo por dentro →" `/estudio`.
- **Motion:** revelado tipográfico sutil del texto (**jerarquía**). Sin protagonismo visual.
- **Listo cuando:** es el primer lugar donde aparece "Martín", y un visitante siente que puede hablar directamente con quien hace el trabajo.

### 3.7 CTA final + contacto

- **Objetivo:** convertir.
- **Contenido:**
  - Titular _borrador_: "¿Tenés un proyecto en mente?" o "Contame tu idea."
  - Bajada: "Escribime y lo charlamos, sin compromiso." (_borrador_; no es una oferta de diagnóstico gratis).
  - **Botón principal: WhatsApp.** Secundario: email (link `mailto:` más un botón de copiar).
  - Con `formEnabled = true`, aparece el formulario como tercera opción. En v1 está apagado.
- **Motion:** es el segundo momento visual fuerte, candidato a pieza firma. El botón principal tiene una microinteracción de calidad (**feedback**).
- El botón flotante se oculta mientras esta sección está en pantalla.

---

## 4. `/trabajos/[slug]`: casos de estudio (segunda capa)

### 4.1 Estructura base

Los bloques son opcionales y reordenables por caso: cada caso usa los que le sirven.

| Bloque                   | Contenido                                                                                      | Función                               |
| ------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------- |
| **Portada**              | Nombre, tipo de negocio, resumen en una línea, imagen grande, año, rol y link al sitio en vivo | Continuidad con la tarjeta de la home |
| **Contexto / problema**  | Qué pasaba antes, en lenguaje de negocio                                                       | Problema                              |
| **Solución**             | Qué se propuso y por qué                                                                       | Solución                              |
| **Proceso**              | Cómo se llegó (etapas, bocetos, iteraciones)                                                   | Confianza                             |
| **Qué hice yo**          | Alcance real del trabajo propio                                                                | Honestidad                            |
| **Decisiones**           | 2–4 decisiones con su trade-off                                                                | Capa técnica                          |
| **Tecnologías**          | Stack, agrupado por para qué se usó                                                            | Capa técnica                          |
| **Resultado**            | Visual o funcional, cualitativo si no hay métricas                                             | Evidencia                             |
| **Galería**              | Capturas desktop y móvil, antes y después                                                      | Evidencia visual                      |
| **Siguiente caso + CTA** | Navegación al próximo caso y "¿Algo así para tu negocio?"                                      | Contacto                              |

### 4.2 Enfoque propuesto por caso

| Caso                                | Formato  | Qué conviene demostrar                                                                                                                          | Bloques clave                                                                                                          | Recurso visual                                                     |
| ----------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **International Freight Forwarder** | Completo | Rediseño de un sitio empresarial existente: estructura visual, contraste, UX y migración a WordPress con ACF para que el contenido sea editable | Contexto → Qué hice yo → Decisiones (por qué WordPress con ACF, cómo se organizaron los campos editables) → Resultado  | **Antes y después** con un deslizador o comparación (storytelling) |
| **Liga Mendocina de Ajedrez**       | Completo | Sitio institucional con funcionalidad real: ranking, torneos, clubes afiliados, galería y noticias                                              | Contexto → Solución (módulos) → Decisiones (modelo de datos del ranking, cómo se actualiza el contenido) → Tecnologías | Recorrido por módulos, con capturas por sección                    |
| **Roma Barber Club**                | Visual   | Presencia comercial con foco en imagen, servicios y turnos o contacto                                                                           | Portada → Galería grande → Qué hice yo (breve) → Tecnologías                                                           | Recorrido visual de la landing, desktop y móvil                    |
| **Salomón Barrios**                 | Visual   | Sensibilidad estética: un sitio que se pone al servicio de la obra del artista                                                                  | Portada → Galería → Qué hice yo (breve)                                                                                | Presentación inmersiva de la obra y la navegación                  |
| **La Retama** _(secundario)_        | Breve    | Auditoría SEO → implementación → mejoras                                                                                                        | Contexto → Qué se auditó → Qué se implementó → Resultado cualitativo                                                   | Checklist o hallazgos resumidos                                    |

> ❓ **Decisión pendiente (V4):** para completar los casos necesito, por cada uno, el **contexto real** (qué tenía antes el cliente, qué pidió), el **alcance de tu trabajo**, el **stack**, el **año**, el **link en vivo** y el material visual. Te lo pido caso por caso cuando lleguemos a esa tarea.

---

## 5. `/trabajos`

- Encabezado corto, grilla con los destacados (mismas tarjetas que en la home) y la lista de otros trabajos.
- Filtros por tipo de solución **solo** si hay más de 6 trabajos. En v1 no hacen falta.

## 6. `/estudio` (segunda capa)

Para el líder técnico o para el cliente que quiere saber más. Voz en primera persona.

1. **Quién soy:** trayectoria breve y enfoque.
2. **Cómo trabajo:** principios (performance, accesibilidad, SEO técnico, código mantenible) explicados con ejemplos concretos de los casos, no como una lista de palabras clave.
3. **Stack:** agrupado por **para qué** (interfaces, contenido editable, sistemas, SEO y performance). Nada de sopa de logos ni barras de "nivel".
4. **Cómo está hecho este sitio:** stack, decisiones clave (tokens desacoplados, dark-first, motion con propósito, progressive enhancement) y **puntajes de Lighthouse reales**, medidos en producción y con fecha.
5. **Código:** GitHub y, si aplica, LinkedIn.
6. CTA de cierre.

## 7. `/contacto`

- Página liviana con las mismas opciones que el CTA final. Sirve para links directos (bio de Instagram, firma de email).
- Muestra el formulario solo si `formEnabled = true`.

## 8. 404

- Mensaje con personalidad, sin chistes forzados, con links a la home, a Trabajos y a WhatsApp. Reutiliza el lenguaje visual del sitio.

---

## 9. Mapa de motion por sección

Resumen para validar que cada efecto tiene una función y que no se acumulan piezas protagonistas.

| Sección            | Efecto (tentativo)                                   | Función                         | Candidato a pieza firma | Fallback con reduced-motion        |
| ------------------ | ---------------------------------------------------- | ------------------------------- | ----------------------- | ---------------------------------- |
| Hero               | Revelado del titular + fondo con profundidad         | Jerarquía, profundidad, calidad | ✅                      | Texto estático y fondo estático    |
| Header             | Compactación y sección activa                        | Orientación, calidad            | —                       | Sin transición                     |
| Qué resolvemos     | Entrada escalonada + hover                           | Jerarquía, feedback             | —                       | Aparición directa                  |
| Trabajos           | Revelado con máscara + profundidad en hover + cursor | Storytelling, feedback          | Posible                 | Imágenes visibles, sin inclinación |
| Home → caso        | Transición de la imagen a la portada                 | Orientación                     | Posible                 | Navegación normal                  |
| Proceso            | Camino que se dibuja con el scroll                   | Storytelling, orientación       | —                       | Pasos estáticos                    |
| Detrás del estudio | Revelado tipográfico sutil                           | Jerarquía                       | —                       | Texto visible                      |
| CTA final          | Momento visual + microinteracción del botón          | Calidad, feedback               | ✅                      | Botón estático                     |
| Botón de WhatsApp  | Aparición, expansión en hover, press                 | Feedback                        | —                       | Aparece sin desplazamiento         |

**Presupuesto:** máximo 3 piezas firma. Hoy hay 2 fijas (Hero y CTA final) y 2 posibles (Trabajos y la transición al caso); se elige en la etapa de diseño.

---

## 10. Decisiones de este documento

| #   | Pregunta                      | Propuesta                                                                                                   |
| --- | ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| V1  | Regla de voz                  | ✅ Centrada en el cliente en la capa 1 y en primera persona desde "Detrás del estudio"                      |
| V2  | Automatización                | ✅ Mención menor hasta tener un caso                                                                        |
| V3  | Orden de los destacados       | ✅ Freight Forwarder → Liga → Roma Barber → Salomón Barrios                                                 |
| V4  | Datos y material de cada caso | ✅ Se piden por caso al llegar a esa tarea                                                                  |
| V5  | Foto                          | ✅ Sin foto. "Detrás del estudio" queda como un bloque breve de texto y los proyectos son los protagonistas |
