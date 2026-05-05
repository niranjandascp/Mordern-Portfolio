"use client"

import { useRef } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/context/ThemeContext"
import { cn } from "@/lib/utils"
import { executeThemeTransition, type TransitionVariant } from "@/lib/theme-transition"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
  variant?: TransitionVariant
  /** When true, the transition expands from the viewport center instead of the button center. */
  fromCenter?: boolean
}

export const AnimatedThemeToggler = ({
  className,
  duration = 600,
  variant = "circle",
  fromCenter = false,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { theme, toggleTheme: contextToggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleToggle = () => {
    executeThemeTransition(contextToggleTheme, {
      element: buttonRef.current || undefined,
      duration,
      variant,
      fromCenter
    })
  }

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={handleToggle}
      className={cn(
        "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-bg-primary/50 border border-border-main text-text-secondary hover:text-text-primary transition-all hover:bg-bg-primary",
        className
      )}
      {...props}
    >
      {isDark ? (
        <Sun size={18} className="text-yellow-400" />
      ) : (
        <Moon size={18} className="text-amber-600" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
