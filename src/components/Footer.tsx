import { Box, Container, Typography, IconButton, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { githubUser } from '../data/repos';

function Footer(): JSX.Element {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, md: 5 },
        background: '#0a0a0a',
        borderTop: '1px solid rgba(201, 169, 78, 0.06)',
      }}
    >
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        {/* Back to top */}
        <IconButton
          onClick={scrollToTop}
          sx={{
            color: 'text.secondary',
            mb: 1.5,
            border: '1px solid rgba(255,255,255,0.06)',
            '&:hover': {
              color: 'primary.main',
              borderColor: 'primary.main',
              backgroundColor: 'rgba(196, 30, 58, 0.06)',
              transform: 'translateY(-3px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>

        {/* GitHub */}
        <Tooltip title="GitHub" arrow>
          <IconButton
            href={githubUser.githubUrl}
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
            <GitHubIcon sx={{ fontSize: 26 }} />
          </IconButton>
        </Tooltip>

        {/* Copyright */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            fontSize: '0.8rem',
          }}
        >
          Built with{' '}
          <FavoriteIcon sx={{ fontSize: 14, color: '#c41e3a', animation: 'pulse 1.5s infinite' }} />{' '}
          · © {currentYear} {githubUser.username}
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
