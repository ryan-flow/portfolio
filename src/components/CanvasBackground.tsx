import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>/?`~';

interface Cell {
  char: string;
  brightness: number;
  changeTimer: number;
}

const FONT_SIZE = 14;
const CHAR_W = 12;
const LINE_H = 22;
const VERT_STRETCH = 1.28;

function CanvasBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      scrollRef.current = Math.min(1, scrollY / (heroHeight * 0.6));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let cells: Cell[][] = [];
    let COLS = 0;
    let ROWS = 0;

    const init = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;

      COLS = Math.floor(w / CHAR_W) + 2;
      ROWS = Math.floor(h / LINE_H) + 2;

      cells = [];
      for (let r = 0; r < ROWS; r++) {
        cells[r] = [];
        for (let c = 0; c < COLS; c++) {
          cells[r][c] = {
            char: chars[Math.floor(Math.random() * chars.length)],
            brightness: 0.15 + Math.random() * 0.25,
            changeTimer: Math.floor(Math.random() * 60),
          };
        }
      }
    };

    init();
    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    const draw = () => {
      const progress = scrollRef.current;

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fontStr = `${FONT_SIZE}px "SF Mono", "Fira Code", "monospace"`;
      ctx.font = fontStr;
      ctx.textBaseline = 'top';

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const cell = cells[r][c];
          const x = c * CHAR_W;
          const y = r * LINE_H;

          cell.changeTimer--;
          if (cell.changeTimer <= 0) {
            cell.char = chars[Math.floor(Math.random() * chars.length)];
            cell.changeTimer = 15 + Math.floor(Math.random() * 50);
            cell.brightness = 0.5 + Math.random() * 0.4;
          }

          cell.brightness = Math.max(0.03, cell.brightness - 0.0012);

          if (Math.random() < 0.001) {
            cell.brightness = 0.65;
          }

          const opacity = cell.brightness * (1 - progress * 0.35);
          ctx.save();
          ctx.translate(x, y);
          ctx.scale(1, VERT_STRETCH);
          ctx.fillStyle = `rgba(200, 180, 150, ${opacity})`;
          ctx.fillText(cell.char, 0, 0);
          ctx.restore();
        }
      }

      // 暗化覆盖（减轻）
      if (progress > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${progress * 0.3})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // 暗角
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const maxR = Math.max(canvas.width, canvas.height) * 0.7;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.12)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
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
  );
}

export default CanvasBackground;
