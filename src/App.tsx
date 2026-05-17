import { Box } from '@mui/material';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Footer from './components/Footer';

function App(): JSX.Element {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Hero />
      <Box className="section-divider" />
      <Projects />
      <Box className="section-divider" />
      <Skills />
      <Footer />
    </Box>
  );
}

export default App;
