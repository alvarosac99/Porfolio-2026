import { useEffect, useRef, useState } from 'react';
import LineSidebar from './LineSidebar.jsx';

const ProjectSidebar = ({ headings, accentColor = '#A855F7' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const headingsRef = useRef(headings);
  headingsRef.current = headings;

  useEffect(() => {
    const setActiveById = id => {
      const index = headingsRef.current.findIndex(h => h.id === id);
      if (index !== -1) setActiveIndex(index);
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveById(entry.target.id);
        });
      },
      { rootMargin: '-60px 0px -80% 0px' }
    );

    const targets = headings
      .map(h => document.getElementById(h.id))
      .filter(Boolean);
    targets.forEach(el => observer.observe(el));

    const handleScroll = () => {
      const scrollBottom = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (pageHeight - scrollBottom < 80) {
        setActiveIndex(headingsRef.current.length - 1);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [headings]);

  const handleItemClick = index => {
    const target = document.getElementById(headings[index]?.id);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top: y, behavior: 'smooth' });
    setActiveIndex(index);
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <span className="font-mono text-[11px] text-[#555555] mb-2">// contenido</span>
      <div className="h-px bg-[var(--color-stroke)] w-full mb-1" />
      <LineSidebar
        items={headings.map(h => h.text)}
        activeIndex={activeIndex}
        onItemClick={handleItemClick}
        accentColor={accentColor}
        textColor="#8B939F"
        markerColor="#3a3a3a"
        showIndex
        showMarker
        proximityRadius={90}
        maxShift={14}
        falloff="smooth"
        markerLength={28}
        markerGap={8}
        tickScale={0.5}
        scaleTick
        itemGap={10}
        fontSize={0.8}
        smoothing={90}
        className="project-toc-sidebar"
      />
    </div>
  );
};

export default ProjectSidebar;
