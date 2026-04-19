import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Home, StickyNote, Folder, Contact, Mail } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import { useLenis } from 'lenis/react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import homeIcon from '../assets/home-icon.png';

interface DockItemType {
  icon: React.ReactNode;
  label: string;
  id?: string;
  url?: string;
}

const dockItems: DockItemType[] = [
  {
    icon: <img src={homeIcon} alt="Home" className="w-full h-full object-cover rounded-xl" />,
    label: 'Home',
    id: 'home'
  },
  { icon: <StickyNote size={18} />, label: 'Notes', id: 'about' },
  { icon: <Folder size={18} />, label: 'Files', id: 'projects' },
  { icon: <SiLeetcode size={18} />, label: 'LeetCode', url: 'https://leetcode.com' },
  { icon: <FaGithub size={18} />, label: 'GitHub', url: 'https://github.com' },
  { icon: <FaLinkedinIn size={18} />, label: 'LinkedIn', url: 'https://linkedin.com' },
  { icon: <Contact size={18} />, label: 'Contacts', id: 'contact' },
];

function DockItem({
  icon,
  label,
  mouseX,
  onClick
}: {
  icon: React.ReactNode;
  label: string;
  mouseX: any;
  onClick: () => void
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-100, 0, 100], [38, 60, 38]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 15 });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={onClick}
      className="aspect-square rounded-2xl bg-white/5 border border-white/10 backdrop-blur-3xl flex items-center justify-center text-white/80 cursor-pointer hover:bg-white/10 hover:border-white/20 transition-all duration-300 relative group"
    >
      {icon}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/5 scale-90 group-hover:scale-100">
        {label}
      </span>
    </motion.div>
  );
}

export default function HomeDock() {
  const mouseX = useMotionValue(Infinity);
  const lenis = useLenis();
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      // Hide dock when scrolled down past a certain threshold (transition to next section)
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (item: DockItemType) => {
    if (item.url) {
      window.open(item.url, '_blank');
      return;
    }

    const id = item.id;
    if (id === 'home') {
      lenis?.scrollTo(0, { duration: 1.5 });
    } else {
      lenis?.scrollTo(`#${id}`, { offset: -20, duration: 1.5 });
    }
  };

  return (
    <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-50 pointer-events-auto transition-all duration-500 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
    }`}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex items-end gap-2 px-3 py-2.5 bg-white/[0.04] border border-white/5 backdrop-blur-3xl rounded-[1.8rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] h-[58px]"
      >
        {dockItems.map((item, idx) => (
          <div key={idx} className="relative h-full flex items-center">
            <DockItem
              icon={item.icon}
              label={item.label}
              mouseX={mouseX}
              onClick={() => handleNavClick(item)}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
