import LogoLoop from './LogoLoop';

const TECH_OPINIONS = {
  Python:
    'python es el lenguaje con el que más scripts he escrito. me sirve tanto para probar cosas rápido como para levantar proyectos complejos en el trabajo.',
  Django:
    'con django empecé a programar en serio, fue la base de GameS, mi proyecto de fin de curso. no lo he vuelto a usar desde entonces, pero le tengo cariño.',
  React:
    'react me gusta mucho, es el foco de muchos proyectos y tiene una comunidad enorme detrás. me resulta sencillo montar páginas bonitas y con sentido.',
  PHP: 'php lo aprendí a las malas, arreglando y ampliando funcionalidades de proyectos antiguos que ya funcionaban en alguna empresa.',
  SQL: 'sql fue la base de mis estudios en dam. preparar querys es como resolver un puzle, de hecho hay videojuegos enteros sobre escribir querys y son muy divertidos.',
  JavaScript:
    'javascript, html, css y typescript los meto en el mismo saco: el stack por defecto para entender cómo funciona una aplicación web.',
  'HTML/CSS':
    'javascript, html, css y typescript los meto en el mismo saco: el stack por defecto para entender cómo funciona una aplicación web.',
  TypeScript:
    'typescript entra en el mismo saco que javascript, html y css. eso sí, hoy por hoy es el que más uso: con react tiene mucho más sentido para mí.',
  Java: 'al principio odié java, se me complicó bastante en clase. con el tiempo le vi la gracia: sigue siendo la base de mucho software útil y agradezco haberlo tenido como lenguaje principal en mis estudios.',
  Linux:
    'linux al principio asustaba. probé mint y me enamoré, luego roté por distros ligeras y especializadas. ahora ando con arch, aunque sé que siempre habrá una distro nueva que probar, o incluso crear.',
  Docker:
    'docker me encanta. aísla y empaqueta las dependencias de proyectos grandes en contenedores, y la cantidad de imágenes ya creadas por la comunidad lo hace imprescindible si te gusta trastear.',
  Nginx:
    'nginx es la pieza que pongo delante de mis servidores: sirve estático, hace de proxy inverso y deja el resto del stack respirando tranquilo.',
  Cloudflare:
    'cloudflare me parece genial, sobre todo su plan gratuito. permite a cualquiera dar sus primeros pasos desplegando páginas web sin gastar apenas nada.'
};

const techLogos = [
  { src: '/icons/devicon/python.svg', alt: 'Python', title: 'Python' },
  { src: '/icons/devicon/django.svg', alt: 'Django', title: 'Django' },
  { src: '/icons/devicon/react.svg', alt: 'React', title: 'React' },
  { src: '/icons/devicon/php.svg', alt: 'PHP', title: 'PHP' },
  { src: '/icons/devicon/mysql.svg', alt: 'SQL', title: 'SQL' },
  { src: '/icons/devicon/javascript.svg', alt: 'JavaScript', title: 'JavaScript' },
  { src: '/icons/devicon/typescript.svg', alt: 'TypeScript', title: 'TypeScript' },
  { src: '/icons/devicon/html5.svg', alt: 'HTML/CSS', title: 'HTML/CSS' },
  { src: '/icons/devicon/java.svg', alt: 'Java', title: 'Java' },
  { src: '/icons/devicon/linux.svg', alt: 'Linux', title: 'Linux' },
  { src: '/icons/devicon/docker.svg', alt: 'Docker', title: 'Docker' },
  { src: '/icons/devicon/nginx.svg', alt: 'Nginx', title: 'Nginx' },
  { src: '/icons/devicon/cloudflare.svg', alt: 'Cloudflare', title: 'Cloudflare' }
].map(logo => ({
  ...logo,
  onClick: () => {
    window.dispatchEvent(
      new CustomEvent('tech-select', {
        detail: { name: logo.title, opinion: TECH_OPINIONS[logo.title] }
      })
    );
  }
}));

export default function TechLoop() {
  return (
    <LogoLoop
      logos={techLogos}
      speed={60}
      direction="left"
      logoHeight={56}
      gap={48}
      hoverSpeed={0}
      scaleOnHover
      fadeOut
      fadeOutColor="var(--color-surface)"
      ariaLabel="Tecnologías"
    />
  );
}
