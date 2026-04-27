import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useHomeDockChrome } from '@/context/HomeDockChromeContext';

// Asset Imports
import homeIcon from '@/assets/home-icon.png';
import safariIcon from '@/assets/safari.png';
import whatsappIcon from '@/assets/whatsapp.png';
import notesIcon from '@/assets/notes.png';
import finderIcon from '@/assets/finder.png';
import githubIcon from '@/assets/github.png';
import leetcodeIcon from '@/assets/leetcode.png';
import booksIcon from '@/assets/books.png';
import mailIcon from '@/assets/mail.png';
import terminalIcon from '@/assets/terminal.png';
import vscodeIcon from '@/assets/vscode.png';
import settingsIcon from '@/assets/setting.png';

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
  { icon: githubIcon, label: 'GitHub', url: 'https://github.com/niranjandascp' },
  { icon: leetcodeIcon, label: 'LeetCode', url: 'https://leetcode.com/u/niranjandascp/' },
  { icon: booksIcon, label: 'Books', id: 'education' },
  { icon: whatsappIcon, label: 'WhatsApp', url: 'https://wa.me/918921627502' },
  { icon: mailIcon, label: 'Mail', url: 'mailto:niranjandas.dev@gmail.com' },
];

const secondaryDockItems: DockItemType[] = [
  { icon: terminalIcon, label: 'Terminal', url: '#' },
  { icon: vscodeIcon, label: 'VS Code', url: '#' },
  { icon: settingsIcon, label: 'Settings', url: '#' },
];

const DOCK_HOVER_SCALE = 1.55;

function DockItem({
  icon,
  label,
  onClick,
  terminalOpen,
  vscodeOpen,
}: {
  icon: string | React.ReactNode;
  label: string;
  onClick: () => void;
  terminalOpen?: boolean;
  vscodeOpen?: boolean;
}) {
  const itemIsTerminal = label === 'Terminal';
  const itemIsVSCode = label === 'VS Code';
  const [hovered, setHovered] = React.useState(false);

  return (
    <div className="relative flex w-[58px] shrink-0 flex-col items-center justify-end gap-0.5 pb-px">
      <div className="relative flex flex-col items-center">
        <AnimatePresence mode="popLayout">
          {hovered && (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, y: 6, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="pointer-events-none absolute bottom-full left-1/2 z-[40] mb-1.5 flex -translate-x-1/2 flex-col items-center"
            >
              <div className="rounded-full border border-white/12 bg-[#2C2C2E]/95 px-3 py-1 text-center text-[12px] font-medium tracking-tight text-white/95 shadow-[0_8px_28px_rgba(0,0,0,0.55)] backdrop-blur-md">
                {label}
              </div>
              <div
                className="-mt-px h-0 w-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-[#2C2C2E]/95 drop-shadow-sm"
                aria-hidden
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ scale: hovered ? DOCK_HOVER_SCALE : 1 }}
          transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          style={{ transformOrigin: '50% 100%' }}
          onClick={onClick}
          aria-label={label}
          className={`relative flex h-14 w-14 shrink-0 cursor-pointer items-center justify-center will-change-transform group ${hovered ? 'z-20' : 'z-10'
            }`}
        >
          <div className="flex h-full w-full items-center justify-center p-1 transition-transform duration-150 group-active:scale-95">
            {typeof icon === 'string' ? (
              <img
                src={icon}
                alt={label}
                className="h-full w-full object-contain pointer-events-none drop-shadow-2xl"
              />
            ) : (
              icon
            )}
          </div>
        </motion.div>
      </div>

      <div className="flex h-1.5 w-full shrink-0 items-center justify-center">
        {label === 'Home' && !itemIsTerminal && !itemIsVSCode && (
          <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-white/45" aria-hidden />
        )}
        {itemIsTerminal && terminalOpen && (
          <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" aria-hidden />
        )}
        {itemIsVSCode && vscodeOpen && (
          <span className="h-[3px] w-[3px] shrink-0 rounded-full bg-[#007ACC] shadow-[0_0_8px_rgba(0,122,204,0.8)]" aria-hidden />
        )}
      </div>
    </div>
  );
}

export default function HomeDock() {
  const { visible: isVisible, setTerminalOpen, terminalOpen, setVscodeOpen, vscodeOpen } = useHomeDockChrome();
  const lenis = useLenis();

  const handleNavClick = (item: DockItemType) => {
    if (item.label === 'Terminal') {
      setTerminalOpen(true);
      return;
    }
    if (item.label === 'VS Code') {
      setVscodeOpen(true);
      return;
    }

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
    <div
      className={`fixed bottom-6 left-1/2 z-50 max-w-[calc(100vw-1.5rem)] -translate-x-1/2 overflow-visible pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'
        }`}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto relative box-border inline-flex h-[76px] max-h-[76px] shrink-0 items-end gap-px overflow-visible rounded-[24px] border border-white/10 [body.light_&]:border-black/5 bg-[#0c0c0e]/30 [body.light_&]:bg-white/40 px-2.5 py-1 shadow-[0_40px_100px_-15px_rgba(0,0,0,1)] [body.light_&]:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] backdrop-blur-[20px] transition-colors"
        style={{
          boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.05) inset, 0 30px 60px -12px rgba(0,0,0,0.5)',
        }}

      >
        <div className="pointer-events-none absolute inset-0 rounded-[24px] border-t border-white/10 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent" />

        <div className="relative z-[1] flex shrink-0 items-end gap-px">
          {mainDockItems.map((item, idx) => (
            <DockItem
              key={`main-${idx}`}
              icon={item.icon}
              label={item.label}
              onClick={() => handleNavClick(item)}
              terminalOpen={terminalOpen}
              vscodeOpen={vscodeOpen}
            />
          ))}
        </div>

        <div
          className="relative z-[1] mx-px flex shrink-0 self-center"
          aria-hidden
        >
          <div className="h-7 w-px rounded-full bg-white/28" />
        </div>

        <div className="relative z-[1] flex shrink-0 items-end gap-px">
          {secondaryDockItems.map((item, idx) => (
            <DockItem
              key={`secondary-${idx}`}
              icon={item.icon}
              label={item.label}
              onClick={() => handleNavClick(item)}
              terminalOpen={terminalOpen}
              vscodeOpen={vscodeOpen}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
