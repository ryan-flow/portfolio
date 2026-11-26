import { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Container, Typography, Chip, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { repos } from '../data/repos';

gsap.registerPlugin(ScrollToPlugin);

function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/';
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
}

function Projects(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [realIndex, setRealIndex] = useState(0);

  const animation = useRef<gsap.core.Tween | null>(null);
  const updateDot = useCallback(() => {
    const el = scrollRef.current;
    if (!el || animation.current) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>('[data-card]'));
    const center = el.getBoundingClientRect().left + el.clientWidth / 2;
    let nearest = 0;
    let best = Infinity;
    cards.forEach((card, i) => {
      const box = card.getBoundingClientRect();
      const distance = Math.abs(box.left + box.width / 2 - center);
      if (distance < best) {
        best = distance;
        nearest = i;
      }
    });
    setRealIndex(nearest);
  }, []);

  const snapTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    const target = el?.querySelectorAll<HTMLElement>('[data-card]')[idx];
    if (!el || !target) return;
    animation.current?.kill();
    const offset = target.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft;
    const left = Math.max(0, Math.min(el.scrollWidth - el.clientWidth, offset - (el.clientWidth - target.offsetWidth) / 2));
    setRealIndex(idx);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.scrollTo({ left, behavior: 'instant' });
      return;
    }
    // 手势打断时间线时交还原生吸附，并校准当前圆点。
    const finish = () => {
      animation.current = null;
      el.style.removeProperty('scroll-snap-type');
      updateDot();
    };
    animation.current = gsap.to(el, {
      duration: 0.43, ease: 'power2.out',
      scrollTo: { x: left, autoKill: true },
      onComplete: finish, onInterrupt: finish,
    });
  }, [updateDot]);

  const prev = () => snapTo(realIndex - 1);
  const next = () => snapTo(realIndex + 1);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const interrupt = () => animation.current?.kill();
    el.addEventListener('scroll', updateDot, { passive: true });
    el.addEventListener('pointerdown', interrupt, { passive: true });
    el.addEventListener('wheel', interrupt, { passive: true });
    const resize = new ResizeObserver(updateDot);
    resize.observe(el);
    return () => {
      resize.disconnect();
      el.removeEventListener('scroll', updateDot);
      el.removeEventListener('pointerdown', interrupt);
      el.removeEventListener('wheel', interrupt);
      interrupt();
    };
  }, [updateDot]);

  const handleKey = (event: React.KeyboardEvent<HTMLElement>) => {
    const index = { ArrowLeft: realIndex - 1, ArrowRight: realIndex + 1, Home: 0, End: repos.length - 1 }[event.key];
    if (index === undefined || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    const bounded = Math.max(0, Math.min(repos.length - 1, index));
    const target = event.target;
    if (target instanceof HTMLElement && target.matches('[data-project-dot]')) {
      event.currentTarget.querySelectorAll<HTMLButtonElement>('[data-project-dot]')[bounded]?.focus({ preventScroll: true });
    }
    snapTo(bounded);
  };

  const edgeGradient = (side: 'left' | 'right') => ({
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    width: { xs: 28, md: 40 },
    zIndex: 1,
    pointerEvents: 'none' as const,
    ...(side === 'left'
      ? { left: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.5), transparent)' }
      : { right: 0, background: 'linear-gradient(to left, rgba(10,10,10,0.5), transparent)' }),
  });

  return (
    <Box component="section" id="projects" aria-labelledby="projects-title" onKeyDown={handleKey} sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth={false} sx={{ px: { xs: 0, md: 2 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 5 } }} className="reveal">
          <Typography variant="overline" sx={{ color: '#8ba8c0', fontSize: '0.75rem', letterSpacing: '0.12em', fontFamily: '"SF Mono", "Fira Code", monospace' }}>
            PROJECTS
          </Typography>
          <Typography variant="h2" id="projects-title" sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, fontWeight: 700, mt: 0.5 }}>
            项目展示
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <IconButton aria-label="上一个项目" onClick={prev} disabled={realIndex === 0}
            sx={{ display: { xs: 'none', md: 'flex' }, position: 'absolute', left: { md: 4 }, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 44, height: 44, border: '1px solid rgba(143,164,184,0.18)', backgroundColor: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(12px)', color: 'rgba(200,216,232,0.22)', '&:not(.Mui-disabled)': { color: '#c8d8e8' }, '&.Mui-disabled': { borderColor: 'rgba(143,164,184,0.06)', backgroundColor: 'rgba(10,10,10,0.25)' }, '&:hover:not(.Mui-disabled)': { borderColor: '#8ba8c0', backgroundColor: 'rgba(10,10,10,0.80)', color: '#fff' } }}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton aria-label="下一个项目" onClick={next} disabled={realIndex === repos.length - 1}
            sx={{ display: { xs: 'none', md: 'flex' }, position: 'absolute', right: { md: 4 }, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 44, height: 44, border: '1px solid rgba(143,164,184,0.18)', backgroundColor: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(12px)', color: 'rgba(200,216,232,0.22)', '&:not(.Mui-disabled)': { color: '#c8d8e8' }, '&.Mui-disabled': { borderColor: 'rgba(143,164,184,0.06)', backgroundColor: 'rgba(10,10,10,0.25)' }, '&:hover:not(.Mui-disabled)': { borderColor: '#8ba8c0', backgroundColor: 'rgba(10,10,10,0.80)', color: '#fff' } }}>
            <ChevronRightIcon />
          </IconButton>

          <Box sx={{ position: 'relative', width: '100%' }}>
            <Box sx={edgeGradient('left')} />
            <Box sx={edgeGradient('right')} />

            <Box
              ref={scrollRef}
              sx={{
                display: 'flex',
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                WebkitOverflowScrolling: 'touch',
                '&::-webkit-scrollbar': { display: 'none' },
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                px: { xs: '24px', md: 'calc(50vw - 160px)' },
                gap: { xs: 2.5, md: 3 },
                alignItems: 'stretch',
                py: { xs: 1, md: 2 },
                width: '100%',
                '& [data-card]': { position: 'relative', zIndex: 2 },
              }}
            >
              {repos.map((repo) => (
                <Box
                  key={repo.name}
                  data-card={repo.name}
                  component="a"
                  aria-label={repo.displayName + " · " + repo.linkLabel}
                  href={repo.previewUrl || repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    flex: '0 0 auto',
                    width: { xs: 260, md: 320 },
                    scrollSnapAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: '20px',
                    /* ✨ Apple glass: very light background, gentle blur for depth, no saturate */
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      border: '1px solid rgba(255,255,255,0.18)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.10)',
                    },
                  }}
                >
                  {/* Phone mockup area */}
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      pt: { xs: 1.5, md: 2 },
                      pb: { xs: 0.5, md: 1 },
                      px: { xs: 1.5, md: 2 },
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 100%)',
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: '75%', md: 180 },
                        aspectRatio: '9 / 16',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        border: '2px solid rgba(255,255,255,0.12)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                        backgroundColor: '#0a0f14',
                        flexShrink: 0,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          inset: 0,
                          borderRadius: 'inherit',
                          background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 40%)',
                          pointerEvents: 'none',
                        },
                      }}
                    >
                      {repo.image ? (
                        <Box
                          component="img"
                          src={assetUrl(repo.image)}
                          alt={repo.imageAlt || repo.displayName}
                          loading="lazy"
                          decoding="async"
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            display: 'block',
                          }}
                        />
                      ) : (
                        <Box component="ol" aria-label="微信立减金流程" sx={{
                          m: 0, px: 2, py: 3, width: '100%', height: '100%', listStyle: 'none',
                          display: 'grid', alignContent: 'space-evenly', background: 'linear-gradient(155deg, #24363e, #10191e)',
                        }}>
                          {repo.steps?.map(step => (
                            <Box key={step} component="li" sx={{ borderLeft: '2px solid #8fa4b8', pl: 1.25, py: .5, fontSize: '.82rem', color: '#d9e1e7', fontWeight: 600 }}>
                              {step}
                            </Box>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>

                  {/* Info */}
                  <Box
                    sx={{
                      flex: 1,
                      p: { xs: 1.2, md: 1.5 },
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                      minWidth: 0,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.12) 100%)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 0.3 }}>
                      {repo.url ? <GitHubIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />
                        : <LaunchIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />}
                      <Typography
                        noWrap
                        sx={{
                          fontSize: { xs: '0.85rem', md: '0.92rem' },
                          fontWeight: 700,
                          color: '#f0ebe0',
                          lineHeight: 1.3,
                          textShadow: '0 1px 2px rgba(0,0,0,0.3)',
                        }}
                      >
                        {repo.displayName}
                      </Typography>
                    </Box>

                    <Typography
                      sx={{
                        color: 'rgba(255,255,255,0.45)',
                        fontSize: { xs: '0.65rem', md: '0.7rem' },
                        lineHeight: 1.5,
                        mb: 0.8,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {repo.description}
                    </Typography>

                    {/* Tech tags — show ALL */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 0.8 }}>
                      {repo.techStack.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            background: 'rgba(255,255,255,0.05)',
                            color: 'rgba(255,255,255,0.65)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            fontSize: '0.55rem',
                            fontWeight: 600,
                            height: 18,
                            '& .MuiChip-label': { px: 0.6 },
                          }}
                        />
                      ))}
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                      {repo.previewUrl && (
                        <Box
                          component="span"
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.25,
                            color: 'rgba(255,255,255,0.55)',
                            fontSize: '0.6rem',
                            fontWeight: 600,
                          }}
                        >
                          <LaunchIcon sx={{ fontSize: 11 }} /> {repo.linkLabel}
                        </Box>
                      )}
                      {repo.url && (
                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: .25, color: 'rgba(255,255,255,0.55)', fontSize: '.6rem', fontWeight: 500 }}>
                          <GitHubIcon sx={{ fontSize: 11 }} /> {repo.linkLabel}
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: { xs: 2, md: 4 } }}>
          {repos.map((repo, i) => (
            <Box key={repo.name} component="button" type="button" data-project-dot="" aria-label={"切换到" + repo.displayName} aria-current={i === realIndex ? "true" : undefined} onClick={() => snapTo(i)}
              sx={{
                position: 'relative', border: 0, padding: 0,
                '&::after': { content: '""', position: 'absolute', inset: '-9px -5px' },
                '&:focus-visible': { outline: '2px solid #abc3d9', outlineOffset: 3 },
                width: i === realIndex ? 22 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: i === realIndex ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: i === realIndex ? '0 0 8px rgba(255,255,255,0.2)' : 'none',
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Projects;