import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const mainNav = [
  { label: 'Home', id: 'Home' },
  { label: 'About', id: 'About' },
  { label: 'Skills', id: 'Skills' },
  { label: 'Projects', id: 'Projects' },
  { label: 'Stats', id: 'Stats' },
  { label: 'Badges', id: 'Badges' },
  { label: 'Education', id: 'Education' },
  { label: 'Contact', id: 'Contact' }
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      // Determine active section based on scroll
      let currentActive = 'Home';
      
      mainNav.forEach((item) => {
        const element = document.getElementById(item.id.toLowerCase());
        if (element) {
          const top = element.offsetTop - 150;
          const height = element.offsetHeight;
          if (currentScroll >= top && currentScroll < top + height) {
            currentActive = item.id;
          }
        }
      });
      
      // If none matched and at top
      if (currentScroll < 150) currentActive = 'Home';
      
      if (mainNav.find(n => n.id === currentActive)) {
          setActiveTab(currentActive);
      } else {
          setActiveTab(''); // e.g. for Contact
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      
      {/* Desktop & Tablet Pill */}
      <div className="pointer-events-auto flex items-center bg-black/80 backdrop-blur-xl border border-white/5 rounded-full p-1.5 h-14 shadow-2xl relative">
        
        {/* Navigation Items */}
        <div className="hidden lg:flex items-center h-full px-2">
          {mainNav.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <a 
                key={item.id}
                href={`#${item.id.toLowerCase()}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative flex items-center h-full px-4 xl:px-5 text-[14px] xl:text-[15px] font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="topIndicator"
                    className="absolute top-[-6px] inset-x-0 mx-auto w-8 h-[3px] bg-white rounded-b-full shadow-[0_0_12px_2px_rgba(255,255,255,0.7)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/20 blur-xl rounded-full pointer-events-none" />
                  </motion.div>
                )}
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Nav Button */}
        <button 
          className="lg:hidden flex items-center justify-center w-12 h-10 text-gray-300 pl-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
           {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Right CTA Button */}
        <a 
          href="#contact" 
          className="ml-2 lg:ml-4 h-full px-6 flex items-center justify-center rounded-full bg-[#2a2a2a] hover:bg-[#333333] border border-white/5 text-white text-[15px] font-medium transition-colors whitespace-nowrap"
        >
          Book a Call
        </a>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[85px] left-4 right-4 bg-black/95 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl pointer-events-auto flex flex-col gap-2 lg:hidden origin-top"
          >
            {mainNav.map(item => (
              <a 
                key={item.id}
                href={`#${item.id.toLowerCase()}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-2xl text-base font-medium transition-colors ${
                  activeTab === item.id 
                    ? 'bg-white/10 text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}
