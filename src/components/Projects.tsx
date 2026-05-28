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

// Golden ratio constants
const PHI_TOP = '61.8%';    // φ/(1+φ) — screenshot
const PHI_BOT = '38.2%';    // 1/(1+φ) — description

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
          <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', mt: 1 }}>
            {repos.length} 个项目 · 左右滑动浏览
          </Typography>
        </Box>

        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {/* Arrows — desktop only */}
          <IconButton onClick={prev} disabled={realIndex === 0}
            sx={{ display: { xs: 'none', md: 'flex' }, position: 'absolute', left: { md: 4 }, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 48, height: 48, border: '1px solid rgba(143,164,184,0.18)', backgroundColor: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(12px)', color: 'rgba(200,216,232,0.22)', '&:not(.Mui-disabled)': { color: '#c8d8e8' }, '&.Mui-disabled': { borderColor: 'rgba(143,164,184,0.06)', backgroundColor: 'rgba(10,10,10,0.25)' }, '&:hover:not(.Mui-disabled)': { borderColor: '#8ba8c0', backgroundColor: 'rgba(10,10,10,0.80)', color: '#fff' } }}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton onClick={next} disabled={realIndex === repos.length - 1}
            sx={{ display: { xs: 'none', md: 'flex' }, position: 'absolute', right: { md: 4 }, top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: 48, height: 48, border: '1px solid rgba(143,164,184,0.18)', backgroundColor: 'rgba(10,10,10,0.55)', backdropFilter: 'blur(12px)', color: 'rgba(200,216,232,0.22)', '&:not(.Mui-disabled)': { color: '#c8d8e8' }, '&.Mui-disabled': { borderColor: 'rgba(143,164,184,0.06)', backgroundColor: 'rgba(10,10,10,0.25)' }, '&:hover:not(.Mui-disabled)': { borderColor: '#8ba8c0', backgroundColor: 'rgba(10,10,10,0.80)', color: '#fff' } }}>
            <ChevronRightIcon />
          </IconButton>

          {/* Scroll container */}
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
              px: { xs: 4, md: 'calc(50vw - 370px)' },
              gap: { xs: 3, md: 5 },
              alignItems: 'stretch',
              py: { xs: 1, md: 2 },
              width: '100%',
              position: 'relative',
              '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: { xs: 24, md: 70 },
                zIndex: 2,
                pointerEvents: 'none',
              },
              '&::before': {
                left: 0,
                background: 'linear-gradient(to right, rgba(10,10,10,0.65), transparent)',
              },
              '&::after': {
                right: 0,
                background: 'linear-gradient(to left, rgba(10,10,10,0.65), transparent)',
              },
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
                  /* Mobile: 9:16 portrait card; Desktop: wide card */
                  width: { xs: 'calc(100vw - 80px)', md: 640 },
                  aspectRatio: { xs: '9/16', md: 'unset' },
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
                {/* ===== MOBILE: golden-ratio split (screenshot 61.8% / info 38.2%) ===== */}
                <Box sx={{ display: { xs: 'flex', md: 'none' }, flexDirection: 'column', height: '100%' }}>
                  {/* Screenshot — golden top */}
                  <Box sx={{ flex: `0 0 ${PHI_TOP}`, overflow: 'hidden', backgroundColor: '#0a0f14', position: 'relative' }}>
                    {repo.image ? (
                      <Box component="img" src={assetUrl(repo.image)} alt={repo.displayName}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                      />
                    ) : (
                      <Box sx={{ width: '100%', height: '100%', background: repo.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', opacity: 0.3 }}>
                        {repo.icon}
                      </Box>
                    )}
                    {/* Gold divider line */}
                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(143,164,184,0.2), transparent)' }} />
                  </Box>

                  {/* Info — golden bottom */}
                  <Box sx={{ flex: `0 0 ${PHI_BOT}`, p: { xs: 2, sm: 2.5 }, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0, justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 0.5 }}>
                      <GitHubIcon sx={{ fontSize: 14, color: '#8ba8c0', flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#e8e0d0', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {repo.displayName}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.68rem', lineHeight: 1.5, mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {repo.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 0.8 }}>
                      {repo.techStack.slice(0, 4).map((tech) => (
                        <Chip key={tech} label={tech} size="small"
                          sx={{ backgroundColor: 'rgba(143,164,184,0.08)', color: '#a8bcc8', border: '1px solid rgba(143,164,184,0.14)', fontSize: '0.5rem', fontWeight: 600, height: 18, '& .MuiChip-label': { px: 0.6 } }}
                        />
                      ))}
                      {repo.techStack.length > 4 && (
                        <Chip label={`+${repo.techStack.length - 4}`} size="small"
                          sx={{ backgroundColor: 'rgba(143,164,184,0.04)', color: '#6a8498', fontSize: '0.5rem', height: 18 }}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1.5 }}>
                      {repo.previewUrl && (
                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.2, color: '#8fa4b8', fontSize: '0.6rem', fontWeight: 600 }}>
                          <LaunchIcon sx={{ fontSize: 10 }} /> 预览
                        </Box>
                      )}
                      <Box component="a" href={repo.url} target="_blank" rel="noopener noreferrer"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.2, color: '#8ba8c0', fontSize: '0.6rem', fontWeight: 500, textDecoration: 'none' }}>
                        <GitHubIcon sx={{ fontSize: 10 }} /> 源码
                      </Box>
                    </Box>
                  </Box>
                </Box>

                {/* ===== DESKTOP: screenshot top + info bottom (flex column) ===== */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', height: '100%' }}>
                  <Box sx={{ flex: '0 0 45%', overflow: 'hidden', backgroundColor: '#0a0f14' }}>
                    {repo.image ? (
                      <Box component="img" src={assetUrl(repo.image)} alt={repo.displayName}
                        sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                      />
                    ) : (
                      <Box sx={{ width: '100%', height: '100%', background: repo.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', opacity: 0.3 }}>
                        {repo.icon}
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ flex: 1, p: 3, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
                      <GitHubIcon sx={{ fontSize: 17, color: '#8ba8c0', flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#e8e0d0', lineHeight: 1.3 }}>
                        {repo.displayName}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.82rem', lineHeight: 1.6, mb: 1.5, flex: 1 }}>
                      {repo.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1 }}>
                      {repo.techStack.slice(0, 5).map((tech) => (
                        <Chip key={tech} label={tech} size="small"
                          sx={{ backgroundColor: 'rgba(143,164,184,0.08)', color: '#a8bcc8', border: '1px solid rgba(143,164,184,0.14)', fontSize: '0.55rem', fontWeight: 600, height: 20, '& .MuiChip-label': { px: 0.8 } }}
                        />
                      ))}
                      {repo.techStack.length > 5 && (
                        <Chip label={`+${repo.techStack.length - 5}`} size="small"
                          sx={{ backgroundColor: 'rgba(143,164,184,0.04)', color: '#6a8498', fontSize: '0.55rem', height: 20 }}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: 'auto' }}>
                      {repo.previewUrl && (
                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.3, color: '#8fa4b8', fontSize: '0.68rem', fontWeight: 600 }}>
                          <LaunchIcon sx={{ fontSize: 12 }} /> 预览
                        </Box>
                      )}
                      <Box component="a" href={repo.url} target="_blank" rel="noopener noreferrer"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.3, color: '#8ba8c0', fontSize: '0.68rem', fontWeight: 500, textDecoration: 'none' }}>
                        <GitHubIcon sx={{ fontSize: 12 }} /> 源码
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Dot indicators */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.5, mt: { xs: 2, md: 4 } }}>
          {repos.map((_, i) => (
            <Box key={i} onClick={() => snapTo(i)}
              sx={{
                width: i === realIndex ? 22 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: i === realIndex ? '#8ba8c0' : 'rgba(255,255,255,0.12)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Projects;
