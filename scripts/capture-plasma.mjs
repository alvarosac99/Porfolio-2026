import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readdirSync, renameSync, mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlPath = 'file://' + join(__dirname, 'plasma-capture.html');
const outDir = join(__dirname, '..', 'public', 'assets', 'bg');
const tmpDir = join(__dirname, '_rec');

const W = 1280, H = 720, SECONDS = 20;

mkdirSync(outDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--ignore-gpu-blocklist', '--enable-webgl']
});
const context = await browser.newContext({
  viewport: { width: W, height: H },
  recordVideo: { dir: tmpDir, size: { width: W, height: H } }
});
const page = await context.newPage();
await page.goto(htmlPath);
await page.waitForFunction('window.__ready === true', { timeout: 15000 });
// Descarta el primer frame frío y graba el tramo estable.
await page.waitForTimeout(SECONDS * 1000);

const video = page.video();
await context.close();
await browser.close();

const src = await video.path();
const dest = join(outDir, 'plasma.webm');
renameSync(src, dest);
console.log('OK ->', dest);
console.log('rec files left:', readdirSync(tmpDir));
