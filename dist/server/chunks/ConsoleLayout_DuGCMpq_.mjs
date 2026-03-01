import { e as createComponent, m as maybeRenderHead, n as renderScript, r as renderTemplate, o as renderSlot, k as renderComponent, p as renderHead, g as addAttribute, h as createAstro } from './astro/server_DqZNW82L.mjs';
import 'piccolore';
/* empty css                         */
import 'clsx';

const $$BackgroundAnimation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<canvas id="particle-canvas" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none;"></canvas> ${renderScript($$result, "/home/sebas/Porfolio/src/components/BackgroundAnimation.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/sebas/Porfolio/src/components/BackgroundAnimation.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const $$ConsoleLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ConsoleLayout;
  const { title } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="es" class="scroll-smooth overscroll-none"> <head><meta charset="UTF-8"><meta name="description" content="Porfolio de \xC1lvaro Sebasti\xE1n Acosta"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/x-icon" href="/favicon.ico"><meta name="generator"', "><title>", "</title><!-- Anti-flash: aplicar tema guardado antes de que el navegador pinte --><script>\n			(function () {\n				const theme = localStorage.getItem('theme') || 'favorite-dark';\n				document.documentElement.setAttribute('data-theme', theme);\n			})();\n		<\/script>", '</head> <body class="text-[var(--color-text)] font-body antialiased selection:bg-[var(--color-accent)] selection:text-[var(--color-bg)]"> ', ' <div class="min-h-screen flex flex-col relative z-10"> ', " </div> </body></html>"])), addAttribute(Astro2.generator, "content"), title, renderHead(), renderComponent($$result, "BackgroundAnimation", $$BackgroundAnimation, {}), renderSlot($$result, $$slots["default"]));
}, "/home/sebas/Porfolio/src/layouts/ConsoleLayout.astro", void 0);

export { $$ConsoleLayout as $ };
