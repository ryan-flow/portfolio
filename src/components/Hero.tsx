import { Box, Container, Typography, Button, Chip, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { githubUser, repos } from '../data/repos';

const langCount = new Set(repos.map((r) => r.language)).size;

function Hero(): JSX.Element {
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
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Name with warm gradient + shimmer */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.8rem', sm: '4rem', md: '5.5rem' },
            fontWeight: 800,
            mb: 1,
            background: 'linear-gradient(135deg, #e8e0d0 0%, #c8a96e 50%, #e8e0d0 100%)',
            backgroundSize: '200% auto',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'fadeInUp 0.6s ease-out 0.1s forwards, shimmer 4s linear infinite',
            opacity: 0,
          }}
        >
          {githubUser.displayName}
        </Typography>

        {/* Key identity line */}
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.2rem', sm: '1.5rem', md: '1.8rem' },
            fontWeight: 500,
            color: 'text.secondary',
            mb: 2,
            animation: 'fadeInUp 0.6s ease-out 0.2s forwards',
            opacity: 0,
            lineHeight: 1.5,
          }}
        >
          <Box component="span" sx={{ color: '#a0d8f0', fontWeight: 600 }}>数据科学</Box>
          {' · '}AI Agent 开发 · Claude Code 实践者
        </Typography>

        {/* Highlight tags */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: 3,
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 0.5,
            animation: 'fadeInUp 0.6s ease-out 0.25s forwards',
            opacity: 0,
          }}
        >
          {['AI Agent 开发', 'Claude Code', 'CRS 推荐系统'].map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                backgroundColor: 'rgba(200, 169, 110, 0.08)',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(200, 169, 110, 0.15)',
                fontWeight: 500,
                fontSize: '0.75rem',
                height: 24,
              }}
            />
          ))}
        </Stack>

        {/* Tech tags */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            mb: 3.5,
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 0.5,
            animation: 'fadeInUp 0.6s ease-out 0.3s forwards',
            opacity: 0,
          }}
        >
          {['Claude Code', 'LangChain', 'React', 'FastAPI', 'LLM'].map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              sx={{
                backgroundColor: 'rgba(160, 216, 240, 0.08)',
                color: '#a0d8f0',
                border: '1px solid rgba(160, 216, 240, 0.15)',
                fontWeight: 500,
                fontSize: '0.75rem',
                height: 24,
              }}
            />
          ))}
        </Stack>

        {/* Stats */}
        <Stack
          direction="row"
          spacing={{ xs: 3, sm: 5 }}
          sx={{
            mb: 4,
            justifyContent: 'center',
            animation: 'fadeInUp 0.6s ease-out 0.35s forwards',
            opacity: 0,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#a0d8f0' }} className="stat-glow">
              {repos.length}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              开源项目
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#a0d8f0' }} className="stat-glow">
              {langCount}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              编程语言
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#a0d8f0' }} className="stat-glow">
              2019
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              GitHub 起始
            </Typography>
          </Box>
        </Stack>

        {/* CTA */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.6s ease-out 0.4s forwards',
            opacity: 0,
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<GitHubIcon />}
            href={githubUser.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: 'primary.main',
              color: '#0a0a0a',
              fontWeight: 700,
              px: 4,
              '&:hover': {
                backgroundColor: 'primary.light',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(200, 169, 110, 0.25)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            GitHub 主页
          </Button>
          <Button
            variant="outlined"
            size="large"
            href="#about"
            sx={{
              borderColor: 'rgba(255,255,255,0.08)',
              color: 'text.primary',
              px: 4,
              '&:hover': {
                borderColor: '#a0d8f0',
                color: '#a0d8f0',
                backgroundColor: 'rgba(160, 216, 240, 0.06)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            了解更多
          </Button>
        </Box>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'fadeIn 1s ease-out 1.2s forwards',
          opacity: 0,
          color: 'text.secondary',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        <Typography variant="caption" sx={{ fontSize: '0.6rem', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.2)' }}>
          SCROLL DOWN
        </Typography>
        <ArrowDownwardIcon sx={{ fontSize: 16, animation: 'float 2s ease-in-out infinite', color: 'rgba(255,255,255,0.2)' }} />
      </Box>
    </Box>
  );
}

export default Hero;
