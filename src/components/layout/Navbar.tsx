import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { useTheme } from '@/context/ThemeContext';
import { useHomeDockChrome } from '@/context/HomeDockChromeContext';

const mainNav = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Stats', id: 'stats' },
  { label: 'Badges', id: 'badges' },
  { label: 'Education', id: 'education' },
  { label: 'Contact', id: 'contact' },
];

// Magnetic component specifically for the 'Hire Me' button
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const moveX = clientX - centerX;
    const moveY = clientY - centerY;
    x.set(moveX * 0.35);
    y.set(moveY * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

// FlipLink component for professional hover effects
function FlipLink({
  children,
  href,
  isActive,
  onClick,
  onMouseEnter,
}: {
  children: string;
  href: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  onMouseEnter: () => void;
}) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      initial="initial"
      whileHover="hovered"
      className={`relative flex items-center h-full px-4 xl:px-5 overflow-hidden whitespace-nowrap text-[14px] xl:text-[15px] font-medium transition-colors duration-300 ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
        }`}
    >
      <motion.div
        variants={{
          initial: { y: 0 },
          hovered: { y: '-100%' },
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col h-full"
      >
        <span className="flex h-full items-center">{children}</span>
        <span className="flex h-full items-center absolute top-full left-0">{children}</span>
      </motion.div>
    </motion.a>
  );
}

const navContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
    pointerEvents: 'none',
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    }
  },
  visible: {
    opacity: 1,
    y: 0,
    pointerEvents: 'auto',
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Navbar() {
  const { activeTab, setActiveTab } = useHomeDockChrome();
  const { theme, toggleTheme } = useTheme();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lenis = useLenis();

  const handleNavClick = useCallback(
    (id: string) => {
      if (id === 'home') {
        lenis?.scrollTo(0, { duration: 1.5 });
      } else {
        const target = document.getElementById(id);
        if (target) {
          lenis?.scrollTo(target, { offset: -20, duration: 1.5 });
        }
      }
      setActiveTab(id);
      setIsMobileMenuOpen(false);
    },
    [lenis, setActiveTab]
  );

  // ELITE NAVIGATION TRACKING: Using IntersectionObserver for 100% accuracy
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px', // Focus tracking on the screen center
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (mainNav.find((n) => n.id === sectionId)) {
            setActiveTab(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    mainNav.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 100);

      // Force Home active at the absolute top
      if (currentScrollY < 150) setActiveTab('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {activeTab !== 'home' && (
        <motion.nav
          variants={navContainerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={`fixed left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 top-3`}
          style={{ perspective: '1000px' }}
        >
          {/* Desktop & Tablet Pill */}
          <motion.div
            animate={{
              scale: isScrolled ? 1.02 : 1,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className={`pointer-events-auto flex items-center bg-[#0c0c0e]/30 [body.light_&]:bg-white/40 border border-white/10 [body.light_&]:border-black/5 rounded-full p-1.5 shadow-2xl relative transition-all duration-300 backdrop-blur-[50px] ${isScrolled ? 'h-16' : 'h-14'
              }`}
            style={{
              boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
            }}
          >
            {/* Navigation Items */}
            <div
              className="hidden lg:flex items-center h-full px-2"
              onMouseLeave={() => setHoveredTab(null)}
            >
              {mainNav.map((item) => {
                const isActive = activeTab === item.id;
                const isHovered = hoveredTab === item.id;

                return (
                  <motion.div
                    key={item.id}
                    variants={navItemVariants}
                    className="h-full relative flex items-center"
                  >
                    <FlipLink
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.id);
                      }}
                      onMouseEnter={() => setHoveredTab(item.id)}
                      isActive={isActive}
                    >
                      {item.label}
                    </FlipLink>

                    {/* Active Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="topIndicator"
                        className="absolute top-[-6px] inset-x-0 mx-auto w-8 h-[3px] bg-[#C4521A] rounded-b-full shadow-[0_0_12px_2px_rgba(196,82,26,0.4)]"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-[#C4521A]/20 blur-xl rounded-full pointer-events-none" />
                      </motion.div>
                    )}

                    {/* Ghost Hover Indicator */}
                    <AnimatePresence>
                      {isHovered && !isActive && (
                        <motion.div
                          layoutId="hoverIndicator"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute inset-0 bg-text-primary/5 rounded-full -z-10"
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Nav Button */}
            <motion.button
              variants={navItemVariants}
              className="lg:hidden flex items-center justify-center w-12 h-10 text-text-secondary pl-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>

            {/* Right Section: Theme Toggle & CTA */}
            <div className="flex items-center gap-2 ml-2 lg:ml-4 pr-2 h-full">
              <motion.button
                variants={navItemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-bg-primary/50 border border-border-main text-text-secondary hover:text-text-primary transition-all hover:bg-bg-primary"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? (
                  <Sun size={18} className="text-yellow-400" />
                ) : (
                  <Moon size={18} className="text-amber-600" />
                )}
              </motion.button>

              <motion.div
                variants={navItemVariants}
                className="h-full flex items-center pr-2"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Magnetic>
                  <motion.a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick('contact');
                    }}
                    whileHover="hover"
                    initial="initial"
                    className="relative h-10 lg:h-11 px-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#C4521A] to-orange-500 text-white border border-white/20 text-[15px] font-bold transition-all whitespace-nowrap group z-30"
                    style={{
                      boxShadow: '0 0 20px rgba(196, 82, 26, 0.3)',
                    }}
                    variants={{
                      hover: {
                        z: 50,
                        scale: 1.05,
                        boxShadow: '0 0 35px rgba(196, 82, 26, 0.6)',
                      },
                    }}
                  >
                    {/* Aura Glow Effect - Pulsating background radiance */}
                    <motion.div
                      variants={{
                        initial: { scale: 0.8, opacity: 0.4 },
                        hover: { scale: 1.5, opacity: 0.7 },
                      }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror' }}
                      className="absolute inset-0 bg-gradient-to-r from-[#C4521A]/40 to-orange-500/40 blur-3xl -z-10 pointer-events-none"
                    />

                    <span className="relative flex items-center gap-2 z-30">
                      Hire Me
                      <motion.span
                        variants={{
                          initial: { x: -10, opacity: 0, width: 0 },
                          hover: { x: 0, opacity: 1, width: 'auto' },
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      >
                        <ArrowRight size={18} />
                      </motion.span>
                    </span>
                  </motion.a>
                </Magnetic>
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[85px] left-4 right-4 bg-bg-secondary/95 border border-border-main rounded-3xl p-4 shadow-2xl pointer-events-auto flex flex-col gap-2 lg:hidden origin-top"
              >
                {mainNav.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.id);
                    }}
                    className={`px-4 py-3 rounded-2xl text-base font-medium transition-colors ${activeTab === item.id
                        ? 'bg-[#C4521A]/10 text-[#C4521A]'
                        : 'text-text-secondary hover:text-text-primary hover:bg-bg-primary/50'
                      }`}
                  >
                    {item.label}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
