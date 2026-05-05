import { memo } from 'react';
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent-orange/5 rounded-full blur-[120px] pointer-events-none" />

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
              itemSize={80}
              duration={30}
              responsive={true}
              showPath={true}
              pathColor="rgba(196, 82, 26, 0.2)"
              pathWidth={2}
              centerContent={
                <div className="flex flex-col items-center gap-3">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl shadow-xl">
                      <SiGithub className="text-white opacity-80" size={32} />
                    </div>
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center backdrop-blur-xl shadow-xl">
                      <SiLeetcode className="text-amber-500" size={32} />
                    </div>
                  </div>
                  <div className="text-center mt-2">
                    <h3 className="text-xl font-bold tracking-tight text-white">Top Achievements</h3>
                    <p className="text-xs text-text-secondary uppercase tracking-[0.2em] mt-1">GitHub & LeetCode</p>
                  </div>
                </div>
              }
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
});
