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

  const resumeUrl = `${import.meta.env.BASE_URL}resume-preview.png`;
  const resumePdfUrl = `${import.meta.env.BASE_URL}resume.pdf`;
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
        <Box className="scroll-title-left">
          <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, mt: 0.5, mb: 3 }}>{'\u8054\u7cfb\u6211'}</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 400, mx: 'auto', mb: 5, fontSize: '0.88rem', lineHeight: 1.8 }}>
            想聊{githubUser.jobTarget}的工作机会，可以发邮件给我。
          </Typography>
          <Box className="scroll-elastic" sx={{ p: { xs: 4, md: 5 }, borderRadius: 4, border: '1px solid rgba(143,164,184,0.10)', background: 'rgba(143,164,184,0.04)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Button variant="contained" size="large" fullWidth startIcon={copied ? <CheckIcon /> : <EmailIcon />}
                onClick={handleCopyEmail} aria-label={'复制联系邮箱 ' + githubUser.email} title="复制联系邮箱"
                sx={{ py: 2, fontSize: '0.95rem', fontWeight: 700, textTransform: 'none', background: 'linear-gradient(135deg, #8fa4b8, #a8bcc8)', color: '#0a0a0a', borderRadius: 2, '&:hover': { background: 'linear-gradient(135deg, #a0b8cc, #b8d0dc)', transform: 'translateY(-2px)', boxShadow: '0 8px 28px rgba(143, 164, 184, 0.35)' }, transition: 'all 0.3s ease' }}>
                {copied ? '已复制邮箱' : githubUser.email}
              </Button>
              <Button variant="outlined" size="large" fullWidth startIcon={<GitHubIcon />} href={githubUser.githubUrl} target="_blank" rel="noopener noreferrer" sx={{ py: 1.5, fontSize: '0.78rem', fontWeight: 600, borderColor: 'rgba(255,255,255,0.06)', color: 'text.primary', borderRadius: 2, fontFamily: '"SF Mono", "Fira Code", monospace', '&:hover': { borderColor: '#8fa4b8', backgroundColor: 'rgba(143, 164, 184, 0.06)', transform: 'translateY(-2px)' }, transition: 'all 0.3s ease' }}>{githubUser.githubUrl}</Button>
              <Button variant="outlined" size="large" fullWidth startIcon={<PictureAsPdfIcon />} onClick={() => setPreviewOpen(true)}
                sx={{ py: 1.5, fontSize: '0.82rem', fontWeight: 600, borderColor: 'rgba(255,255,255,0.1)', color: 'text.secondary', borderRadius: 2 }}>
                预览求职简历
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 0, sm: 2 } }}>
        <Box role="dialog" aria-modal="true" aria-labelledby="resume-preview-title" sx={{ position: 'relative', width: '92vw', maxWidth: 480, height: '70vh', backgroundColor: '#111', borderRadius: 3, border: '1px solid rgba(143,164,184,0.15)', boxShadow: '0 16px 48px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(143,164,184,0.1)', flexShrink: 0, backgroundColor: '#1a1a1e' }}>
            <Typography id="resume-preview-title" sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#e8e0d0' }}>求职简历预览</Typography>
            <IconButton aria-label="关闭简历预览" onClick={() => setPreviewOpen(false)} size="small" sx={{ color: 'rgba(255,255,255,0.5)' }}><CloseIcon fontSize="small" /></IconButton>
          </Box>
          <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', backgroundColor: '#fff' }}>
            <Box component="img" src={resumeUrl} alt="求职简历预览" sx={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          </Box>
          <Box sx={{ px: 2, py: 1, borderTop: '1px solid rgba(143,164,184,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, backgroundColor: '#1a1a1e' }}>
            <Button href={`${import.meta.env.BASE_URL}resume.html`} target="_blank" rel="noopener noreferrer" size="small" sx={{ color: '#b5c3d0' }}>阅读网页版</Button>
            <Button variant="contained" size="small" startIcon={<PictureAsPdfIcon />} href={resumePdfUrl} download="王子轩-FDE-简历.pdf" sx={{ fontSize: '0.75rem', fontWeight: 600, background: 'linear-gradient(135deg, #8fa4b8, #a8bcc8)', color: '#0a0a0a', borderRadius: 1.5, textTransform: 'none', px: 2, '&:hover': { background: 'linear-gradient(135deg, #a0b8cc, #b8d0dc)' } }}>{'\u4e0b\u8f7d'}</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Contact;
