import { useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { Container, IconButton } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LaunchIcon from '@mui/icons-material/Launch';
import { repos, type Repo } from '../data/repos';
import './projects.css';

function ProjectVisual({ repo, decorative = false }: { repo: Repo; decorative?: boolean }) {
  if (repo.image) {
    return <img src={import.meta.env.BASE_URL + repo.image.replace(/^\//, '')}
      alt={decorative ? '' : repo.imageAlt} loading="lazy" decoding="async" />;
  }
  return (
    <ol className="project-workflow" aria-label="立减金处理流程">
      {repo.steps?.map(step => <li key={step}>{step}</li>)}
    </ol>
  );
}

function scrollToProject(card: HTMLElement, stage: HTMLElement, enhanced: boolean, behavior: ScrollBehavior) {
  const copy = card.querySelector<HTMLElement>('.project-copy');
  if (!enhanced || !copy) {
    card.scrollIntoView({ block: 'start', behavior });
    return;
  }
  const stageTop = parseFloat(getComputedStyle(stage).top);
  const copyTop = window.matchMedia('(min-width: 860px)').matches
    ? stageTop + Math.max(12, (stage.querySelector('.project-stage-art')!.clientHeight - copy.offsetHeight) / 2)
    : stageTop + stage.offsetHeight + 20;
  window.scrollBy({ top: copy.getBoundingClientRect().top - copyTop, behavior });
}

function Projects(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = repos[active];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const rail = railRef.current;
    if (!section || !stage || !rail) return;
    const cards = Array.from(rail.querySelectorAll<HTMLElement>('[data-card]'));
    const fits = window.matchMedia('(min-height: 560px)');
    let near = false;
    let loading = false;
    let disposed = false;
    let restoreMotion: (() => void) | undefined;

    const prepareGallery = () => {
      if (fits.matches) section.dataset.scrollGallery = 'true';
      else delete section.dataset.scrollGallery;
      if (!fits.matches || !near || loading) return;
      loading = true;
      // 作品区接近视口时才取滚动插件，同时预载被其他卡片遮住的图片。
      for (const img of stage.querySelectorAll('img')) img.loading = 'eager';
      import('./projectsMotion').then(({ mountProjectMotion }) => {
        if (!disposed) restoreMotion = mountProjectMotion(section, stage, rail, setActive);
      }).catch(() => {
        if (!disposed) {
          fits.removeEventListener('change', prepareGallery);
          delete section.dataset.scrollGallery;
        }
      });
    };
    prepareGallery();
    fits.addEventListener('change', prepareGallery);
    const prefetch = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      near = true;
      prepareGallery();
      prefetch.disconnect();
    }, { rootMargin: '500px 0px' });
    prefetch.observe(section);

    const followAnchor = () => {
      if (window.location.hash === '#projects') {
        section.scrollIntoView({ block: 'start', behavior: 'instant' });
        return;
      }
      const card = cards.find(item => '#' + item.id === window.location.hash);
      if (card) {
        setActive(cards.indexOf(card));
        scrollToProject(card, stage, !!section.dataset.scrollGallery, 'instant');
      }
    };
    // 直接打开作品链接时，浏览器首次定位可能早于 React 创建锚点。
    const frame = requestAnimationFrame(followAnchor);
    window.addEventListener('hashchange', followAnchor);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('hashchange', followAnchor);
      disposed = true;
      prefetch.disconnect();
      fits.removeEventListener('change', prepareGallery);
      restoreMotion?.();
      delete section.dataset.scrollGallery;
    };
  }, []);

  function goTo(index: number) {
    const stage = stageRef.current;
    const target = railRef.current?.querySelectorAll<HTMLElement>('[data-card]')[index];
    if (!stage || !target) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    scrollToProject(target, stage, !!sectionRef.current?.dataset.scrollGallery, reduced ? 'instant' : 'smooth');
  }

  function handleKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey) return;
    const index = { ArrowUp: active - 1, ArrowDown: active + 1, Home: 0, End: repos.length - 1 }[event.key];
    if (index === undefined || index < 0 || index >= repos.length) return;
    event.preventDefault();
    goTo(index);
  }

  return (
    <section id="projects" ref={sectionRef} className="portfolio-projects" aria-labelledby="projects-title">
      <Container maxWidth="lg">
        <h2 id="projects-title" className="project-heading">项目案例</h2>
        <div className="project-gallery">
          <div ref={stageRef} className="project-stage">
            <a className="project-stage-art" href={current.previewUrl || current.url} target="_blank" rel="noopener noreferrer"
              tabIndex={-1} aria-label={current.displayName + ' · ' + current.linkLabel}>
              {repos.map((repo, i) => (
                <div key={repo.name} data-project-panel={repo.name} data-current={i === active} aria-hidden="true">
                  <div className="project-media"><ProjectVisual repo={repo} decorative /></div>
                </div>
              ))}
            </a>
            <div className="project-stage-footer">
              <span>{current.displayName}</span>
              <div className="project-controls" role="group" aria-label="上下切换项目" onKeyDown={handleKey}>
                <IconButton aria-label="上一个项目" aria-disabled={active === 0} onClick={() => goTo(active - 1)}>
                  <KeyboardArrowUpIcon />
                </IconButton>
                <IconButton aria-label="下一个项目" aria-disabled={active === repos.length - 1} onClick={() => goTo(active + 1)}>
                  <KeyboardArrowDownIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="project-rail" ref={railRef}>
            {repos.map(repo => (
              <article className="project-card" id={'work-' + repo.name} data-card={repo.name} key={repo.name}>
                <a className="project-inline-art" href={repo.previewUrl || repo.url} target="_blank" rel="noopener noreferrer"
                  aria-label={repo.displayName + ' · ' + repo.linkLabel}>
                  <div className="project-media"><ProjectVisual repo={repo} /></div>
                </a>
                <div className="project-copy">
                  <h3>{repo.displayName}</h3>
                  <p className="project-summary">{repo.description}</p>
                  <p className="project-note">{repo.rationale}</p>
                  {repo.verification && <p className="project-verification">{repo.verification}</p>}
                  <ul className="project-stack" aria-label="使用技术">{repo.techStack.map(item => <li key={item}>{item}</li>)}</ul>
                  <a className="project-link" href={repo.previewUrl || repo.url} target="_blank" rel="noopener noreferrer">
                    {repo.linkLabel} <LaunchIcon aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Projects;
