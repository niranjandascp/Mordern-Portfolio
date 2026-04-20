'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const DEFAULT_ABOUT_TEXT =
  'Hey there! I’m Niranjan Das, a Full Stack Developer with a strong focus on backend development. I specialize in building scalable and secure applications using Node.js, Express.js, Nest.js, TypeScript, React.js, Next.js, MongoDB, and PostgreSQL. With hands-on experience in developing real-world projects, I focus on writing clean, efficient code and creating user-centric solutions, while continuously improving my skills to deliver impactful results.';

const COMMAND_DELAY_MS = 400;

interface AboutTerminalProps {
  fullText?: string;
  typingSpeed?: number;
  isInView?: boolean;
}

export function AboutTerminal({
  fullText = DEFAULT_ABOUT_TEXT,
  typingSpeed = 15,
  isInView = true,
}: AboutTerminalProps) {
  const [typedText, setTypedText] = useState('');
  const [commandExecuted, setCommandExecuted] = useState(false);

  // Only start typing after "command executed" (small delay when in view)
  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => setCommandExecuted(true), COMMAND_DELAY_MS);
    return () => clearTimeout(t);
  }, [isInView]);

  useEffect(() => {
    if (!commandExecuted) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [commandExecuted, fullText, typingSpeed]);

  const isTyping = commandExecuted && typedText.length < fullText.length;
  const isComplete = commandExecuted && typedText.length >= fullText.length;

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between mb-4">
        <div className="text-[#00f0ff] font-mono">$ cat about.txt</div>
        <div className="text-white/20 text-[10px]">niranjandas.bio</div>
      </div>
      <div className="flex-1 overflow-y-auto text-white/90 scrollbar-hide">
        {commandExecuted && typedText.length > 0 ? typedText : '\u00A0'}
        {isTyping && <span className="animate-pulse text-[#00f0ff]">_</span>}
        {isComplete && <span className="ml-1 animate-blink text-[#00f0ff]">█</span>}
      </div>
    </div>
  );
}
