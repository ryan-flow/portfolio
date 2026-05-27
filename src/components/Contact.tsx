import { useState } from 'react';
import { Box, Container, Typography, Button, Modal, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import CheckIcon from '@mui/icons-material/Check';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import { githubUser } from '../data/repos';

function Contact(): JSX.Element {
  const [copied, setCopied] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(githubUser.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = githubUser.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Box component="section" id="contact" sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
      <Container maxWidth="sm">
        <Box className="reveal">
          <Typography
            variant="overline"
            sx={{ color: '#8ba8c0', fontSize: '0.75rem', letterSpacing: '0.12em', fontFamily: '"SF Mono", "Fira Code", monospace' }}
          >
            CONTACT
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, mt: 0.5, mb: 3 }}>
            联系我
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 400, mx: 'auto', mb: 5, fontSize: '0.88rem', lineHeight: 1.8 }}>
            {githubUser.jobTarget}
          </Typography>

          {/* Card */}
          <Box
            sx={{
              p: { xs: 4, md: 5 },
              borderRadius: 4,
              border: '1px solid rgba(143,164,184,0.10)',
              background: 'rgba(143,164,184,0.04)',
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
              {/* Resume preview button */}
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<PictureAsPdfIcon />}
                onClick={() => setPreviewOpen(true)}
                sx={{
                  py: 2,
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #8fa4b8, #a8bcc8)',
                  color: '#0a0a0a',
                  borderRadius: 2,
                  letterSpacing: '0.02em',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #a0b8cc, #b8d0dc)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 28px rgba(143, 164, 184, 0.35)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                预览简历
              </Button>

              <Button
                variant="outlined" size="large" fullWidth
                startIcon={<GitHubIcon />}
                href={githubUser.githubUrl} target="_blank" rel="noopener noreferrer"
                sx={{
                  py: 1.5, fontSize: '0.78rem', fontWeight: 600,
                  borderColor: 'rgba(255,255,255,0.06)', color: 'text.primary', borderRadius: 2,
                  fontFamily: '"SF Mono", "Fira Code", monospace',
                  whiteSpace: 'nowrap',
                  minWidth: 0,
                  '&:hover': { borderColor: '#8fa4b8', backgroundColor: 'rgba(143, 164, 184, 0.06)', transform: 'translateY(-2px)' },
                  transition: 'all 0.3s ease',
                }}
              >
                {githubUser.githubUrl}
              </Button>

              {/* Email — click to copy */}
              <Button
                variant="outlined" size="large" fullWidth
                startIcon={copied ? <CheckIcon /> : <EmailIcon />}
                onClick={handleCopyEmail}
                sx={{
                  py: 1.5, fontSize: '0.82rem', fontWeight: 600,
                  borderColor: copied ? 'rgba(62,207,142,0.4)' : 'rgba(255,255,255,0.06)',
                  color: copied ? '#3ecf8e' : 'text.primary',
                  borderRadius: 2,
                  fontFamily: '"SF Mono", "Fira Code", monospace',
                  '&:hover': {
                    borderColor: copied ? '#3ecf8e' : '#8ba8c0',
                    backgroundColor: copied ? 'rgba(62,207,142,0.06)' : 'rgba(139, 168, 192, 0.06)',
                    color: copied ? '#3ecf8e' : '#8ba8c0',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                {copied ? '已复制' : githubUser.email}
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Resume preview modal */}
      <Modal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 1, sm: 2 } }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            maxWidth: 600,
            maxHeight: { xs: '90vh', sm: '85vh' },
            backgroundColor: '#1a1a1e',
            borderRadius: 3,
            border: '1px solid rgba(143,164,184,0.15)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Modal header */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(143,164,184,0.1)',
              flexShrink: 0,
            }}
          >
            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#e8e0d0' }}>
              简历预览
            </Typography>
            <IconButton onClick={() => setPreviewOpen(false)} size="small" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* PDF viewer */}
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
              minHeight: 0,
            }}
          >
            <iframe
              src={resumeUrl}
              style={{ width: '100%', height: '100%', minHeight: '60vh', border: 'none' }}
              title="简历预览"
            />
          </Box>

          {/* Download hint + button */}
          <Box
            sx={{
              px: 2,
              py: 1.5,
              borderTop: '1px solid rgba(143,164,184,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
              flexShrink: 0,
            }}
          >
            <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>
              手机端长按图片可保存
            </Typography>
            <Button
              variant="contained"
              size="small"
              startIcon={<PictureAsPdfIcon />}
              href={resumeUrl}
              download
              sx={{
                fontSize: '0.78rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #8fa4b8, #a8bcc8)',
                color: '#0a0a0a',
                borderRadius: 1.5,
                textTransform: 'none',
                px: 2,
                '&:hover': {
                  background: 'linear-gradient(135deg, #a0b8cc, #b8d0dc)',
                },
              }}
            >
              下载
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Contact;
