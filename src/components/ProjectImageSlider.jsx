import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './ProjectImageSlider.css';

const SLIDE_MS = 5000;
const CROSSFADE_MS = 1400;

export default function ProjectImageSlider({
  images,
  alt,
  variant = 'card',
  objectFit = 'cover',
  className = '',
}) {
  const slides = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [failedSrc, setFailedSrc] = useState(() => new Set());
  const [inView, setInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setFailedSrc(new Set());
    setIndex(0);
  }, [images]);

  useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.15, rootMargin: '120px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (index >= slides.length) setIndex(0);
  }, [index, slides.length]);

  useEffect(() => {
    if (!inView || paused || reduceMotion || slides.length <= 1) return undefined;
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [inView, paused, reduceMotion, slides.length]);

  const kenBurnsClass = useCallback(
    (i) => `project-slider__ken-burns project-slider__ken-burns--${(i % 3) + 1}`,
    [],
  );

  if (slides.length === 0) return null;

  const single = slides.length === 1;
  const motionReady = variant === 'hero' && inView && !reduceMotion;

  return (
    <div
      ref={containerRef}
      className={`project-slider project-slider--${variant} ${className}`.trim()}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((src, i) => {
        if (failedSrc.has(src)) return null;
        const active = i === index;
        return (
          <div
            key={`${src}-${i}`}
            className={`project-slider__slide ${active ? 'project-slider__slide--active' : ''}`}
            style={{ transitionDuration: `${CROSSFADE_MS}ms` }}
            aria-hidden={!active}
          >
            <img
              src={src}
              alt={active ? alt : ''}
              loading={i === 0 ? 'eager' : 'lazy'}
              decoding="async"
              draggable={false}
              className={`project-slider__img project-slider__img--${objectFit}${
                motionReady && active ? ` ${kenBurnsClass(i)}` : ''
              }${motionReady && single && active ? ' project-slider__ken-burns project-slider__ken-burns--1' : ''}`}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              onError={() => {
                setFailedSrc((prev) => {
                  const next = new Set(prev);
                  next.add(src);
                  if (active) {
                    setIndex((current) => {
                      for (let step = 1; step <= slides.length; step += 1) {
                        const candidate = (current + step) % slides.length;
                        if (!next.has(slides[candidate])) return candidate;
                      }
                      return current;
                    });
                  }
                  return next;
                });
              }}
            />
          </div>
        );
      })}

      {motionReady && (
        <div className="project-slider__shimmer" aria-hidden>
          <div className="project-slider__shimmer-bar" />
        </div>
      )}

      <div className="project-slider__gradient" aria-hidden />

      {slides.length > 1 && (
        <>
          <div className="project-slider__dots" aria-hidden>
            {slides.map((_, i) => (
              <span
                key={i}
                className={`project-slider__dot ${i === index ? 'project-slider__dot--active' : ''}`}
              />
            ))}
          </div>
          {variant === 'hero' && (
            <div className="project-slider__counter" aria-hidden>
              {index + 1} / {slides.length}
            </div>
          )}
        </>
      )}
    </div>
  );
}
