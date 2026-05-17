import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
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
      <Navbar />
      <Hero />
      <Box className="section-divider" />
      <About />
      <Box className="section-divider" />
      <Projects />
      <Box className="section-divider" />
      <Skills />
      <Box className="section-divider" />
      <Contact />
      <Footer />
    </Box>
  );
}

export default App;
