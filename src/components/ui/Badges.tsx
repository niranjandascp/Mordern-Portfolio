import { memo } from 'react';
import { motion } from 'motion/react';
import ScrollHeading from '@/components/ui/ScrollHeading';
import ScrollReveal from '@/components/ui/ScrollReveal';
import OrbitImages from '@/components/ui/OrbitImages';
import { SiGithub, SiLeetcode } from 'react-icons/si';

import quickdraw from '@/assets/badges/quickdraw.png';
import pairExtraordinaire from '@/assets/badges/pair-extraordinaire.png';
import yolo from '@/assets/badges/yolo.png';
import pullShark from '@/assets/badges/pull-shark.png';
import starstruck from '@/assets/badges/starstruck.png';
import topSql50 from '@/assets/badges/top-sql-50.gif';

const images = [
  quickdraw,
  pairExtraordinaire,
  yolo,
  pullShark,
  starstruck,
  topSql50
];

export default memo(function Badges() {
  return (
    <section id="badges" className="py-16 sm:py-24 relative transition-colors overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-orange/10 dark:bg-accent-orange/5 rounded-full blur-[120px] pointer-events-none transition-colors" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ─── Section Header ─── */}
        <ScrollHeading className="text-center mb-14 sm:mb-20">
          <p className="text-text-secondary uppercase tracking-[0.25em] text-xs font-semibold mb-4">
            Achievements Unlocked
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-text-primary mb-6">
            Badges <span className="font-serif italic bg-gradient-to-r from-accent-orange to-accent-blue bg-clip-text text-transparent">&amp; Trophies</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-orange to-transparent mx-auto rounded-full" />
        </ScrollHeading>

        {/* ═══════════ BADGES ORBIT ═══════════ */}
        <ScrollReveal animationNum={0} direction="up">
          <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center pt-8 sm:pt-12">
            <OrbitImages
              images={images}
              shape="ellipse"
              radiusX={370}
              radiusY={130}
              baseWidth={800}
              baseHeight={400}
              itemSize={80}
              duration={30}
              responsive={true}
              showPath={true}
              pathColor="rgba(196, 82, 26, 0.3)"
              pathWidth={2}
              centerContent={
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, type: "spring", bounce: 0.5, delay: 0.3 }}
                  className="flex flex-col items-center gap-2 sm:gap-3"
                >
                  <div className="flex gap-2 sm:gap-4">
                    <div className="w-8 h-8 sm:w-16 sm:h-16 rounded-full bg-bg-secondary border border-border-main flex items-center justify-center backdrop-blur-xl shadow-lg transition-all">
                      <SiGithub className="text-text-primary opacity-90 w-4 h-4 sm:w-8 sm:h-8 transition-colors" />
                    </div>
                    <div className="w-8 h-8 sm:w-16 sm:h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center backdrop-blur-xl shadow-lg transition-all">
                      <SiLeetcode className="text-amber-500 w-4 h-4 sm:w-8 sm:h-8 transition-colors" />
                    </div>
                  </div>
                  <div className="text-center mt-1 sm:mt-2">
                    <h3 className="text-xs sm:text-xl font-bold tracking-tight text-text-primary transition-colors">Top Achievements</h3>
                    <p className="text-[8px] sm:text-xs text-text-secondary uppercase tracking-[0.2em] mt-0.5 sm:mt-1">GitHub & LeetCode</p>
                  </div>
                </motion.div>
              }
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});
