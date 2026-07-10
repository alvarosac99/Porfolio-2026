# Diseño: Sticky-Stack scroll narrativo (Stats → Projects → Experience)

Fecha: 2026-07-10

## Objetivo

El usuario considera la portada "aburrida" pese a las mejoras previas (scroll
reveals, stagger, contadores, ruptura de simetría, limpieza de acentos). Pide
un rediseño del propio mecanismo de scroll, no otra pasada de pulido visual.

Se introduce un tramo de scroll narrativo tipo "sticky-stack" (Apple/Linear):
las secciones **Stats**, **Projects** y **Experience** se encadenan de forma
que cada una se fija (`pin`) a la parte superior del viewport mientras la
siguiente entra encima, escalando y desvaneciendo la anterior. El resto de la
portada (Hero, Skills, Education, Contact, Footer) no cambia: conserva el
scroll libre y los reveals ya implementados.

**Fuera de alcance:** rediseño visual de las tarjetas dentro de esas tres
secciones (tipografía, colores, composición interna) — la estética terminal
existente se mantiene intacta. Solo cambia el mecanismo de aparición.

## 1. Estructura del stack

Nuevo wrapper `src/components/console/StickyStackSection.astro` que envuelve
`ConsoleStats`, `ConsoleProjects` y `ConsoleExperience` en `index.astro`. Cada
una de las tres secciones existentes gana:

- `min-h-[100dvh]` (antes tenían altura de contenido variable) para que el
  pin tenga sentido visual — cada panel ocupa al menos toda la pantalla.
- Una clase marcador `.stack-panel` para que el script del wrapper las
  localice sin acoplarse a IDs concretos.

El wrapper NO reemplaza el contenido de las secciones ni sus IDs (`#stats`,
`#projects`, `#experience` se mantienen para los enlaces de navegación del
header, que apuntan a esos anchors).

## 2. Mecánica GSAP (sigue el esqueleto canónico sticky-stack)

Nuevo script cliente-only dentro de `StickyStackSection.astro` (mismo patrón
que `ScrollFX.astro`: `<script>` en `.astro`, sin `client:*`, GSAP nunca
corre en SSR):

- Registra `ScrollTrigger` (ya registrado globalmente por `ScrollFX.astro`,
  pero este componente es independiente y se registra también por si se usa
  aislado).
- Para cada panel excepto el último: `ScrollTrigger.create({ trigger: panel,
  start: "top top", endTrigger: lastPanel, end: "top top", pin: true,
  pinSpacing: false })`. Esto es exactamente el punto que la propia guía de
  diseño marca como el fallo típico (`start` mal puesto dispara el pin a
  mitad de scroll) — se sigue el valor exacto `"top top"`.
- Cada panel, salvo el primero, anima su entrada desde `scale: 0.92, opacity:
  0.55` cuando el panel anterior está siendo reemplazado, disparado por el
  `scrollTrigger` del panel siguiente (`trigger: nextPanel, start: "top
  bottom", end: "top top", scrub: true`).
- Reutiliza los helpers de `ScrollFX.astro` que ya llevan las secciones
  (`data-stagger` en Stats/Projects/Experience) — el contenido interno de
  cada panel se sigue revelando igual que ahora, el pin es una capa
  adicional por encima, no un reemplazo.

## 3. Breakpoint y accesibilidad

- **Mobile (`< 768px`):** el pin NO se activa. Los tres paneles vuelven a
  `min-h-0` (altura de contenido normal) y a scroll libre — mismo
  comportamiento que tienen hoy. Se detecta con
  `window.matchMedia('(min-width: 768px)')` antes de crear los
  `ScrollTrigger` del stack; si no aplica, el script no hace nada y el CSS
  de `min-h-[100dvh]` se anula vía clase condicional (`md:min-h-[100dvh]`,
  no `min-h-[100dvh]` a secas).
- **`prefers-reduced-motion: reduce`:** el pin no se crea en ningún tamaño de
  pantalla; scroll normal siempre. Mismo criterio que ya usa `ScrollFX.astro`.
- **Resize:** se usa `ScrollTrigger.matchMedia()` de GSAP (helper oficial
  para exactamente este caso: crear/destruir triggers según breakpoint) en
  vez de un listener manual de resize.

## 4. Testing / verificación

- `npm run dev`, verificar en desktop (≥768px) que Stats se fija, Projects
  entra encima escalando el panel anterior, luego Experience hace lo mismo,
  y que tras Experience el scroll continúa libre hacia Skills.
- Verificar en viewport móvil (emulado <768px) que las tres secciones se
  comportan exactamente igual que antes de este cambio (sin pin).
- Verificar con `prefers-reduced-motion: reduce` emulado que no hay pin en
  ningún tamaño.
- Confirmar que los enlaces del nav (`#stats`, `#projects`, `#experience`)
  siguen haciendo scroll-anchor correctamente con el pin activo (el pin de
  GSAP añade un spacer en el DOM; los anchors deben seguir apuntando al
  elemento real, no al spacer).
- `npm run build` sin errores.
