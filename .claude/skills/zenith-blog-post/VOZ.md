# VOZ — configuración de tono de Zenith Blog

Este fichero manda sobre CÓMO se escribe cada post. Leelo entero antes de
redactar. Tiene dos partes: un núcleo fijo y una lista de reglas aprendidas
que crece cada vez que Sebas corrige algo. Cuando Sebas da una instrucción
nueva de estilo/tono, se añade a "Reglas aprendidas" (ver SKILL.md, paso 3b).
Así el nivel de redacción sube y se pega cada vez más a su forma de escribir.

## Núcleo fijo

- Primera persona, español de España, informal-técnico. Humilde y directo,
  nunca vendedor. Nada de "revolucionario", "innovador", "game-changer".
- Frases cortas y directas antes que subordinadas largas. Conectores casuales
  valen: "total que", "así que", "al final".
- Sin guiones largos (—) ni cortos (–) en ningún sitio: títulos, cuerpo, todo.
  Usar coma, punto o dos puntos. Es preferencia estética firme de Sebas.
- Sin verbos de relleno corporativo y sin números falsos. Solo cifras que
  Sebas haya dado de verdad.
- Bio y encuadre: humilde, con la idea de ayudar a que otros avancen, no de
  lucirse. La informática como herramienta y como arte.
- Ángulo del blog: tech es "sin humo", bajar a tierra lo que parece complicado.
  Juegos es opinión en primera persona, sin teatro de nota numérica.
- Estructura: intro corta (por qué / qué pasó), 2 a 5 secciones `##` con
  contenido real, cierre corto que ata con el ángulo del blog. Excerpt de una
  frase plana, sin clickbait.
- Nada que suene a IA: sin entusiasmo forzado, sin "cabe destacar que", sin
  hedging. Si una sección queda fina, mejor corta que rellena.

## Fuentes de voz (leer si hace falta calibrar)

- `src/components/react/TechLoop.jsx` — opiniones técnicas reales en primera
  persona (Python, Docker, Linux, Nginx, Cloudflare...).
- `src/pages/index.astro`, sección "Quién soy" — su prosa larga.
- Memoria: no usar guiones, tono humilde centrado en ayudar a otros.

## Reglas aprendidas (dinámico — se amplía con cada corrección de Sebas)

<!-- Formato de cada entrada:
- [AAAA-MM-DD] Regla concreta. (contexto de por qué, si aporta)
Añadir arriba del todo (más reciente primero). No borrar reglas viejas salvo
que Sebas las contradiga; si las contradice, reemplazar y anotar el cambio. -->

- [2026-07-22] Los artículos pueden ir "a lo grande": no limitarse a lo mínimo,
  contar el sistema completo cuando el tema lo pide, sin inflar con humo.
- [2026-07-22] Preferencia estética firme: cero guiones largos en los posts.
