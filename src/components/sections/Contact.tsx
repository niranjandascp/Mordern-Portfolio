import { useRef, useState, memo, type MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, ExternalLink, Copy, Check, Phone, Globe, Sparkles, Send } from 'lucide-react';
import { SiGithub, SiLeetcode, SiWhatsapp, SiInstagram, SiDevdotto } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ScrollHeading from '@/components/ui/ScrollHeading';

const SOCIAL_LINKS = [
  { name: 'LinkedIn', icon: <FaLinkedin size={18} />, url: 'https://linkedin.com/in/niranjandascp', handle: '/in/niranjandascp', color: '#0077b5' },
  { name: 'GitHub', icon: <SiGithub size={18} />, url: 'https://github.com/niranjandascp', handle: '@niranjandascp', color: '#ffffff' },
  { name: 'LeetCode', icon: <SiLeetcode size={18} />, url: 'https://leetcode.com/niranjandascp', handle: 'niranjandascp', color: '#FFA116' },
  { name: 'Dev.to', icon: <SiDevdotto size={18} />, url: 'https://dev.to/niranjandascp', handle: 'niranjandascp', color: '#ffffff' },
  { name: 'Instagram', icon: <SiInstagram size={18} />, url: 'https://instagram.com/niranjandascp', handle: '@niranjandascp', color: '#E4405F' },
];

function InteractiveCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { damping: 25, stiffness: 100 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { damping: 25, stiffness: 100 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, perspective: "1000px", transformStyle: "preserve-3d" }}
      className={`group relative ${className}`}
    >
      <div className="relative h-full bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] overflow-hidden p-6 md:p-10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {children}
      </div>
    </motion.div>
  );
}

function ContactLink({ icon, label, value, href, type, onCopy }: { icon: React.ReactNode, label: string, value: string, href?: string, type: 'copy' | 'link' | 'text', onCopy?: () => void }) {
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
      className={`flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group/item cursor-pointer`}
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-text-secondary group-hover/item:text-accent-orange group-hover/item:scale-110 transition-all duration-300">
          {icon}
        </div>
        <div>
          <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-0.5 opacity-50">{label}</p>
          <p className="text-sm font-bold text-text-primary tracking-tight">{value}</p>
        </div>
      </div>
      <div className="text-text-secondary opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-300">
        {type === 'copy' ? (
          copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />
        ) : type === 'link' ? (
          <ExternalLink size={16} />
        ) : null}
      </div>
    </Container>
  );
}

export default memo(function Contact() {
  const copyEmail = () => {
    navigator.clipboard.writeText('niranjandas.cp@gmail.com');
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden transition-colors">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <ScrollHeading className="text-center mb-16">
          <p className="text-accent-orange font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-4">Connect</p>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-text-primary leading-none">
            Get in <span className="font-serif italic text-accent-orange">Touch</span>
          </h2>
        </ScrollHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Card 1: Direct */}
          <InteractiveCard delay={0.1}>
            <div className="space-y-8" style={{ transform: 'translateZ(30px)' }}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent-orange rounded-full shadow-[0_0_10px_rgba(196,82,26,0.5)]" />
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-text-primary">Direct Lines</h3>
              </div>
              
              <div className="space-y-3">
                <ContactLink 
                  icon={<Mail size={18} />} 
                  label="Email" 
                  value="niranjandas.cp@gmail.com" 
                  type="copy" 
                  onCopy={copyEmail}
                />
                <ContactLink 
                  icon={<SiWhatsapp size={18} />} 
                  label="WhatsApp" 
                  value="+91 9048XXXXXX" 
                  href="https://wa.me/919048XXXXXX"
                  type="link" 
                />
                <ContactLink 
                  icon={<Phone size={18} />} 
                  label="Phone" 
                  value="+91 9048XXXXXX" 
                  type="text" 
                />
              </div>
            </div>
          </InteractiveCard>

          {/* Card 2: Socials */}
          <InteractiveCard delay={0.2}>
            <div className="space-y-8" style={{ transform: 'translateZ(30px)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe size={16} className="text-accent-orange animate-spin-slow" />
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-text-primary">Network</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-wider text-text-secondary">Available</span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all group/soc"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary group-hover/soc:text-white transition-colors">
                      {social.icon}
                    </div>
                    <div className="flex-grow">
                      <p className="text-[10px] font-bold text-text-primary group-hover/soc:text-accent-orange transition-colors">{social.name}</p>
                      <p className="text-[10px] text-text-secondary opacity-40 group-hover/soc:opacity-70 transition-all">{social.handle}</p>
                    </div>
                    <ExternalLink size={12} className="text-text-secondary opacity-0 group-hover/soc:opacity-40 transition-opacity" />
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5 opacity-40">
                <MapPin size={12} className="text-accent-orange" />
                <p className="text-[10px] font-bold text-text-secondary tracking-widest uppercase">Kerala, India • GMT +5:30</p>
              </div>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
});
