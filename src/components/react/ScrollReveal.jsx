import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  textClassName = '',
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom',
  as: Tag = 'div'
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span className="word" key={index}>
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const wordElements = el.querySelectorAll('.word');

      if (prefersReducedMotion) {
        gsap.set(el, { rotate: 0 });
        gsap.set(wordElements, { opacity: 1, filter: 'blur(0px)' });
        return;
      }

      // Revelado de una sola vez al entrar en viewport (no ligado al scroll
      // continuo con scrub): con islas de Astro hidratando en momentos
      // distintos, el alto de página cambia después de crear el ScrollTrigger
      // y un scrub con start/end pegados a "bottom bottom" se queda con
      // offsets obsoletos y el texto no llega a revelarse nunca.
      gsap.set(wordElements, { opacity: baseOpacity, filter: enableBlur ? `blur(${blurStrength}px)` : 'none' });
      gsap.set(el, { transformOrigin: '0% 50%', rotate: baseRotation });

      gsap.to(el, {
        rotate: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, scroller, start: 'top 90%', once: true }
      });

      gsap.to(wordElements, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        stagger: 0.04,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, scroller, start: 'top 90%', once: true }
      });

      const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(refreshId);
    }, el);

    return () => ctx.revert();
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, blurStrength]);

  return (
    <Tag ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <p className={`scroll-reveal-text ${textClassName}`}>{splitText}</p>
    </Tag>
  );
};

export default ScrollReveal;
