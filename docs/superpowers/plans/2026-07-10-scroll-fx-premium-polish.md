# Scroll FX + Premium Polish + Minecraft Sutil Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add GSAP ScrollTrigger-driven reveal/stagger/counter/progress animations across the console-themed portfolio landing page, tone down the Minecraft item explosion to a single subtle icon, and apply an `emil-design-eng` polish pass — without touching the theme token system or the dedicated `/projects/minecraft` page.

**Architecture:** One shared client-side runtime component (`ScrollFX.astro`) registers GSAP + ScrollTrigger once and scans the DOM for `data-reveal` / `data-stagger` / `data-counter` / `data-draw` attributes. Section components (`ConsoleHero.astro`, `ConsoleStats.astro`, etc.) stay declarative — they only add these attributes to existing markup, they never import GSAP directly. `ConsoleLayout.astro` imports `ScrollFX` once, globally.

**Tech Stack:** Astro 5 (static/SSR), Tailwind v4 (CSS-first `@theme`), `gsap` (new dependency, includes `ScrollTrigger`), no existing test framework — verification is via `npm run build` (type/syntax correctness), `grep` checks against expected markup, and manual browser inspection (`npm run dev` + Playwright/chromium-cli screenshots).

## Global Constraints

- No new frontend test framework is introduced — this repo has none today; "tests" in this plan mean `npm run build` passing, `grep`-verifiable markup, and a manual browser check described in each task.
- All new animation code must respect `prefers-reduced-motion: reduce` — reduced/no motion, never blocked content (elements must end at `opacity: 1` regardless of JS timing).
- Colors used by new elements (progress bar, counters) must reference existing CSS custom properties (`var(--color-accent)`, etc.) — never hardcode hex values for anything that must adapt across themes.
- Minecraft item icons stay only on the Minecraft project card in `ConsoleProjects.astro`; every other card loses them entirely. The `/projects/minecraft` page itself is out of scope and must not be touched.
- `gsap` is a client-only library — it must never run during Astro's SSR/build DOM-less pass. All GSAP code lives inside `<script>` tags in `.astro` files (Astro compiles these as browser-only ES modules by default), never in the component frontmatter (`---` block).

---

### Task 1: Add GSAP dependency

**Files:**
- Modify: `package.json`

**Interfaces:**
- Produces: `gsap` package (and `gsap/ScrollTrigger` submodule) importable from any `<script>` block in `.astro` files.

- [ ] **Step 1: Install gsap**

Run: `cd /home/sebas/Porfolio && npm install gsap`

Expected: `package.json` gains a `"gsap": "^3.x.x"` line under `dependencies`, `package-lock.json` updates, command exits 0.

- [ ] **Step 2: Verify it resolves**

Run: `node -e "require.resolve('gsap/ScrollTrigger')" ` from `/home/sebas/Porfolio`

Expected: no output, exit code 0 (path resolves without throwing).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add gsap dependency for scroll animations"
```

---

### Task 2: Create the ScrollFX runtime component

**Files:**
- Create: `src/components/ScrollFX.astro`

**Interfaces:**
- Consumes: DOM elements marked with `data-reveal`, `data-stagger="<child-selector>"`, `data-counter="<end-value-with-optional-suffix>"`, `data-draw` (only the scroll-progress bar uses `data-draw` in this plan).
- Produces: a global side-effecting `<script>` that runs once per page load. No exported JS symbols — later tasks only add `data-*` attributes to markup, they never import from this file.

- [ ] **Step 1: Write the component**

```astro
---
---

<script>
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function initReveal() {
        document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
            if (prefersReducedMotion) {
                gsap.set(el, { opacity: 1, y: 0 });
                return;
            }
            gsap.set(el, { opacity: 0, y: 24 });
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                once: true,
                onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }),
            });
        });
    }

    function initStagger() {
        document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((container) => {
            const selector = container.getAttribute('data-stagger');
            if (!selector) return;
            const children = container.querySelectorAll<HTMLElement>(selector);
            if (children.length === 0) return;

            if (prefersReducedMotion) {
                gsap.set(children, { opacity: 1, y: 0 });
                return;
            }
            gsap.set(children, { opacity: 0, y: 24 });
            ScrollTrigger.create({
                trigger: container,
                start: 'top 80%',
                once: true,
                onEnter: () =>
                    gsap.to(children, {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                        stagger: 0.08,
                    }),
            });
        });
    }

    function initCounter() {
        document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
            const target = el.getAttribute('data-counter');
            if (!target) return;
            const match = target.match(/^(\d+)(.*)$/);
            if (!match) return;
            const endValue = parseInt(match[1], 10);
            const suffix = match[2];

            if (prefersReducedMotion) {
                el.textContent = target;
                return;
            }

            const counter = { value: 0 };
            el.textContent = `0${suffix}`;
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.to(counter, {
                        value: endValue,
                        duration: 1.2,
                        ease: 'power1.out',
                        onUpdate: () => {
                            el.textContent = `${Math.round(counter.value)}${suffix}`;
                        },
                    });
                },
            });
        });
    }

    function initScrollProgress() {
        const bar = document.querySelector<HTMLElement>('[data-draw]');
        if (!bar) return;

        gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' });

        if (prefersReducedMotion) return;

        ScrollTrigger.create({
            trigger: document.body,
            start: 'top top',
            end: 'bottom bottom',
            onUpdate: (self) => gsap.set(bar, { scaleX: self.progress }),
        });
    }

    function init() {
        initReveal();
        initStagger();
        initCounter();
        initScrollProgress();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
</script>
```

- [ ] **Step 2: Verify the build picks it up without errors**

Run: `cd /home/sebas/Porfolio && npm run build`

Expected: build completes with exit code 0, no TypeScript/Vite errors mentioning `ScrollFX.astro` or `gsap`.

- [ ] **Step 3: Commit**

```bash
git add src/components/ScrollFX.astro
git commit -m "feat: add ScrollFX runtime (reveal/stagger/counter/progress helpers)"
```

---

### Task 3: Wire ScrollFX into the layout and add the progress bar element

**Files:**
- Modify: `src/layouts/ConsoleLayout.astro`
- Modify: `src/components/console/ConsoleHeader.astro`

**Interfaces:**
- Consumes: `ScrollFX.astro` (Task 2) as a no-props import; the `data-draw` attribute contract from Task 2's `initScrollProgress`.
- Produces: a visible `<div data-draw>` progress bar at the bottom edge of the sticky header, styled with `var(--color-accent)`, present on every page using `ConsoleLayout`.

- [ ] **Step 1: Import ScrollFX in the layout**

In `src/layouts/ConsoleLayout.astro`, modify the frontmatter imports (currently lines 1-5):

```astro
---
import '@fontsource/jetbrains-mono';
import '@fontsource/ibm-plex-mono';
import '../styles/global.css';
import BackgroundAnimation from '../components/BackgroundAnimation.astro';
import ScrollFX from '../components/ScrollFX.astro';

interface Props {
	title: string;
}

const { title } = Astro.props;
---
```

And add `<ScrollFX />` right after `<BackgroundAnimation />` (currently line 32):

```astro
        <BackgroundAnimation />
        <ScrollFX />
        <div class="min-h-screen flex flex-col relative z-10">
```

- [ ] **Step 2: Add the progress bar element to ConsoleHeader**

In `src/components/console/ConsoleHeader.astro`, the `<header>` opening tag (currently line 6) is:

```astro
<header class="h-14 md:h-[72px] border-b border-[var(--color-stroke)] bg-[var(--color-bg)] sticky top-0 z-50 px-5 md:px-[60px] flex items-center justify-between w-full">
```

Change it to add `relative` (so the progress bar can be absolutely positioned against it) and insert the bar as the header's last child, right before the closing `</header>` tag (currently line 79):

```astro
<header class="h-14 md:h-[72px] border-b border-[var(--color-stroke)] bg-[var(--color-bg)] sticky top-0 z-50 px-5 md:px-[60px] flex items-center justify-between w-full relative">
```

```astro
    <!-- Scroll progress bar -->
    <div data-draw class="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--color-accent)]"></div>
</header>
```

- [ ] **Step 3: Verify in the browser**

Run: `npm run dev` (already running in background from earlier in this session — reuse it), then load `http://localhost:4321/` and scroll the page.

Expected: a thin accent-colored line grows from left to right along the bottom edge of the sticky header as the page scrolls, reaching full width at the bottom of the page.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/ConsoleLayout.astro src/components/console/ConsoleHeader.astro
git commit -m "feat: wire ScrollFX globally and add header scroll-progress bar"
```

---

### Task 4: Hero entrance reveal

**Files:**
- Modify: `src/components/console/ConsoleHero.astro`

**Interfaces:**
- Consumes: `data-reveal` contract from Task 2.

- [ ] **Step 1: Mark the two hero halves for reveal**

In `src/components/console/ConsoleHero.astro`, the left intro column (currently line 7):

```astro
        <div class="flex flex-col gap-6 items-start w-full md:flex-1">
```

becomes:

```astro
        <div data-reveal class="flex flex-col gap-6 items-start w-full md:flex-1">
```

And the right terminal column (currently line 34):

```astro
        <div class="w-full md:w-[520px] h-auto md:h-[440px] flex-shrink-0 mt-6 md:mt-0">
```

becomes:

```astro
        <div data-reveal class="w-full md:w-[520px] h-auto md:h-[440px] flex-shrink-0 mt-6 md:mt-0">
```

- [ ] **Step 2: Verify in browser**

Reload `http://localhost:4321/`. Expected: on first load, both hero halves fade+slide in (since `top 85%` triggers immediately for above-the-fold content, this happens right at page load, not on scroll — that matches "entrada suave al cargar" from the spec).

- [ ] **Step 3: Commit**

```bash
git add src/components/console/ConsoleHero.astro
git commit -m "feat: add hero entrance reveal animation"
```

---

### Task 5: Stats stagger + animated counters

**Files:**
- Modify: `src/components/console/ConsoleStats.astro`

**Interfaces:**
- Consumes: `data-stagger` and `data-counter` contracts from Task 2.

- [ ] **Step 1: Mark the grid container and numeric values**

In `src/components/console/ConsoleStats.astro`, the grid container (currently line 12):

```astro
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
```

becomes:

```astro
        <div data-stagger=".stat-card" class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
```

Each of the three card `<div>`s (currently lines 14, 21, 28, all starting with `<div class="flex flex-col gap-3 p-6 border...`) gets a `stat-card` class added, e.g. line 14:

```astro
            <div class="stat-card flex flex-col gap-3 p-6 border border-[var(--color-stroke)] hover:border-[var(--color-accent)] transition-colors backdrop-blur-sm" style="background-color: color-mix(in srgb, var(--color-surface), transparent 70%);">
```

(apply the same `stat-card` class addition to the identical opening `<div class="flex flex-col gap-3 p-6 border...` on lines 21 and 28).

The numeric value spans get `data-counter`. Card 1, currently line 16:

```astro
                <span class="font-mono text-[32px] font-bold text-[var(--color-text)]">1+</span>
```

becomes:

```astro
                <span data-counter="1+" class="font-mono text-[32px] font-bold text-[var(--color-text)]">1+</span>
```

Card 2, currently line 23:

```astro
                <span class="font-mono text-[32px] font-bold text-[var(--color-text)]">10+</span>
```

becomes:

```astro
                <span data-counter="10+" class="font-mono text-[32px] font-bold text-[var(--color-text)]">10+</span>
```

Card 3's value (currently line 30, `1 VPS`) is left unchanged — no `data-counter`, per the spec (non-numeric values only get the stagger reveal, not the count-up).

- [ ] **Step 2: Verify in browser**

Scroll to the stats section on `http://localhost:4321/`. Expected: the 3 cards fade+slide in staggered (~80ms apart), and "1+" / "10+" count up from 0 during the same reveal; "1 VPS" just fades in with its card, no counting.

- [ ] **Step 3: Commit**

```bash
git add src/components/console/ConsoleStats.astro
git commit -m "feat: add stats stagger reveal and animated counters"
```

---

### Task 6: Minecraft icon toned down + Projects stagger

**Files:**
- Modify: `src/components/console/ConsoleProjects.astro`

**Interfaces:**
- Consumes: `data-stagger` contract from Task 2.
- Produces: the Minecraft project card keeps exactly one subtle icon; the Games and VPS cards are unaffected (they never had item icons).

- [ ] **Step 1: Replace the "explosión masiva" icon layer with a single subtle icon**

In `src/components/console/ConsoleProjects.astro`, the entire icon layer block (currently lines 76-123, from `<!-- Capa Pegatinas Dinámica de Librería (Explosión Masiva de Ítems Uniforme) -->` through its closing `</div>`) is replaced with:

```astro
                    <!-- Icono Minecraft sutil -->
                    <img src="/icons/minecraft/diamond_pickaxe.png" class="absolute top-4 right-4 w-8 h-8 opacity-40 [image-rendering:pixelated] pointer-events-none" alt="" />
```

- [ ] **Step 2: Mark the projects list for stagger**

The container wrapping the three project blocks (currently line 16):

```astro
    <div class="flex flex-col gap-6">
```

becomes:

```astro
    <div data-stagger=":scope > a, :scope > div" class="flex flex-col gap-6">
```

Note: the Games card and Minecraft card are direct `<a>` children, the VPS card is a direct `<div>` child, and the second row itself is a `<div class="grid ...">` wrapping the VPS+Minecraft pair — so the direct children of this container are: the Games `<a>`, and the row-2 `<div class="grid ...">`. That row-2 div is itself the second "item" to animate as one unit (VPS + Minecraft fade in together as a row). Confirm the selector `:scope > a, :scope > div` matches exactly 2 elements before proceeding (see Step 3).

- [ ] **Step 3: Verify the selector matches 2 direct children**

Run: `grep -n 'class="block w-full border\|class="grid grid-cols-1 lg:grid-cols-2' src/components/console/ConsoleProjects.astro`

Expected: 2 matches — the Games `<a>` (line ~18) and the row-2 `<div class="grid grid-cols-1 lg:grid-cols-2 ...">` (line ~47). This confirms `data-stagger`'s `initStagger()` will find exactly 2 direct children under the marked container.

- [ ] **Step 4: Verify in browser**

Scroll to the projects section. Expected: the Games card fades in first, the VPS+Minecraft row fades in ~80ms after (as one unit, both cards inside it visible together since they're not individually targeted). The Minecraft card shows one small pickaxe icon top-right at 40% opacity — no more item explosion.

- [ ] **Step 5: Commit**

```bash
git add src/components/console/ConsoleProjects.astro
git commit -m "feat: tone down Minecraft icons to single subtle icon, add projects stagger"
```

---

### Task 7: Experience stagger

**Files:**
- Modify: `src/components/console/ConsoleExperience.astro`

**Interfaces:**
- Consumes: `data-stagger` contract from Task 2.

- [ ] **Step 1: Mark the experience items container**

Currently line 12:

```astro
    <div class="flex flex-col gap-4">
```

becomes:

```astro
    <div data-stagger=":scope > div" class="flex flex-col gap-4">
```

- [ ] **Step 2: Verify in browser**

Scroll to the experience section. Expected: the 2 experience cards fade+slide in staggered.

- [ ] **Step 3: Commit**

```bash
git add src/components/console/ConsoleExperience.astro
git commit -m "feat: add experience section stagger reveal"
```

---

### Task 8: Skills stagger

**Files:**
- Modify: `src/components/console/ConsoleSkills.astro`

**Interfaces:**
- Consumes: `data-stagger` contract from Task 2.

- [ ] **Step 1: Mark the skills grid container**

Currently line 12:

```astro
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr] gap-6 md:gap-10">
```

becomes:

```astro
    <div data-stagger=":scope > div" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[1.5fr_1fr] gap-6 md:gap-10">
```

This targets the two direct children (the "técnicas" column and the "personales" column) as the stagger units — each column's internal cards move together as one block, which matches how they're visually grouped.

- [ ] **Step 2: Verify in browser**

Scroll to the skills section. Expected: the técnicas column and personales column fade+slide in staggered.

- [ ] **Step 3: Commit**

```bash
git add src/components/console/ConsoleSkills.astro
git commit -m "feat: add skills section stagger reveal"
```

---

### Task 9: Education stagger

**Files:**
- Modify: `src/components/console/ConsoleEducation.astro`

**Interfaces:**
- Consumes: `data-stagger` contract from Task 2.

- [ ] **Step 1: Mark the education cards container**

Currently line 12:

```astro
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
```

becomes:

```astro
    <div data-stagger=":scope > div" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
```

- [ ] **Step 2: Verify in browser**

Scroll to the education section. Expected: the 2 education cards fade+slide in staggered.

- [ ] **Step 3: Commit**

```bash
git add src/components/console/ConsoleEducation.astro
git commit -m "feat: add education section stagger reveal"
```

---

### Task 10: Contact and Footer simple reveal

**Files:**
- Modify: `src/components/console/ConsoleContact.astro`
- Modify: `src/components/console/ConsoleFooter.astro`

**Interfaces:**
- Consumes: `data-reveal` contract from Task 2.

- [ ] **Step 1: Mark the contact content column**

In `src/components/console/ConsoleContact.astro`, currently line 5:

```astro
    <div class="flex flex-col items-center gap-8 text-center">
```

becomes:

```astro
    <div data-reveal class="flex flex-col items-center gap-8 text-center">
```

- [ ] **Step 2: Mark the footer content column**

In `src/components/console/ConsoleFooter.astro`, currently line 5:

```astro
    <div class="flex flex-col gap-8">
```

becomes:

```astro
    <div data-reveal class="flex flex-col gap-8">
```

- [ ] **Step 3: Verify in browser**

Scroll to the contact section and the footer. Expected: both fade+slide in once, simply, no stagger, no counters — matching the spec's "cierre discreto, sin protagonismo".

- [ ] **Step 4: Commit**

```bash
git add src/components/console/ConsoleContact.astro src/components/console/ConsoleFooter.astro
git commit -m "feat: add contact and footer reveal animation"
```

---

### Task 11: Reduced-motion and cross-theme verification

**Files:** none (verification only)

**Interfaces:**
- Consumes: all `data-reveal` / `data-stagger` / `data-counter` / `data-draw` wiring from Tasks 3-10.

- [ ] **Step 1: Verify prefers-reduced-motion is respected**

With `npm run dev` running, open `http://localhost:4321/` in a browser with reduced motion emulated (Chrome DevTools → Rendering tab → "Emulate CSS media feature prefers-reduced-motion: reduce", or via chromium-cli if used for automated checks).

Expected: all sections are immediately visible (no fade/slide delay), the stats counters show final values instantly (`1+`, `10+`), the header progress bar is static (no scroll animation, but this is acceptable — it's not text content that needs to be readable, just a visual accent).

- [ ] **Step 2: Verify across at least 2 themes**

In the browser, use the theme switcher (top-right dropdown, `ThemeTrigger`/`ThemeDropdown`) to switch between `favorite-dark` and `favorite-light` (or `console`). Scroll through the whole page in each.

Expected: the progress bar and any accent-colored elements pick up `var(--color-accent)` per theme correctly — no hardcoded color mismatches.

- [ ] **Step 3: Full production build**

Run: `cd /home/sebas/Porfolio && npm run build`

Expected: exit code 0, no errors. This confirms GSAP's client-only script doesn't break Astro's SSR/prerender pass.

- [ ] **Step 4: Confirm no Minecraft icons remain outside their card**

Run: `grep -rn "icons/minecraft" src/components/console/ConsoleProjects.astro src/components/console/ConsoleSkills.astro`

Expected: exactly one match, the single `diamond_pickaxe.png` line added in Task 6, inside the Minecraft card block. `ConsoleSkills.astro` should have zero matches (it never had Minecraft icons — the earlier session's icon migration only touched devicon icons there).

---

### Task 12: Emil-design-eng premium polish pass

**Files:** likely `src/components/console/*.astro` (exact files determined during the pass)

**Interfaces:** none — this is a review-and-adjust task, not a new contract.

- [ ] **Step 1: Run the polish review**

With the dev server running and all animations from Tasks 3-10 in place, invoke the `emil-design-eng` skill to review the live page (via browser screenshots at a few scroll positions, in at least one dark and one light theme) for: hover/focus state consistency (durations/easings across components), vertical rhythm/spacing between sections, typographic hierarchy (title vs. body contrast, the `// comment`-style mono labels), and any remaining "generic" details (flat shadows, characterless borders) now that motion is in place.

- [ ] **Step 2: Apply the concrete adjustments identified**

Make the specific CSS/class changes the review calls out, file by file. Since these aren't known in advance, each change should be a small, targeted edit (e.g., unifying a `transition-colors` duration, adjusting a `gap-*` value) — re-check in the browser after each change.

- [ ] **Step 3: Full build check**

Run: `cd /home/sebas/Porfolio && npm run build`

Expected: exit code 0.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "polish: emil-design-eng pass on hover states, spacing, typography"
```

---

## Post-plan cleanup

The pre-existing uncommitted changes noted at the start of this work (`docs/porfolio.pen`, `logs/out.log`, `docs/fotocara.jpeg`) are unrelated to this plan and should be left as-is unless the user asks for them explicitly — `logs/out.log` in particular looks like a runtime artifact that probably shouldn't be committed at all; flag it to the user rather than committing it silently.
