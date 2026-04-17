import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Custom parsing of " 'wght' 400, 'opsz' 9 "
function parseSettings(settingsStr: string) {
  const settings = new Map<string, number>();
  const regex = /'([^']+)'\s+([\d.]+)/g;
  let match;
  while ((match = regex.exec(settingsStr)) !== null) {
    settings.set(match[1], parseFloat(match[2]));
  }
  return settings;
}

interface VariableProximityProps {
  label: string;
  className?: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef?: React.RefObject<HTMLElement | null>;
  radius?: number;
  falloff?: 'linear' | 'exponential';
}

export default function VariableProximity({
  label,
  className = '',
  fromFontVariationSettings,
  toFontVariationSettings,
  containerRef,
  radius = 100,
  falloff = 'linear'
}: VariableProximityProps) {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  
  useEffect(() => {
    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);
    
    const calculateDistance = (x1: number, y1: number, x2: number, y2: number) => 
      Math.sqrt((x2 - x1)**2 + (y2 - y1)**2);
    
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId);
      
      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        
        letterRefs.current.forEach((letter) => {
          if (!letter) return;
          const rect = letter.getBoundingClientRect();
          const letterCenterX = rect.left + rect.width / 2;
          const letterCenterY = rect.top + rect.height / 2;
          
          const distance = calculateDistance(clientX, clientY, letterCenterX, letterCenterY);
          
          let progress = 0;
          if (distance < radius) {
             progress = 1 - (distance / radius);
             if (falloff === 'exponential') progress = progress ** 2;
          }
          
          // Interpolate current settings based on cursor distance
          const currentSettings: string[] = [];
          for (const [key, fromValue] of fromSettings.entries()) {
            const toValue = toSettings.get(key) ?? fromValue;
            const value = fromValue + (toValue - fromValue) * progress;
            currentSettings.push(`'${key}' ${value}`);
          }
          
          letter.style.fontVariationSettings = currentSettings.join(', ');
        });
      });
    };
    
    const target = containerRef?.current || window;
    target.addEventListener('mousemove', handleMouseMove as any);
    
    // Also reset on mouse leave
    const handleMouseLeave = () => {
      if (rafId) cancelAnimationFrame(rafId);
      letterRefs.current.forEach((letter) => {
        if (!letter) return;
        letter.style.fontVariationSettings = fromFontVariationSettings;
      });
    };
    
    if (containerRef?.current) {
        containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    } else {
        document.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      target.removeEventListener('mousemove', handleMouseMove as any);
      if (containerRef?.current) {
          containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
      } else {
          document.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [fromFontVariationSettings, toFontVariationSettings, containerRef, radius, falloff]);

  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {label.split('').map((char, i) => (
        <motion.span 
           key={i} 
           ref={(el: HTMLSpanElement | null) => { letterRefs.current[i] = el; }}
           style={{ 
             display: 'inline-block',
             fontVariationSettings: fromFontVariationSettings,
             willChange: 'font-variation-settings'
           }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}
