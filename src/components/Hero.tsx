import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Chip, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { githubUser, repos } from '../data/repos';

const langCount = new Set(repos.map((r) => r.language)).size;

const name = githubUser.displayName;
const tagline = '数据科学 · AI Agent · Claude Code';
const tags = ['AI Agent 开发', 'Claude Code', 'CRS 推荐系统'];
const techs = ['Claude Code', 'LangChain', 'React', 'FastAPI', 'LLM'];

function Hero(): JSX.Element {
  const [phase, setPhase] = useState<'name' | 'tagline' | 'done'>('name');
  const [nameText, setNameText] = useState('');
  const [taglineText, setTaglineText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Cursor blink
    const cursorInt = setInterval(() => setShowCursor((c) => !c), 480);

    // Phase 1: type name
    let ni = 0;
    const nameInt = setInterval(() => {
      if (ni < name.length) {
        setNameText(name.slice(0, ni + 1));
        ni++;
      } else {
        clearInterval(nameInt);
        // Phase 2: type tagline after short pause
        setTimeout(() => {
          setPhase('tagline');
          let tj = 0;
          const tagInt = setInterval(() => {
            if (tj < tagline.length) {
              setTaglineText(tagline.slice(0, tj + 1));
              tj++;
            } else {
              clearInterval(tagInt);
              setPhase('done');
            }
          }, 45);
        }, 300);
      }
    }, 110);

    return () => {
      clearInterval(nameInt);
      clearInterval(cursorInt);
    };
  }, []);

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.3) 50%, rgba(10,10,10,0.6) 100%)',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.02) 30%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.25) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Name — 打字期间纯金色，完成后渐变 */}
        <Box sx={{ minHeight: { xs: '4rem', sm: '5.5rem', md: '7rem' }, mb: 1 }}>
          <Typography
            variant="h1"
            sx={{
              display: 'inline',
              fontSize: { xs: '2.8rem', sm: '4rem', md: '5.5rem' },
              fontWeight: 800,
              ...(phase === 'done'
                ? {
                    background: 'linear-gradient(135deg, #e8e0d0 0%, #c8a96e 50%, #e8e0d0 100%)',
                    backgroundSize: '200% auto',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 4s linear infinite',
                  }
                : { color: '#c8a96e' }),
            }}
          >
            {nameText}
          </Typography>
          <Typography
            variant="h1"
            sx={{
              display: 'inline',
              fontSize: { xs: '2.8rem', sm: '4rem', md: '5.5rem' },
              fontWeight: 800,
              color: '#c8a96e',
              opacity: phase !== 'done' && showCursor ? 1 : 0,
              transition: 'opacity 0.05s',
            }}
          >
            _
          </Typography>
        </Box>

        {/* Tagline */}
        <Box sx={{ minHeight: '2.5rem', mb: 3 }}>
          <Typography
            variant="h2"
            sx={{
              display: 'inline',
              fontSize: { xs: '1.1rem', sm: '1.4rem', md: '1.6rem' },
              fontWeight: 500,
              color: 'text.secondary',
              lineHeight: 1.5,
            }}
          >
            <Box component="span" sx={{ color: '#8ba8c0', fontWeight: 600 }}>{taglineText}</Box>
          </Typography>
          <Typography
            variant="h2"
            sx={{
              display: 'inline',
              fontSize: { xs: '1.1rem', sm: '1.4rem', md: '1.6rem' },
              color: '#8ba8c0',
              opacity: tagline.length > 0 && taglineText.length < tagline.length && showCursor ? 1 : 0,
              transition: 'opacity 0.05s',
            }}
          >
            _
          </Typography>
        </Box>

        {/* 以下部分在打字完成后渐入 */}
        <Box sx={{
          opacity: phase === 'done' ? 1 : 0,
          transform: phase === 'done' ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }}>
          {/* Highlight tags */}
          <Stack direction="row" spacing={1} sx={{ mb: 3, justifyContent: 'center', flexWrap: 'wrap', gap: 0.5 }}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" sx={{
                backgroundColor: 'rgba(200, 169, 110, 0.08)', color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(200, 169, 110, 0.15)', fontWeight: 500, fontSize: '0.75rem', height: 24,
              }} />
            ))}
          </Stack>

          {/* Tech tags */}
          <Stack direction="row" spacing={1} sx={{ mb: 3.5, justifyContent: 'center', flexWrap: 'wrap', gap: 0.5 }}>
            {techs.map((tech) => (
              <Chip key={tech} label={tech} size="small" sx={{
                backgroundColor: 'rgba(139, 168, 192, 0.08)', color: '#8ba8c0',
                border: '1px solid rgba(139, 168, 192, 0.15)', fontWeight: 500, fontSize: '0.75rem', height: 24,
              }} />
            ))}
          </Stack>

          {/* Stats */}
          <Stack direction="row" spacing={{ xs: 3, sm: 5 }} sx={{ mb: 4, justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#8ba8c0' }} className="stat-glow">{repos.length}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>开源项目</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#8ba8c0' }} className="stat-glow">{langCount}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>编程语言</Typography>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#8ba8c0' }} className="stat-glow">2019</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>GitHub 起始</Typography>
            </Box>
          </Stack>

          {/* CTA */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" startIcon={<GitHubIcon />}
              href={githubUser.githubUrl} target="_blank" rel="noopener noreferrer"
              sx={{ backgroundColor: 'primary.main', color: '#0a0a0a', fontWeight: 700, px: 4,
                '&:hover': { backgroundColor: 'primary.light', transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(200, 169, 110, 0.25)' },
                transition: 'all 0.3s ease',
              }}
            >
              GitHub 主页
            </Button>
            <Button variant="outlined" size="large" href="#about"
              sx={{ borderColor: 'rgba(255,255,255,0.08)', color: 'text.primary', px: 4,
                '&:hover': { borderColor: '#8ba8c0', color: '#8ba8c0', backgroundColor: 'rgba(139, 168, 192, 0.06)', transform: 'translateY(-2px)' },
                transition: 'all 0.3s ease',
              }}
            >
              了解更多
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Scroll arrow */}
      <Box sx={{
        position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5,
        opacity: phase === 'done' ? 1 : 0,
        transition: 'opacity 0.8s ease-out 0.5s',
      }}>
        <Typography variant="caption" sx={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.3)' }}>
          SCROLL
        </Typography>
        <KeyboardArrowDownIcon sx={{ fontSize: 24, color: 'rgba(255,255,255,0.25)', animation: 'float 2s ease-in-out infinite' }} />
      </Box>
    </Box>
  );
}

export default Hero;
