import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';

// Asset Imports
import homeIcon from '../assets/home-icon.png';
import safariIcon from '../assets/safari.png';
import whatsappIcon from '../assets/whatsapp.png';
import notesIcon from '../assets/notes.png';
import finderIcon from '../assets/finder.png';
import githubIcon from '../assets/github.png';
import leetcodeIcon from '../assets/leetcode.png';
import booksIcon from '../assets/books.png';
import mailIcon from '../assets/mail.png';
import terminalIcon from '../assets/terminal.png';
import vscodeIcon from '../assets/vscode.png';
import settingsIcon from '../assets/setting.png';

interface DockItemType {
  icon: string | React.ReactNode;
  label: string;
  id?: string;
  url?: string;
}

const mainDockItems: DockItemType[] = [
  { icon: homeIcon, label: 'Home', url: '/' },
  { icon: notesIcon, label: 'About', id: 'about' },
  { icon: safariIcon, label: 'Skills', id: 'skills' },
  { icon: finderIcon, label: 'Projects', id: 'projects' },
  { icon: githubIcon, label: 'GitHub', url: 'https://github.com' },
  { icon: leetcodeIcon, label: 'LeetCode', url: 'https://leetcode.com' },
  { icon: booksIcon, label: 'Books', id: 'education' },
  { icon: whatsappIcon, label: 'WhatsApp', url: 'https://whatsapp.com' },
  { icon: mailIcon, label: 'Mail', id: 'contact' },
];

const secondaryDockItems: DockItemType[] = [
  { icon: terminalIcon, label: 'Terminal', url: '#' },
  { icon: vscodeIcon, label: 'VS Code', url: '#' },
  { icon: settingsIcon, label: 'Settings', url: '#' },
];

function DockItem({
  icon,
  label,
  mouseX,
  onClick
}: {
  icon: string | React.ReactNode;
  label: string;
  mouseX: any;
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [52, 82, 52]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <div className="relative flex flex-col items-center">
      {/* Glossy Label Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-16 px-4 py-1.5 bg-[#1C1C1E]/80 backdrop-blur-2xl text-white text-[13px] font-medium rounded-xl border border-white/10 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.6)] pointer-events-none whitespace-nowrap z-[60]"
          >
            {label}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#1C1C1E]/80 rotate-45 border-r border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={ref}
        style={{ width }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className="aspect-square relative flex items-center justify-center cursor-pointer group origin-bottom"
      >
        <div className="w-full h-full p-2 flex items-center justify-center relative z-10 transition-transform duration-300 group-active:scale-90">
          {typeof icon === 'string' ? (
            <img
              src={icon}
              alt={label}
              className="w-full h-full object-contain pointer-events-none drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          )}
        </div>

        {/* Dynamic Reflection */}
        <div className="absolute -bottom-[35%] inset-x-0 h-full pointer-events-none opacity-[0.15] blur-[2px] overflow-hidden scale-y-[-1] mask-gradient-to-t">
          {typeof icon === 'string' ? (
            <img src={icon} alt="" className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">{icon}</div>
          )}
        </div>

        {/* Active Application Dot */}
        {label === 'VS Code' && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white/80 rounded-full blur-[0.5px] shadow-[0_0_10px_rgba(255,255,255,1)]" />
        )}
      </motion.div>
    </div>
  );
}

export default function HomeDock() {
  const mouseX = useMotionValue(Infinity);
  const lenis = useLenis();
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: DockItemType) => {
    if (item.url && item.url !== '#' && item.url !== '/') {
      window.open(item.url, '_blank');
      return;
    }

    const id = item.id;
    if (id) {
      lenis?.scrollTo(`#${id}`, { offset: -20, duration: 1.5 });
    } else if (item.url === '/') {
      lenis?.scrollTo(0, { duration: 1.5 });
    }
  };

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
    }`}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto flex items-end gap-3 px-5 py-4 bg-white/[0.03] border border-white/20 backdrop-blur-[45px] rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] relative after:absolute after:inset-0 after:rounded-[3rem] after:bg-gradient-to-b after:from-white/10 after:to-transparent after:opacity-10 after:pointer-events-none"
      >
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none border-t border-l border-white/20" />

        <div className="flex items-end gap-3.5">
          {mainDockItems.map((item, idx) => (
            <DockItem
              key={`main-${idx}`}
              icon={item.icon}
              label={item.label}
              mouseX={mouseX}
              onClick={() => handleNavClick(item)}
            />
          ))}
        </div>

        <div className="w-[1px] h-12 bg-white/10 mx-2 self-center opacity-40" />

        <div className="flex items-end gap-3.5">
          {secondaryDockItems.map((item, idx) => (
            <DockItem
              key={`secondary-${idx}`}
              icon={item.icon}
              label={item.label}
              mouseX={mouseX}
              onClick={() => handleNavClick(item)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
