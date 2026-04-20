import React from 'react';
import {
  BatteryCharging,
  Bluetooth,
  Search,
  SlidersHorizontal,
  Wifi,
} from 'lucide-react';
import { FaApple } from 'react-icons/fa6';
import { useHomeDockChrome } from '../context/HomeDockChromeContext';

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
  const [now, setNow] = React.useState(() => new Date());

  React.useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[51] select-none pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${visible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0'
        }`}
    >
      <div className="flex h-8 items-center justify-between border-b border-white/10 bg-black/25 px-3 text-[12px] text-neutral-800 backdrop-blur-xl dark:text-neutral-200/95 sm:px-4">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <span className="flex shrink-0 items-center gap-1.5 text-neutral-900 dark:text-neutral-100">
            <FaApple className="h-[15px] w-[15px] opacity-90" aria-hidden />
            <span className="hidden font-semibold tracking-tight sm:inline">
              Niranjan das
            </span>
          </span>
          <nav
            className="hidden min-w-0 items-center gap-1 text-[11px] font-medium tracking-wide text-neutral-700/95 md:flex dark:text-neutral-300/95"
            aria-label="Menu"
          >
            {MENU_ITEMS.map((item) => (
              <span
                key={item}
                className="cursor-default rounded px-1.5 py-0.5 hover:bg-white/10"
              >
                {item}
              </span>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2.5 text-neutral-700 dark:text-neutral-300 sm:gap-3">
          <Bluetooth className="hidden h-3.5 w-3.5 opacity-80 sm:block" strokeWidth={2} />
          <Wifi className="h-3.5 w-3.5 opacity-90" strokeWidth={2} />
          <BatteryCharging className="h-3.5 w-3.5 opacity-90" strokeWidth={2} />
          <Search className="h-3.5 w-3.5 opacity-85" strokeWidth={2} />
          <SlidersHorizontal className="h-3.5 w-3.5 opacity-85" strokeWidth={2} />
          <span
            className="hidden tabular-nums text-[11px] tracking-tight text-neutral-800 dark:text-neutral-200/95 lg:inline"
            suppressHydrationWarning
          >
            {formatMenuBarTime(now)}
          </span>
        </div>
      </div>
    </div>
  );
}
