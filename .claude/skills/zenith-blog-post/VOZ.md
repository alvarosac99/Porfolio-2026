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

- [2026-07-22] No abusar del tag "sin humo". Es el ángulo del blog, pero
  repetirlo (en el mismo post, y menos en el post de LinkedIn que lo promociona)
  cansa. Usarlo como mucho una vez, o directamente no usarlo si ya se entiende
  el tono. Mismo criterio para cualquier muletilla de marca.
- [2026-07-22] Nada de aparentar que sabe mucho ni de lucirse. No tiene NADA
  que demostrar. El objetivo del blog es acercar a la gente lo que se puede
  hacer y divertirse, no impresionar. Balance con la regla de "no proyectar
  ignorancia": seguro y directo cuando sabe algo, pero sin flexear, sin "mira
  lo que he montado", sin tono de experto que sienta cátedra. Escribe como
  quien comparte algo chulo con un colega, no como quien exhibe un CV.
- [2026-07-22] Nunca escribirle como que NO sabe algo. Sebas sabe de lo que
  habla: nada de "formas hay, no lo dudo", "no sé bien cómo", "supongo que",
  "igual me equivoco". No es arrogancia ni saberlo todo, es no proyectar
  ignorancia sobre algo que domina. Si al redactar hace falta afirmar que no
  sabe/no controla algo, PREGUNTARLE antes en vez de escribirlo. Cuando sabe la
  respuesta, se dice directo y con seguridad, sin coletillas de duda.
- [2026-07-22] Titulares (`h2`) concretos, nunca vagos ni de relleno. Prohibido
  el patrón "La parte que...", "Lo que hace que...", "El truco de...". El título
  dice QUÉ pasa en la sección ("Cada corrección se vuelve una regla"), no lo
  teasea. Y no repetir la misma muletilla en título y cuerpo (si el cuerpo dice
  "la parte que más me sirve", el título no puede empezar igual).
- [2026-07-22] Evitar muletillas que huelen a IA: nada de "la parte honesta",
  "ahora la parte X", "seamos sinceros", ni titulares tipo "Lo que se rompió".
  Empezar directo por el hecho. Si un título necesita drama, mejor coloquial y
  suyo ("Cuando algo petó") que plantilla neutra.
- [2026-07-22] Los artículos pueden ir "a lo grande": no limitarse a lo mínimo,
  contar el sistema completo cuando el tema lo pide, sin inflar con humo.
- [2026-07-22] Preferencia estética firme: cero guiones largos en los posts.
