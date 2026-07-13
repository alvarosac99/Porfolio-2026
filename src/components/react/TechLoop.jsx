import LogoLoop from './LogoLoop';

const techLogos = [
  { src: '/icons/devicon/python.svg', alt: 'Python', title: 'Python' },
  { src: '/icons/devicon/django.svg', alt: 'Django', title: 'Django' },
  { src: '/icons/devicon/react.svg', alt: 'React', title: 'React' },
  { src: '/icons/devicon/php.svg', alt: 'PHP', title: 'PHP' },
  { src: '/icons/devicon/mysql.svg', alt: 'SQL', title: 'SQL' },
  { src: '/icons/devicon/javascript.svg', alt: 'JavaScript', title: 'JavaScript' },
  { src: '/icons/devicon/html5.svg', alt: 'HTML/CSS', title: 'HTML/CSS' },
  { src: '/icons/devicon/java.svg', alt: 'Java', title: 'Java' },
  { src: '/icons/devicon/linux.svg', alt: 'Linux', title: 'Linux' },
  { src: '/icons/devicon/docker.svg', alt: 'Docker', title: 'Docker' },
  { src: '/icons/devicon/nginx.svg', alt: 'Nginx', title: 'Nginx' },
  { src: '/icons/devicon/cloudflare.svg', alt: 'Cloudflare', title: 'Cloudflare' }
];

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
