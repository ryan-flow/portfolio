import { useState } from 'react';
import { Box, Container, Typography, Chip, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { repos } from '../data/repos';

function Projects(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i === 0 ? repos.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === repos.length - 1 ? 0 : i + 1));

  const repo = repos[activeIndex];

  return (
    <Box component="section" id="projects" sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        {/* Section header */}
        <Box sx={{ textAlign: 'center', mb: 6 }} className="reveal">
          <Typography variant="overline" sx={{ color: '#8ba8c0', fontSize: '0.75rem', letterSpacing: '0.12em', fontFamily: '"SF Mono", "Fira Code", monospace' }}>
            PROJECTS
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mt: 1 }}>
            开源项目
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, fontSize: '0.82rem' }}>
            点击卡片或左右箭头浏览项目
          </Typography>
        </Box>

        {/* Carousel */}
        <Box
          component="a"
          href={repo.previewUrl || repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="gradient-border"
          sx={{
            maxWidth: 800,
            mx: 'auto',
            display: 'block',
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': { transform: 'translateY(-2px)' },
            transition: 'transform 0.3s ease',
          }}
        >
          <Box
            key={repo.name}
            sx={{
              animation: 'fadeInUp 0.4s ease-out forwards',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Project screenshot */}
            {repo.image ? (
              <Box
                component="img"
                src={repo.image}
                alt={repo.displayName}
                sx={{
                  width: '100%',
                  height: { xs: 200, md: 300 },
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: 'block',
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              />
            ) : (
              <Box
                sx={{
                  height: { xs: 140, md: 180 },
                  background: repo.gradient,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }}
              />
            )}

            {/* Content */}
            <Box sx={{ p: { xs: 3, md: 5 }, position: 'relative' }}>
              <Box sx={{
                position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '20%',
                  left: '30%',
                  width: '200%',
                  height: '200%',
                  background: 'radial-gradient(circle at center, rgba(160,216,240,0.04) 0%, transparent 60%)',
                },
              }} />

              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <GitHubIcon sx={{ fontSize: 20, color: '#8ba8c0' }} />
                  <Box>
                    <Typography variant="h3" sx={{ fontSize: '1.2rem', fontWeight: 700, color: '#e8e0d0' }}>
                      {repo.displayName}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#8ba8c0', fontFamily: '"SF Mono", "Fira Code", monospace', fontSize: '0.7rem' }}>
                      {repo.name}
                    </Typography>
                  </Box>
                </Box>

                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3, fontSize: '0.9rem', lineHeight: 1.8 }}>
                  {repo.description}
                </Typography>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 0 }}>
                  {repo.techStack.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(200, 169, 110, 0.06)',
                        color: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(200, 169, 110, 0.1)',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 3 }}>
          <IconButton
            onClick={(e) => { e.stopPropagation(); prev(); }}
            sx={{ color: 'text.secondary', border: '1px solid rgba(255,255,255,0.06)', '&:hover': { borderColor: '#8ba8c0', color: '#8ba8c0' } }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {repos.map((_, i) => (
              <Box
                key={i}
                onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                sx={{
                  width: 8, height: 8, borderRadius: '50%',
                  backgroundColor: i === activeIndex ? '#8ba8c0' : 'rgba(255,255,255,0.1)',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  '&:hover': { backgroundColor: i === activeIndex ? '#8ba8c0' : 'rgba(255,255,255,0.3)' },
                }}
              />
            ))}
          </Box>
          <IconButton
            onClick={(e) => { e.stopPropagation(); next(); }}
            sx={{ color: 'text.secondary', border: '1px solid rgba(255,255,255,0.06)', '&:hover': { borderColor: '#8ba8c0', color: '#8ba8c0' } }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

export default Projects;
