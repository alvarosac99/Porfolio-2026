---
description: Nuevo post en Zenith Blog (modo recomendación si va vacío)
---

Invoca la skill `zenith-blog-post` y arranca su flujo de intake (paso 0).

Argumentos del usuario: $ARGUMENTS

- Si `$ARGUMENTS` trae contenido (una idea, notas, un brain-dump): **Modo A**. Extrae lo que ya responde del brief (tema tech/juegos/ambos, ángulo/tono, tesis). Pregunta SOLO los huecos con una única `AskUserQuestion` (submit de opciones). Si ya está todo, salta directo a redactar. Luego sigue el pipeline completo: fact-check, redacción en su voz (leer `VOZ.md` primero), maquetar, pedir las fotos, censurar/recortar/colocar dinámicas, y auditoría pre-publicación.
- Si `$ARGUMENTS` está vacío: **Modo B (recomendación)**. No le pidas un tema de cero. Lee `VOZ.md` y su background real, mira lo ya publicado en `src/data/blogPosts.js` para no repetir, y propón 3 a 5 ideas concretas con su tema + ángulo vía `AskUserQuestion`. Cuando elija, vuelve al Modo A con ese brief.
