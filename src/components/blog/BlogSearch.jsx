import { useEffect, useRef, useState } from 'react';

export default function BlogSearch({ posts }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const trigger = document.getElementById('blog-search-trigger');
    const open = () => setIsOpen(true);
    trigger?.addEventListener('click', open);

    const onKeyDown = e => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
      if (isCmdK) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      trigger?.removeEventListener('click', open);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const results = q
    ? posts.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      )
    : posts;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-start justify-center pt-[12vh] px-5"
      style={{ background: 'rgba(26, 21, 16, 0.55)' }}
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-[560px] bg-[var(--blog-paper-raised)] border border-[var(--blog-hairline)] max-h-[70vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--blog-hairline)]">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--blog-ink-muted)] flex-shrink-0">
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar artículos..."
            className="flex-1 bg-transparent outline-none text-[16px] placeholder:text-[var(--blog-ink-muted)]"
          />
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar búsqueda"
            className="text-[13px] font-semibold text-[var(--blog-ink-muted)] hover:text-[var(--blog-ink)] border border-[var(--blog-hairline)] px-1.5 py-0.5"
          >
            esc
          </button>
        </div>

        <div className="overflow-y-auto">
          {results.length === 0 && (
            <p className="px-4 py-6 text-[14px] text-[var(--blog-ink-muted)]">Sin resultados para "{query}".</p>
          )}
          {results.map(post => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex flex-col gap-1 px-4 py-3 border-b border-[var(--blog-hairline)] last:border-b-0 hover:bg-[var(--blog-paper)] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wide text-[var(--blog-accent)]">{post.category}</span>
                <span className="text-[13px] text-[var(--blog-ink-muted)]">{post.dateLabel}</span>
              </div>
              <span className="text-[16px] font-semibold leading-snug">{post.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
