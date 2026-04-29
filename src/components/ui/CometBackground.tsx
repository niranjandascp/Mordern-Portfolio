import React, { useEffect, useRef } from "react";

type Comet = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: { r: number; g: number; b: number };
  size: number;
  trail: { x: number; y: number }[];
  TAIL: number;
  alpha: number;
  fadeIn: boolean;
  life: number;
  decay: number;
  targetX: number;
  targetY: number;
};

export default function CometBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W: number, H: number, animId: number;
    const comets: Comet[] = [];
    const COUNT = 8;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      { r: 255, g: 255, b: 255 },
      { r: 255, g: 210, b: 100 },
      { r: 255, g: 140, b: 42 },
    ];

    function rand(a: number, b: number) { return a + Math.random() * (b - a); }

    function createComet(): Comet {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const fromTop = Math.random() > 0.5;
      const x = fromTop ? rand(W * 0.4, W) : W + 5;
      const y = fromTop ? rand(0, H * 0.15) : rand(0, H * 0.55);

      // Always right → left, slightly downward
      const vx = -rand(0.8, 2.2);
      const vy = rand(0.2, 0.8);

      const TAIL = 28;
      // Pre-fill trail at spawn position
      const trail = Array.from({ length: TAIL }, () => ({ x, y }));

      return {
        x, y, vx, vy,
        color,
        size: rand(0.5, 1.3),
        trail,
        TAIL,
        alpha: 0,
        fadeIn: true,
        life: 1,
        decay: rand(0.004, 0.007),
        targetX: rand(W * 0.2, W * 0.6),
        targetY: rand(H * 0.3, H * 0.75),
      };
    }

    // Stagger initial comets mid-flight
    for (let i = 0; i < COUNT; i++) {
      const c = createComet();
      c.life = rand(0.3, 1);
      c.alpha = c.life;
      c.fadeIn = false;
      const steps = Math.floor(rand(30, 200));
      for (let s = 0; s < steps; s++) {
        c.x += c.vx;
        c.y += c.vy;
        c.trail.push({ x: c.x, y: c.y });
        if (c.trail.length > c.TAIL) c.trail.shift();
      }
      comets.push(c);
    }

    const tick = () => {
      ctx.clearRect(0, 0, W, H);

      for (let i = comets.length - 1; i >= 0; i--) {
        const c = comets[i];

        // Move
        c.x += c.vx;
        c.y += c.vy;

        // Push current position into trail ring buffer
        c.trail.push({ x: c.x, y: c.y });
        if (c.trail.length > c.TAIL) c.trail.shift();

        // Fade in
        if (c.fadeIn) {
          c.alpha = Math.min(1, c.alpha + 0.02);
          if (c.alpha >= 0.95) c.fadeIn = false;
        }

        c.life -= c.decay;

        // Distance to vanish point
        const dx = c.x - c.targetX;
        const dy = c.y - c.targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Master alpha fades near vanish point and end of life
        const masterAlpha = Math.max(
          0,
          Math.min(c.alpha, Math.min(c.life * 2.5, dist / 90))
        );

        if (c.life <= 0 || dist < 20 || masterAlpha < 0.01) {
          comets.splice(i, 1);
          setTimeout(() => comets.push(createComet()), rand(400, 1800));
          continue;
        }

        const { r, g, b } = c.color;
        const trail = c.trail;
        const len = trail.length;

        // Draw tail through actual position history
        // trail[0] = oldest (tip), trail[len-1] = newest (head)
        for (let t = 1; t < len; t++) {
          const p0 = trail[t - 1];
          const p1 = trail[t];
          const progress = t / (len - 1); // 0=tip → 1=head
          const segAlpha = masterAlpha * Math.pow(progress, 1.8);
          const width = Math.max(0.3, c.size * progress * 1.4);

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = `rgba(${r},${g},${b},${segAlpha})`;
          ctx.lineWidth = width;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();
        }

        // Head glow
        const head = trail[len - 1];
        const glow = ctx.createRadialGradient(
          head.x, head.y, 0,
          head.x, head.y, c.size * 5
        );
        glow.addColorStop(0, `rgba(${r},${g},${b},${masterAlpha * 0.6})`);
        glow.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath();
        ctx.arc(head.x, head.y, c.size * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Head dot
        ctx.beginPath();
        ctx.arc(head.x, head.y, c.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${masterAlpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-20 z-0"
    />
  );
}
