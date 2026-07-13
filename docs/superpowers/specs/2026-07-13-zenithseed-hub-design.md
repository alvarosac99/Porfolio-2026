# ZenithSeed Hub, landing personal en "/"

## Contexto

El sitio actual (`src/pages/index.astro`) es el porfolio profesional de Álvaro Sebastián Acosta: hero, stats, teaser de blogs, proyectos, experiencia, aptitudes, educación, contacto. Estética "terminal/consola": fuentes mono, prompts `// comentario` y `> sección`, sistema de temas vía `--color-*` en `src/styles/global.css`, componentes reutilizables ya construidos (`LogoLoop`, `TargetCursor`, `Silk`, scramble-text global vía `data-scramble`, reveal-on-scroll vía `data-reveal`/`data-stagger` en `ScrollFX.astro`).

Se añade una landing nueva en la raíz (`/`) que actúa de **hub personal de marca ZenithSeed**: presenta quién es Álvaro más allá del CV, por qué eligió ese nombre de dominio, y enlaza a las tres rutas del ecosistema (porfolio profesional, blog de videojuegos, blog técnico). El porfolio actual se mueve a `/porfolio` sin cambios de contenido.

## Alcance

Dentro de este spec:
- Mover `src/pages/index.astro` → `src/pages/porfolio.astro` (misma URL interna, solo cambia la ruta pública).
- Nuevo `src/pages/index.astro` = hub ZenithSeed.
- Nuevo header minimal específico del hub (no reutiliza `ConsoleHeader`).
- Actualizar cualquier enlace interno que asuma que el porfolio vive en `/` (nav, breadcrumbs de `/projects/*`, footer, `TopBar`/`McTopBar` "volver a proyectos").
- Fondo `FaultyTerminal` para el hub.

Fuera de alcance (no se toca en este spec):
- Contenido real de los blogs ZenithGames/ZenithTech (siguen en "próximamente").
- Rediseño del porfolio en `/porfolio` (se mueve tal cual).

## Rutas

- `src/pages/index.astro` → hub ZenithSeed (nuevo).
- `src/pages/porfolio.astro` → contenido actual de `index.astro`, sin cambios internos.
- Enlaces a actualizar:
  - `TopBar.astro` / `McTopBar.astro`: el botón "volver" apunta a `/#projects` → pasa a `/porfolio#projects`.
  - Cualquier `href="/"` que asuma que ahí vive el porfolio pasa a `/porfolio` donde corresponda (el logo del hub sigue apuntando a `/`, es su propia home).
  - El link `$ ver_proyectos` del hero del porfolio usa anchors internos (`#projects`), no requiere cambio al vivir ahora en `/porfolio`.

## Contenido del hub (texto ya aportado por el usuario, no se reescribe el fondo, solo se ajusta tono y formato al maquetar)

**1. Hero ZenithSeed**
Nombre de marca grande (mismo tratamiento tipo `NameHero`/`TextPressure` que ya existe, o una variante peso 400 según dirección visual) + tagline corta.

**2. Por qué ZenithSeed**
> Zenith es el nombre de la espada más épica de uno de mis juegos favoritos, Terraria. Seed es la semilla, el inicio de cualquier universo, mundo o vida.

**3. Quién soy** (reenfocado: el objetivo no es hablar de mí, sino que lo que cuento y comparto le sirva a quien lo lea. El bio es contexto, no el centro)
> Programar me interesó desde muy pequeño. Con ocho años ya desmontaba y montaba mi propio ordenador, y esa curiosidad por entender cómo funcionan las cosas nunca se fue. Estudié el grado superior DAM (Desarrollo de Aplicaciones Multiplataforma) y, aunque al principio programar me costó y no sentí que fuera lo mío, con el tiempo descubrí cómo aplicarlo a lo que de verdad me gusta.
>
> En el trabajo, programar a veces se complica por burocracia que poco tiene que ver con escribir código. Pero crear videojuegos, montar mis propias páginas web, apoyarme en recursos que otros ya han compartido y mezclarlos con mi propio criterio es lo que me sigue pareciendo divertido, fascinante y emocionante. Me gusta cacharrear con equipos, redes, desplegar servicios y automatizar procesos con IA.
>
> Ahora mismo estoy centrado en hacer mis propios videojuegos y aplicaciones. Creo que la informática, entendida como arte y como herramienta, es uno de los medios más potentes que tenemos hoy para avanzar y para ayudar a que otros avancen también.

Tratamiento: se mantiene en 2 o 3 bloques visuales para que respire (no un muro de texto), sin resumir ni recortar el fondo.

**4. Tarjetas hub** (3, mismo componente/patrón, estilo hairline en vez de card con `border` completo)
- **Porfolio** → `/porfolio`, "el lado profesional: proyectos, experiencia, stack."
- **ZenithGames** → `data-coming-soon` (igual que ya está en el porfolio), "crítica y opinión de videojuegos."
- **ZenithTech** → `data-coming-soon`, "lo técnico explicado simple."

**5. Visión de futuro** (misma idea: el diario existe para que el lector saque algo útil, no como escaparate personal)
> Este sitio recogerá lo que vaya descubriendo por el camino. Si el día de mañana monto mi propio modelo de IA, se verá reflejado aquí. Si creo un modelo 3D, si encuentro algo que merezca la pena contar, lo iré recopilando en este mismo espacio.
>
> La idea es que funcione como un diario técnico que baja a tierra conceptos que desde fuera parecen complejos, para que quien lo lea pueda aplicarlos. Es mi rincón de estudiante y trabajador, pensado para compartir lo aprendido, no solo para dejar constancia de ello.

## Dirección visual

Mezcla entre la estética actual del sitio y la referencia [Hyperstudio](https://styles.refero.design/style/8eb9c53e-d69c-497a-b640-610856cf3a60):

**Se mantiene del sitio actual:**
- Fuentes mono (`--font-mono`/`--font-body`), prompts `//` y `>`.
- Sistema de temas (`--color-accent`, `--color-text`, etc.), el hub NO fija una paleta obsidian propia, respeta el tema activo del usuario.
- `data-scramble` en los párrafos largos de texto (por qué ZenithSeed, quién soy, visión futuro).
- `TargetCursor` activo en el hub (`showCursor`), con `cursor-target` en las 3 tarjetas y CTAs.

**Se adopta de Hyperstudio:**
- Separadores hairline (`border-t 1px`) entre secciones en vez de cards con `border` en los 4 lados por todas partes.
- Espaciado de sección generoso: de 120 a 180px verticales (frente a 60 a 80px del porfolio), con ritmo editorial, no de dashboard denso.
- Titulares grandes en peso 400 (no bold) para el nombre ZenithSeed y los encabezados de sección, la jerarquía la da el tamaño, no el grosor.
- CTAs tipo píldora (`rounded-full`) para diferenciar visualmente el hub del porfolio (que usa esquinas rectas).

**No se adopta de Hyperstudio:** su paleta fija, ni retirar el accent color (se mantiene, pero disciplinado, reservado a estados activos, hover y links, no decorativo).

## Header del hub

Header propio y minimal, distinto de `ConsoleHeader`:
- Logo/wordmark "zenithseed" (izquierda).
- Toggle de tema (`ThemeTrigger`/`ThemeDropdown`, reutilizados tal cual).
- Sin nav de secciones, el hub se navega con las tarjetas/CTAs del body, no con una barra de links arriba.

## Fondo: FaultyTerminal

Un solo motor WebGL (no se combina con `Dither` ni con three.js, así se evita correr dos contextos WebGL a la vez, ya hubo problemas de rendimiento con Silk y partículas en el porfolio). Se usa `FaultyTerminal` (`ogl`, ligero) con su prop `dither` activado para capturar la estética pixelada que se pedía de `Dither` sin pagar el coste de un segundo renderer.

Componente nuevo: `src/components/react/FaultyTerminal.jsx` + `.css`, copia del código oficial de React Bits. Nueva dependencia: `ogl`.

Ajuste de props para "no intrusivo, que se lea bien, que mole":
- `tint`: color del acento del tema activo (leído de `--color-accent` vía JS al montar, con fallback, no reactivo a cambio de tema en caliente, igual que `Silk`, se acepta la limitación).
- `scanlineIntensity`: bajo (~0.15).
- `glitchAmount`: bajo (~0.3).
- `flickerAmount`: bajo (~0.3).
- `noiseAmp`: 0 (evita ruido extra sobre el dither).
- `dither`: activado (intensidad baja-media).
- `chromaticAberration`: 0, `curvature`: 0 (nada de distorsión, prioridad legibilidad).
- `mouseReact`: true, `mouseStrength` baja (~0.15), sutil, no protagonista.
- `dpr`: capado a 1 (mismo criterio que se aplicó a `Silk` por rendimiento).
- `pageLoadAnimation`: true, encaja con el resto de reveals del sitio.
- Capa con `opacity` reducida vía wrapper (similar a como se hizo con `Silk` al 0.12, aquí probablemente algo más visible dado que es el único fondo del hub, se ajusta en implementación mirando el contraste real con el texto encima).
- `client:idle` para no competir con el render inicial (mismo criterio que `Silk`).

## Testing / verificación

- `npm run build` limpio.
- Verificar manualmente en `npm run dev`: `/` carga el hub, `/porfolio` carga el porfolio intacto, `/projects/games` y `/projects/minecraft` con el botón "volver" apuntando a `/porfolio#projects`.
- Confirmar que el fondo no dificulta la lectura del texto largo de "quién soy" en ambos temas claro/oscuro.
- Confirmar que no hay lag apreciable (lección aprendida de `Silk`+partículas).
