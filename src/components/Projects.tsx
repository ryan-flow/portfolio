import { useRef, useEffect, useState, useCallback } from 'react';
import { Box, Container, Typography, Chip, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
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
  const scrolling = useRef(false);

  const snapTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('[data-card]');
    const target = cards[idx];
    if (!target) return;
    const containerW = el.clientWidth;
    const cardW = target.offsetWidth;
    const scrollTarget = target.offsetLeft - (containerW - cardW) / 2;
    scrolling.current = true;
    el.scrollTo({ left: scrollTarget, behavior: 'smooth' as ScrollBehavior });
    setRealIndex(idx);
  }, []);

  const prev = () => snapTo(realIndex === 0 ? repos.length - 1 : realIndex - 1);
  const next = () => snapTo(realIndex === repos.length - 1 ? 0 : realIndex + 1);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Start at first card
    const cards = el.querySelectorAll<HTMLElement>('[data-card]');
    const first = cards[0];
    if (first) {
      const containerW = el.clientWidth;
      const cardW = first.offsetWidth;
      el.scrollTo({ left: first.offsetLeft - (containerW - cardW) / 2, behavior: 'instant' as ScrollBehavior });
    }

    let scrollTimer: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      if (scrolling.current) return;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const w = el.clientWidth;
        if (w <= 0) return;
        const cs = el.querySelectorAll<HTMLElement>('[data-card]');
        if (cs.length < 2) return;
        const step = cs[1].offsetLeft - cs[0].offsetLeft;
        if (step <= 0) return;
        const idx = Math.round(el.scrollLeft / step);
        if (idx >= 0 && idx < repos.length) setRealIndex(idx);
      }, 80);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  // Detect scroll end to unlock
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScrollEnd = () => { scrolling.current = false; };
    el.addEventListener('scrollend', onScrollEnd);
    return () => el.removeEventListener('scrollend', onScrollEnd);
  }, []);

  return (
    <Box component="section" id="projects" sx={{ py: { xs: 3, md: 10 }, minHeight: { md: 'calc(100vh - 64px)' }, display: 'flex', flexDirection: 'column' }}>
      <Container maxWidth={false} sx={{ flex: 1, display: 'flex', flexDirection: 'column', px: { xs: 0, md: 2 } }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 5 }, flexShrink: 0 }} className="reveal">
          <Typography variant="overline" sx={{ color: '#8ba8c0', fontSize: '0.75rem', letterSpacing: '0.12em', fontFamily: '"SF Mono", "Fira Code", monospace' }}>
            PROJECTS
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', md: '2.2rem' }, fontWeight: 700, mt: 0.5 }}>
            开源项目
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          {/* Left arrow */}
          <IconButton onClick={prev} sx={{ display: { xs: 'none', md: 'flex' }, position: 'absolute', left: { md: -8 }, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 52, height: 52, border: '1px solid rgba(143,164,184,0.20)', backgroundColor: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(12px)', color: '#c8d8e8', '&:hover': { borderColor: '#8ba8c0', backgroundColor: 'rgba(10,10,10,0.80)', color: '#fff' }, '& .MuiSvgIcon-root': { fontSize: 28 } }}>
            <ChevronLeftIcon />
          </IconButton>
          {/* Right arrow */}
          <IconButton onClick={next} sx={{ display: { xs: 'none', md: 'flex' }, position: 'absolute', right: { md: -8 }, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 52, height: 52, border: '1px solid rgba(143,164,184,0.20)', backgroundColor: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(12px)', color: '#c8d8e8', '&:hover': { borderColor: '#8ba8c0', backgroundColor: 'rgba(10,10,10,0.80)', color: '#fff' }, '& .MuiSvgIcon-root': { fontSize: 28 } }}>
            <ChevronRightIcon />
          </IconButton>

          {/* Scroll-snap carousel */}
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
              px: { xs: 'calc(50vw - 140px)', md: 'calc(50vw - 370px)' },
              gap: { xs: 2.5, md: 3 },
              alignItems: 'center',
              width: '100%',
            }}
          >
            {repos.map((repo, i) => (
              <Box
                key={repo.name}
                data-card
                component="a"
                href={repo.previewUrl || repo.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  flex: '0 0 auto',
                  width: { xs: 'calc(100vw - 88px)', md: 640 },
                  aspectRatio: { xs: '3/5', md: '4/3' },
                  scrollSnapAlign: 'center',
                  textDecoration: 'none',
                  borderRadius: 3,
                  border: '1px solid rgba(143,164,184,0.08)',
                  background: 'rgba(143,164,184,0.03)',
                  backdropFilter: 'blur(12px)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: 'rgba(143,164,184,0.22)',
                  },
                }}
              >
                <Box sx={{ flex: { xs: '0 0 40%', md: '0 0 45%' }, overflow: 'hidden', backgroundColor: '#0a0f14' }}>
                  {repo.image ? (
                    <Box component="img" src={assetUrl(repo.image)} alt={repo.displayName}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
                    />
                  ) : (
                    <Box sx={{ width: '100%', height: '100%', background: repo.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', opacity: 0.3 }}>
                      {repo.icon}
                    </Box>
                  )}
                </Box>

                <Box sx={{ flex: 1, p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                    <GitHubIcon sx={{ fontSize: 16, color: '#8ba8c0', flexShrink: 0 }} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, fontWeight: 700, color: '#e8e0d0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {repo.displayName}
                      </Typography>
                      <Typography sx={{ color: '#8ba8c0', fontFamily: '"SF Mono", "Fira Code", monospace', fontSize: '0.62rem' }}>
                        {repo.name}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography sx={{ color: 'text.secondary', fontSize: { xs: '0.8rem', md: '0.85rem' }, lineHeight: 1.65, mb: 2 }}>
                    {repo.description}
                  </Typography>

                  <Box sx={{ borderLeft: '2px solid rgba(143,164,184,0.25)', pl: 2, mb: 2, flex: 1 }}>
                    <Typography sx={{ color: '#8ba8c0', fontFamily: '"SF Mono", "Fira Code", monospace', fontSize: '0.62rem', letterSpacing: '0.06em', mb: 0.5 }}>
                      THINKING
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: { xs: '0.75rem', md: '0.8rem' }, lineHeight: 1.65 }}>
                      {repo.rationale}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {repo.techStack.map((tech) => (
                      <Chip key={tech} label={tech} size="small"
                        sx={{ backgroundColor: 'rgba(143,164,184,0.08)', color: '#a8bcc8', border: '1px solid rgba(143,164,184,0.14)', fontSize: '0.62rem', fontWeight: 600, height: 22, '& .MuiChip-label': { px: 1 } }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: { xs: 2, md: 4 }, flexShrink: 0 }}>
          {repos.map((_, i) => (
            <Box key={i} onClick={() => snapTo(i)}
              sx={{ width: i === realIndex ? 24 : 6, height: 6, borderRadius: 3, backgroundColor: i === realIndex ? '#8ba8c0' : 'rgba(255,255,255,0.12)', cursor: 'pointer', transition: 'all 0.3s ease' }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Projects;
