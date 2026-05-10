import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SiGithub, SiLeetcode, SiWhatsapp, SiInstagram, SiDevdotto } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { Mail } from 'lucide-react';

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/niranjandascp",
    icon: <FaLinkedin size={20} />,
  },
  {
    label: "GitHub",
    href: "https://github.com/niranjandascp",
    icon: <SiGithub size={20} />,
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/niranjandascp/",
    icon: <SiLeetcode size={20} />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/918921627502",
    icon: <SiWhatsapp size={20} />,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/niranjandascp",
    icon: <SiInstagram size={20} />,
  },
  {
    label: "Dev.to",
    href: "https://dev.to/niranjandascp",
    icon: <SiDevdotto size={20} />,
  },
  {
    label: "Email",
    href: "mailto:niranjandascp@gmail.com",
    icon: <Mail size={20} />,
  },
];

const TECH_STACK = [
  "React 19", "TypeScript", "Vite", "Three.js",
  "GSAP", "Framer Motion", "Tailwind V4", "Lenis",
];

interface MagneticIconProps {
  children: React.ReactNode;
  href: string;
  label: string;
}

function MagneticIcon({ children, href, label }: MagneticIconProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.32, y: (e.clientY - r.top - r.height / 2) * 0.32 });
  };
  const onLeave = () => { setPos({ x: 0, y: 0 }); setHovered(false); };
  return (
    <a ref={ref} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
      onMouseMove={onMove} onMouseEnter={() => setHovered(true)} onMouseLeave={onLeave}
      style={{
        width: 43, height: 43, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
        border: hovered ? "1px solid rgba(249,115,22,.7)" : "1px solid var(--color-border-main)",
        background: hovered ? "rgba(249,115,22,.14)" : "var(--color-bg-secondary)",
        color: hovered ? "#fdba74" : "var(--color-text-secondary)", textDecoration: "none", cursor: "pointer", flexShrink: 0,
        transform: `translate(${pos.x}px,${pos.y}px) scale(${hovered ? 1.12 : 1})`,
        boxShadow: hovered ? "0 0 22px rgba(234,88,12,.45)" : "none",
        transition: "all .2s",
      }}>
      {children}
    </a>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
}

function NavLink({ href, label }: NavLinkProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", display: "inline-block", fontSize: 12, letterSpacing: "0.05em", fontWeight: 500, textTransform: "uppercase", textDecoration: "none", paddingBottom: 2, color: hovered ? "#fdba74" : "var(--color-text-secondary)", transition: "color .2s" }}>
      {label}
      <span style={{ position: "absolute", bottom: 0, left: 0, height: 1, width: hovered ? "100%" : "0%", background: "linear-gradient(90deg,#ea580c,#fb923c)", borderRadius: 2, transition: "width .3s cubic-bezier(.4,0,.2,1)" }} />
    </a>
  );
}

interface TechPillProps {
  label: string;
}

function TechPill({ label }: TechPillProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <span onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ fontSize: 10.5, fontWeight: 500, padding: "4px 9px", borderRadius: 50, border: hovered ? "1px solid rgba(249,115,22,.6)" : "1px solid var(--color-border-main)", background: hovered ? "rgba(249,115,22,.14)" : "var(--color-bg-secondary)", color: hovered ? "#fdba74" : "var(--color-text-secondary)", transition: "all .2s", cursor: "default", letterSpacing: "0.02em" }}>
      {label}
    </span>
  );
}

function ScrollTopBtn() {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} aria-label="Back to top"
      style={{ width: 43, height: 43, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: hovered ? "1px solid transparent" : "1px solid rgba(249,115,22,.4)", background: hovered ? "linear-gradient(135deg,#ea580c,#f97316)" : "rgba(249,115,22,.1)", color: "#fdba74", cursor: "pointer", flexShrink: 0, transform: hovered ? "translateY(-4px) scale(1.1)" : "none", boxShadow: hovered ? "0 8px 28px rgba(234,88,12,.55)" : "none", transition: "all .3s cubic-bezier(.34,1.56,.64,1)" }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} width={16} height={16}
        style={{ transform: hovered ? "translateY(-2px)" : "none", transition: "transform .25s" }}>
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const footer = footerRef.current;
    const glow = glowRef.current;
    if (!footer || !glow) return;
    const onMove = (e: MouseEvent) => {
      const r = footer.getBoundingClientRect();
      glow.style.transform = `translate(${e.clientX - r.left - 170}px, ${e.clientY - r.top - 170}px)`;
    };
    const onLeave = () => { glow.style.transform = "translate(-9999px,-9999px)"; };
    footer.addEventListener("mousemove", onMove);
    footer.addEventListener("mouseleave", onLeave);
    return () => { footer.removeEventListener("mousemove", onMove); footer.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes orb-a{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(28px,-18px) scale(1.06)}66%{transform:translate(-18px,24px) scale(.96)}}
        @keyframes orb-b{0%,100%{transform:translate(0,0) scale(1)}40%{transform:translate(-32px,18px) scale(1.08)}70%{transform:translate(18px,-28px) scale(.95)}}
        @keyframes shimmer-kf{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes float-kf{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes pulse-kf{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.3;transform:scale(.6)}}
      `}</style>

      <footer ref={footerRef} style={{ position: "relative", overflow: "hidden", background: "transparent", fontFamily: "'DM Sans',sans-serif", color: "var(--color-text-primary)" }}>

        {/* Mouse glow */}
        {/* <div ref={glowRef} style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle,rgba(234,88,12,.11) 0%,transparent 70%)", pointerEvents: "none", zIndex: 1, transform: "translate(-9999px,-9999px)", transition: "transform .15s ease-out" }} /> */}

        {/* Background orbs */}
        {/* {[
          { w: 400, h: 400, style: { top: -130, left: "5%" }, bg: "rgba(234,88,12,.22)", anim: "orb-a 12s ease-in-out infinite" },
          { w: 320, h: 320, style: { top: -60, right: "4%" }, bg: "rgba(251,146,60,.15)", anim: "orb-b 15s ease-in-out infinite" },
          { w: 260, h: 260, style: { bottom: -40, left: "38%" }, bg: "rgba(249,115,22,.12)", anim: "orb-a 11s ease-in-out infinite 3s" },
          { w: 180, h: 180, style: { bottom: 60, right: "15%" }, bg: "rgba(234,88,12,.1)", anim: "orb-b 9s ease-in-out infinite 1s" },
        ].map((o, i) => (
          <div key={i} style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", filter: "blur(80px)", width: o.w, height: o.h, background: o.bg, animation: o.anim, ...o.style }} />
        ))} */}

        {/* Noise */}
        {/* <div style={{ position: "absolute", inset: 0, opacity: .05, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} /> */}

        {/* Bottom Fade Gradient */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "240px", background: "linear-gradient(to top, var(--color-bg-primary) 0%, transparent 100%)", pointerEvents: "none", zIndex: 1 }} />

        {/* Top shimmer border */}
        {/* <div style={{ height: 1, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent 0%,#ea580c 20%,#fb923c 50%,#f97316 75%,transparent 100%)", backgroundSize: "200% 100%", animation: "shimmer-kf 3s linear infinite" }} />
        </div> */}

        {/* HERO */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "64px 20px 52px", borderBottom: "1px solid rgba(251,146,60,.08)" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", color: "var(--color-cinematic-accent)", textTransform: "uppercase", marginBottom: 18, fontWeight: 500 }}>Designed &amp; Developed</p>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(50px,10vw,104px)", fontWeight: 800, lineHeight: 1, margin: "0 0 20px", background: "linear-gradient(135deg,var(--color-text-primary) 0%,#fb923c 30%,#ea580c 55%,#fdba74 80%,var(--color-text-primary) 100%)", backgroundSize: "200% 200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", animation: "float-kf 5s ease-in-out infinite, shimmer-kf 4s linear infinite", cursor: "default", userSelect: "none", display: "inline-block" }}>
            Niranjan Das
          </h2>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", maxWidth: 440, margin: "0 auto 32px", lineHeight: 1.75 }}>
            Full-stack developer crafting cinematic, immersive digital experiences at the intersection of design and code.
          </p>
          <a href="#contact"
            style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "13px 28px", borderRadius: 50, background: "linear-gradient(135deg,#ea580c,#f97316,#fb923c)", color: "#fff", fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", textDecoration: "none", boxShadow: "0 0 32px rgba(234,88,12,.5),inset 0 1px 0 rgba(255,255,255,.2)", transition: "transform .28s cubic-bezier(.34,1.56,.64,1),box-shadow .25s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.07) translateY(-3px)"; e.currentTarget.style.boxShadow = "0 0 56px rgba(234,88,12,.72),inset 0 1px 0 rgba(255,255,255,.2)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 32px rgba(234,88,12,.5),inset 0 1px 0 rgba(255,255,255,.2)"; }}>
            Let's work together
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} width={14} height={14}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </motion.div>

        {/* Glow divider dot */}
        {/* <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", padding: "0 28px" }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,transparent,rgba(251,146,60,.15))" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f97316", margin: "0 16px", boxShadow: "0 0 14px rgba(249,115,22,.7),0 0 28px rgba(249,115,22,.4)" }} />
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg,rgba(251,146,60,.15),transparent)" }} />
        </div> */}

        {/* Links grid */}
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          variants={{
            initial: {},
            whileInView: { transition: { staggerChildren: 0.1 } }
          }}
          style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: "40px 24px", maxWidth: 1040, margin: "0 auto", padding: "48px 28px 44px", borderBottom: "1px solid rgba(251,146,60,.07)" }}>
          {/* Brand */}
          <motion.div variants={{ initial: { y: 30, opacity: 0 }, whileInView: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#ea580c,#f97316)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 15, color: "#fff", boxShadow: "0 0 18px rgba(234,88,12,.55)", flexShrink: 0 }}>N</div>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: "#fff5f0", letterSpacing: "0.02em" }}>Niranjan Das</span>
            </div>
            <p style={{ fontSize: 12, lineHeight: 1.8, color: "var(--color-text-secondary)", maxWidth: 200 }}>Crafting immersive web experiences with Three.js, React &amp; a dash of cinematic magic.</p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16, padding: "5px 12px", borderRadius: 50, background: "rgba(5,150,105,.12)", border: "1px solid rgba(5,150,105,.3)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "pulse-kf 1.8s ease-in-out infinite" }} />
              <span style={{ fontSize: 11, color: "#10b981", fontWeight: 500 }}>Open to opportunities</span>
            </div>
          </motion.div>

          {/* Navigate */}
          <motion.div variants={{ initial: { y: 30, opacity: 0 }, whileInView: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "var(--color-cinematic-accent)", opacity: 0.7, textTransform: "uppercase", marginBottom: 18 }}>Navigate</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
              {NAV_LINKS.map(l => <NavLink key={l.label} href={l.href} label={l.label} />)}
            </div>
          </motion.div>

          {/* Built with */}
          <motion.div variants={{ initial: { y: 30, opacity: 0 }, whileInView: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "var(--color-cinematic-accent)", opacity: 0.7, textTransform: "uppercase", marginBottom: 18 }}>Built with</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {TECH_STACK.map(t => <TechPill key={t} label={t} />)}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div variants={{ initial: { y: 30, opacity: 0 }, whileInView: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", color: "var(--color-cinematic-accent)", opacity: 0.7, textTransform: "uppercase", marginBottom: 18 }}>Connect</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {SOCIAL_LINKS.map(s => <MagneticIcon key={s.label} href={s.href} label={s.label}>{s.icon}</MagneticIcon>)}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ position: "relative", zIndex: 2, maxWidth: 1040, margin: "0 auto", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }}>
          <p style={{ fontSize: 11, color: "var(--color-text-secondary)", letterSpacing: "0.025em", margin: 0 }}>
            © {year} Niranjan Das CP. Crafted with <span style={{ color: "#f97316" }}>♥</span> &amp; caffeine.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 11, color: "var(--color-text-secondary)", opacity: 0.6 }}>Made in India 🇮🇳</span>
            <ScrollTopBtn />
          </div>
        </motion.div>

      </footer>
    </>
  );
}
