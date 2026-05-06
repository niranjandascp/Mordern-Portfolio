import { useRef, useState, memo, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, ExternalLink, Copy, Check, Phone, Globe, Sparkles } from 'lucide-react';
import { SiGithub, SiLeetcode, SiWhatsapp, SiInstagram, SiDevdotto } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import ScrollHeading from '@/components/ui/ScrollHeading';
import { DiaTextReveal } from '@/components/ui/dia-text-reveal';

const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: <FaLinkedin size={22} />, url: 'https://linkedin.com/in/niranjandascp', handle: 'linkedin.com/in/niranjandascp', color: '#0077b5' },
  { name: 'GitHub', icon: <SiGithub size={22} />, url: 'https://github.com/niranjandascp', handle: 'github.com/niranjandascp', color: '#ffffff' },
  { name: 'LeetCode', icon: <SiLeetcode size={22} />, url: 'https://leetcode.com/u/niranjandascp/', handle: 'leetcode.com/u/niranjandascp/', color: '#FFA116' },
  { name: 'Dev.to', icon: <SiDevdotto size={22} />, url: 'https://dev.to/niranjandascp', handle: 'dev.to/niranjandascp', color: '#ffffff' },
  { name: 'Instagram', icon: <SiInstagram size={22} />, url: 'https://instagram.com/niranjandascp', handle: 'instagram.com/niranjandascp', color: '#E4405F' },
];

function InteractiveCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { damping: 30, stiffness: 120 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { damping: 30, stiffness: 120 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ rotateX, rotateY, perspective: "1200px", transformStyle: "preserve-3d" }}
      className={`group relative transform-gpu backface-hidden ${className}`}
    >
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([cx, cy]) => `radial-gradient(500px circle at ${cx}px ${cy}px, rgba(0,0,0,0.03) 0%, transparent 70%), 
                           radial-gradient(500px circle at ${cx}px ${cy}px, rgba(255,115,22,0.06) 0%, transparent 70%)`
          )
        }}
      />

      <div className="relative z-10 h-full bg-bg-secondary/50 backdrop-blur-xl border border-border-main rounded-[2rem] overflow-hidden p-8 md:p-10 shadow-2xl transition-all duration-500 group-hover:border-border-main group-hover:bg-bg-secondary/80 transform-gpu backface-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border-main to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        {children}
      </div>
    </motion.div>
  );
}

function ContactLink({ icon, label, value, href, type, color = 'var(--accent-orange)', onCopy }: { icon: React.ReactNode, label: string, value: string, href?: string, type: 'copy' | 'link' | 'text', color?: string, onCopy?: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleAction = () => {
    if (type === 'copy') {
      onCopy?.();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const Container = type === 'link' ? 'a' : 'div';
  const containerProps = type === 'link' ? { href, target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <Container
      {...containerProps}
      onClick={type === 'copy' ? handleAction : undefined}
      className="relative flex items-center justify-between p-5 rounded-2xl border border-border-main/50 bg-bg-primary/40 hover:bg-bg-secondary/60 transition-all duration-500 group/item cursor-pointer overflow-hidden transform-gpu backface-hidden will-change-transform shadow-sm hover:shadow-md"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border-main/30 to-transparent translate-x-[-100%] group-hover/item:translate-x-[100%] transition-transform duration-1000 ease-in-out" />

      <div className="relative z-10 flex items-center gap-5 transform-gpu translate-z-0">
        <div
          className="w-12 h-12 rounded-xl bg-bg-secondary/30 flex items-center justify-center text-text-secondary transition-all duration-500 group-hover/item:scale-110 group-hover/item:bg-bg-secondary/50 transform-gpu backface-hidden"
        >
          <div className="relative z-10 group-hover/item:text-[var(--hover-color)] transition-colors duration-500" style={{ '--hover-color': color } as any}>
            {icon}
          </div>
          <motion.div
            className="absolute inset-0 bg-[var(--hover-color)] blur-lg rounded-full opacity-0 group-hover/item:opacity-20 transition-opacity duration-500"
            style={{ '--hover-color': color } as any}
          />
        </div>
        <div className="transform-gpu translate-z-0">
          <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.25em] mb-1 opacity-80 group-hover/item:opacity-100 transition-opacity subpixel-antialiased">{label}</p>
          <p className="text-base font-bold text-text-primary tracking-tight group-hover/item:text-text-primary transition-colors subpixel-antialiased">{value}</p>
        </div>
      </div>

      <div className="relative z-10 text-text-secondary opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-500 pr-2 transform-gpu">
        {type === 'copy' ? (
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Check size={18} className="text-green-500" />
              </motion.div>
            ) : (
              <motion.div key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <Copy size={18} />
              </motion.div>
            )}
          </AnimatePresence>
        ) : type === 'link' ? (
          <ExternalLink size={18} />
        ) : null}
      </div>
    </Container>
  );
}

export default memo(function Contact() {
  const copyEmail = () => {
    navigator.clipboard.writeText('niranjandascp@gmail.com');
  };

  return (
    <section id="contact" className="py-32 relative overflow-hidden transition-colors antialiased">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollHeading className="text-center mb-16">
          <p className="text-accent-orange font-mono text-[10px] font-black uppercase tracking-[0.5em] mb-6 opacity-80 transform-gpu translate-z-0">Get in Touch</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary leading-none transform-gpu translate-z-0">
            Let's <DiaTextReveal text="Connect" textColor="#C4521A" className="font-serif italic" duration={1.5} delay={0.3} />
          </h2>
        </ScrollHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: Direct */}
          <InteractiveCard delay={0.1}>
            <div className="space-y-6 transform-gpu translate-z-0" style={{ transform: 'translateZ(40px)' }}>
              <div className="flex items-center justify-between border-b border-border-main pb-4">
                <div className="flex items-center gap-3">
                  <Sparkles size={16} className="text-accent-orange" />
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-text-primary transform-gpu translate-z-0">Direct Line</h3>
                </div>
                <div className="w-1.5 h-1.5 bg-accent-orange rounded-full shadow-[0_0_12px_rgba(255,115,22,0.6)] animate-pulse" />
              </div>

              <div className="space-y-3 transform-gpu translate-z-0">
                <ContactLink
                  icon={<Mail size={18} />}
                  label="Email"
                  value="niranjandascp@gmail.com"
                  type="copy"
                  color="#f97316"
                  onCopy={copyEmail}
                />
                <div className="grid grid-cols-2 gap-3 transform-gpu translate-z-0">
                  <ContactLink
                    icon={<SiWhatsapp size={18} />}
                    label="WhatsApp"
                    value="+918921627502"
                    href="https://wa.me/918921627502"
                    type="link"
                    color="#22c55e"
                  />
                  <ContactLink
                    icon={<Phone size={18} />}
                    label="Phone"
                    value="+91 8921627502"
                    type="text"
                    color="#3b82f6"
                  />
                </div>
              </div>
            </div>
          </InteractiveCard>

          {/* Card 2: Socials */}
          <InteractiveCard delay={0.2}>
            <div className="space-y-6 transform-gpu translate-z-0" style={{ transform: 'translateZ(40px)' }}>
              <div className="flex items-center justify-between border-b border-border-main pb-4">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-accent-orange animate-spin-slow" />
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-text-primary transform-gpu translate-z-0">Ecosystem</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary/30 border border-border-main">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-text-secondary opacity-80 transform-gpu translate-z-0">Active</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 transform-gpu translate-z-0">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-border-main hover:bg-bg-secondary/30 transition-all duration-500 group/soc overflow-hidden relative transform-gpu backface-hidden will-change-transform shadow-sm hover:shadow-md"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border-main/20 to-transparent translate-x-[-100%] group-hover/soc:translate-x-[100%] transition-transform duration-1000" />

                    <div className="relative z-10 w-8 h-8 rounded-lg bg-bg-secondary/30 flex items-center justify-center text-text-secondary group-hover/soc:scale-110 transition-all duration-500 transform-gpu backface-hidden translate-z-0">
                      <div className="relative z-10 group-hover/soc:text-[var(--icon-color)] transition-colors duration-500" style={{ '--icon-color': social.color } as any}>
                        {social.icon}
                      </div>
                      <div className="absolute inset-0 bg-[var(--icon-color)] opacity-0 group-hover/soc:opacity-10 blur-sm rounded-full transition-opacity duration-500" style={{ '--icon-color': social.color } as any} />
                    </div>
                    <div className="relative z-10 transform-gpu translate-z-0">
                      <p className="text-xs font-bold text-text-primary group-hover/soc:text-text-primary transition-colors leading-none mb-1 subpixel-antialiased">
                        {social.name}
                      </p>
                      <p className="text-[10px] text-text-secondary opacity-80 group-hover/soc:opacity-100 transition-all truncate subpixel-antialiased">
                        {social.handle}
                      </p>
                    </div>
                  </a>
                ))}

                {/* Location Slotted in Grid */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-bg-secondary/20 border border-border-main/50 opacity-80 transform-gpu translate-z-0 shadow-sm">
                  <MapPin size={14} className="text-accent-orange shrink-0" />
                  <p className="text-[10px] font-bold text-text-secondary tracking-[0.1em] uppercase subpixel-antialiased">Kerala, IN</p>
                </div>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
});
