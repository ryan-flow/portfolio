import { Box, Container, Typography, Link } from '@mui/material';

function Footer(): JSX.Element {
  return (
    <Box component="footer" sx={{ py: 4, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1.5 }}>
          {['Vite', 'React', 'MUI', 'Tailwind'].map((t) => (
            <Typography key={t} variant="caption" sx={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.6rem', px: 1, py: 0.3, border: '1px solid rgba(255,255,255,0.04)', borderRadius: 1 }}>
              {t}
            </Typography>
          ))}
        </Box>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.65rem' }}>
          &copy; {new Date().getFullYear()} Zixuan Wang · Built with ❤️
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.6rem', mt: 1, display: 'block' }}>
          <Link
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'rgba(255,255,255,0.2)', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            粤ICP备XXXXXXXX号
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;