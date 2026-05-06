import { useRef, memo, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { GraduationCap, Calendar, School, BookOpen } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ScrollHeading from '@/components/ui/ScrollHeading';

const educationList = [
  {
    degree: 'Full Stack Development (MERN)',
    institution: 'G Tech - Computer Education',
    duration: 'Jul 2025 – May 2026',
    // description: 'Specializing in Machine Learning and Distributed Systems. Research focused on scalable AI architectures.',
    icon: <GraduationCap size={28} />,
    color: 'from-blue-500/20 to-cyan-500/20',
    accent: '#3b82f6'
  },
  {
    degree: 'Senior Secondary (Plus Two)',
    institution: 'National HSS, Irinjalakuda',
    duration: 'Jul 2023 – Mar 2025',
    // description: 'Full-stack development focus with honors. Developed multiple production-scale web applications.',
    icon: <BookOpen size={28} />,
    color: 'from-orange-500/20 to-rose-500/20',
    accent: '#f97316'
  },
  {
    degree: 'Higher Secondary Education',
    institution: 'St. Mary\'s HSS Irinjalakuda',
    duration: 'June 2022 – Mar 2023',
    // description: 'Secured 95% in Mathematics and Physics. Core focus on foundational computer science principles.',
    icon: <School size={28} />,
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: '#10b981'
  },
];

function ThreeDEducationCard({ edu, idx }: { edu: typeof educationList[0], idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 150 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 150 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <ScrollReveal animationNum={idx} direction={idx % 2 === 0 ? "left" : "right"} className="w-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
        className="relative group w-full cursor-default"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-4 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500 rounded-[2rem] pointer-events-none z-0"
          style={{
            backgroundColor: `${edu.accent}10`,
            x: useTransform(x, [-0.5, 0.5], [-30, 30]),
            y: useTransform(y, [-0.5, 0.5], [-30, 30]),
          }}
        />

        <div className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-8 overflow-hidden shadow-2xl shadow-black/20">
          <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }} className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            {/* Icon Column */}
            <div className={`shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${edu.color} border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
              <div style={{ color: edu.accent }}>
                {edu.icon}
              </div>
            </div>

            {/* Main Content Column */}
            <div className="flex-grow space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">
                  {edu.degree}
                </h3>
                <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-text-secondary w-fit">
                  <Calendar size={14} className="opacity-60" />
                  <span>{edu.duration}</span>
                </div>
              </div>

              <h4 className="text-lg font-semibold text-accent-orange opacity-90">
                {edu.institution}
              </h4>

              {/* description removed */}
            </div>

            {/* Vertical Accent Line (Right side for desktop) */}
            <div className="hidden md:block w-1 h-20 rounded-full bg-white/5 overflow-hidden shrink-0">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 + idx * 0.2 }}
                className="w-full rounded-full"
                style={{ backgroundColor: edu.accent }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default memo(function Education() {
  return (
    <section id="education" className="py-32 relative overflow-hidden transition-colors">
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <ScrollHeading className="text-center mb-24">
          <p className="text-accent-orange font-mono text-sm uppercase tracking-[0.3em] mb-4">Academic Journey</p>
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter text-text-primary">
            Education
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-accent-orange to-transparent mx-auto rounded-full" />
        </ScrollHeading>

        <div className="space-y-12">
          {educationList.map((edu, idx) => (
            <ThreeDEducationCard key={idx} edu={edu} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
});

