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
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

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

  const handleDownload = async () => {
    if (isIOS) { window.open(resumePdfUrl, '_blank'); return; }
    try {
      const res = await fetch(resumePdfUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = '\u738b\u5b50\u8f69-\u7b80\u5386.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch { window.open(resumeUrl, '_blank'); }
  };

  return (
    <Box component="section" id="contact" sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
      <Container maxWidth="sm">
        <Box className="scroll-title-left">
          <Typography variant="overline" sx={{ color: '#8ba8c0', fontSize: '0.75rem', letterSpacing: '0.12em', fontFamily: '"SF Mono", "Fira Code", monospace' }}>CONTACT</Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, mt: 0.5, mb: 3 }}>{'\u8054\u7cfb\u6211'}</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 400, mx: 'auto', mb: 5, fontSize: '0.88rem', lineHeight: 1.8 }}>{githubUser.jobTarget}</Typography>
          <Box className="scroll-elastic" sx={{ p: { xs: 4, md: 5 }, borderRadius: 4, border: '1px solid rgba(143,164,184,0.10)', background: 'rgba(143,164,184,0.04)', backdropFilter: 'blur(16px)', display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box sx={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Button variant="contained" size="large" fullWidth startIcon={<PictureAsPdfIcon />} onClick={() => setPreviewOpen(true)} sx={{ py: 2, fontSize: '0.95rem', fontWeight: 700, background: 'linear-gradient(135deg, #8fa4b8, #a8bcc8)', color: '#0a0a0a', borderRadius: 2, '&:hover': { background: 'linear-gradient(135deg, #a0b8cc, #b8d0dc)', transform: 'translateY(-2px)', boxShadow: '0 8px 28px rgba(143, 164, 184, 0.35)' }, transition: 'all 0.3s ease' }}>{'\u9884\u89c8\u7b80\u5386'}</Button>
              <Button variant="outlined" size="large" fullWidth startIcon={<GitHubIcon />} href={githubUser.githubUrl} target="_blank" rel="noopener noreferrer" sx={{ py: 1.5, fontSize: '0.78rem', fontWeight: 600, borderColor: 'rgba(255,255,255,0.06)', color: 'text.primary', borderRadius: 2, fontFamily: '"SF Mono", "Fira Code", monospace', '&:hover': { borderColor: '#8fa4b8', backgroundColor: 'rgba(143, 164, 184, 0.06)', transform: 'translateY(-2px)' }, transition: 'all 0.3s ease' }}>{githubUser.githubUrl}</Button>
              <Button variant="outlined" size="large" fullWidth startIcon={copied ? <CheckIcon /> : <EmailIcon />} onClick={handleCopyEmail} sx={{ py: 1.5, fontSize: '0.82rem', fontWeight: 600, borderColor: copied ? 'rgba(62,207,142,0.4)' : 'rgba(255,255,255,0.06)', color: copied ? '#3ecf8e' : 'text.primary', borderRadius: 2, fontFamily: '"SF Mono", "Fira Code", monospace', '&:hover': { borderColor: copied ? '#3ecf8e' : '#8ba8c0', color: copied ? '#3ecf8e' : '#8ba8c0', transform: 'translateY(-2px)' }, transition: 'all 0.3s ease' }}>{copied ? '\u5df2\u590d\u5236' : githubUser.email}</Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 0, sm: 2 } }}>
        <Box sx={{ position: 'relative', width: '92vw', maxWidth: 480, height: '70vh', backgroundColor: '#111', borderRadius: 3, border: '1px solid rgba(143,164,184,0.15)', boxShadow: '0 16px 48px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Box sx={{ px: 2, py: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(143,164,184,0.1)', flexShrink: 0, backgroundColor: '#1a1a1e' }}>
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#e8e0d0' }}>{'\u7b80\u5386\u9884\u89c8'}</Typography>
            <IconButton onClick={() => setPreviewOpen(false)} size="small" sx={{ color: 'rgba(255,255,255,0.5)' }}><CloseIcon fontSize="small" /></IconButton>
          </Box>
          <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden', backgroundColor: '#fff' }}>
            <Box component="img" src={resumeUrl} alt="简历预览" sx={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
          </Box>
          <Box sx={{ px: 2, py: 1, borderTop: '1px solid rgba(143,164,184,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0, backgroundColor: '#1a1a1e' }}>
            <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)' }}>{isIOS ? '\u70b9\u51fb\u4e0b\u8f7d\u5728\u65b0\u6807\u7b7e\u9875\u4e2d\u6253\u5f00' : '\u624b\u673a\u7aef\u957f\u6309\u53ef\u4fdd\u5b58'}</Typography>
            <Button variant="contained" size="small" startIcon={<PictureAsPdfIcon />} onClick={handleDownload} sx={{ fontSize: '0.75rem', fontWeight: 600, background: 'linear-gradient(135deg, #8fa4b8, #a8bcc8)', color: '#0a0a0a', borderRadius: 1.5, textTransform: 'none', px: 2, '&:hover': { background: 'linear-gradient(135deg, #a0b8cc, #b8d0dc)' } }}>{'\u4e0b\u8f7d'}</Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default Contact;