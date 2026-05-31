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

    // Observe already-present .reveal elements
    const observeReveals = (root: ParentNode) => {
      root.querySelectorAll('.reveal').forEach((el) => {
        if (!el.classList.contains('visible')) {
          observer.observe(el);
        }
      });
    };

    observeReveals(document);

    // Watch for new .reveal elements added by lazy-loaded components
    const mutator = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            observeReveals(node as ParentNode);
          }
        }
      }
    });

    mutator.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutator.disconnect();
    };
  }, []);

  return (
    <>
      {/* CanvasBackground must be outside any container that might get a transform,
          otherwise position:fixed breaks and the canvas "refreshes" on scroll */}
      <CanvasBackground />
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
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
    </>
  );
}

export default App;
