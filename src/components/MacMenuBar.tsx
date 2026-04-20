import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BatteryCharging,
  Bluetooth,
  Search,
  SlidersHorizontal,
  Wifi,
  Sun,
  Moon,
} from 'lucide-react';
import { FaApple } from 'react-icons/fa6';
import { useHomeDockChrome } from '../context/HomeDockChromeContext';
import { useTheme } from '../context/ThemeContext';
import { Switch } from './ui/interfaces-switch';

const MENU_ITEMS = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'] as const;

function formatMenuBarTime(d: Date) {
  return d.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * macOS-style top menu strip — visibility matches {@link HomeDock} (near top of page only).
 */
export default function MacMenuBar() {
  const { visible } = useHomeDockChrome();
  const { theme, toggleTheme } = useTheme();
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[51] select-none pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'
        }`}
    >
      <div
        className="relative flex h-9 items-center justify-between border-b border-white/10 bg-black/10 dark:bg-white/5 px-3 text-[12px] text-[var(--color-text-primary)] backdrop-blur-[40px] sm:px-4 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
        style={{
          boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.1), 0 1px 0 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Subtle top edge highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <span className="flex shrink-0 items-center gap-1.5 font-bold">
            <FaApple className="h-[15px] w-[15px] opacity-90" aria-hidden />
            <span className="hidden tracking-tight sm:inline">
              Niranjan das
            </span>
          </span>
          <nav
            className="hidden min-w-0 items-center gap-1 text-[11px] font-medium tracking-wide opacity-90 md:flex"
            aria-label="Menu"
          >
            {MENU_ITEMS.map((item) => (
              <span
                key={item}
                className="cursor-default rounded px-1.5 py-0.5 hover:bg-white/10 transition-colors"
              >
                {item}
              </span>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 opacity-90 sm:gap-3">
          <Bluetooth className="hidden h-3.5 w-3.5 sm:block" strokeWidth={2} />
          <Wifi className="h-3.5 w-3.5" strokeWidth={2} />
          <BatteryCharging className="h-3.5 w-3.5" strokeWidth={2} />
          <Search className="h-3.5 w-3.5" strokeWidth={2} />
          <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={2} />

          <div className="flex items-center gap-1.5 px-1.5 pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? (
                  <Moon className="h-3 w-3 text-blue-400" />
                ) : (
                  <Sun className="h-3 w-3 text-orange-500" />
                )}
              </motion.div>
            </AnimatePresence>
            <Switch
              checked={isDark}
              onCheckedChange={toggleTheme}
              className="scale-90"
            />
          </div>

          <span
            className="hidden tabular-nums text-[11px] font-semibold tracking-tight lg:inline"
            suppressHydrationWarning
          >
            {formatMenuBarTime(now)}
          </span>
        </div>
      </div>
    </div>
  );
}
