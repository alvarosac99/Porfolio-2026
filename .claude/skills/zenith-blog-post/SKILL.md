---
name: zenith-blog-post
description: Use when the user wants to publish, write, draft, or add a new entry to Zenith Blog (this repo's /blog section) — they'll typically dump a raw idea (rambling voice notes, bullet points, half-formed thoughts) and maybe attach images. Also use when they ask to edit, fix, or review an existing blog post. Triggers on the `/post` command (with or without content), "escribe un post", "añade una entrada al blog", "nuevo artículo", "publica esto en el blog", or pasting a wall of raw thoughts in the context of /blog. `/post` with no content enters recommendation mode (proposes topics); `/post <idea>` starts from that brief.
---

# Zenith Blog post pipeline

Turns a raw brain-dump (text, voice-note-style rambling, bullet points) plus optional images into a finished, published post in this repo's blog. The user is not a writer and does not want to write the final prose themselves — that is the job here. But the *facts, opinions, and voice* must stay 100% theirs. Never invent technical claims, numbers, or experiences they did not tell you.

## Where things live (this repo)

- `src/data/blogPosts.js` — the single source of truth: an array of post objects `{ slug, category, title, date, dateLabel, excerpt, cover }`. Every published post needs an entry here.
- `src/pages/blog/<slug>.astro` — one file per post. Copy the structure of an existing post file if one exists; otherwise use the skeleton in this skill (below).
- `src/pages/blog/index.astro` — listing page, reads from `blogPosts.js` automatically. Never hand-edit this for a new post.
- `src/components/blog/BlogHeader.astro`, `BlogSearch.jsx` — shared chrome, already wired to `posts`. Don't touch unless the user asks for a nav/search change.
- `src/layouts/BlogLayout.astro` + `src/styles/blog.css` — the blog's own visual system (warm paper `--blog-paper`, ink `--blog-ink`, one accent `--blog-accent`, Manrope). **Do not** import `ConsoleLayout` or `global.css` here — the blog is deliberately visually separate from the rest of the portfolio (dark/mono terminal look). If you need a new blog-only color/spacing token, add it to `blog.css`, not `global.css`.
- Categories are exactly two: `'tech'` and `'juegos'`. Don't invent a third without asking.
- Images: save uploaded/attached images to `public/assets/blog/<slug>/`, reference with root-relative paths (`/assets/blog/<slug>/foo.jpg`). If the user didn't attach a cover image, ask whether they want one or want a placeholder (`https://picsum.photos/seed/<descriptive-seed>/1600/700` is the project's existing fallback pattern — see git history for prior usage) — never silently ship a placeholder without saying so.

## The pipeline

### 0. Intake — how a post starts (the `/post` flow)

The skill is normally invoked as `/post <brain-dump>` (or any of the trigger phrases). Before writing anything, resolve the **brief**: theme, angle/tone, and what the post actually says. There are two entry modes:

**Mode A — `/post <brain-dump>` (there IS content).** Parse the dump and extract whatever it already answers. Then decide the brief along these axes:
- **Theme:** `tech`, `juegos`, or **both** (a crossover post). Only two categories exist in `blogPosts.js` (`tech` / `juegos`); a "both" post still has to be filed under ONE category for the listing, so if it's a crossover, ask which one it lives under. Never invent a third category.
- **Angle / tone:** what stance the post takes. Examples, not a fixed list: *técnico sin humo* (bajar a tierra algo complejo), *crítica* (opinión negativa razonada), *alabanza / recomendación* (algo que le encantó), *tutorial / cómo lo monté*, *reflexión / dramático* (una historia con tensión), *post-mortem* (qué petó y qué aprendió). The angle drives structure and word choice, so pin it down.
- **Contenido / tesis:** the concrete thing the post is about and the single takeaway. If the dump is a wall of thoughts, state back the thesis in one sentence to confirm you got it.
- **Correspondencia (solo en crossover):** if theme is both tech+juegos, nail the bridge between them (p. ej. "lo que aprendí montando un server me sirvió para entender X juego"). Sin ese puente, un post mixto se siente pegado con celo.

  **Ask only the gaps.** If the brain-dump already answers an axis, DON'T ask it. For whatever is still open, fire ONE `AskUserQuestion` batching the open axes (theme / angle / category-if-crossover) as multiple-choice so Sebas picks fast — that's the "submit" step he expects. If the dump answers everything, skip the questions entirely and go straight to drafting. Always leave an escape hatch: he can override any pick.

**Mode B — `/post` with nothing (or "no sé de qué escribir")** → **modo recomendación.** Don't ask him to come up with a topic from zero. Propose it FOR him:
- Read `VOZ.md` and his real background first (`src/pages/porfolio.astro`, `src/components/console/ConsoleExperience.astro` for experience; `src/components/react/TechLoop.jsx` for tech opinions; the "Quién soy" prose in `src/pages/index.astro`). Look at what's already published in `src/data/blogPosts.js` so you don't repeat a topic.
- Offer **3 to 5 concrete post ideas** grounded in what he actually knows and has done (VPS, Minecraft/GameS server, Claude Code automations, CastroAlonso work, juegos que le marcaron), each as a one-line pitch with its theme + angle. Present them via `AskUserQuestion` so he picks one (or "Other" to steer). Once he picks, you're back in Mode A with a chosen brief: confirm the thesis and continue.

Whatever the mode, once the brief is set: draft → build files → **ask for the photos** (tell him exactly what images would strengthen which section; he passes them) → interpret / censor / crop each one → place them **dynamically by size and how organic they look on the page** (float vs full vs inline, see the image-template rules below) → pre-publish audit. This is the whole loop.

### 1. Capture the raw idea
Read whatever the user pasted (rambling text, bullets, half sentences) plus any attached images. Do not ask them to reformat it — messy input is the expected input. If it's genuinely too thin to make a real post (a single vague sentence with no specifics), ask ONE clarifying question about what actually happened / what the concrete takeaway is. Otherwise, work with what you have.

### 2. Fact-and-plausibility pass (before writing anything)
Go through every concrete technical claim, number, tool name, and version the user mentioned. For each one:
- If it's something you can verify against the codebase, their known projects (VPS, Minecraft server, GameS, CastroAlonso work — see `src/pages/porfolio.astro` and `src/components/console/ConsoleExperience.astro` for their real background), or general technical correctness, do so.
- If a claim is technically wrong, imprecise, or the kind of thing that would embarrass them in front of a technical reader, flag it back to them plainly before drafting: *"dijiste X, pero técnicamente Y — ¿lo cambio o es intencional?"* Don't silently "fix" it into something they didn't say, and don't silently ship something wrong either.
- If a claim is unverifiable (a personal anecdote, an opinion, "esto me pasó a mí") that's fine as-is — it doesn't need external verification, it needs to sound like them.
- Never pad the post with invented specifics (fake benchmark numbers, fake dates, fake tool names) to make it sound more complete. If a section is thin, keep it short rather than inventing filler.

### 3. Draft in their voice
This is the most important step.

**3a. Read `VOZ.md` (in this skill folder) FIRST, every time.** It is the single source of truth for tone: a fixed core plus a growing "Reglas aprendidas" list. It overrides the generic guidance below whenever they conflict. Still cross-check against how this person actually writes (read `src/components/react/TechLoop.jsx` for their real first-person tech opinions, and the "Quién soy" prose in `src/pages/index.astro` for their long-form voice) before drafting.

**3b. Keep `VOZ.md` alive (the feedback loop).** Whenever Sebas gives a new instruction about tone, style, wording, structure, or something he wants changed in how posts read, append it to the "Reglas aprendidas" section of `VOZ.md` (most recent first, dated `[AAAA-MM-DD]`) BEFORE you finish the task. If a new instruction contradicts an old rule, replace the old one and note the change. This is what makes the writing adapt to him over time. Do it even for small corrections ("no me gusta esta palabra", "más corto", "no empieces así").

Concretely, the tone is:
- First person, informal-technical Spanish (España), humble and matter-of-fact. Never salesy, never "revolucionario/innovador/game-changer".
- Short, direct sentences over long compound ones. Contractions and casual connectors are fine ("total que", "así que", "al final"). His own words when he has them ("petó" not "falló/se rompió").
- **No em-dashes or en-dashes anywhere** in the copy. Use a period, comma, or colon instead. Headings, body, captions, everything.
- No corporate filler verbs (elevate, unleash, seamless, next-gen, revolutionize) and no fake-precise numbers unless the user actually gave you real ones.
- Structure: a short intro (why this post / what happened), 2 to 5 `##` subsections with real content (not generic "Introduction / Conclusion" padding), and a short closing that ties back to the blog's actual angle ("técnico, sin humo" for tech posts, bajar a tierra lo que parece complicado; for juegos posts, first-person opinion, no review-score theater).
- Keep the excerpt (for the listing card) to one plain sentence, no clickbait.

**The AI-tell blocklist (this is what he rejects hardest, screen for it before saying you're done):**
- No throat-clearing openers: "la parte honesta", "ahora la parte X", "seamos sinceros", "voy a ser honesto", "cabe destacar que". Start directly on the fact.
- **Headings must be concrete, never vague teasers.** Banned patterns: "La parte que...", "Lo que hace que...", "El truco de...", "Lo que se rompió". A heading states WHAT happens in the section ("Cada corrección se vuelve una regla", "Cuando algo petó"), it does not tease it. If a heading wants drama, make it his colloquial voice, not a neutral template.
- No repetition between a heading and its own body (if the body says "la parte que más me sirve", the heading can't open with the same crutch).
- No forced enthusiasm, no hedging, no summary sentence that restates what was just said.
- Final gut check: read the whole draft once as if you were Sebas. Anything that a generic AI blog would have written, cut or rewrite in his voice.

### 4. Build the files
- Pick a slug: lowercase, hyphenated, short, descriptive (`monta-tu-vps-sin-miedo` style — concrete and a little conversational, not SEO-keyword-stuffed).
- Add the entry to `src/data/blogPosts.js` (keep the array sorted newest-first).
- Create `src/pages/blog/<slug>.astro` following the existing post-page pattern: `BlogLayout` + `BlogHeader activeCategory={category}` + `BlogSearch posts={posts} client:idle`, back-link to `/blog`, category pill + date, `h1`, cover image (`aspect-[16/7]`, `object-cover`, no border-radius — the blog's sharp-corners signature), then the body as plain flex/gap paragraphs and `##`-equivalent `h2`s at `text-[22px] font-bold`, matching the ink/muted color tokens from `blog.css`.
- **Emphasis / typographic style (do this on every post):** mark the strongest phrases in the body. Use `<strong>` for a punchy claim, a concrete term, or a number worth landing (a tool name, a metric like `19.000 impresiones`) — a single bold treatment, same ink color as the body, never a second accent color. Use `<em>` for a reflective aside or a turn of phrase; it stays in Manrope (the body font) with a plain italic, so it blends in instead of standing out as a foreign serif. Styles live in `blog.css` (`article p strong`, `article p em`); don't add inline styles and don't add class variants. Keep it tasteful: roughly one to two emphases per paragraph, never a wall of bold.
- **Real screenshots the user supplies (process these, never dump raw):** phone/app screenshots come with junk and risk. Before placing any:
  - **Crop, but READ the image first.** Before choosing crop coordinates, actually look at the screenshot and decide what the *essential content* is (the number, the chart including its axes, the key line of text). Cut the phone status bar, app chrome, floating buttons, and truly unrelated sections. **Never crop through the essential content** to save height: a chart needs its axis labels, a metric needs its label and context, a chat needs the message it illustrates. Cutting the meaningful part (e.g. slicing off a chart's time axis) is a real mistake he called out. After cropping, re-open the image and confirm the essential content is fully there and nothing important got clipped, then adjust if it did.
  - **Size the image to the text it sits next to.** Match the image's footprint to how much body text wraps around it. Short section (a paragraph or two of a few lines) -> keep the float small (default `fig-left`/`fig-right`, ~320px) so it doesn't leave whitespace. Section with plenty of text -> the image can and should be bigger (`fig-lg`, ~440px) so it's legible; there's enough prose to fill the height. Don't leave a tall image beside three lines of text (dead whitespace), and don't shrink an important image when the section has text to spare.
  - **Censor / redact.** Scan every screenshot for private info and remove it (crop it out, or cover it). Do this proactively, don't wait to be told. When in doubt, cut it. When the sensitive text is dense (a whole prompt/config block full of secrets), prefer cropping that block out entirely over boxing ten separate strings.

    **What is censorable (redact all of these):**
    - **Secrets / credentials:** API keys, tokens, OAuth tokens, passwords, `*.env` file *names* and their contents, env var names that reveal config (`IMAP_HOST`, `IMAP_USER`, `IMAP_PASS`, `DB_URL`...), private SSH keys, connection strings.
    - **Infra / deployment:** real IP addresses (public and private), port numbers, internal hostnames and domains, real absolute filesystem paths that leak `/home/<user>/...` or internal directory layout, container/VM names, cloud resource IDs, bucket names, database names.
    - **Service versions:** version strings of anything deployed (`OpenClaw v2026.6.10`, `nginx/1.25.3`, `PostgreSQL 16.2`, framework/runtime versions in a banner or footer). Sebas flags version numbers as not-good-to-show; they hint at exploitable versions.
    - **Identity / PII:** full names of real people (recruiters, contacts, colleagues), the user's own full legal name if the context is sensitive, email addresses (censor **every** occurrence, they repeat), phone numbers, physical addresses, home city if not already public, national/tax IDs, dates of birth.
    - **Accounts / finance:** account numbers, IBANs, card numbers, private financial or billing details (e.g. "Anthropic: pago fallido", "Revolut: Graduate Programme"), balances, invoice/order IDs, email subjects from private inboxes.
    - **Session / internal refs:** session IDs, agent IDs, request IDs, UUIDs, cron/job internal names if they expose infra, anything that would embarrass or dox him.

    Rule of thumb: if a stranger could use it to log in, find the server, identify a real person, or spend money, it goes. Purely illustrative UI (labels, buttons, a schedule like `Cron 0 8 * * 1`, generic status text) can stay, that's what makes the capture readable.
  - **Efficient redaction workflow (do it this way to avoid many slow retries).** Cover text with opaque black rectangles (`ImageDraw.rectangle(box, fill=(0,0,0))`), don't try to blur. Steps: (1) `Read` the full image once and note the real pixel `size`. The Claude Code render is ~1:1 with real pixels, so on-screen positions map almost directly. (2) For each sensitive string, crop a **zoomed strip** of just that text line (`im.crop((x0,y0,x1,y1)).resize((w*2, h*2))`) and `Read` it to measure exact start/end columns; map back with `orig_x = crop_x0 + scaled_x/zoom`. (3) Collect **all** boxes into one list and draw them in a single script pass, saving straight to `public/assets/blog/<slug>/`. (4) **Pad boxes generously** (a few px each side) so glyph edges never leak. The two failure modes that cost retries: a box placed too far right/left leaving the first/last chars visible (e.g. leaked `seba`, `/home/se`, `.dev` -> `ev`), and a box with the wrong `y` that sits above/below the glyph baseline and only covers half the line. When a text line **wraps**, remember the same secret (a path) can appear on more than one line. (5) After drawing, `Read` a zoomed crop of each redacted line to confirm nothing peeks, then `Read` the whole final image once. Text screenshots: save as `.png` (crisp), not `.jpg`.
  - **Contextualize.** Every inline image goes in a `<figure>` with a `<figcaption>` (styled in `blog.css`) that says in his voice what the reader is looking at and ties it to the surrounding paragraph. Never drop a bare image with no caption.
  - **Frame + template.** Every image goes in a `<figure>` and picks a **layout template** (see below). The `blog.css` rules already give the img a hairline border and sharp corners. Don't add inline styles.
  - **Tooling.** This box has no ImageMagick and system Python has no Pillow/pip. Crop with `uv run --with Pillow python <script>` (Pillow `Image.crop((left, upper, right, lower))`); `uv` is installed. Phone screenshots are typically `1080x2340`. After cropping, re-open each image and actually look at it to confirm the crop is clean and nothing sensitive survived. Note each cropped image's final `width x height` so you can pick the right template by aspect ratio.

- **Las imágenes DEBEN sentirse dinámicas, incrustadas en el texto en posiciones y tamaños distintos. Es EL estilo del blog, no un extra.** Nunca dejes todas las figuras en el mismo lado y el mismo tamaño (p. ej. todo `fig-right` del mismo ancho): se siente estático y plano. A lo largo del post, **alterna el lado** (derecha / izquierda / centrada) y **varía el tamaño** (`fig-sm` ~240px, default ~320px, `fig-lg` ~440px, `fig-full` ancho completo) de una figura a la siguiente, según cuánta prosa envuelve cada una. Empareja la dirección de `reveal` con el lado (`reveal-right` en `fig-right`, `reveal` por defecto en `fig-left`, `reveal-up` en centradas/full). El resultado buscado es una página tipo revista donde las fotos caen en sitios y tamaños diferentes, ancladas al párrafo que ilustran. Ejemplo real en `majoras-mask-me-formo`: recorte pequeño a la derecha -> recorte mediano a la izquierda -> recorte grande a la derecha -> foto centrada.
- **Image layout templates (pick by format, aim for a newspaper feel):** the goal is an editorial page where images sit where they read best and never hit the reader as a full-screen block out of nowhere. Format decides the template. All templates live in `blog.css`; add the class, don't restyle.
  - **`fig-full`** — `<figure class="fig-full reveal">`. Full column width, stacked in normal flow. Use for **wide or dense** images that need the width to be legible: dashboards, tables, charts, wide landscape shots (aspect roughly landscape or denser than ~4:3).
  - **`fig-flow` + `fig-left` / `fig-right`** — a `<div class="fig-flow">` wrapper containing a floated `<figure class="fig-left reveal">` (or `fig-right`) **followed by the paragraphs that should wrap around it**. Use for **tall / portrait** images (phone screenshots, ~9:16) so they sit as a side column and the text flows beside them instead of a giant block. Put enough text inside the same `.fig-flow` to sit alongside the image height (ideally the whole subsection's prose). On mobile the float auto-collapses to full width. Float defaults to ~320px wide; add **`fig-lg`** (e.g. `class="fig-right fig-lg"`, ~440px) when the section has enough text to justify a bigger, more legible image, or **`fig-sm`** (~240px) para variar el ritmo con una imagen más pequeña. Usa los tres tamaños a lo largo del post para que no se sienta uniforme.
  - **`fig-inline`** — `<figure class="fig-inline reveal">`. Centered, medium max-width (~440px). Use for **small or decorative** images that would look lost full-width and don't need to dominate.
  - **`fig-cutout`** (modificador) — para **PNG con fondo transparente** (recortes de personaje, sprites, artwork sin fondo). Quita el borde/caja y hace que la imagen ocupe **solo su tamaño natural** (no la estira a `width:100%`), así se ancla al texto como un recorte y no como una foto enmarcada. **Es un modificador, se combina** con la plantilla de posición: `fig-right fig-cutout`, `fig-left fig-cutout`, `fig-inline fig-cutout`, y `fig-lg` para el ancho grande. Detecta la transparencia antes de decidir (canal alfa con `< 255`, con el snippet Pillow de detección). Las capturas/fotos opacas (jpg, screenshots) **no** llevan `fig-cutout`: conservan su hairline. En este repo el post `majoras-mask-me-formo` lo usa en los recortes de Link-Deku, Skull Kid y el vendedor de máscaras.
  - **Entrance animation (`reveal`):** add `reveal` to every figure so it fades/slides in on scroll (IntersectionObserver lives in `BlogLayout.astro`, respects `prefers-reduced-motion`). Vary the direction like a real layout, don't make them all identical: default enters from the **left**, `reveal reveal-right` enters from the **right** (pair it with `fig-right`), `reveal reveal-up` enters from **below** (good for stacked full-width figures). Alternate directions down the page so it feels composed, not mechanical.
  - **Rule of thumb:** landscape/dense -> `fig-full`; tall/portrait -> `fig-flow` + float (alternate left/right down the article); small -> `fig-inline`; **PNG sin fondo -> añade `fig-cutout` sobre la plantilla de posición**. Never drop a tall phone screenshot as a raw full-width figure, it invades the screen.
- **Draft image placeholders (dev/borrador stage, before deploy):** when the user has NOT supplied inline images yet, don't leave the spots empty. At each place a screenshot or photo would strengthen the point, drop a `<div class="img-suggest">[ <b>IMAGEN:</b> ... ]</div>` block (styled in `blog.css`) with a concrete, bracketed suggestion: exactly what to screenshot or search for, and any privacy warning (e.g. "tapa datos sensibles"). Say whether it's a capture the user can take themselves or something to find online. These are visible dashed boxes on purpose. They are draft-only scaffolding: every `img-suggest` block must be replaced with a real image (or deleted) before deploy, which the pre-publish audit enforces.

### 4b. The SVG cover (build it right the first time)
Every post gets a cover at `public/assets/blog/<slug>/cover.svg`, `1600x700` viewBox. Hard-won rules:

- **Simple beats busy. Always.** The cover is a hero image, not a diagram. The proven winning composition is: one or two recognizable **brand logos** connected by a dashed accent arrow (e.g. `[OpenClaw] → [LinkedIn]`), on a nice background, with a small `ZenithBlog` wordmark in a corner. That's it. Do NOT build fake terminals, model-router hubs, chip grids, or paragraphs of explanatory text inside the SVG. Sebas rejected all of that as "horrible" and "demasiado texto". Minimal wins.
- **Use REAL official logos, never hand-drawn approximations.** If a brand appears (OpenClaw, LinkedIn, OpenRouter, DeepSeek, a language, a tool), fetch its real logo: try `https://<domain>/favicon.svg`, the site, or a known CDN. Embed the downloaded SVG paths inline into the cover (copy its `<path>`s and any `<linearGradient>` into `<defs>`, giving gradients unique ids so they don't clash). **If you cannot find the real logo asset, STOP and ask Sebas for it** — do not spend time inventing a stylized substitute. He said this explicitly: if you can't find something, ask, don't generate a fake. Known-good: OpenClaw logo is the red lobster at `https://openclaw.ai/favicon.svg`.
- **Background should look "chulo" but stay calm.** The recipe that landed: a soft `radialGradient` glow (warm paper `#fff4ec → #faf6f0 → #f0e7db`), one or two large blurred accent blobs (`filter` gaussian blur ~26, low opacity, brand orange + a second brand-adjacent color like LinkedIn blue), and a few subtle dot-texture marks in the corners. No heavy patterns, no busy geometry.
- **Palette = blog tokens as literal hex** (SVG can't read CSS vars): paper `#faf6f0`, ink `#1a1510`, muted `#6b6255`, hairline `#e6ddd0`, accent `#ff7a42`. Logos keep their own official brand colors.
- **Wordmark:** small, bottom corner, `Zenith` in ink + `Blog` in accent (`#ff7a42`), Manrope 800. This is the ZenithBlog signature, matches the site header wordmark pattern.
- **Gotcha — deleting/renaming assets needs a dev-server restart.** Astro's Vite dev server caches asset paths; after you `rm`, `git mv`, or change a slug/cover path, the server throws stale `ENOENT ... no such file` 500s on `/blog` even though the code is correct. Fix: `pkill -f "astro dev"` then `npm run dev` again. Don't chase it as a code bug — it's the Vite cache. (Same applies to renaming a post slug/file.)

### 4c. Reading time (every post)
Every post shows an estimated reading time in its header, next to the date. Compute it and store it, don't eyeball it:
- Count the words of the visible body copy (strip HTML tags, count `figcaption` text too, ignore code inside `<code>` blocks for the estimate). `articulo.txt` word count / **200 words-per-minute**, rounded up, minimum `1`.
- Store it as a `readingMin` integer on the post object in `blogPosts.js`, and render it in both the post header and the listing card as `{readingMin} min de lectura`. Styling matches the muted date text.
- Quick count: `uv run --with beautifulsoup4 python` to strip tags, or a small node/grep pass. Recompute whenever the body changes materially.
- **MANDATORY before any merge/deploy: recompute `readingMin` from the final copy and update `blogPosts.js` if it changed.** The body grows across edit rounds and a stale count is a real miss Sebas flagged. Don't eyeball it, run the count. Recipe that works:
  ```
  uv run --with beautifulsoup4 python -c "
  import re, math
  from bs4 import BeautifulSoup
  src=open('src/pages/blog/<slug>.astro').read()
  html=re.search(r'<article.*?>(.*)</article>', src, re.S).group(1)
  soup=BeautifulSoup(html,'html.parser')
  for c in soup.find_all('code'): c.decompose()
  w=len(soup.get_text(' ').split())
  print('palabras',w,'-> readingMin',max(1,math.ceil(w/200)))
  "
  ```

### Tools you have in this repo
- **Dev server:** `npm run dev` serves the site (Astro). Port 4321 is usually taken so it lands on **http://localhost:4322/**. Check a route with `curl -s -o /dev/null -w "%{http_code}\n" http://localhost:4322/blog/<slug>` (expect `200`). Background it and tail the task log for errors.
- **Restart gotcha:** after `rm`/`git mv`/slug or cover path changes, the Vite dev server serves stale `ENOENT ... 500`s even though the code is right. Fix: `pkill -f "astro dev"` then `npm run dev`. Not a code bug.
- **Images:** no ImageMagick, and system Python has no Pillow/pip. Use `uv run --with Pillow python <script>` for crop/resize (`Image.crop((left, upper, right, lower))`). `uv` is installed. Always re-open the output to eyeball it.
- **Fetching real logos / assets:** `curl -sL https://<domain>/favicon.svg -o <dest>`. If it 404s or the asset isn't findable, ask Sebas, don't fake it.
- **Checks:** `grep` for em-dashes (`—`/`–`), `img-suggest` leftovers, and the AI-tell phrases before declaring done. `npm run build` must pass.

### 4d. Audit post (herramienta: recorrer, preguntar, enriquecer)

Antes del audit mecánico, haz una **pasada de calidad** por el post entero. El objetivo no es comprobar que compila, es que el post quede redondo y suene a él. Cómo:

0. **Pasada de espectador real (auditaje de sentido).** Antes de nada, resetea: **olvida todo lo que sabes del tema** (el juego, el proyecto, la conversación que tuviste con Sebas, el contexto que traes de fuera). Lee el post en frío, **como un espectador que aterriza aquí sin ningún contexto previo**. La única información válida es la que está escrita en la página. Pregúntate en cada párrafo: *¿esto se entiende solo, sin nada de fuera?* Caza:
   - Referencias que solo tienen sentido si ya conoces el tema (un nombre, una mecánica, una sigla, un "como decía antes" que no dijo nada).
   - Saltos lógicos: el texto asume un paso que el lector no tiene.
   - Frases que tú entiendes **porque tienes el contexto en la cabeza**, pero que en la página quedan cojas.
   - Sentido emocional: ¿el espectador siente lo que Sebas quiere que sienta, o solo lo sentiría alguien que ya estuvo ahí?

   Lo que falle aquí entra como pregunta técnica o de enriquecimiento en el punto siguiente. Este reset es lo que evita publicar algo que "tiene sentido para ti" pero no para quien lo lee de verdad.

1. **Recorre el post de principio a fin** e ve **apuntando preguntas** según lees, sin interrumpir aún. Dos tipos:
   - **Técnicas / de precisión:** claims sin confirmar, cifras que hay que validar, ambigüedades, desajustes imagen↔pie (lo que dice el texto no se ve en la captura), detalles que faltan, cosas que un lector técnico cuestionaría, términos imprecisos.
   - **De contenido / enriquecimiento (según estilo y tono):** aquí se saca la voz y la profundidad. En posts de juegos o personales, tirar de emoción y motivación: *"¿cómo te sentiste cuando pasó X en ese juego?"*, *"¿por qué decidiste que valía la pena contar esto?"*, *"¿qué te hizo comentar justo eso?"*, *"¿qué te dejó esa partida?"*. En posts técnicos, tirar del porqué y la historia real: *"¿por qué elegiste este camino y no el otro?"*, *"¿qué te costó más?"*, *"¿qué harías distinto?"*. Ajusta el tipo de pregunta al ángulo del brief (paso 0): un post crítica pide otras preguntas que un tutorial.
2. **Hazle TODAS las preguntas juntas** a Sebas (lista numerada corta, o `AskUserQuestion` si son de elegir). No las sueltes de una en una a lo largo del trabajo; recógelas y pregúntale en bloque. Marca cuáles son bloqueantes (hay que responderlas para no publicar algo impreciso) y cuáles son opcionales de enriquecimiento.
3. **Aplica las respuestas al post** y mejora el resultado final: corrige lo técnico, e integra lo emocional/personal en su voz (sin flex, sin proyectar ignorancia, cero guiones). Una respuesta suya vale más que tres frases inventadas: si te cuenta cómo se sintió, eso entra casi literal. **NO toques las líneas escritas "con arte" por Sebas** (metáforas, hipérboles, giros suyos con intención poética): son sagradas, se preservan intactas y, si de verdad hay que tocar una, se PREGUNTA antes. Solo se limpian las muletillas-plantilla de IA. Además, cada giro/metáfora suyo es material para calibrar su voz: apúntalo en `VOZ.md`. Ver la regla [2026-07-23] "NO TOCAR las partes escritas con arte" en `VOZ.md`.

Esta herramienta es lo que sube el post de "correcto" a "muy bueno". Ejecútala siempre salvo que Sebas diga explícitamente que lo publiques tal cual.

### 5. Mini pre-publish audit (always run, always report)
Before telling the user it's done, actually check:
- [ ] `npm run build` passes with no errors (run it, don't assume)
- [ ] The post appears correctly on `/blog` and `/blog?cat=<category>` (reason about the filtering logic in `src/pages/blog/index.astro`, or check the built output)
- [ ] Slug is unique in `blogPosts.js`
- [ ] No em-dashes anywhere in the new copy (`grep` for `—` and `–` in the new files)
- [ ] No leftover placeholder text (lorem ipsum, "TODO", bracketed `[...]` notes) and no `img-suggest` blocks left (grep for `img-suggest`; each must be a real image or removed before deploy)
- [ ] Every image reference actually resolves to a real file in `public/` (or a real external URL)
- [ ] The excerpt and title match what's actually in the article (no bait)
- [ ] Category is one of `tech` / `juegos`
- [ ] `readingMin` **recomputed from the final copy** (run the word-count recipe in 4c, don't assume) and updated in `blogPosts.js` if it changed. This is mandatory right before merge/deploy.
- [ ] Order and flow: sections build on each other, the intro hooks, nothing repeats, the closing lands. Read start to finish once for coherence, not just per-paragraph.
- [ ] Pasada de espectador real: releído en frío, olvidando todo el contexto del tema (paso 4d.0). Todo se entiende solo con lo que hay en la página, sin conocimiento previo ni referencias huérfanas.
- [ ] Tone check: re-read the draft once as if you were the user — does anything sound like an AI wrote it (forced enthusiasm, hedging, "cabe destacar que...")? If so, cut it.

Report the audit results plainly (a short checklist, not a wall of text). If something fails, fix it before saying the post is ready — don't report a failure and stop.

### 6. Promocionar el post en LinkedIn (opcional, tras publicar) — el puente con OpenClaw

Una vez el post está **mergeado y en producción** (no antes), ofrécele a Sebas montar un post de LinkedIn que promocione el nuevo artículo del blog. Esto engancha esta skill con el sistema de LinkedIn de OpenClaw, que vive fuera del repo en `/home/sebas/.openclaw/workspace/scripts/`.

**Piezas del lado OpenClaw (ya existen, úsalas, no reinventes):**
- `linkedin_publish.py` — publica vía API oficial (`ugcPosts`). Uso: `linkedin_publish.py --text "..."` o `--file borrador.txt` con `--image img.png` opcional (repetible) y `--dry-run`. Menciones en el texto como `@[Nombre](urn:li:organization:ID)`.
- venv con `requests`: ejecútalo con `/home/sebas/.openclaw/workspace/scripts/.venv/bin/python3`.
- Token en `linkedin_report.env` (`LI_ACCESS_TOKEN`). **Nunca lo imprimas ni lo pegues en ningún sitio.**
- `linkedin_queue/` — cola de la automatización semanal (borradores que el cron publica con aprobación). Alternativa a publicar al momento: dejar el promo ahí para el flujo normal.

**Voz del post de LinkedIn:** léela en `/home/sebas/.openclaw/workspace/memory/linkedin_agent.md` (perfil, reglas de estilo, y reglas duras como **no mencionar ninguna empresa en su perfil**, ubicación Gijón/Asturias, inglés básico). Las reglas de `VOZ.md` siguen aplicando (cero guiones, sin flex, acercar a la gente, no proyectar ignorancia). El post de LinkedIn es corto: un gancho + qué cuenta el artículo + link, sin clickbait.

**El link al artículo:** `https://<dominio-producción>/blog/<slug>`. `astro.config.mjs` no fija `site`, así que **confirma el dominio con Sebas** (casi seguro `zenithseed.dev`) antes de meter la URL.

**Cómo llegan las imágenes al post de LinkedIn (esto confundía):** el post de LinkedIn no "hereda" imágenes del blog solo. `linkedin_publish.py` sube al feed el fichero (o ficheros) que le pases con `--image <ruta>`, una ruta local a un **PNG o JPG** (repite `--image` para varias). O sea: eliges tú qué imagen acompaña al promo y le das la ruta. Fuentes válidas:
  - Una figura ya rasterizada del propio post: los `.jpg`/`.png` de `public/assets/blog/<slug>/` (p. ej. una captura del artículo). Sirven tal cual.
  - **La portada NO vale directa:** `cover.svg` es SVG y LinkedIn solo acepta PNG/JPG. Si quieres usar la portada, rasterízala a PNG primero (`uv run --with 'cairosvg' python -c "import cairosvg; cairosvg.svg2png(url='...cover.svg', write_to='/tmp/cover.png', output_width=1600)"`) y pasa el PNG.
  - Generar una imagen a medida para LinkedIn: existe `linkedin_image.py` / `linkedin_image_prompt.py` en el mismo dir de OpenClaw.
  Sin `--image`, el post sale solo texto (con el link, LinkedIn suele autogenerar una preview del artículo si el dominio expone Open Graph). Pregúntale a Sebas qué imagen quiere: una captura del post, la portada rasterizada, o solo el link con su preview.

**Gate de aprobación (OBLIGATORIO, es hacia fuera e irreversible):**
1. Redacta el borrador del promo en un `.txt`.
2. Corre `linkedin_publish.py --file borrador.txt [--image ...] --dry-run` y **enséñale el payload** a Sebas.
3. Publica de verdad (quitando `--dry-run`) **solo tras su "texto ok" explícito**. Nunca auto-publiques. Esto replica su propio flujo de aprobación.

## What NOT to do

- Don't publish without running the build.
- Don't invent technical details, stats, or events the user didn't mention.
- Don't reuse `ConsoleLayout`/`global.css`/mono-terminal styling for blog pages — that visual split from the portfolio was a deliberate, explicit decision.
- Don't add a third category or new nav item without asking.
- Don't write the post in a generic "blog voice" — it has to sound like this specific person, checked against what's already known about how they write (see step 3).
- Don't publish anything to LinkedIn without an explicit "texto ok" from Sebas (dry-run first, always). It's outward-facing and irreversible. Never print or leak the `LI_ACCESS_TOKEN`.
