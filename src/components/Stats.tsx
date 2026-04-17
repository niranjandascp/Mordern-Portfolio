import { useRef, useState, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';

export default function Stats() {
  const username = "niranjandascp";
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const tiltX = ((y - cy) / cy) * -5;
    const tiltY = ((x - cx) / cx) * 5;
    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight(prev => ({ ...prev, opacity: 0 }));
    setIsHovered(false);
  };

  return (
    <section id="stats" className="py-24 relative overflow-hidden transition-colors">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-text-secondary uppercase tracking-[0.2em] text-xs font-semibold mb-4">Developer Metrics</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-text-primary mb-4">
            GitHub <span className="font-serif italic bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">Analytics</span>
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto text-sm leading-relaxed">
            Code that lives, breathes, and contributes — open source and beyond.
          </p>
        </motion.div>

        <div className="flex flex-col gap-16">

          {/* GitHub Contributions Calendar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: '1500px' }}
          >
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                transformStyle: 'preserve-3d',
                boxShadow: isHovered ? `0 25px 80px rgba(59, 130, 246, 0.1), 0 0 50px rgba(139, 92, 246, 0.05)` : '0 10px 40px rgba(0,0,0,0.05)',
              }}
              className="relative bg-white/[0.03] backdrop-blur-xl border border-border-main rounded-[2.5rem] px-8 py-10 overflow-hidden cursor-default group transition-colors duration-300"
            >
              {/* Spotlight Effect */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 400px at ${spotlight.x}% ${spotlight.y}%, rgba(59, 130, 246, 0.1), transparent)`,
                  opacity: spotlight.opacity,
                }}
              />

              {/* Calendar content */}
              <div className="relative z-10 flex justify-center overflow-x-auto pb-2 scrollbar-hide" style={{ transform: 'translateZ(20px)' }}>
                <GitHubCalendar
                  username={username}
                  colorScheme="dark"
                  theme={{
                    dark: ['#1a2332', '#1e3a5f', '#1d4ed8', '#3b82f6', '#93c5fd'],
                  }}
                  fontSize={13}
                  blockSize={14}
                  blockMargin={4}
                  blockRadius={3}
                />
              </div>
            </div>
          </motion.div>

          {/* LeetCode Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-text-primary uppercase tracking-widest mb-6 flex items-center gap-3 opacity-60">
              <span className="flex-1 h-px bg-border-main" />
              LeetCode Journey
              <span className="flex-1 h-px bg-border-main" />
            </h3>
            <div className="flex justify-center">
              <img
                src={`https://leetcard.jacoblin.cool/${username}?theme=dark&font=Inter&ext=activity`}
                alt="LeetCode Stats"
                className="w-full max-w-lg rounded-2xl shadow-xl dark:shadow-[0_0_30px_rgba(255,161,22,0.08)]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
