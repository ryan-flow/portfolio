import { Box, Container, Typography, Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { githubUser } from '../data/repos';

function Contact(): JSX.Element {
  return (
    <Box component="section" id="contact" sx={{ py: { xs: 10, md: 14 }, textAlign: 'center' }}>
      <Container maxWidth="sm">
        <Box className="reveal">
          <Typography variant="overline" sx={{ color: '#8ba8c0', fontSize: '0.75rem', letterSpacing: '0.12em', fontFamily: '"SF Mono", "Fira Code", monospace' }}>
            CONTACT
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mt: 1, mb: 3 }}>
            保持联系
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 400, mx: 'auto', mb: 5, fontSize: '0.9rem', lineHeight: 1.8 }}>
            无论你是对项目感兴趣、想合作，还是只是想聊聊天——欢迎联系我。
          </Typography>

          {/* Card */}
          <Box
            sx={{
              p: { xs: 4, md: 5 },
              borderRadius: 4,
              border: '1px solid rgba(200,169,110,0.08)',
              background: 'rgba(200,169,110,0.03)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '30%',
                left: '20%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle at center, rgba(126,200,232,0.05) 0%, transparent 60%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Button
                variant="outlined" size="large" fullWidth
                startIcon={<GitHubIcon />}
                href={githubUser.githubUrl} target="_blank" rel="noopener noreferrer"
                sx={{
                  py: 1.5, fontSize: '0.85rem', fontWeight: 600,
                  borderColor: 'rgba(255,255,255,0.06)', color: 'text.primary', borderRadius: 2,
                  fontFamily: '"SF Mono", "Fira Code", monospace',
                  '&:hover': { borderColor: '#c8a96e', backgroundColor: 'rgba(200, 169, 110, 0.06)', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s ease',
                }}
              >
                {githubUser.githubUrl}
              </Button>
              <Button
                variant="outlined" size="large" fullWidth
                startIcon={<EmailIcon />}
                href={`mailto:${githubUser.email}`}
                sx={{
                  py: 1.5, fontSize: '0.85rem', fontWeight: 600,
                  borderColor: 'rgba(255,255,255,0.06)', color: 'text.primary', borderRadius: 2,
                  fontFamily: '"SF Mono", "Fira Code", monospace',
                  '&:hover': { borderColor: '#8ba8c0', backgroundColor: 'rgba(139, 168, 192, 0.06)', color: '#8ba8c0', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s ease',
                }}
              >
                {githubUser.email}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Contact;
