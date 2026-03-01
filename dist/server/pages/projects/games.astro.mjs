import { e as createComponent, m as maybeRenderHead, r as renderTemplate, k as renderComponent, g as addAttribute, l as Fragment, u as unescapeHTML } from '../../chunks/astro/server_DqZNW82L.mjs';
import 'piccolore';
import { $ as $$ConsoleLayout } from '../../chunks/ConsoleLayout_DuGCMpq_.mjs';
import 'clsx';
/* empty css                                    */
import { $ as $$DocFooter } from '../../chunks/DocFooter_CqRm5a3-.mjs';
import { marked } from 'marked';
import { createHighlighter } from 'shiki';
export { renderers } from '../../renderers.mjs';

const $$TopBar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="h-[56px] border-b border-[var(--color-stroke)] bg-[var(--color-bg)] sticky top-0 z-50 px-4 md:px-12 lg:px-[60px] flex items-center justify-between"> <!-- Left: Back + Breadcrumbs --> <div class="flex items-center gap-3"> <!-- Back Button --> <a href="/#projects" class="flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-[var(--color-stroke)] hover:bg-[var(--color-stroke)]/50 transition-colors group"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" class="stroke-[#8B939F] group-hover:stroke-[var(--color-text)] transition-colors" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg> <span class="font-mono text-xs text-[#8B939F] group-hover:text-[var(--color-text)] transition-colors">volver</span> </a> <!-- Breadcrumb --> <nav class="hidden sm:flex items-center gap-0.5 ml-1"> <span class="font-mono text-xs text-[#8B939F]">~/proyectos/</span> <span class="font-mono text-xs font-medium text-[var(--color-accent)]">games</span> </nav> </div> <!-- Right: Actions --> <div class="flex items-center gap-3"> <!-- Repo Button --> <a href="https://github.com/alvarosac99/GameS" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 px-3.5 py-2 rounded-md border border-[var(--color-stroke)] hover:bg-[var(--color-stroke)]/50 transition-colors group"> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="text-[#8B939F] group-hover:text-[var(--color-text)] transition-colors"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path></svg> <span class="font-mono text-xs text-[#8B939F] group-hover:text-[var(--color-text)] transition-colors">repositorio</span> </a> </div> </header>`;
}, "/home/sebas/Porfolio/src/components/console/TopBar.astro", void 0);

const $$DocHero = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="relative w-full overflow-hidden border-b border-[var(--color-stroke)] pt-[100px] pb-12 px-4 md:px-12 lg:px-[120px] min-h-[450px] flex items-center" data-astro-cid-fsy2qo2c> <!-- Background Image with Blend & Gradient Fade --> <div class="absolute inset-0 w-full h-full z-0 opacity-20 pointer-events-none" style="background-image: url('/assets/games/img-2.jpg'); background-size: cover; background-position: center; filter: contrast(1.2) brightness(1.5) blur(2px); mix-blend-mode: overlay;" data-astro-cid-fsy2qo2c></div> <!-- Fades out the background image into the actual background color on the left/bottom --> <div class="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/80 to-transparent z-0 pointer-events-none" data-astro-cid-fsy2qo2c></div> <div class="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)]/40 z-0 pointer-events-none" data-astro-cid-fsy2qo2c></div> <div class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 max-w-7xl mx-auto w-full" data-astro-cid-fsy2qo2c> <!-- Text content --> <div class="flex flex-col gap-6 max-w-[650px] relative z-10 flex-shrink-0" data-astro-cid-fsy2qo2c> <!-- MOBILE ONLY: Floating Hero Visual replacing "01 games/" --> <div class="flex lg:hidden w-full justify-center relative z-10 perspective-[1000px] mb-2 mt-4" data-astro-cid-fsy2qo2c> <a href="https://games.zenithseed.dev" target="_blank" rel="noopener noreferrer" class="relative z-10 block transition-transform duration-700 ease-out hover:scale-105" data-astro-cid-fsy2qo2c> <img src="/assets/games/img-3.png" alt="GameS Interface Hero" class="w-full max-w-[450px] h-auto object-contain filter drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]" data-astro-cid-fsy2qo2c> </a> <!-- Glow behind image --> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[var(--color-accent)]/20 blur-[100px] rounded-full z-0 pointer-events-none" data-astro-cid-fsy2qo2c></div> </div> <span class="hidden lg:block font-mono font-bold text-6xl text-[var(--color-accent)] drop-shadow-md" data-astro-cid-fsy2qo2c>01</span> <div class="flex flex-col gap-2" data-astro-cid-fsy2qo2c> <h1 class="hidden lg:block font-mono font-bold text-4xl md:text-5xl text-[var(--color-text)] tracking-tight drop-shadow-md" data-astro-cid-fsy2qo2c>
games/
</h1> <span class="font-mono text-xl text-[var(--color-text-muted)]" data-astro-cid-fsy2qo2c>— proyecto fin de curso</span> </div> <p class="font-body text-[var(--color-text)] opacity-90 text-[17px] leading-relaxed drop-shadow-sm max-w-[550px]" data-astro-cid-fsy2qo2c>
plataforma web integral para descubrir, organizar y gestionar videojuegos, con búsqueda avanzada, historial de precios y recomendaciones personalizadas.
</p> <div class="mt-1" data-astro-cid-fsy2qo2c> <a href="https://games.zenithseed.dev" target="_blank" rel="noopener noreferrer" class="group inline-flex items-center gap-1.5 font-mono text-sm text-[var(--color-text-muted)] hover:text-[#A855F7] transition-colors decoration-[#A855F7]/30 hover:underline underline-offset-4 decoration-1" data-astro-cid-fsy2qo2c> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" class="stroke-current transition-colors" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-fsy2qo2c><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" data-astro-cid-fsy2qo2c></path><polyline points="15 3 21 3 21 9" data-astro-cid-fsy2qo2c></polyline><line x1="10" y1="14" x2="21" y2="3" data-astro-cid-fsy2qo2c></line></svg> <span data-astro-cid-fsy2qo2c>games.zenithseed.dev</span> </a> </div> <!-- Tags --> <div class="flex flex-wrap gap-2.5 mt-2 relative z-10" data-astro-cid-fsy2qo2c> <span class="px-3 py-1.5 border border-[#61DAFB]/30 bg-[#61DAFB]/10 rounded text-xs font-mono text-[#61DAFB] backdrop-blur-md shadow-sm transition-colors hover:bg-[#61DAFB]/20" data-astro-cid-fsy2qo2c>[react]</span> <span class="px-3 py-1.5 border border-[#10B981]/30 bg-[#10B981]/10 rounded text-xs font-mono text-[#10B981] backdrop-blur-md shadow-sm transition-colors hover:bg-[#10B981]/20" data-astro-cid-fsy2qo2c>[django]</span> <span class="px-3 py-1.5 border border-[#F59E0B]/30 bg-[#F59E0B]/10 rounded text-xs font-mono text-[#F59E0B] backdrop-blur-md shadow-sm transition-colors hover:bg-[#F59E0B]/20" data-astro-cid-fsy2qo2c>[python]</span> <span class="px-3 py-1.5 border border-[#4479A1]/30 bg-[#4479A1]/10 rounded text-xs font-mono text-[#4479A1] backdrop-blur-md shadow-sm transition-colors hover:bg-[#4479A1]/20" data-astro-cid-fsy2qo2c>[mysql]</span> <span class="px-3 py-1.5 border border-[#DC382D]/30 bg-[#DC382D]/10 rounded text-xs font-mono text-[#DC382D] backdrop-blur-md shadow-sm transition-colors hover:bg-[#DC382D]/20" data-astro-cid-fsy2qo2c>[redis]</span> <span class="px-3 py-1.5 border border-[#2496ED]/30 bg-[#2496ED]/10 rounded text-xs font-mono text-[#2496ED] backdrop-blur-md shadow-sm transition-colors hover:bg-[#2496ED]/20" data-astro-cid-fsy2qo2c>[docker]</span> </div> </div> <!-- DESKTOP ONLY: Floating Hero Visual --> <div class="hidden lg:flex flex-1 w-full justify-end relative z-10 perspective-[1000px]" data-astro-cid-fsy2qo2c> <a href="https://games.zenithseed.dev" target="_blank" rel="noopener noreferrer" class="relative z-10 block transition-transform duration-700 ease-out hover:scale-105 hover:-translate-y-2" data-astro-cid-fsy2qo2c> <img src="/assets/games/img-3.png" alt="GameS Interface Hero" class="w-full max-w-[600px] h-auto object-contain filter drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]" data-astro-cid-fsy2qo2c> </a> <!-- Glow behind image --> <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-[var(--color-accent)]/20 blur-[100px] rounded-full z-0 pointer-events-none" data-astro-cid-fsy2qo2c></div> </div> </div> </div> `;
}, "/home/sebas/Porfolio/src/components/console/DocHero.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Games = createComponent(async ($$result, $$props, $$slots) => {
  const highlighter = await createHighlighter({
    themes: ["poimandres", "min-light"],
    langs: ["javascript", "typescript", "bash", "json", "yaml", "markdown", "html", "css", "python", "java", "sql", "astro", "vue", "sh", "txt", "c", "cpp", "csharp", "go", "rust"]
  });
  marked.use({
    async: false,
    pedantic: false,
    gfm: true
  });
  const response = await fetch("https://raw.githubusercontent.com/alvarosac99/GameS/main/README.md");
  let markdownContent = await response.text();
  markdownContent = markdownContent.replace(/src="docs\/screenshots\//g, 'src="https://raw.githubusercontent.com/alvarosac99/GameS/main/docs/screenshots/');
  markdownContent = markdownContent.replace(/\]\(docs\/screenshots\//g, "](https://raw.githubusercontent.com/alvarosac99/GameS/main/docs/screenshots/");
  markdownContent = markdownContent.replace(/\]\((?!http|#|mailto:)(.*?)\)/g, "](https://github.com/alvarosac99/GameS/tree/main/$1)");
  markdownContent = markdownContent.replace(/href="(?!http|#|mailto:)(.*?)"/g, 'href="https://github.com/alvarosac99/GameS/tree/main/$1"');
  const headings = [];
  const renderer = new marked.Renderer();
  renderer.heading = function(obj) {
    const rawText = obj.text;
    const depth = obj.depth;
    const innerHtml = this.parser.parseInline(obj.tokens);
    const cleanText = rawText.replace(/<[^>]*>?/gm, "").trim();
    const id = cleanText.toLowerCase().replace(/[^\w\u00C0-\u017F]+/g, "-").replace(/^-+|-+$/g, "");
    if (depth === 2 && cleanText.length > 0 && !cleanText.includes("Tabla de Contenidos")) {
      headings.push({ text: cleanText, id });
    }
    return `<h${depth} id="${id}" class="group flex whitespace-pre-wrap -ml-4 pl-4">${innerHtml}</h${depth}>
`;
  };
  renderer.code = function(obj) {
    const codeText = obj.text;
    const lang = obj.lang ? obj.lang.toLowerCase() : "";
    if (lang === "mermaid") {
      const escapedText = codeText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
      return `<div class="w-full relative my-8 bg-[var(--color-surface)] p-2 rounded-xl border border-[var(--color-stroke)] overflow-hidden"><div class="mermaid-container w-full h-[500px] flex justify-center items-center" data-src="${escapedText}"></div></div>
`;
    }
    try {
      const validLang = highlighter.getLoadedLanguages().includes(lang) ? lang : "txt";
      const highlighted = highlighter.codeToHtml(codeText, {
        lang: validLang,
        themes: { light: "min-light", dark: "poimandres" },
        defaultColor: false
      });
      return highlighted + "\n";
    } catch (e) {
      const escapedText = codeText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
      return `<pre><code>${escapedText}</code></pre>
`;
    }
  };
  marked.use({ renderer });
  const htmlContent = marked.parse(markdownContent);
  return renderTemplate(_a || (_a = __template(["", `  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    import svgPanZoom from 'https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/+esm';

    const getMermaidTheme = () => {
        const isLight = document.documentElement.getAttribute('data-theme')?.endsWith('-light');
        return isLight ? 'default' : 'dark';
    };

    const initMermaid = async () => {
        const elements = document.querySelectorAll('.mermaid-container');
        if (elements.length > 0) {
            try {
                mermaid.initialize({ 
                    startOnLoad: false, 
                    theme: getMermaidTheme(),
                    fontFamily: '"JetBrains Mono", monospace'
                });

                for (let i = 0; i < elements.length; i++) {
                    const el = elements[i];
                    const src = el.getAttribute('data-src');
                    if (!src) continue;

                    // Decode HTML entities
                    const txt = document.createElement("textarea");
                    txt.innerHTML = src;
                    const code = txt.value;

                    // Create unique ID for rendering
                    const svgId = \`mermaid-svg-\${i}-\${Date.now()}\`;
                    
                    // Render explicitly
                    const { svg, bindFunctions } = await mermaid.render(svgId, code);
                    
                    // Inject and bind
                    el.innerHTML = svg;
                    if (bindFunctions) bindFunctions(el);

                    // Re-apply PanZoom over the new SVG element
                    const newSvgNode = el.querySelector('svg');
                    if (newSvgNode) {
                        newSvgNode.style.height = "100%";
                        newSvgNode.style.width = "100%";
                        newSvgNode.style.maxWidth = "none";
                        
                        svgPanZoom(newSvgNode, {
                            zoomEnabled: true,
                            controlIconsEnabled: true,
                            fit: true,
                            center: true,
                            minZoom: 0.5,
                            maxZoom: 10
                        });
                    }
                }
            } catch (err) {
                console.error("Mermaid parsing failed:", err);
            }
        }
    };

    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                initMermaid();
            }
        });
    });

    document.addEventListener('astro:page-load', () => {
        setupIntersectionObserver();
        initMermaid();
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    });

    // Fallback if not using ViewTransitions
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupIntersectionObserver();
            initMermaid();
        });
    } else {
        setupIntersectionObserver();
        initMermaid();
    }

    function setupIntersectionObserver() {
        const links = document.querySelectorAll('.sidebar-link');
        if (!links.length) return;

        const setActive = (id) => {
            links.forEach(link => {
                link.classList.remove('text-[var(--color-accent)]', 'font-medium', 'active');
                link.classList.add('text-[#8B939F]');
                if (link.getAttribute('href') === \`#\${id}\`) {
                    link.classList.remove('text-[#8B939F]');
                    link.classList.add('text-[var(--color-accent)]', 'font-medium', 'active');
                }
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        }, { rootMargin: '-60px 0px -80% 0px' });

        document.querySelectorAll('#markdown-content h2').forEach(h2 => {
            observer.observe(h2);
        });

        // Fallback: when near the bottom of the page, activate last sidebar link
        window.addEventListener('scroll', () => {
            const scrollBottom = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            if (pageHeight - scrollBottom < 80) {
                const lastLink = links[links.length - 1];
                if (lastLink) {
                    const lastId = lastLink.getAttribute('href')?.replace('#', '');
                    if (lastId) setActive(lastId);
                }
            }
        }, { passive: true });
    }
<\/script>`], ["", `  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    import svgPanZoom from 'https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.1/+esm';

    const getMermaidTheme = () => {
        const isLight = document.documentElement.getAttribute('data-theme')?.endsWith('-light');
        return isLight ? 'default' : 'dark';
    };

    const initMermaid = async () => {
        const elements = document.querySelectorAll('.mermaid-container');
        if (elements.length > 0) {
            try {
                mermaid.initialize({ 
                    startOnLoad: false, 
                    theme: getMermaidTheme(),
                    fontFamily: '"JetBrains Mono", monospace'
                });

                for (let i = 0; i < elements.length; i++) {
                    const el = elements[i];
                    const src = el.getAttribute('data-src');
                    if (!src) continue;

                    // Decode HTML entities
                    const txt = document.createElement("textarea");
                    txt.innerHTML = src;
                    const code = txt.value;

                    // Create unique ID for rendering
                    const svgId = \\\`mermaid-svg-\\\${i}-\\\${Date.now()}\\\`;
                    
                    // Render explicitly
                    const { svg, bindFunctions } = await mermaid.render(svgId, code);
                    
                    // Inject and bind
                    el.innerHTML = svg;
                    if (bindFunctions) bindFunctions(el);

                    // Re-apply PanZoom over the new SVG element
                    const newSvgNode = el.querySelector('svg');
                    if (newSvgNode) {
                        newSvgNode.style.height = "100%";
                        newSvgNode.style.width = "100%";
                        newSvgNode.style.maxWidth = "none";
                        
                        svgPanZoom(newSvgNode, {
                            zoomEnabled: true,
                            controlIconsEnabled: true,
                            fit: true,
                            center: true,
                            minZoom: 0.5,
                            maxZoom: 10
                        });
                    }
                }
            } catch (err) {
                console.error("Mermaid parsing failed:", err);
            }
        }
    };

    const themeObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                initMermaid();
            }
        });
    });

    document.addEventListener('astro:page-load', () => {
        setupIntersectionObserver();
        initMermaid();
        themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    });

    // Fallback if not using ViewTransitions
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupIntersectionObserver();
            initMermaid();
        });
    } else {
        setupIntersectionObserver();
        initMermaid();
    }

    function setupIntersectionObserver() {
        const links = document.querySelectorAll('.sidebar-link');
        if (!links.length) return;

        const setActive = (id) => {
            links.forEach(link => {
                link.classList.remove('text-[var(--color-accent)]', 'font-medium', 'active');
                link.classList.add('text-[#8B939F]');
                if (link.getAttribute('href') === \\\`#\\\${id}\\\`) {
                    link.classList.remove('text-[#8B939F]');
                    link.classList.add('text-[var(--color-accent)]', 'font-medium', 'active');
                }
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        }, { rootMargin: '-60px 0px -80% 0px' });

        document.querySelectorAll('#markdown-content h2').forEach(h2 => {
            observer.observe(h2);
        });

        // Fallback: when near the bottom of the page, activate last sidebar link
        window.addEventListener('scroll', () => {
            const scrollBottom = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            if (pageHeight - scrollBottom < 80) {
                const lastLink = links[links.length - 1];
                if (lastLink) {
                    const lastId = lastLink.getAttribute('href')?.replace('#', '');
                    if (lastId) setActive(lastId);
                }
            }
        }, { passive: true });
    }
<\/script>`])), renderComponent($$result, "ConsoleLayout", $$ConsoleLayout, { "title": "games/ \u2014 sebas" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "TopBar", $$TopBar, {})} ${renderComponent($$result2, "DocHero", $$DocHero, {})} ${maybeRenderHead()}<div class="relative z-20 w-full flex-grow flex flex-col items-center px-0 lg:px-8"> <div class="article-reader-zone w-full max-w-7xl flex flex-col lg:flex-row gap-12 px-6 md:px-12 lg:px-16 py-12 items-start relative z-20"> <!-- Sidebar (Sticky on Desktop) --> <aside class="hidden xl:block w-[200px] flex-shrink-0 sticky top-[100px]"> <div class="flex flex-col gap-1"> <span class="font-mono text-[11px] text-[#555555] mb-2">// contenido</span> <div class="h-px bg-[var(--color-stroke)] w-full mb-1"></div> ${headings.map((heading, i) => renderTemplate`<a${addAttribute(`#${heading.id}`, "href")}${addAttribute(`sidebar-link font-mono text-xs py-1.5 transition-colors ${i === 0 ? "font-medium text-[var(--color-accent)] active" : "text-[#8B939F] hover:text-[var(--color-text)]"}`, "class")}> ${heading.text.toLowerCase()} </a>`)} </div> </aside> <main id="markdown-content" class="w-full flex-grow flex flex-col pb-12 overflow-x-auto min-w-0 prose prose-p:text-[var(--color-text-muted)] prose-headings:font-mono prose-headings:text-[var(--color-text)] prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:text-[var(--color-accent)]/80 prose-code:text-[var(--color-accent)] prose-code:bg-[var(--color-surface-dark)] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-medium prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[var(--color-surface-dark)] prose-pre:border prose-pre:border-[var(--color-stroke)] prose-hr:border-[var(--color-stroke)] prose-td:border-[var(--color-stroke)] prose-th:border-[var(--color-stroke)] prose-strong:text-[var(--color-text)] prose-ul:text-[var(--color-text-muted)] prose-li:text-[var(--color-text-muted)] max-w-none prose-table:overflow-x-auto prose-table:block w-full prose-headings:mt-6 prose-headings:mb-4 prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-hr:my-8 prose-img:rounded-xl"> ${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${unescapeHTML(htmlContent)}` })} </main> </div> </div> ${renderComponent($$result2, "DocFooter", $$DocFooter, {})} ` }));
}, "/home/sebas/Porfolio/src/pages/projects/games.astro", void 0);

const $$file = "/home/sebas/Porfolio/src/pages/projects/games.astro";
const $$url = "/projects/games";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Games,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
