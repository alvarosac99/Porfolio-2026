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

## Referencias de voz externas (crítica de videojuegos es-ES real)

Para posts de juegos, calibrar contra crítica en español con voz personal (NO
marketing, NO IA). Referente principal: **AnaitGames** (Víctor Martínez /
chiconuclear y compañía) y **Presura**. Rasgos a imitar:
- Ganchos secos, sin preámbulo (una onomatopeya, una frase corta, una imagen).
- Interpelación directa al lector y complicidad ("es Nintendo riéndose de
  nosotros", "Tingle soy yo, y eres tú").
- Especulación ensayística HONESTA en vez de afirmar de más: "Puede que haya
  algo de eso", "Puede que no estuviera pensado así, pero para mí...".
- Coloquial de España sin miedo cuando pega: "un coñazo", "con dos cojones",
  "que conste que", "la muy cabrona". Autocrítica y vulnerabilidad.
- Análisis desde lo personal/psicológico, no desde la ficha técnica.
Lo que estos autores NO hacen (y por eso suena a IA cuando aparece): registro de
"profesor/moraleja". EVITAR el verbo enseñar/enseñanza en el sentido de "el juego
me enseña una lección" ("la enseñanza que me llevo", "enseña las reacciones",
"solo enseñándolo"). Contar qué te hace sentir/vivir, no qué te "enseña".

## Reglas aprendidas (dinámico — se amplía con cada corrección de Sebas)

<!-- Formato de cada entrada:
- [AAAA-MM-DD] Regla concreta. (contexto de por qué, si aporta)
Añadir arriba del todo (más reciente primero). No borrar reglas viejas salvo
que Sebas las contradiga; si las contradice, reemplazar y anotar el cambio. -->

- [2026-07-23] EL FALLO MÁS GRAVE Y REPETIDO de la sesión: las estructuras
  retóricas equilibradas/simétricas. Sebas las caza como IA al instante, aunque
  el contenido y las palabras sean suyos. Son el esqueleto, no las palabras: por
  eso "reformular" cambiando vocabulario NO sirve, hay que romper la estructura.
  Familias BANEADAS (si aparece una, reescribir la frase entera desde otro
  esqueleto):
  1. **Antítesis negar→revelar: "No es X, es Y" / "no hace X, hace Y" / "no A
     desde fuera, B".** Es el peor. Ejemplos que rechazó: "El juego no te lo
     suelta en un sermón. Te lo hace vivir"; "no mira las fases, las lleva
     puestas"; "No observa el duelo desde fuera. Lo va andando"; "Aceptar no es
     olvidar, es dejar ir". Su descripción textual: "negar algo, explicar la
     realidad". Arreglo: decir la cosa directa, en positivo, sin el par
     negación+afirmación. Nada de montar la frase sobre una negación previa para
     dar el giro.
  2. **Fórmula-definición "X es (justo) eso: ...".** Ej. rechazados: "Negar es
     justo eso, seguir como si nada"; "La depresión es justo eso, quedarte sin
     palabras"; "Negociar es eso, pactar...". Suena a diccionario. Sobre todo
     BANEADA si se repite en párrafos seguidos (defínese fase tras fase con la
     misma cópula). Arreglo: meter el concepto dentro de la escena, sin cópula
     "es eso".
  3. **Opener-marco de conclusión** (regla de abajo): "Lo que saco de aquí...",
     "De todo esto me llevo...".
  4. **Tricolon pulido + remate emocional** (regla de abajo).
  Regla de fondo: cuando Sebas señale un PATRÓN, no basta cambiar las palabras
  manteniendo la forma ("reformulado pero mantenido el patrón"). Cambiar el
  ESQUELETO de la frase: otro orden, otra puntuación, decir la idea de una sola
  vez y directa. Antes de cerrar, grepear el texto nuevo buscando "no es", "no
  te", "es justo eso", "no ... es ..." y matar cualquier antítesis o cópula-
  definición. Preferir frase plana y coloquial suya antes que giro simétrico
  bonito.
- [2026-07-23] Opener-marco a EVITAR: "Lo que saco de aquí es...", "De todo
  esto me llevo algo...", "Lo que me llevo es...". Presenta la conclusión como
  paquete antes de darla, suena a ensayo/IA. Entrar directo al pensamiento
  ("Y no es tan triste como suena:", "Suena raro pero...") sin anunciar que
  viene una moraleja.
- [2026-07-23] Estructura-plantilla que Sebas caza como IA: la antítesis
  "no te lo suelta en X, te lo hace Y" (negación + afirmación en dos frases
  gemelas) seguida de un tricolon "A, B, y C" con remate emocional. Ej. que
  rechazó: "El juego no te lo suelta en un sermón. Te lo hace vivir, mil
  pequeñas tragedias, y ves que la gente, aun así, sigue adelante." Suena
  demasiado equilibrado, simétrico. Reformular rompiendo la simetría: frases de
  largo desigual, algún fragmento corto suelto ("Siguen."), sin el par
  negación/afirmación pulido. Que se note la mano, no la balanza.
- [2026-07-22] PASADA ANTI-IA obligatoria antes de dar por bueno un post. Sebas
  detecta y odia el patrón "texto asistido": demasiado ordenado, denso y
  perfecto, sin imperfección humana. Checklist a aplicar SIEMPRE:
  1. Una idea/tesis se dice UNA sola vez (como remate). Nada de repetir la misma
     frase-tesis en varias secciones (ej. "todos sufrimos por algo, y está bien"
     iba duplicada: dejar solo una).
  2. Variar el ritmo de las frases. Mezclar frases cortas de una palabra o dos
     ("Mucho.", "Te toca a ti.") entre las largas. Evitar que todas sean
     sujeto + explicación + conclusión emocional.
  3. Menos didáctico, más vivido. No explicar en el mismo bloque el argumento +
     la mecánica + la lectura emocional (suena a resumen exhaustivo). Contar
     como recuerdo, no como guía. Cortar detalle de más.
  4. Bajar la adjetivación. No encadenar "digno, cariñoso, táctil, precioso,
     emblemático, terrible". Un adjetivo bueno > tres.
  5. Bajar la carga emocional en cadena. Si todo es "muchísima pena / me aterraba
     / me quedó grabado / me hizo sentir tantísimo", nada destaca. Dosificar.
  6. Cierres sin moraleja de ensayo. Nada de dos frases seguidas con la misma
     idea ("me formó" / "define quién soy"). Una debe ser concreta y personal
     (conectar con cómo trata a la gente / a sus problemas hoy).
  7. Evitar la frase-titular tipo eslogan ("un choque de realidad metido en un
     cartucho de Nintendo"): suena a IA/ensayo. Rebajar a algo más suyo.
  8. Cada sección, UNA idea fuerte. Transiciones con algún puente natural, no
     saltos secos entre sub-temas (ej. de "creer a Romani" a "Cremia la cuida").
  9. Titulares (`h2`) por ritmo real, no solo por estructura.
  10. Nada de afirmaciones caducas que rompan la vigencia del post ("sale este
      año", "se rumorea con fuerza"). Formular atemporal ("ojalá le hagan el
      remake que merece") o quitar.
  11. Aperturas: entrar antes al motivo emocional, no soltar todo el contexto en
      la primera frase.
  Regla de fondo: el objetivo es que suene a Sebas hablando, con un poco de
  desorden humano, no a pieza redonda generada. Releer entero al final poniéndose
  en su piel y cortar lo que huela a ensamblado.
- [2026-07-23] NO TOCAR las partes escritas "con arte" por Sebas. Cualquier
  forma metafórica, hipérbole, imagen, giro coloquial o frase con intención
  poética que use él es SAGRADA: es el punto de partida de su voz, no material a
  pulir. Dos obligaciones:
  1. GUARDAR: cuando Sebas escriba (o apruebe) un giro así, apuntarlo como
     referencia de su voz para calibrar futuros posts (aquí en VOZ.md, en
     "Fuentes de voz" o como ejemplo citado). Es un punto de partida, no un
     desecho.
  2. NO EDITAR: al auditar/reescribir, dejar intactas esas líneas. Si de verdad
     hay que tocar una, PREGUNTAR antes. Motivo real de Sebas: luego se olvida de
     cómo lo escribió y le da rabia perderlo. Solo se limpian muletillas-plantilla
     de IA (las de las reglas de abajo), nunca su prosa con intención. Ejemplos
     suyos a preservar: "escenas escalofriantes casi mires donde mires",
     "Literalmente cargas con los muertos para poder seguir", "el que no te suelta
     cuando la cagas", "un niño roto", "cuesta la vida".
- [2026-07-23] CUIDADO al "resumir" o "humanizar": si una frase es SUYA y es
  poética (adjetivación de tres tiempos "con tanta dignidad, tanto cariño y tanto
  tacto", imágenes como "escenas escalofriantes casi mires donde mires", "Mucho
  sufrimiento"), NO aplanarla ni recortarla en nombre de "menos adjetivos". Su
  voz manda sobre la regla anti-adjetivos. La regla de bajar adjetivación aplica
  a lo que redacto YO desde cero, no a las líneas que ya escribió él con intención
  poética. Antes de tocar un pasaje que suena muy suyo, dejarlo o preguntar.
- [2026-07-22] Muletillas-plantilla que Sebas caza como IA al instante y hay que
  EVITAR: aperturas tipo "Para mí el juego dice algo muy simple:", "Lo que dice
  es sencillo:", "Ahí está todo". Y NO conectar párrafos seguidos con la misma
  fórmula ("Y hay algo...", "Y por debajo de todo...", "Y hay una idea..."): eso
  es "conectar todo de la misma forma". Variar el arranque de cada párrafo (a
  veces sin conector, a veces con giro suyo: "Yo de ahí saco una cosa:", "Hay
  otra cosa que me ronda:"). Antes de cerrar, grepear los inicios de frase/
  párrafo y contar repeticiones de "Y ", "Para mí", "Es la", "Lo que"; si se
  acumulan, reescribir. También pidió léxico más rico y coloquial suyo ("la
  cagas", "de cajón", "cuesta la vida", "me dice bastante") en vez de vocabulario
  plano y repetido.
- [2026-07-22] Citar frases reales del juego en su traducción es-ES cuando
  aporten (Sebas lo pide de forma recurrente). VERIFICAR la literal antes de
  ponerla entre comillas (buscar); si no se encuentra la exacta, contarla como
  narración en cursiva SIN comillas, nunca inventar una cita literal. Verificadas
  de Majora's Mask: vendedor de máscaras "Te has encontrado con un terrible
  destino, ¿verdad?"; la Song of Healing es "Canción de Curación" (no "de la
  Sanación"). Del mayordomo Deku (al terminar la carrera, que le recuerdas a su
  hijo) NO se encontró la literal es-ES: va como paráfrasis en cursiva.
- [2026-07-22] Tamaños de float finos: existen fig-lg (440), default (320),
  fig-sm (240), fig-xs (190), fig-xxs (150). Para artwork MUY vertical (ratio
  alto) junto a párrafo corto, bajar a fig-xs/fig-xxs Y acortar el pie de foto a
  una línea (si no, el pie hace torre y reabre el hueco). Objetivo medible:
  figH (imagen + pie) <= textH del párrafo que envuelve. Medir con Playwright
  headless (scripts en scratchpad) antes de cerrar.
- [2026-07-22] Imágenes junto a texto corto: NO centrarlas por vaguería. Van
  al lateral con el texto envolviéndolas (float), como la foto de la luna que
  quedó genial. Y hay que hacerlas encajar A LA PRIMERA: la altura de la figura
  (imagen + pie) no puede superar a la del texto que la envuelve, o deja un
  hueco blanco feo al lado. Para cuadrarlo: (a) achicar la imagen (clases
  fig-sm 240px, fig-xs 190px) sobre todo si es un artwork muy vertical, y/o
  (b) añadir más texto real al párrafo (nunca inventado). Las imágenes
  apaisadas (bajas) rellenan solas porque el texto siempre es más alto. Regla
  operativa: medir figH vs textH (con Playwright headless si hace falta) y
  buscar figH <= textH antes de dar por bueno. No entregar con huecos.
- [2026-07-22] Cuando se pueda, citar frases reales del juego en su traducción
  al castellano (es-ES), integradas en el texto. Verificar la frase exacta
  (buscar), nunca inventar una cita entre comillas. Si no se encuentra la
  literal, contarlo como narración sin comillas. Ej. verificadas de Majora's
  Mask: vendedor de máscaras "Te has encontrado con un terrible destino,
  ¿verdad?"; la Song of Healing en es-ES es "Canción de Curación" (no "de la
  Sanación").
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
