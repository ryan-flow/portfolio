import { Box, Container, Typography, Avatar, Button, Chip, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { githubUser, repos } from '../data/repos';

function Hero(): JSX.Element {
  const langCount = new Set(repos.map((r) => r.language)).size;

  return (
    <Box
      component="section"
      id="hero"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, #0a0a0a 0%, #0f0f1a 35%, #12121a 65%, #0a0a0a 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 30%, rgba(196, 30, 58, 0.12) 0%, transparent 60%),
            radial-gradient(circle at 70% 70%, rgba(6, 182, 212, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(201, 169, 78, 0.05) 0%, transparent 70%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Grid overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: `
            linear-gradient(rgba(201, 169, 78, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201, 169, 78, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Glowing accent lines */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '180px',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(201, 169, 78, 0.2), transparent)',
          transform: 'rotate(-10deg)',
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '25%',
          right: '8%',
          width: '140px',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(196, 30, 58, 0.15), transparent)',
          transform: 'rotate(15deg)',
          display: { xs: 'none', md: 'block' },
        }}
      />

      <Container maxWidth="sm" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Avatar with glow */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 3.5,
            animation: 'fadeIn 1s ease-out forwards',
          }}
        >
          <Box sx={{ position: 'relative' }}>
            {/* Glow ring */}
            <Box
              sx={{
                position: 'absolute',
                inset: -8,
                borderRadius: '50%',
                background:
                  'conic-gradient(from 0deg, transparent, rgba(196,30,58,0.15), rgba(201,169,78,0.1), transparent)',
                animation: 'glow 3s ease-in-out infinite',
              }}
            />
            <Avatar
              src={githubUser.avatarUrl}
              alt={githubUser.username}
              sx={{
                width: { xs: 120, sm: 150, md: 170 },
                height: { xs: 120, sm: 150, md: 170 },
                border: '2px solid rgba(201, 169, 78, 0.25)',
                position: 'relative',
                transition: 'transform 0.4s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            />
          </Box>
        </Box>

        {/* Username - gradient + shimmer */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            fontWeight: 800,
            background:
              'linear-gradient(135deg, #e5e5e5 0%, #c9a94e 40%, #e63946 70%, #c9a94e 100%)',
            backgroundSize: '200% auto',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 4s linear infinite, fadeInUp 0.8s ease-out 0.1s forwards',
            opacity: 0,
            mb: 0.5,
            letterSpacing: '-0.03em',
          }}
        >
          {githubUser.displayName}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
            mb: 1.5,
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
            animation: 'fadeInUp 0.8s ease-out 0.2s forwards',
            opacity: 0,
            letterSpacing: '0.05em',
          }}
        >
          @{githubUser.username}
        </Typography>

        {/* Bio */}
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: 520,
            mx: 'auto',
            mb: 3,
            fontSize: { xs: '0.95rem', sm: '1.05rem' },
            lineHeight: 1.8,
            animation: 'fadeInUp 0.8s ease-out 0.3s forwards',
            opacity: 0,
          }}
        >
          {githubUser.bio}
        </Typography>

        {/* Tags */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1,
            mb: 3.5,
            animation: 'fadeInUp 0.8s ease-out 0.4s forwards',
            opacity: 0,
          }}
        >
          {githubUser.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                color: 'rgba(255,255,255,0.6)',
                borderColor: 'rgba(255,255,255,0.08)',
                fontSize: '0.75rem',
                fontWeight: 500,
                '&:hover': {
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                },
              }}
              variant="outlined"
            />
          ))}
        </Box>

        {/* Stats */}
        <Stack
          direction="row"
          spacing={{ xs: 3, sm: 5 }}
          justifyContent="center"
          sx={{
            mb: 4,
            animation: 'fadeInUp 0.8s ease-out 0.5s forwards',
            opacity: 0,
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
              {repos.length}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              开源项目
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'secondary.main' }}>
              {langCount}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
              编程语言
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#06b6d4' }}>
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
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s ease-out 0.6s forwards',
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
              px: 4,
              py: 1.2,
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 24px rgba(196, 30, 58, 0.3)',
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
              borderColor: 'rgba(201, 169, 78, 0.3)',
              color: 'secondary.main',
              px: 4,
              py: 1.2,
              '&:hover': {
                borderColor: 'secondary.main',
                backgroundColor: 'rgba(201, 169, 78, 0.08)',
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0.5,
          color: 'text.secondary',
          animation: 'fadeIn 1s ease-out 1.5s forwards',
          opacity: 0,
        }}
      >
        <Typography variant="caption" sx={{ fontSize: '0.65rem', letterSpacing: '0.15em' }}>
          SCROLL
        </Typography>
        <KeyboardDoubleArrowDownIcon
          sx={{
            animation: 'float 2s ease-in-out infinite',
            fontSize: 20,
          }}
        />
      </Box>
    </Box>
  );
}

export default Hero;
