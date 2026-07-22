---
name: zenith-blog-post
description: Use when the user wants to publish, write, draft, or add a new entry to Zenith Blog (this repo's /blog section) — they'll typically dump a raw idea (rambling voice notes, bullet points, half-formed thoughts) and maybe attach images. Also use when they ask to edit, fix, or review an existing blog post. Triggers on "escribe un post", "añade una entrada al blog", "nuevo artículo", "publica esto en el blog", or pasting a wall of raw thoughts in the context of /blog.
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
- First person, informal-technical Spanish, humble and matter-of-fact — never salesy, never "revolucionario/innovador/game-changer".
- Short, direct sentences over long compound ones. Contractions and casual connectors are fine ("total que", "así que", "al final").
- **No em-dashes or en-dashes anywhere** — use a period, comma, or colon instead. This applies to headings, body, everything.
- No corporate filler verbs (elevate, unleash, seamless, next-gen, revolutionize) and no fake-precise numbers unless the user actually gave you real ones.
- Structure: a short intro (why this post / what happened), 2–5 `##` subsections with real content (not generic "Introduction / Conclusion" padding), and a short closing that ties back to the blog's actual angle ("técnico, sin humo" for tech posts — bajar a tierra lo que parece complicado; for juegos posts, first-person opinion, no review-score theater).
- Keep the excerpt (for the listing card) to one plain sentence, no clickbait.

### 4. Build the files
- Pick a slug: lowercase, hyphenated, short, descriptive (`monta-tu-vps-sin-miedo` style — concrete and a little conversational, not SEO-keyword-stuffed).
- Add the entry to `src/data/blogPosts.js` (keep the array sorted newest-first).
- Create `src/pages/blog/<slug>.astro` following the existing post-page pattern: `BlogLayout` + `BlogHeader activeCategory={category}` + `BlogSearch posts={posts} client:idle`, back-link to `/blog`, category pill + date, `h1`, cover image (`aspect-[16/7]`, `object-cover`, no border-radius — the blog's sharp-corners signature), then the body as plain flex/gap paragraphs and `##`-equivalent `h2`s at `text-[22px] font-bold`, matching the ink/muted color tokens from `blog.css`.
- If images were attached mid-article (not just the cover), place them inline near the relevant paragraph, same sharp-corner treatment, no captions unless the user gave you real caption text.

### 5. Mini pre-publish audit (always run, always report)
Before telling the user it's done, actually check:
- [ ] `npm run build` passes with no errors (run it, don't assume)
- [ ] The post appears correctly on `/blog` and `/blog?cat=<category>` (reason about the filtering logic in `src/pages/blog/index.astro`, or check the built output)
- [ ] Slug is unique in `blogPosts.js`
- [ ] No em-dashes anywhere in the new copy (`grep` for `—` and `–` in the new files)
- [ ] No leftover placeholder text (lorem ipsum, "TODO", bracketed `[...]` notes)
- [ ] Every image reference actually resolves to a real file in `public/` (or a real external URL)
- [ ] The excerpt and title match what's actually in the article (no bait)
- [ ] Category is one of `tech` / `juegos`
- [ ] Tone check: re-read the draft once as if you were the user — does anything sound like an AI wrote it (forced enthusiasm, hedging, "cabe destacar que...")? If so, cut it.

Report the audit results plainly (a short checklist, not a wall of text). If something fails, fix it before saying the post is ready — don't report a failure and stop.

## What NOT to do

- Don't publish without running the build.
- Don't invent technical details, stats, or events the user didn't mention.
- Don't reuse `ConsoleLayout`/`global.css`/mono-terminal styling for blog pages — that visual split from the portfolio was a deliberate, explicit decision.
- Don't add a third category or new nav item without asking.
- Don't write the post in a generic "blog voice" — it has to sound like this specific person, checked against what's already known about how they write (see step 3).
