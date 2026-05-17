import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
} from '@mui/material';
import { githubUser } from '../data/repos';

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

function HideOnScroll({ window, children }: Props) {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <Box>{children}</Box>
    </Slide>
  );
}

function Navbar(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = ['hero', 'projects', 'skills', 'contact'];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '项目', href: '#projects' },
    { label: '技能', href: '#skills' },
    { label: '联系', href: '#contact' },
  ];

  return (
    <HideOnScroll>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: scrolled
            ? 'rgba(10, 10, 10, 0.8)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.04)'
            : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, md: 4 },
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: { xs: 56, md: 64 },
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            component="a"
            href="#hero"
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              background: 'linear-gradient(135deg, #e5e5e5, #c9a94e)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            {githubUser.displayName}
          </Typography>

          {/* Nav links */}
          <Box sx={{ display: 'flex', gap: { xs: 1.5, md: 3 } }}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                href={link.href}
                sx={{
                  minWidth: 0,
                  fontSize: '0.82rem',
                  fontWeight: 500,
                  color:
                    activeSection === link.href.slice(1)
                      ? 'secondary.main'
                      : 'rgba(255,255,255,0.5)',
                  '&:hover': {
                    color: 'secondary.main',
                    backgroundColor: 'transparent',
                  },
                  transition: 'color 0.2s ease',
                  textTransform: 'none',
                  px: { xs: 1, md: 1.5 },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}

export default Navbar;
