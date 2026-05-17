import { Box, Container, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 5 },
        background: '#0a0a0a',
        borderTop: '1px solid rgba(201, 169, 78, 0.1)',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        {/* GitHub icon link */}
        <IconButton
          href="https://github.com/oldking-yes"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'text.secondary',
            mb: 1.5,
            '&:hover': {
              color: 'primary.main',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <GitHubIcon sx={{ fontSize: 32 }} />
        </IconButton>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            fontSize: '0.85rem',
          }}
        >
          Built with{' '}
          <FavoriteIcon
            sx={{
              fontSize: 16,
              color: '#c41e3a',
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.2)' },
              },
            }}
          />{' '}
          · © {currentYear} oldking-yes
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255,255,255,0.2)',
            mt: 1,
            display: 'block',
            fontSize: '0.7rem',
            letterSpacing: '0.05em',
          }}
        >
          Vite + React + MUI + Tailwind CSS
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
