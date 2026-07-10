# Sticky-Stack Scroll Narrativo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Encadenar las secciones Stats, Projects y Experience de la portada en un scroll narrativo tipo sticky-stack (cada panel se fija arriba mientras el siguiente entra encima, escalando y desvaneciendo al anterior), solo en desktop/tablet, sin tocar la estética terminal existente.

**Architecture:** Cada una de las tres secciones gana una clase marcador `.stack-panel` y altura mínima de viewport completo (solo `md:` en adelante). Un nuevo componente wrapper `StickyStackSection.astro` envuelve las tres en `index.astro` y ejecuta la mecánica GSAP ScrollTrigger (pin + scale/fade scrubbed) siguiendo el esqueleto canónico de sticky-stack, activo solo con `ScrollTrigger.matchMedia('(min-width: 768px)')` y solo si `prefers-reduced-motion` no está activo.

**Tech Stack:** Astro 5, Tailwind v4, `gsap` + `gsap/ScrollTrigger` (ya instalados, ya usados por `ScrollFX.astro`).

## Global Constraints

- Estética terminal (mono, `>`, `$`, bordes finos, tarjetas actuales) no cambia — solo el mecanismo de scroll que las presenta.
- Los IDs de sección (`#stats`, `#projects`, `#experience`) se mantienen intactos — el header enlaza a ellos.
- El pin y el scale/fade SOLO se activan en `min-width: 768px` — por debajo, comportamiento actual sin cambios (scroll libre + `data-stagger`/`data-counter` ya existentes de `ScrollFX.astro`, que no se tocan).
- Si `prefers-reduced-motion: reduce` está activo, el pin NO se crea en ningún tamaño de pantalla.
- `pin: true` debe usar `start: "top top"` exacto (no `"top center"` ni `"top 80%"`) — es el fallo más común de este patrón según la guía de diseño usada.
- GSAP es cliente-only: todo el código vive dentro de un `<script>` en un `.astro`, nunca en el frontmatter (`---`).
- No se introduce ningún framework de test nuevo — verificación vía `npm run build`, grep de markup, y comprobación manual en navegador (desktop, móvil emulado, reduced-motion emulado).

---

### Task 1: Marcar ConsoleStats como panel del stack

**Files:**
- Modify: `src/components/console/ConsoleStats.astro`

**Interfaces:**
- Produces: el `<section id="stats">` lleva la clase `stack-panel`, consumida por `StickyStackSection.astro` (Task 4) vía `querySelectorAll('.stack-panel')`.

- [ ] **Step 1: Añadir clase y altura de panel**

La línea actual (línea 4):

```astro
<section id="stats" class="py-8 md:py-[60px] px-5 md:px-10 lg:px-20 xl:px-[120px] w-full">
```

pasa a:

```astro
<section id="stats" class="stack-panel py-8 md:py-[60px] px-5 md:px-10 lg:px-20 xl:px-[120px] w-full md:min-h-[100dvh] md:flex md:flex-col md:justify-center">
```

- [ ] **Step 2: Verificar build**

Run: `cd /home/sebas/Porfolio && npm run build`

Expected: exit 0, sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/console/ConsoleStats.astro
git commit -m "feat: mark Stats section as sticky-stack panel"
```

---

### Task 2: Marcar ConsoleProjects como panel del stack

**Files:**
- Modify: `src/components/console/ConsoleProjects.astro`

**Interfaces:**
- Produces: el `<section id="projects">` lleva la clase `stack-panel`.

- [ ] **Step 1: Añadir clase y altura de panel**

La línea actual (línea 4):

```astro
<section id="projects" class="py-8 md:py-[60px] px-5 md:px-10 lg:px-20 xl:px-[120px] w-full border-t border-[var(--color-stroke)]">
```

pasa a:

```astro
<section id="projects" class="stack-panel py-8 md:py-[60px] px-5 md:px-10 lg:px-20 xl:px-[120px] w-full border-t border-[var(--color-stroke)] md:min-h-[100dvh] md:flex md:flex-col md:justify-center">
```

- [ ] **Step 2: Verificar build**

Run: `cd /home/sebas/Porfolio && npm run build`

Expected: exit 0, sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/console/ConsoleProjects.astro
git commit -m "feat: mark Projects section as sticky-stack panel"
```

---

### Task 3: Marcar ConsoleExperience como panel del stack (último del stack)

**Files:**
- Modify: `src/components/console/ConsoleExperience.astro`

**Interfaces:**
- Produces: el `<section id="experience">` lleva la clase `stack-panel`. Al ser el ÚLTIMO panel del stack, `StickyStackSection.astro` lo usa como `endTrigger` (no se le aplica `pin`, solo recibe el scroll de entrada del panel anterior).

- [ ] **Step 1: Añadir clase y altura de panel**

La línea actual (línea 4):

```astro
<section id="experience" class="py-8 md:py-[60px] px-5 md:px-10 lg:px-20 xl:px-[120px] w-full border-t border-[var(--color-stroke)]">
```

pasa a:

```astro
<section id="experience" class="stack-panel py-8 md:py-[60px] px-5 md:px-10 lg:px-20 xl:px-[120px] w-full border-t border-[var(--color-stroke)] md:min-h-[100dvh] md:flex md:flex-col md:justify-center">
```

- [ ] **Step 2: Verificar build**

Run: `cd /home/sebas/Porfolio && npm run build`

Expected: exit 0, sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/console/ConsoleExperience.astro
git commit -m "feat: mark Experience section as sticky-stack panel (last in stack)"
```

---

### Task 4: Crear StickyStackSection.astro (wrapper + mecánica GSAP)

**Files:**
- Create: `src/components/console/StickyStackSection.astro`

**Interfaces:**
- Consumes: elementos con clase `.stack-panel` dentro de su propio `<slot />` (producidos por Tasks 1-3).
- Produces: componente Astro con slot, sin props. Se usa como `<StickyStackSection><ConsoleStats /><ConsoleProjects /><ConsoleExperience /></StickyStackSection>` en `index.astro` (Task 5).

- [ ] **Step 1: Escribir el componente**

```astro
---
---

<div class="stack-wrap relative">
    <slot />
</div>

<script>
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    gsap.registerPlugin(ScrollTrigger);

    function initStack(root: HTMLElement) {
        const panels = gsap.utils.toArray<HTMLElement>('.stack-panel', root);
        if (panels.length < 2) return;

        panels.forEach((panel, i) => {
            if (i === panels.length - 1) return;

            ScrollTrigger.create({
                trigger: panel,
                start: 'top top',
                endTrigger: panels[panels.length - 1],
                end: 'top top',
                pin: true,
                pinSpacing: false,
            });

            gsap.to(panel, {
                scale: 0.92,
                opacity: 0.55,
                ease: 'none',
                scrollTrigger: {
                    trigger: panels[i + 1],
                    start: 'top bottom',
                    end: 'top top',
                    scrub: true,
                },
            });
        });
    }

    function init() {
        const root = document.querySelector<HTMLElement>('.stack-wrap');
        if (!root) return;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        ScrollTrigger.matchMedia({
            '(min-width: 768px)': () => initStack(root),
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
</script>
```

- [ ] **Step 2: Verificar build**

Run: `cd /home/sebas/Porfolio && npm run build`

Expected: exit 0, sin errores mencionando `StickyStackSection.astro` o `gsap`.

- [ ] **Step 3: Commit**

```bash
git add src/components/console/StickyStackSection.astro
git commit -m "feat: add StickyStackSection wrapper with GSAP pin-and-stack mechanic"
```

---

### Task 5: Envolver Stats+Projects+Experience en index.astro

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `StickyStackSection` (Task 4), `ConsoleStats`/`ConsoleProjects`/`ConsoleExperience` (ya marcados como `.stack-panel` en Tasks 1-3).

- [ ] **Step 1: Importar el wrapper**

El bloque de imports actual:

```astro
---
import ConsoleLayout from '../layouts/ConsoleLayout.astro';
import ConsoleHeader from '../components/console/ConsoleHeader.astro';
import ConsoleHero from '../components/console/ConsoleHero.astro';
import ConsoleStats from '../components/console/ConsoleStats.astro';
import ConsoleProjects from '../components/console/ConsoleProjects.astro';
import ConsoleExperience from '../components/console/ConsoleExperience.astro';
import ConsoleSkills from '../components/console/ConsoleSkills.astro';
import ConsoleEducation from '../components/console/ConsoleEducation.astro';
import ConsoleContact from '../components/console/ConsoleContact.astro';
import ConsoleFooter from '../components/console/ConsoleFooter.astro';
---
```

pasa a:

```astro
---
import ConsoleLayout from '../layouts/ConsoleLayout.astro';
import ConsoleHeader from '../components/console/ConsoleHeader.astro';
import ConsoleHero from '../components/console/ConsoleHero.astro';
import ConsoleStats from '../components/console/ConsoleStats.astro';
import ConsoleProjects from '../components/console/ConsoleProjects.astro';
import ConsoleExperience from '../components/console/ConsoleExperience.astro';
import ConsoleSkills from '../components/console/ConsoleSkills.astro';
import ConsoleEducation from '../components/console/ConsoleEducation.astro';
import ConsoleContact from '../components/console/ConsoleContact.astro';
import ConsoleFooter from '../components/console/ConsoleFooter.astro';
import StickyStackSection from '../components/console/StickyStackSection.astro';
---
```

- [ ] **Step 2: Envolver las tres secciones**

El cuerpo actual:

```astro
<ConsoleLayout title="Porfolio — Álvaro Sebastián Acosta">
    <ConsoleHeader />
    <ConsoleHero />
    <ConsoleStats />
    <ConsoleProjects />
    <ConsoleExperience />
    <ConsoleSkills />
    <ConsoleEducation />
    <ConsoleContact />
    <ConsoleFooter />
</ConsoleLayout>
```

pasa a:

```astro
<ConsoleLayout title="Porfolio — Álvaro Sebastián Acosta">
    <ConsoleHeader />
    <ConsoleHero />
    <StickyStackSection>
        <ConsoleStats />
        <ConsoleProjects />
        <ConsoleExperience />
    </StickyStackSection>
    <ConsoleSkills />
    <ConsoleEducation />
    <ConsoleContact />
    <ConsoleFooter />
</ConsoleLayout>
```

- [ ] **Step 3: Verificar build**

Run: `cd /home/sebas/Porfolio && npm run build`

Expected: exit 0, sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: wire StickyStackSection around Stats/Projects/Experience in index"
```

---

### Task 6: Verificación manual (desktop, móvil, reduced-motion, anchors)

**Files:** ninguno (solo verificación)

**Interfaces:**
- Consumes: todo lo de Tasks 1-5.

- [ ] **Step 1: Verificar desktop (≥768px)**

Con `npm run dev` corriendo, abrir `http://localhost:4321/` en viewport de escritorio y hacer scroll hasta la sección Stats.

Expected: Stats se fija arriba, Projects entra encima escalando/desvaneciendo Stats, luego Experience hace lo mismo sobre Projects. Tras pasar Experience, el scroll continúa libre hacia Skills sin saltos raros.

- [ ] **Step 2: Verificar móvil (<768px, emulado en DevTools)**

Mismo recorrido en viewport móvil emulado.

Expected: Stats, Projects y Experience se comportan exactamente igual que antes de este cambio — scroll libre, sin pin, con sus reveals/stagger normales.

- [ ] **Step 3: Verificar prefers-reduced-motion**

Emular `prefers-reduced-motion: reduce` en DevTools (Rendering tab), repetir el recorrido en desktop.

Expected: sin pin en ningún tamaño de pantalla, scroll completamente libre.

- [ ] **Step 4: Verificar anchors del nav**

Con el pin activo en desktop, hacer clic en los enlaces `proyectos` y `experiencia` del header.

Expected: el scroll salta a la sección correcta sin quedar atascado a mitad del stack ni saltarse el pin. Si el salto es incorrecto (aterriza dentro del rango pineado con posición visual rota), es un hallazgo a resolver antes de dar la tarea por completa — no un "aceptar tal cual".

- [ ] **Step 5: Build final**

Run: `cd /home/sebas/Porfolio && npm run build`

Expected: exit 0.
