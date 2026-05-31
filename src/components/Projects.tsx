import { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Container, Typography, Chip, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { repos } from '../data/repos';

function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/';
  return `${base}${path.startsWith('/') ? path.slice(1) : path}`;
}

function Projects(): JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [realIndex, setRealIndex] = useState(0);

  const snapTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('[data-card]');
    const target = cards[idx];
    if (!target) return;
    const containerW = el.clientWidth;
    const cardW = target.offsetWidth;
    const scrollTarget = target.offsetLeft - (containerW - cardW) / 2;
    el.scrollTo({ left: scrollTarget, behavior: 'smooth' as ScrollBehavior });
    setRealIndex(idx);
  }, []);

  const prev = () => { if (realIndex > 0) snapTo(realIndex - 1); };
  const next = () => { if (realIndex < repos.length - 1) snapTo(realIndex + 1); };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const updateDot = () => {
      if (!el) return;
      const cs = el.querySelectorAll<HTMLElement>('[data-card]');
      if (cs.length < 2) return;
      const step = cs[1].offsetLeft - cs[0].offsetLeft;
      if (step <= 0) return;
      const idx = Math.round(el.scrollLeft / step);
      if (idx >= 0 && idx < repos.length) setRealIndex(idx);
    };
    el.addEventListener('scroll', updateDot, { passive: true });
    return () => el.removeEventListener('scroll', updateDot);
  }, []);

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
    <Box component="section" id="projects" sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth={false} sx={{ px: { xs: 0, md: 2 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 5 } }} className="reveal">
          <Typography variant="overline" sx={{ color: '#8ba8c0', fontSize: '0.75rem', letterSpacing: '0.12em', fontFamily: '"SF Mono", "Fira Code", monospace' }}>
            PROJECTS
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, fontWeight: 700, mt: 0.5 }}>
            项目展示
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={prev} disabled={realIndex === 0}
            sx={{ display: { xs: 'none', md: 'flex' }, position: 'absolute', left: { md: 4 }, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 44, height: 44, border: '1px solid rgba(143,164,184,0.18)', backgroundColor: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(12px)', color: 'rgba(200,216,232,0.22)', '&:not(.Mui-disabled)': { color: '#c8d8e8' }, '&.Mui-disabled': { borderColor: 'rgba(143,164,184,0.06)', backgroundColor: 'rgba(10,10,10,0.25)' }, '&:hover:not(.Mui-disabled)': { borderColor: '#8ba8c0', backgroundColor: 'rgba(10,10,10,0.80)', color: '#fff' } }}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={next} disabled={realIndex === repos.length - 1}
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
                  data-card
                  component="a"
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
                          alt={repo.displayName}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center top',
                            display: 'block',
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            background: repo.gradient,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '2.5rem',
                            opacity: 0.3,
                          }}
                        >
                          {repo.icon}
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
                      <GitHubIcon sx={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', flexShrink: 0 }} />
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
                          <LaunchIcon sx={{ fontSize: 11 }} /> 预览
                        </Box>
                      )}
                      <Box
                        component="a"
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.25,
                          color: 'rgba(255,255,255,0.55)',
                          fontSize: '0.6rem',
                          fontWeight: 500,
                          textDecoration: 'none',
                          transition: 'color 0.2s',
                          '&:hover': { color: 'rgba(255,255,255,0.8)' },
                        }}
                      >
                        <GitHubIcon sx={{ fontSize: 11 }} /> 源码
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: { xs: 2, md: 4 } }}>
          {repos.map((_, i) => (
            <Box key={i} onClick={() => snapTo(i)}
              sx={{
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