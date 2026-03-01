# Definición del Proyecto: Portfolio Personal

Este documento define las bases, estructura de información, diseño visual y funcionalidades del portfolio personal de Álvaro Sebastián Acosta, basado en el diseño conceptual.

## 1. Bases del Proyecto

El proyecto consiste en un sitio web personal tipo portfolio, diseñado para mostrar el perfil profesional, habilidades y proyectos de un desarrollador multiplataforma. La estética principal gira en torno a un concepto "tech/dev", utilizando tipografías monoespaciadas y referencias a entornos de desarrollo (terminales, código).

### Objetivos Clave
- **Presentación Profesional:** Mostrar claramente el perfil "Full Stack / Multiplataforma".
- **Identidad Visual Fuerte:** Uso de temas contrastantes (Consola vs. Claro) para reflejar versatilidad.
- **Experiencia de Usuario (UX):** Navegación fluida, diseño responsivo y micro-interacciones atractivas.

### Stack Tecnológico Sugerido (Basado en notas de diseño)
- **Frontend:** HTML5, CSS3 (Vanilla o Tailwind), JavaScript (Vanilla).
- **Animaciones:** SVG inline, Canvas API (para efecto de partículas), CSS transitions.
- **Fuentes:** Google Fonts (JetBrains Mono, IBM Plex Mono).

---

## 2. Arquitectura de la Información

El contenido se estructura en una sola página (One Page) con secciones claramente definidas, facilitando el escaneo rápido de la información.

### Secciones Principales
1.  **Header (Cabecera):**
    *   Logo/Marca personal.
    *   Navegación (Menú links o Icono hamburguesa en móvil).
2.  **Hero Section (Inicio):**
    *   Saludo: "> hola, soy".
    *   Nombre: "Álvaro Sebastián Acosta".
    *   Rol: "Desarrollador Multiplataforma".
    *   Descripción corta: Pasión por Linux, Docker, servidores y desarrollo web.
    *   Imagen/Visual: Composición gráfica o foto.
3.  **Stats (Estadísticas):**
    *   Contadores rápidos (ej. Años de experiencia, Proyectos, etc. - *contenido placeholder en diseño*).
4.  **Proyectos (Projects):**
    *   Grid de tarjetas de proyectos destacados.
5.  **Experiencia (Experience):**
    *   Línea de tiempo o lista de roles previos.
6.  **Aptitudes (Skills):**
    *   Categorías: Lenguajes, Sistemas, Herramientas, Habilidades personales.
7.  **Educación (Education):**
    *   Tarjetas con formación académica.
8.  **Contacto (Contact CTA):**
    *   Llamada a la acción clara: "¿trabajamos juntos?".
    *   Correo electrónico visible: `sebas@zenithseed.dev`.
    *   Botones de redes sociales.
9.  **Footer (Pie de página):**
    *   Copyright, enlaces legales o repetición de redes.

---

## 3. Temas y Diseño Visual

El diseño cuenta con un sistema de temas dual, permitiendo al usuario alternar entre una estética oscura (default) y una clara.

### Tipografía
El uso de fuentes monoespaciadas es constante para reforzar la identidad de "desarrollador".
-   **Títulos / Acentos:** `JetBrains Mono` (Bold).
-   **Cuerpo / Textos:** `IBM Plex Mono` (Regular/Light).

### Tema Consola (Dark Mode)
Inspirado en IDEs y terminales modernas.
-   **Fondo:** Tonos muy oscuros (`#0C0C0C`, `#0E0C10`, `#141414`).
-   **Acentos:**
    -   Turquesa/Verde menta (`#00D4AA`).
    -   Naranja vibrante (`#FF7A42`).
-   **Texto:** Blanco (`#FAFAFA`) y Gris azulado (`#8B939F`).
-   **Bordes/Líneas:** Gris oscuro sutil (`#1E2028`).

### Tema Claro (Light Mode)
Una versión limpia y minimalista, manteniendo la estructura.
-   **Fondo:** Blancos y cremas (`#FFFFFF`, `#FAF8F6`, `#F0ECE8`).
-   **Acentos:**
    -   Naranja quemado (`#E8612A`).
-   **Texto:** Negro suave (`#1A1118`) y Gris topo (`#6B5F65`).
-   **Bordes/Líneas:** Gris claro (`#D8D0D5`).

---

## 4. Funcionalidades de la Página

### 4.1. Navegación Responsiva
-   **Desktop:** Barra de navegación superior fija o estática.
-   **Móvil:** Header simplificado con botón "Hamburguesa" (`≡`) que despliega un **Menú Overlay** a pantalla completa (con botón de cierre `✕`, enlaces y redes sociales).

### 4.2. Cambio de Tema (Theme Switcher)
-   Capacidad de alternar instantáneamente entre el Tema Consola y el Tema Claro.
-   Persistencia de la preferencia del usuario (localStorage).

### 4.3. Formulario de Contacto (Overlay/Modal)
-   Un componente interactivo para "Enviar correo".
-   Campos: Nombre, Asunto, Mensaje.
-   Feedback visual al enviar.

### 4.4. Animación de Fondo (Concepto)
-   **Efecto:** "Particle Constellation". Red de partículas que reacciona al movimiento del cursor.
-    **Tecnología:** SVG o Canvas.
-   **Comportamiento:** Las partículas se conectan cuando están cerca, creando formas geométricas dinámicas.

### 4.5. Micro-interacciones
-   **Hover effects:** Cambios de color/borde en tarjetas de proyectos y botones.
-   **Cursor:** Posibilidad de un cursor personalizado o efectos reactivos (según el concepto de partículas).

### 4.6. Historial de Ajustes recientes
- Se modificó el padding (añadiendo sm:px-8 md:px-10) y el ancho máximo (`max-w-*`) en los textos de las tarjetas de la sección de Proyectos (`ConsoleProjects.astro`). Esto permite que el texto fluya libremente y se adapte al tamaño de cada tarjeta, solucionando el problema del texto pegado a la izquierda.
- Se ha integrado en el proyecto "01 games/ — proyecto fin de curso" la gráfica completa de GameS, reemplazando el texto predeterminado por una composición interactiva con las imágenes (fondo animado con mezcla de imagen de fuego, logotipo interno de la 'S' difuminado de fondo y el título plateado GAMES de la plataforma).
- Se ha sustituido la miniatura del proyecto "02 servidor vps/" para implementar un **efecto parallax 3D**: la base de la tarjeta está compuesta por una textura técnica de alta gama de fibra de carbono oscura iluminada y, flotando por encima (mediante un filtro `mix-blend-screen`), el texto "ZENITH SEED" simulando un brillante código de terminal neón aislado de su fondo de color puro. De esta manera, lograr un efecto interactivo espectacular donde al pasar el ratón (hover) y ganar el foco, **el fondo de carbono retrocede y el texto se acerca físicamente al usuario** proyectando un efecto hiperrealista de profundidad sin perder el diseño de código y consola que te gusta.
- Se ha actualizado profundamente la miniatura del proyecto "03 minecraft_server/" unificándola técnica y artísticamente al nivel del VPS implementando un **efecto parallax 3D Minecraft nativo en enjambre denso**. El fondo principal se ha re-diseñado a un sutilmente luminoso (pero oscuro) paisaje nocturno de Minecraft, más natural y bonito que el antiguo muro abstracto, pero manteniendo la perfecta contrapuerta para dejar brillar a los sprites. Flotando por delante (gracias a código HTML) se ha programado **una invasión masiva ocupando el 100% de los bordes mediante ítems originarios del CDN público de la comunidad organizados matemáticamente en cuadrícula**. Al pasar el cursor se aplican **multiplicadores matemáticos de dilatación espaciales individuales (hover math)** junto con duraciones asíncronas diferentes en cada uno. La brillante espada crece un `1.4x`, una gota de redstone un `2.5x` salta agresiva, un cuarzo gira al lado contrario o las botellas de experiencia se alzan, entre decenas de otros objetos vivos. Todo orquestado con estricto anti-aliasing pixelado para lucir en máxima HD retro premium. Sin opacidad artificial limitante.
- Se ha aumentado sustancialmente la escala visual de la sección "**Aptitudes**" (`ConsoleSkills.astro`). Anteriormente todo era muy compacto (`text-[13px]`); ahora los textos de código, las cajas de herramientas y los logotipos SVG han sigo agrandados un 30% usando variantes responsivas de TailwindCSS (`md:text-[15px]`, `w-6 h-6`, padding y márgenes más extensos) y ajustando la cuadrícula padre matemáticamente a un sistema balanceado XL `lg:grid-cols-[1.5fr_1fr]`. Ahora llena mucha más pantalla en ordenadores y su legibilidad es gigantesca y cómoda.
- Se reparó la navegación intra-página (anchors) para todas las secciones saltando desde el Header (Aptitudes, Experiencia, etc). Al aumentar las escalas e incluir un Head de navegación *sticky* siempre fijo al tope de la ventana, al hacer click en un enlace la cabecera del destino se ocultaba solapada por debajo de la navegación. Para arreglarlo definitivamente se introdujo `scroll-padding-top: 80px` e interpolación cinemática `scroll-behavior: smooth` de forma global al documento por medio de css puro (`global.css`).
- Se rediseñó por completo el Responsive horizontal general para reparar un grave problema visual detectado en dispositivos de tamaño medio (tabletas, portátiles antiguos y ventanas cuadradas). El fallo consistía en que *todas* las secciones forzaban un agónico padding de 120px `md:px-[120px]` al activar el breakpoint de 768px, aplastando todo el contenido en pantallas donde dicho ancho era excesivo. Esta instrucción destructiva se ha sustituido por un sistema de relleno fluido por escalones en cascada para 8 componentes distintos: `md:px-10` (al pasar de móviles de manera suave), `lg:px-20` (tablets grandes apaisadas) y recuperando `xl:px-[120px]` (para monitores gigantes ultrawide). La web ahora abraza sin colapsar el 100% de los anchos intermedios.
- Se ha diseñado, maquetado e incorporado la **página de detalle perfecta para el proyecto GameS (`games.astro`)**, estructurada estrictamente a partir de su documentación técnica (en GitHub y `README.md`). Esta nueva landing independiente incluye su propia barra de navegación estática, una cabecera hero (`DocHero.astro`) descriptiva con stack de tecnologías y todo el cuerpo argumentativo (`Content.astro`) documentando minuciosamente: Características (API externa IGDB, caché Redis), Instalación en Docker, Uso y una renovada Galería de UI/UX implementando las imágenes importadas (`img-1`, `img-2`, `img-3`) de una forma vistosa e interactiva. Y, por supuesto, la tarjeta 3D de Games en el frontal principal de tu Portfolio ahora tiene la url enlazada (`<a href>`) y apunta directamente hacia esta nueva página.
- Se ha corregido un problema de alineación general en el visor de proyectos (`games.astro`) donde el plugin Typography de Tailwind (`prose`) anulaba los atributos HTML nativos `align="center"` procedentes del archivo Markdown interpretado. Ahora, los textos, contenedores flex (insignias y badges), imágenes y tablas que requieran esta alineación específica se muestran perfectamente centrados en pantalla respetando rigurosamente el diseño documental original.
- Se rediseñó exhaustivamente la cabecera (Hero) del proyecto GameS (`DocHero.astro`) empleando una composición visual premium interactiva. El fondo usa `img-2.jpg` desenfocada e interpolada con `mix-blend-mode` que se funde en un degradado suave hacia abajo, mientras que en primer plano flota a la derecha la interfaz interactiva extraída (`img-3.png`) arropada por una intensa sombra reactiva flotante con animación infinita (`animate-[float_6s]`). Esta maquetación da un impacto profundo nada más aterrizar en los detalles. 
- Se revirtió la física de repulsión de las partículas en el `BackgroundAnimation.astro` para preservar su orgánico estado original. En su lugar, se adoptó una solución estructural mucho más óptima a nivel computacional y visual por solicitud estricta del flujo de trabajo: **se ha separado la zona lectora del envoltorio gráfico en el visor `games.astro`**. A todo el cuerpo del Markdown y su Sidebar se les ha proporcionado un fondo arquitectónico opaco global (clase envolvente `.article-reader-zone` atada nativamente a la variable de color en uso `var(--color-bg)`). De esta manera, el enjambre y fondo inmersivo bailan libremente en el Hero y el borde superior, pero son opacados completamente y sin interrumpir durante la lectura en scroll asegurando una limpieza inmaculada sin que el usuario deba preocuparse de lo que ocurre detrás del folio.
- Se resolvió un error de visibilidad con los colores y la tipografía en la lectura de Markdown del visor de proyectos (`games.astro`). Se reestructuraron los atributos quemados por clases relativas dinámicas (`var(--color-text)`) para forzar al texto y a los bloques de código base a comulgar con los perfiles y paletas de color claros cuando el usuario elige el "*Tema Claro*". Al reaccionar bajo el trigger `html[data-theme$="-light"]`, se implementó además un filtro que invierte automáticamente el color de los logos `iconify` blancos para que se sigan leyendo claramente sobre los fondos crema de la interfaz diurna.
