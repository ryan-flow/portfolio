import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>/?`~';

interface Cell {
  char: string;
  brightness: number;
  changeTimer: number;
}

const FONT_SIZE = 13;
const VERT_STRETCH = 1.28;

function getCharWidth(): number {
  return window.innerWidth < 768 ? 12 : 15;
}

function getLineHeight(): number {
  return window.innerWidth < 768 ? 17 : 26;
}

function CanvasBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    const handleChange = (e: MediaQueryListEvent) => { reducedMotionRef.current = e.matches; };
    mq.addEventListener('change', handleChange);

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const progress = Math.min(1, scrollY / (heroHeight * 0.6));
      scrollRef.current = progress;
      // Pause canvas when scrolled past 2x viewport — saves battery on mobile
      pausedRef.current = progress >= 1;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mq.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    let animId: number;
    let cells: Cell[][] = [];
    let COLS = 0;
    let ROWS = 0;
    let CHAR_W = getCharWidth();
    let LINE_H = getLineHeight();
    let frameCount = 0;

    const init = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 3);

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      CHAR_W = getCharWidth();
      LINE_H = getLineHeight();
      COLS = Math.floor(w / CHAR_W) + 2;
      ROWS = Math.floor(h / LINE_H) + 2;

      cells = [];
      for (let r = 0; r < ROWS; r++) {
        cells[r] = [];
        for (let c = 0; c < COLS; c++) {
          const isM = window.innerWidth < 768;
          cells[r][c] = {
            char: chars[Math.floor(Math.random() * chars.length)],
            brightness: isM ? (0.12 + Math.random() * 0.18) : (0.22 + Math.random() * 0.28),
            changeTimer: Math.floor(Math.random() * 120),
          };
        }
      }
    };

    init();
    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    const draw = () => {
      frameCount++;

      // Skip frames when paused (scrolled past hero)
      if (pausedRef.current) {
        animId = requestAnimationFrame(draw);
        return;
      }

      if (reducedMotionRef.current) {
        if (frameCount % 60 !== 0) {
          animId = requestAnimationFrame(draw);
          return;
        }
        const progress = scrollRef.current;
        ctx.fillStyle = '#1a1a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const fontStr = `600 ${FONT_SIZE}px "Inter", sans-serif`;
        ctx.font = fontStr;
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';

        for (let r = 0; r < ROWS; r++) {
          for (let c = 0; c < COLS; c++) {
            const cell = cells[r][c];
            const x = c * CHAR_W;
            const y = r * LINE_H;
            const opacity = cell.brightness * (1 - progress * 0.35);
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(1, VERT_STRETCH);
            ctx.fillStyle = `rgba(220, 200, 160, ${opacity})`;
            ctx.fillText(cell.char, 0, 0);
            ctx.restore();
          }
        }
        animId = requestAnimationFrame(draw);
        return;
      }

      if (window.innerWidth < 768 && frameCount % 2 !== 0) {
        animId = requestAnimationFrame(draw);
        return;
      }

      const progress = scrollRef.current;

      ctx.fillStyle = '#1a1a1a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fontStr = `600 ${FONT_SIZE}px "Inter", sans-serif`;
      ctx.font = fontStr;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'left';

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = cells[r][c];
          const x = c * CHAR_W;
          const y = r * LINE_H;

          cell.changeTimer--;
          if (cell.changeTimer <= 0) {
            cell.char = chars[Math.floor(Math.random() * chars.length)];
            cell.changeTimer = 30 + Math.floor(Math.random() * 80);
            cell.brightness = 0.4 + Math.random() * 0.32;
          }

          cell.brightness = Math.max(0.015, cell.brightness - 0.0025);

          if (Math.random() < 0.003) {
            cell.brightness = 0.7 + Math.random() * 0.25;
          }

          const opacity = cell.brightness * (1 - progress * 0.35);
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(1, VERT_STRETCH);
          ctx.fillStyle = `rgba(220, 200, 160, ${opacity})`;
          ctx.fillText(cell.char, 0, 0);
          ctx.restore();
        }
      }

      // Scroll dimming
      if (progress > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${progress * 0.3})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }


      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Box
        component="canvas"
        ref={canvasRef}
        sx={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      {/* Vignette outer — darken edges */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, #000)',
        }}
      />
      {/* Vignette center — darken center slightly */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(circle, rgba(0,0,0,0.6), rgba(0,0,0,0) 60%)',
        }}
      />
      {/* Dark overlay — overall dimming */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',
          background: 'rgba(0,0,0,0.5)',
        }}
      />
    </>
  );
}

export default CanvasBackground;
