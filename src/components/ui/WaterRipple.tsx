import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface WaterRippleProps {
  color?: string; // hex color
  damping?: number;
  strength?: number;
  radius?: number;
  scale?: number;
}

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 196, g: 82, b: 26 };
}

const WaterRippleBackground: React.FC<WaterRippleProps> = ({
  color = '#C4521A',
  damping = 0.96,
  strength = 20,
  radius = 3,
  scale = 3
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    let W = Math.floor(width / scale);
    let H = Math.floor(height / scale);

    canvas.width = W;
    canvas.height = H;

    let buf1 = new Float32Array(W * H);
    let buf2 = new Float32Array(W * H);

    let imageData = ctx.createImageData(W, H);
    let data = imageData.data;

    const { r, g, b } = hexToRgb(theme === 'dark' ? color : '#e67e22'); // Fallback orange for light mode

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      W = Math.floor(width / scale);
      H = Math.floor(height / scale);
      canvas.width = W;
      canvas.height = H;
      buf1 = new Float32Array(W * H);
      buf2 = new Float32Array(W * H);
      imageData = ctx.createImageData(W, H);
      data = imageData.data;
    };

    window.addEventListener('resize', handleResize);

    // 2. On mousemove — push a disturbance into the buffer
    function addDrop(x: number, y: number, rSize: number, str: number) {
      const scaledX = Math.floor(x / scale);
      const scaledY = Math.floor(y / scale);

      for (let dy = -rSize; dy <= rSize; dy++) {
        for (let dx = -rSize; dx <= rSize; dx++) {
          if (Math.sqrt(dx * dx + dy * dy) <= rSize) {
            const py = scaledY + dy;
            const px = scaledX + dx;
            if (px >= 1 && px < W - 1 && py >= 1 && py < H - 1) {
              buf1[py * W + px] += str;
            }
          }
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      addDrop(e.clientX, e.clientY, radius, strength);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        addDrop(e.touches[0].clientX, e.touches[0].clientY, radius, strength);
      }
    }

    const handleClick = (e: MouseEvent) => {
      addDrop(e.clientX, e.clientY, radius * 4, strength * 4);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('click', handleClick);

    let animationFrameId: number;

    const render = () => {
      // 3. Each frame — propagate waves + dampen
      for (let y = 1; y < H - 1; y++) {
        for (let x = 1; x < W - 1; x++) {
          const i = y * W + x;
          buf2[i] = (buf1[i - 1] + buf1[i + 1] + buf1[i - W] + buf1[i + W]) / 2 - buf2[i];
          buf2[i] *= damping; // damping — lower = dies faster

          const val = buf2[i];
          const idx = i * 4;

          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;

          // Visualize the wave by mapping amplitude to alpha
          let alpha = Math.max(0, Math.min(255, Math.abs(val) * 1.5));
          data[idx + 3] = alpha;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // swap
      let temp = buf1;
      buf1 = buf2;
      buf2 = temp;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, damping, strength, radius, scale, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none mix-blend-screen z-0 opacity-80 ${theme === 'dark' ? 'mix-blend-screen' : 'mix-blend-multiply opacity-30'
        }`}
    />
  );
};

export default WaterRippleBackground;
