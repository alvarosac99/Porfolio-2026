# Diseño: Scroll FX + pulido premium + Minecraft sutil

Fecha: 2026-07-10

## Objetivo

El portfolio (tema "console", `src/pages/index.astro`) debe vender mejor al
usuario como programador: más serio, más fluido, con acabado premium. Tres
frentes de trabajo independientes pero coordinados:

1. Reducir el protagonismo de la estética Minecraft en la portada principal.
2. Introducir animaciones scroll-driven (GSAP + ScrollTrigger) en toda la
   portada, de Header a Footer.
3. Pasada de pulido premium (micro-interacciones, hover/focus, tipografía,
   espaciado) usando los criterios de la skill `emil-design-eng`.

Fuera de alcance: rediseño de la página `/projects/minecraft` (ahí el look
Minecraft es intencional y se queda igual), rediseño de la arquitectura de
temas existente (ya funciona bien, solo se le añaden animaciones encima).

## 1. Minecraft sutil en portada

Estado actual: `ConsoleProjects.astro` y `ConsoleSkills.astro` tienen capas de
~15-20 imágenes de items de Minecraft (`public/icons/minecraft/*.png`)
flotando sobre las tarjetas con rotaciones y hover-scale — "explosión masiva".
Esto se percibe como poco serio en las tarjetas que no son sobre Minecraft.

Cambio:
- Eliminar la capa de "explosión masiva" de iconos de todas las tarjetas
  excepto la tarjeta del proyecto/skill relacionado con Minecraft.
- En esa tarjeta concreta: un único icono Minecraft (16-20px), opacidad baja
  (~40-50%), posicionado en una esquina, sin animación de hover exagerada
  (como mucho un fade sutil).
- El resto de tarjetas quedan con la estética console limpia ya existente
  (borde, tipografía mono, sin iconos de items).

## 2. Sistema de animación scroll-driven (GSAP + ScrollTrigger)

### Componente central

Nuevo `src/components/ScrollFX.astro`, importado una sola vez desde
`ConsoleLayout.astro`. Contiene:

- Import de `gsap` y `gsap/ScrollTrigger` (nueva dependencia npm).
- Registro de `ScrollTrigger` una vez al cargar.
- Comprobación de `window.matchMedia('(prefers-reduced-motion: reduce)')`:
  si está activo, todos los efectos se reducen a un fade simple sin
  desplazamiento ni scroll-linking (accesibilidad).
- Un pequeño runtime que recorre el DOM buscando atributos `data-*` y les
  aplica el efecto correspondiente, para que las secciones Astro no repitan
  lógica de JS, solo marcan sus elementos declarativamente:
  - `data-reveal`: fade + slide-up al entrar ~20% en viewport (una vez).
  - `data-stagger="<selector-hijos>"`: aplica reveal en cascada a los hijos
    que matcheen el selector, con retraso incremental.
  - `data-counter="<valor-final>"`: cuenta desde 0 (o desde el valor actual
    en el DOM si es numérico) hasta el valor final al entrar en viewport.
  - `data-draw`: para elementos SVG/línea, se dibujan progresivamente
    ligados al scroll (usado en la barra de progreso del header).

### Asignación por sección

- **ConsoleHeader/TopBar**: barra de progreso de scroll fina (altura ~2px,
  color accent del tema activo) ligada a `data-draw`, progreso 0-100% del
  documento.
- **ConsoleHero**: entrada `data-reveal` simple al cargar la página (no
  scroll-linked, es above-the-fold).
- **ConsoleStats**: `data-stagger` en las 3 cards + `data-counter` en cada
  valor numérico (ej. "1+", "10+"). Valores no numéricos (ej. "1 VPS") solo
  llevan el reveal, no counter.
- **ConsoleProjects / ConsoleExperience / ConsoleSkills / ConsoleEducation**:
  `data-stagger` sobre las tarjetas/items de cada sección, threshold ~20%
  visible, delay incremental corto (~60-80ms entre items) para que se sienta
  fluido sin ser lento de leer.
- **ConsoleContact / ConsoleFooter**: `data-reveal` simple, sin stagger ni
  counters — cierre discreto, sin protagonismo.

### Dependencia nueva

`gsap` se añade a `package.json` (incluye `ScrollTrigger` en el paquete).

## 3. Pasada de pulido premium (emil-design-eng)

Tras integrar las animaciones, revisión dirigida (no rediseño completo) de:

- Estados hover/focus de botones, links y tarjetas: transiciones consistentes
  en duración/easing entre todos los componentes console.
- Espaciado entre secciones: verificar ritmo vertical consistente.
- Jerarquía tipográfica: contraste entre títulos (`text-title`) y cuerpo,
  tamaños de los comentarios `// stats` tipo terminal.
- Cualquier detalle que se sienta "genérico" una vez vistas las animaciones
  en conjunto (ej. sombras planas, bordes sin personalidad).

Los ajustes concretos se determinan durante la implementación revisando el
resultado real en navegador, no se prescriben aquí de antemano.

## Testing / verificación

- `npm run dev`, revisar visualmente cada sección con scroll real en
  navegador (Playwright/chromium-cli), en al menos 2 temas (uno dark, uno
  light) para confirmar que la barra de progreso y contadores usan
  `var(--color-accent)` correctamente.
- Verificar `prefers-reduced-motion` con emulación de navegador: animaciones
  deben desactivarse/reducirse.
- Confirmar que ninguna tarjeta que no sea de Minecraft conserva iconos de
  items.
- `npm run build` debe completar sin errores (GSAP es cliente-only, cuidado
  con SSR de Astro — el script de ScrollFX debe ser `client:` apropiado o
  `is:inline`/módulo que solo corra en el navegador).
