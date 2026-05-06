import { useRef, memo } from 'react';
// Stick to one entry point for the library
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiPrisma,
  SiGit,
  SiGithub,
  SiVercel,
  SiDocker,
  SiLinux,
  SiHtml5,
  SiNestjs,
  SiRedis,
  SiBitbucket,
  SiPostman,
  SiFigma,
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { IoLogoCss3 } from 'react-icons/io';
import { VscVscode } from 'react-icons/vsc';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ScrollHeading from '@/components/ui/ScrollHeading';

const techStack = [
  { name: 'Html5', icon: SiHtml5, color: '#E34F26' },
  { name: 'Css3', icon: IoLogoCss3, color: '#1572B6' },
  { name: 'ReactJS', icon: SiReact, color: '#61DAFB' },
  { name: 'NextJS', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'NodeJS', icon: SiNodedotjs, color: '#339933' },
  { name: 'ExpressJS', icon: SiExpress, color: '#ffffff' },
  { name: 'Nestjs', icon: SiNestjs, color: '#E0234E' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Prisma', icon: SiPrisma, color: '#ffffff' },
  { name: 'Redis', icon: SiRedis, color: '#FF4438' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
  { name: 'AWS', icon: FaAws, color: '#FF9900' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Bitbucket', icon: SiBitbucket, color: '#47A248' },
  { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
  { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
  { name: 'Linux', icon: SiLinux, color: '#FCC624' },
];

export default memo(function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Rotate from 0 to 180 degrees as user scrolls strictly past the section
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-12 sm:py-24 relative overflow-hidden transition-colors"
    >
      {/* Background Rotating Fan Image Layer */}
      <div className="absolute inset-0 w-full opacity-80 mix-blend-multiply dark:mix-blend-screen pointer-events-none flex items-center justify-center transition-opacity">
        <motion.img
          src="/abstract-fan.png"
          alt="Abstract 3D Shape"
          style={{ rotate }}
          className="w-[700px] h-[700px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] lg:w-[1050px] lg:h-[1050px] object-contain origin-center will-change-transform"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col items-center pt-12 sm:pt-24">
        {/* Header Title Section */}
        <ScrollHeading className="text-center mb-8 sm:mb-16">
          <p className="text-text-secondary uppercase tracking-[0.2em] text-[10px] sm:text-xs font-semibold mb-2 sm:mb-4">
            My Skillset
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-text-primary mb-2">
            The Magic{' '}
            <span className="font-serif italic bg-gradient-to-r from-orange-400 to-orange-400 bg-clip-text text-transparent pr-1 sm:pr-2">
              Behind
            </span>
          </h2>
        </ScrollHeading>

        {/* Skills Floating Cloud Grid */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 max-w-4xl mx-auto bg-bg-secondary/30 border border-border-main rounded-2xl sm:rounded-[2rem] p-4 sm:p-12 shadow-2xl">
          {techStack.map((skill, idx) => {
            const Icon = skill.icon;
            const iconColor = skill.color;

            return (
              <ScrollReveal
                key={skill.name}
                animationNum={idx}
                direction="alternate"
                staggerDelay={0.03}
                duration={0.6}
                distance={20}
                className="relative flex items-center gap-1.5 sm:gap-2.5 px-3.5 py-1.5 sm:px-6 sm:py-3
                  bg-bg-secondary/50
                  backdrop-blur-md
                  border border-border-main
                  rounded-full
                  shadow-xl
                  hover:bg-bg-secondary/80
                  transition-all duration-500
                  cursor-pointer group overflow-hidden z-10"
              >
                {/* Liquid Glass Inner Highlight */}
                <div className="absolute inset-0 rounded-full w-full h-full pointer-events-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]" />

                {/* Sweeping Shine Hover Effect */}
                <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[150%] skew-x-[30deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />

                <Icon
                  className="text-lg sm:text-xl group-hover:scale-125 group-hover:rotate-6 transition-transform duration-500 ease-out relative z-10 drop-shadow-md"
                  style={{ color: (skill.color === '#ffffff' || skill.color === '#FFFFFF') ? undefined : skill.color }}
                />
                <span className="text-[12px] sm:text-[14px] font-bold text-text-secondary group-hover:text-text-primary transition-colors duration-300 relative z-10">
                  {skill.name}
                </span>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
});
