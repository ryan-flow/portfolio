import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function readingLine(stage: HTMLElement) {
  const viewport = window.innerHeight;
  if (window.matchMedia('(min-width: 860px)').matches) return viewport * 0.525;
  const bottom = parseFloat(getComputedStyle(stage).top) + stage.offsetHeight;
  return bottom + Math.max(0, viewport - bottom) * 0.42;
}

export function mountProjectMotion(section: HTMLElement, stage: HTMLElement, rail: HTMLElement, setActive: (index: number) => void) {
  const cards = Array.from(rail.querySelectorAll<HTMLElement>('[data-card]'));
  const panels = Array.from(stage.querySelectorAll<HTMLElement>('[data-project-panel]'));
  const media = gsap.matchMedia();
  media.add({
    gallery: '(min-height: 560px)',
    reduced: '(prefers-reduced-motion: reduce)',
    desktop: '(min-width: 860px)',
  }, ctx => {
    if (!ctx.conditions?.gallery) return;
    if (!ctx.conditions.reduced) section.dataset.projectMotion = 'true';

    const syncSelection = () => {
      const line = readingLine(stage);
      const next = cards.findIndex(card => card.getBoundingClientRect().top > line);
      setActive(next < 0 ? cards.length - 1 : Math.max(0, next - 1));
    };

    if (!ctx.conditions.reduced) {
      // 下一幅从下边缘进入，短距离倾转后回到正面。上滚时由同一时间线反播。
      panels.slice(1).forEach((panel, i) => {
        const visual = panel.firstElementChild;
        const range = () => Math.min(105, window.innerHeight * 0.105);
        const timeline = gsap.timeline({
          defaults: { duration: 1, ease: 'none' },
          scrollTrigger: {
            trigger: cards[i + 1],
            start: () => 'top ' + (readingLine(stage) + range()) + 'px',
            end: () => 'top ' + (readingLine(stage) - range()) + 'px',
            scrub: 0.12, invalidateOnRefresh: true,
          },
        });
        timeline.fromTo(panel, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }, 0);
        if (visual) timeline.fromTo(visual, { rotationX: -7, yPercent: 4, scale: 1.035 }, { rotationX: 0, yPercent: 0, scale: 1 }, 0);
      });
    }
    ScrollTrigger.create({
      trigger: section, start: 'top bottom', end: 'bottom top',
      onUpdate: syncSelection, onRefresh: syncSelection,
    });
    syncSelection();

    // 问答区展开、字体载入或窗口变化后，重新测量作品所处的文档位置。
    let frame = 0;
    let lastLayout = '';
    const observer = new ResizeObserver(() => {
      const layout = [rail.getBoundingClientRect().top + window.scrollY, rail.offsetHeight, stage.offsetHeight, rail.clientWidth].join(',');
      if (layout === lastLayout) return;
      lastLayout = layout;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(section.parentElement ?? section);
    observer.observe(stage);
    observer.observe(rail);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      delete section.dataset.projectMotion;
    };
  });
  return () => media.revert();
}
