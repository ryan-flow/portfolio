import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, Chip, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { githubUser, repos } from '../data/repos';

const name = githubUser.displayName;
const chineseName = '王子轩';
const tagline = 'LLM 应用 · 全栈开发 · 推荐系统';
const jobTarget = githubUser.jobTarget;
const tags = ['LLM 应用', '推荐系统', '全栈交付'];

function Hero(): JSX.Element {
  const [nameText, setNameText] = useState('');
  const [chineseNameText, setChineseNameText] = useState('');
  const [taglineText, setTaglineText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const allDone = nameText.length === name.length
    && chineseNameText.length === chineseName.length
    && taglineText.length === tagline.length;

  useEffect(() => {
    const cursorInt = setInterval(() => setShowCursor((c) => !c), 480);

    let ni = 0; let cj = 0; let tj = 0;

    const nameInt = setInterval(() => {
      if (ni < name.length) { setNameText(name.slice(0, ++ni)); } else clearInterval(nameInt);
    }, 80);

    const chInt = setInterval(() => {
      if (cj < chineseName.length) { setChineseNameText(chineseName.slice(0, ++cj)); } else clearInterval(chInt);
    }, 250);

    const tagInt = setInterval(() => {
      if (tj < tagline.length) { setTaglineText(tagline.slice(0, ++tj)); } else clearInterval(tagInt);
    }, 55);

    const doneCheck = setInterval(() => {
      if (ni >= name.length && cj >= chineseName.length && tj >= tagline.length) {
        clearInterval(doneCheck);
      }
    }, 100);

    return () => {
      clearInterval(nameInt);
      clearInterval(chInt);
      clearInterval(tagInt);
      clearInterval(cursorInt);
      clearInterval(doneCheck);
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
        background: 'transparent',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 65% 55% at 50% 48%, rgba(0,0,0,0.60) 0%, rgba(0,0,0,0.48) 25%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.12) 75%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Name typewriter */}
        <Box sx={{ minHeight: { xs: '4rem', sm: '5.5rem', md: '7rem' }, mb: 1, whiteSpace: 'nowrap' }}>
          <Typography
            variant="h1"
            sx={{
              display: 'inline',
              fontSize: { xs: '2.8rem', sm: '4rem', md: '5.5rem' },
              fontWeight: 800,
              ...(allDone
                ? {
                    background: 'linear-gradient(135deg, #dce3ea 0%, #8fa4b8 40%, #a8bcc8 60%, #dce3ea 100%)',
                    backgroundSize: '200% auto',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    animation: 'shimmer 4s linear infinite',
                  }
                : { color: '#8fa4b8' }),
            }}
          >
            {nameText}
          </Typography>
        </Box>

        {/* Chinese name typewriter */}
        <Box sx={{ minHeight: '1.8rem', mb: 2.5 }}>
          <Typography
            sx={{
              display: 'inline',
              fontSize: { xs: '0.9rem', md: '1.1rem' },
              fontWeight: 300,
              color: 'rgba(255,255,255,0.48)',
              letterSpacing: '0.35em',
            }}
          >
            {chineseNameText}
          </Typography>
        </Box>

        {/* Tagline typewriter */}
        <Box sx={{ minHeight: '2.5rem', mb: 3 }}>
          <Typography
            variant="h2"
            sx={{
              display: 'inline',
              fontSize: { xs: '1.15rem', sm: '1.5rem', md: '1.75rem' },
              fontWeight: 600,
              color: 'text.primary',
              lineHeight: 1.5,
            }}
          >
            {taglineText}
          </Typography>
          <Typography
            variant="h2"
            sx={{
              display: 'inline',
              fontSize: { xs: '1.15rem', sm: '1.5rem', md: '1.75rem' },
              color: '#8fa4b8',
              opacity: !allDone && showCursor ? 1 : 0,
              transition: 'opacity 0.05s',
            }}
          >
            _
          </Typography>
        </Box>

        {/* After typing done — all elements fade in */}
        <Box sx={{
          opacity: allDone ? 1 : 0,
          transform: allDone ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }}>
          <Stack direction="row" spacing={1} sx={{ mb: 3, justifyContent: 'center', flexWrap: 'wrap', gap: 0.5 }}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" sx={{
                backgroundColor: 'rgba(143, 164, 184, 0.08)', color: '#a0b8cc',
                border: '1px solid rgba(143, 164, 184, 0.18)', fontWeight: 600, fontSize: '0.8rem', height: 26,
              }} />
            ))}
          </Stack>

          <Typography
            sx={{
              mb: 4,
              fontSize: { xs: '0.85rem', sm: '0.95rem' },
              color: 'rgba(255,255,255,0.45)',
              fontWeight: 400,
              letterSpacing: '0.03em',
            }}
          >
            {repos.length} 个项目 · 全栈闭环 · 可部署
          </Typography>

          <Box
            sx={{
              mb: 4,
              py: 1.5,
              px: 3,
              borderRadius: 2,
              border: '1px solid rgba(143, 164, 184, 0.22)',
              background: 'linear-gradient(135deg, rgba(143, 164, 184, 0.10), rgba(168, 188, 200, 0.06))',
              display: 'inline-block',
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: '0.88rem', sm: '0.95rem' },
                fontWeight: 600,
                background: 'linear-gradient(135deg, #b8c8d8, #d0dce6)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.02em',
              }}
            >
              {jobTarget}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" endIcon={<KeyboardArrowDownIcon />}
              href="#ai-chat"
              sx={{ background: 'linear-gradient(135deg, #8fa4b8, #a8bcc8)', color: '#0a0a0a', fontWeight: 700, px: 4,
                '&:hover': { background: 'linear-gradient(135deg, #a0b8cc, #b8d0dc)', transform: 'translateY(-2px)', boxShadow: '0 8px 24px rgba(143, 164, 184, 0.30)' },
                transition: 'all 0.3s ease',
              }}
            >
              和 AI 聊聊
            </Button>
            <Button variant="outlined" size="large" startIcon={<GitHubIcon />}
              href={githubUser.githubUrl} target="_blank" rel="noopener noreferrer"
              sx={{ borderColor: 'rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.55)', px: 4,
                '&:hover': { borderColor: '#8fa4b8', color: '#8fa4b8', backgroundColor: 'rgba(143, 164, 184, 0.06)', transform: 'translateY(-2px)' },
                transition: 'all 0.3s ease',
              }}
            >
              GitHub
            </Button>
          </Box>
        </Box>
      </Container>

      {/* Scroll arrow */}
      <Box sx={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        opacity: allDone ? 1 : 0,
        transition: 'opacity 0.8s ease-out 0.5s',
        animation: allDone ? 'float 2s ease-in-out infinite' : 'none',
        cursor: 'pointer',
      }}
        onClick={() => document.getElementById('ai-chat')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <KeyboardArrowDownIcon sx={{ fontSize: 32, color: 'rgba(255,255,255,0.35)' }} />
      </Box>
    </Box>
  );
}

export default Hero;