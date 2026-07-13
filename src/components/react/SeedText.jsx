// Wordmark "esculpido" en glifos: una malla 3D con el nombre pintado como textura,
// deformada por una onda suave y re-muestreada a una rejilla de caracteres tipo
// terminal. Inspirado en el efecto ASCII de codepen.io/JuanFuentes/pen/eYEeoyE,
// pero reescrito con un charset propio de "semilla/código" y coloreado con el
// acento activo del sitio en vez de un degradado arcoíris fijo.
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './SeedText.css';

const vertexShader = `
varying vec2 vUv;
uniform float uTime;
uniform float uEnableWaves;

void main() {
    vUv = uv;
    float time = uTime * 3.5;
    float wave = uEnableWaves;

    vec3 transformed = position;
    transformed.x += sin(time * 0.6 + position.y * 1.4) * 0.22 * wave;
    transformed.y += cos(time * 0.5 + position.x * 1.1) * 0.08 * wave;
    transformed.z += sin(time * 0.4 + position.x * 0.8) * 0.35 * wave;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;

void main() {
    float time = uTime;
    vec2 pos = vUv;
    float r = texture2D(uTexture, pos + vec2(sin(time * 0.7 + pos.y * 6.0) * 0.006, 0.0)).r;
    float g = texture2D(uTexture, pos).g;
    float b = texture2D(uTexture, pos - vec2(sin(time * 0.7 + pos.y * 6.0) * 0.006, 0.0)).b;
    float a = texture2D(uTexture, pos).a;
    gl_FragColor = vec4(r, g, b, a);
}
`;

const map = (n, start, stop, start2, stop2) => ((n - start) / (stop - start)) * (stop2 - start2) + start2;
const PX_RATIO = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;

// Charset propio: arranca "vacío" y termina en el glifo más denso, con símbolos
// de código/semilla en vez de la rampa clásica de ASCII art.
const SEED_CHARSET = ' .`,:;+*<>[]{}/\\|01#%@';

class GlyphFilter {
  constructor(renderer, { fontSize, fontFamily, charset, colorStops } = {}) {
    this.renderer = renderer;
    this.domElement = document.createElement('div');
    Object.assign(this.domElement.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%'
    });

    this.pre = document.createElement('pre');
    // Tramos de color duros (no degradado difuso): cada palabra conserva su
    // propio color plano, como en el wordmark original de dos tonos.
    this.pre.style.backgroundImage = `linear-gradient(90deg, ${colorStops})`;
    this.domElement.appendChild(this.pre);

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.domElement.appendChild(this.canvas);

    this.fontSize = fontSize ?? 10;
    this.fontFamily = fontFamily ?? "'JetBrains Mono', monospace";
    this.charset = charset ?? SEED_CHARSET;

    this.context.imageSmoothingEnabled = false;
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this.renderer.setSize(width, height);
    this.reset();
  }

  reset() {
    this.context.font = `${this.fontSize}px ${this.fontFamily}`;
    const charWidth = this.context.measureText('A').width;

    this.cols = Math.floor(this.width / charWidth);
    this.rows = Math.floor(this.height / this.fontSize);

    this.canvas.width = this.cols;
    this.canvas.height = this.rows;

    Object.assign(this.pre.style, {
      fontFamily: this.fontFamily,
      fontSize: `${this.fontSize}px`,
      margin: '0',
      padding: '0',
      lineHeight: '1em',
      position: 'absolute',
      left: '0',
      top: '0',
      zIndex: '9',
      backgroundAttachment: 'fixed',
      WebkitTextFillColor: 'transparent',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      userSelect: 'none'
    });
  }

  render(scene, camera) {
    this.renderer.render(scene, camera);

    const w = this.canvas.width;
    const h = this.canvas.height;
    if (!w || !h) return;

    this.context.clearRect(0, 0, w, h);
    this.context.drawImage(this.renderer.domElement, 0, 0, w, h);
    this.asciify(w, h);
  }

  asciify(w, h) {
    const imgData = this.context.getImageData(0, 0, w, h).data;
    let str = '';
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (x + y * w) * 4;
        const a = imgData[i + 3];
        if (a === 0) {
          str += ' ';
          continue;
        }
        const gray = (0.3 * imgData[i] + 0.6 * imgData[i + 1] + 0.1 * imgData[i + 2]) / 255;
        const idx = Math.floor(gray * (this.charset.length - 1));
        str += this.charset[idx];
      }
      str += '\n';
    }
    this.pre.textContent = str;
  }
}

class TextTexture {
  constructor(txt, { fontSize = 200, fontFamily = 'JetBrains Mono' } = {}) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.txt = txt;
    this.font = `700 ${fontSize}px ${fontFamily}`;
  }

  resize() {
    this.context.font = this.font;
    const metrics = this.context.measureText(this.txt);
    this.canvas.width = Math.ceil(metrics.width) + 24;
    this.canvas.height = Math.ceil(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent) + 24;
  }

  render() {
    const ctx = this.context;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.font = this.font;
    const metrics = ctx.measureText(this.txt);
    ctx.fillText(this.txt, 12, 12 + metrics.actualBoundingBoxAscent);
  }
}

class Scene3D {
  constructor({ text, glyphSize, planeHeight, enableWaves, colorStops, textFontSize }, container, width, height) {
    this.container = container;
    this.width = width;
    this.height = height;
    this.enableWaves = enableWaves;

    this.camera = new THREE.PerspectiveCamera(42, width / height, 1, 1000);
    this.camera.position.z = 26;
    this.scene = new THREE.Scene();
    this.mouse = { x: width / 2, y: height / 2 };

    this.textTexture = new TextTexture(text, { fontSize: textFontSize });
    this.textTexture.resize();
    this.textTexture.render();

    this.texture = new THREE.CanvasTexture(this.textTexture.canvas);
    this.texture.minFilter = THREE.NearestFilter;

    const aspect = this.textTexture.canvas.width / this.textTexture.canvas.height;
    this.planeWidth = planeHeight * aspect;
    this.planeHeight = planeHeight;
    const geometry = new THREE.PlaneGeometry(this.planeWidth, this.planeHeight, 40, 40);
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: this.texture },
        uEnableWaves: { value: enableWaves ? 1.0 : 0.0 }
      }
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setClearColor(0x000000, 0);

    this.filter = new GlyphFilter(this.renderer, {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: glyphSize,
      charset: SEED_CHARSET,
      colorStops
    });

    this.container.appendChild(this.filter.domElement);
    this.setSize(width, height);

    this.onMouseMove = this.onMouseMove.bind(this);
    this.container.addEventListener('mousemove', this.onMouseMove);
    this.container.addEventListener('touchmove', this.onMouseMove);
  }

  // Aleja la cámara lo justo para que el plano quepa entero en el frustum
  // (ancho y alto), con un margen. Sin esto, textos/anchos grandes o
  // contenedores estrechos recortan los extremos por los planos de recorte
  // de la cámara en perspectiva.
  fitCamera() {
    const padding = 1.18;
    const fovRad = (this.camera.fov * Math.PI) / 180;
    const zForHeight = (this.planeHeight * padding) / (2 * Math.tan(fovRad / 2));
    const zForWidth = (this.planeWidth * padding) / (2 * Math.tan(fovRad / 2) * this.camera.aspect);
    this.camera.position.z = Math.max(zForHeight, zForWidth, 1);
  }

  setSize(w, h) {
    this.width = w;
    this.height = h;
    this.camera.aspect = w / h;
    this.fitCamera();
    this.camera.updateProjectionMatrix();
    this.filter.setSize(w, h);
  }

  onMouseMove(evt) {
    const e = evt.touches ? evt.touches[0] : evt;
    const bounds = this.container.getBoundingClientRect();
    this.mouse = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
  }

  animate() {
    const loop = () => {
      this.raf = requestAnimationFrame(loop);
      this.render();
    };
    loop();
  }

  render() {
    const time = performance.now() * 0.001;
    this.mesh.material.uniforms.uTime.value = time;

    const rx = map(this.mouse.y, 0, this.height, 0.22, -0.22);
    const ry = map(this.mouse.x, 0, this.width, -0.22, 0.22);
    this.mesh.rotation.x += (rx - this.mesh.rotation.x) * 0.04;
    this.mesh.rotation.y += (ry - this.mesh.rotation.y) * 0.04;

    this.filter.render(this.scene, this.camera);
  }

  dispose() {
    cancelAnimationFrame(this.raf);
    this.container.removeEventListener('mousemove', this.onMouseMove);
    this.container.removeEventListener('touchmove', this.onMouseMove);
    if (this.filter?.domElement.parentNode) {
      this.container.removeChild(this.filter.domElement);
    }
    this.scene.traverse(obj => {
      if (obj.isMesh) {
        obj.geometry.dispose();
        obj.material.dispose();
      }
    });
    this.texture.dispose();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
  }
}

export default function SeedText({
  text = 'ZenithSeed',
  splitAt = 6, // "Zenith" (6) | "Seed" (4): frontera entre los dos colores planos
  glyphSize = 6,
  planeHeight = 9,
  textFontSize = 240,
  enableWaves = true,
  colorFrom = 'var(--color-text)',
  colorTo = 'var(--color-accent)'
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);

  const cut = ((splitAt / text.length) * 100).toFixed(2);
  const colorStops = `${colorFrom} 0%, ${colorFrom} ${cut}%, ${colorTo} ${cut}%, ${colorTo} 100%`;

  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;
    let ro = null;

    const setup = async () => {
      try {
        await document.fonts.load(`700 ${textFontSize}px "JetBrains Mono"`);
      } catch {
        /* fuente aún no lista, seguimos con fallback del sistema */
      }
      if (cancelled || !containerRef.current) return;

      const { width, height } = containerRef.current.getBoundingClientRect();
      if (width === 0 || height === 0) return;

      sceneRef.current = new Scene3D({ text, glyphSize, planeHeight, enableWaves, colorStops, textFontSize }, containerRef.current, width, height);
      sceneRef.current.animate();

      ro = new ResizeObserver(entries => {
        const entry = entries[0];
        if (!entry || !sceneRef.current) return;
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) sceneRef.current.setSize(w, h);
      });
      ro.observe(containerRef.current);
    };

    setup();

    return () => {
      cancelled = true;
      ro?.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, [text, glyphSize, planeHeight, textFontSize, enableWaves, colorStops]);

  return <div ref={containerRef} className="seed-text-container" />;
}
