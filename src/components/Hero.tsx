import { Box, Container, Typography, Avatar, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { githubUser } from '../data/repos';

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
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #12121a 50%, #0a0a0a 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 50% 30%, rgba(196, 30, 58, 0.08) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(201, 169, 78, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Decorative brush stroke lines */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          width: '120px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(201, 169, 78, 0.3), transparent)',
          transform: 'rotate(-15deg)',
          display: { xs: 'none', md: 'block' },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '8%',
          width: '80px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(196, 30, 58, 0.25), transparent)',
          transform: 'rotate(20deg)',
          display: { xs: 'none', md: 'block' },
        }}
      />

      <Container maxWidth="sm" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Avatar */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mb: 4,
            animation: 'fadeIn 1s ease-out forwards',
          }}
        >
          <Avatar
            src={githubUser.avatarUrl}
            alt={githubUser.username}
            sx={{
              width: { xs: 120, sm: 150, md: 170 },
              height: { xs: 120, sm: 150, md: 170 },
              border: '3px solid rgba(201, 169, 78, 0.3)',
              boxShadow: '0 0 60px rgba(196, 30, 58, 0.15), 0 0 120px rgba(201, 169, 78, 0.05)',
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 0 80px rgba(196, 30, 58, 0.25), 0 0 160px rgba(201, 169, 78, 0.1)',
              },
            }}
          />
        </Box>

        {/* Username */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            fontWeight: 800,
            background: 'linear-gradient(135deg, #e5e5e5 0%, #c9a94e 50%, #e63946 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            letterSpacing: '-0.03em',
            animation: 'fadeInUp 0.8s ease-out 0.2s forwards',
            opacity: 0,
          }}
        >
          {githubUser.displayName}
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontWeight: 400,
            mb: 1,
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
            animation: 'fadeInUp 0.8s ease-out 0.35s forwards',
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
            mb: 4,
            fontSize: { xs: '0.95rem', sm: '1.05rem' },
            lineHeight: 1.8,
            animation: 'fadeInUp 0.8s ease-out 0.5s forwards',
            opacity: 0,
          }}
        >
          {githubUser.bio}
        </Typography>

        {/* CTA buttons */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s ease-out 0.65s forwards',
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
            href="#projects"
            sx={{
              borderColor: 'rgba(201, 169, 78, 0.4)',
              color: 'secondary.main',
              '&:hover': {
                borderColor: 'secondary.main',
                backgroundColor: 'rgba(201, 169, 78, 0.08)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            查看项目
          </Button>
        </Box>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          color: 'text.secondary',
          animation: 'fadeIn 1s ease-out 1.5s forwards',
          opacity: 0,
        }}
      >
        <Typography variant="caption" sx={{ fontSize: '0.75rem', letterSpacing: '0.1em' }}>
          SCROLL DOWN
        </Typography>
        <KeyboardDoubleArrowDownIcon
          sx={{
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(8px)' },
            },
          }}
        />
      </Box>
    </Box>
  );
}

export default Hero;
