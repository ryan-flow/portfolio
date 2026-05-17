import { Box, Container, Typography, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { githubUser } from '../data/repos';

function Contact(): JSX.Element {
  return (
    <Box
      component="section"
      id="contact"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f1a 100%)',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        {/* Section header */}
        <Typography
          variant="overline"
          sx={{
            color: 'secondary.main',
            letterSpacing: '0.15em',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          CONTACT
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            mt: 1,
            mb: 2,
          }}
        >
          联系我
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            mb: 5,
            fontSize: '0.95rem',
            lineHeight: 1.8,
          }}
        >
          如果有项目合作、技术交流或者任何想法，欢迎通过以下方式联系我
        </Typography>

        {/* Contact card */}
        <Box
          className="card-hover"
          sx={{
            background: 'linear-gradient(135deg, rgba(196,30,58,0.08), rgba(201,169,78,0.05))',
            border: '1px solid rgba(201,169,78,0.12)',
            borderRadius: 4,
            p: { xs: 4, md: 5 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2.5,
          }}
        >
          {/* GitHub */}
          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<GitHubIcon />}
            href={githubUser.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              py: 1.5,
              fontSize: '0.9rem',
              fontWeight: 600,
              borderColor: 'rgba(255,255,255,0.1)',
              color: 'text.primary',
              borderRadius: 2,
              '&:hover': {
                borderColor: 'primary.main',
                backgroundColor: 'rgba(196,30,58,0.08)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {githubUser.githubUrl}
          </Button>

          {/* Email */}
          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<EmailIcon />}
            href={`mailto:${githubUser.email}`}
            sx={{
              py: 1.5,
              fontSize: '0.9rem',
              fontWeight: 600,
              borderColor: 'rgba(255,255,255,0.1)',
              color: 'text.primary',
              borderRadius: 2,
              '&:hover': {
                borderColor: 'secondary.main',
                backgroundColor: 'rgba(201,169,78,0.08)',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            {githubUser.email}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Contact;
