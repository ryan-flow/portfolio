import { useEffect, lazy, Suspense } from 'react';
import { Box } from '@mui/material';
import CanvasBackground from './components/CanvasBackground';
import Hero from './components/Hero';
import AiChat from './components/AiChat';
import Projects from './components/Projects';
import WhyMe from './components/WhyMe';

const About = lazy(() => import('./components/About'));
const Timeline = lazy(() => import('./components/Timeline'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

function App(): JSX.Element {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <CanvasBackground />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <AiChat />
        <Projects />
        <WhyMe />
        <Suspense fallback={null}>
          <About />
          <Timeline />
          <Contact />
          <Footer />
        </Suspense>
      </Box>
    </Box>
  );
}

export default App;
