import { useRef, memo, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { GitHubCalendar } from "react-github-calendar";
import { ArrowUpRight, Trophy, Activity, Cpu, Layout, ExternalLink } from "lucide-react";
import { SiGithub, SiLeetcode } from "react-icons/si";

const username = "niranjandascp";

const LEETCODE_STATS = {
  solved: { count: 286, total: 3907 },
  rank: 484529,
  difficulty: [
    { label: "EASY", solved: 126, total: 938, color: "#22c55e", glow: "rgba(34, 197, 94, 0.3)" },
    { label: "MEDIUM", solved: 138, total: 2045, color: "#eab308", glow: "rgba(234, 179, 8, 0.3)" },
    { label: "HARD", solved: 22, total: 924, color: "#ef4444", glow: "rgba(239, 68, 68, 0.3)" },
  ],
  recent: [
    { title: "Binary Tree Inorder Traversal", date: "10.03.26" },
    { title: "Same Tree", date: "05.03.26" },
    { title: "Reverse Linked List II", date: "02.03.26" },
    { title: "Subsets II", date: "26.02.26" },
  ],
};

function RealisticAppleCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { damping: 20, stiffness: 100 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { damping: 20, stiffness: 100 });
  const scale = useSpring(1, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => scale.set(1.03);
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  };

  // Natural Realistic Lighting Template
  // const spotlightX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  // const spotlightY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);



  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        perspective: "1500px",
        transformStyle: "preserve-3d",
        willChange: 'transform',
      }}
      className={`relative group ${className}`}
    >
      {/* Dynamic Halo - More Subtle & Broad */}
      <motion.div
        className="absolute -inset-10 bg-gradient-to-br from-blue-500/5 via-amber-500/10 to-emerald-500/5 rounded-[4rem] blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
        style={{
          x: useTransform(mouseX, [-0.5, 0.5], [-30, 30]),
          y: useTransform(mouseY, [-0.5, 0.5], [-30, 30]),
        }}
      />

      {/* Main Glass Shell */}
      <motion.div
        style={{}}
        className="relative h-full backdrop-blur-[20px] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] group-hover:shadow-[0_60px_120px_rgba(0,0,0,0.6)] group-hover:border-white/20 transition-all duration-700"
      >
        {/* Specular Edge Catching */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none z-10" />
        <div className="absolute inset-[1px] rounded-[2.5rem] border border-white/[0.02] pointer-events-none z-10" />

        {/* Content with Deep Parallax */}
        <div style={{ transform: "translateZ(70px)", transformStyle: "preserve-3d" }} className="relative z-20 h-full p-8">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

const RealisticAppleCardMemo = memo(RealisticAppleCard);

export default memo(function Stats() {
  return (
    <section id="stats" className="py-24 relative overflow-hidden transition-colors">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-accent-orange/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 space-y-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-text-secondary uppercase tracking-[0.25em] text-xs font-semibold mb-4">
            Developer Metrics
          </p>
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-text-primary mb-6">
            GitHub <span className="font-serif italic bg-gradient-to-r from-accent-orange to-accent-blue bg-clip-text text-transparent">& LeetCode</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-orange to-transparent mx-auto rounded-full" />
        </motion.div>

        {/* ================= GITHUB ================= */}
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <SiGithub className="text-white/70" size={20} />
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight">GitHub Contributions</h3>
          </div>

          <RealisticAppleCardMemo>
            <div className="overflow-x-auto py-2 scrollbar-hide">
              <GitHubCalendar
                username={username}
                colorScheme="dark"
                theme={{
                  dark: ['#1a2332', '#1e3a5f', '#1d4ed8', '#3b82f6', '#93c5fd'],
                }}
                fontSize={13}
                blockSize={14}
                blockMargin={5}
                blockRadius={4}
              />
            </div>
          </RealisticAppleCardMemo>
        </div>

        {/* ================= LEETCODE ================= */}
        <div className="space-y-10">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-center justify-center">
                <SiLeetcode className="text-amber-500" size={20} />
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">LeetCode Mastery</h3>
            </div>

            <motion.a
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
              href={`https://leetcode.com/${username}`}
              target="_blank"
              className="px-5 py-2.5 bg-white/5 rounded-xl border border-white/10 flex items-center gap-2 transition-all"
            >
              <span className="text-xs font-bold text-white/60 uppercase tracking-widest">Profile</span>
              <ExternalLink size={14} className="text-white/30" />
            </motion.a>
          </div>

          {/* Staggered Natural Alignment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Primary Stat: Solved */}
            <RealisticAppleCardMemo className="md:col-span-4">
              <div className="flex flex-col h-full justify-between gap-10">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                    <Cpu className="text-amber-500" size={24} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-text-secondary opacity-60 uppercase tracking-[0.3em]">Solved</p>
                  <h4 className="text-6xl font-black text-text-primary tracking-tighter">{LEETCODE_STATS.solved.count}</h4>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '45%' }}
                    transition={{ duration: 1.5, ease: "circOut" }}
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"
                  />
                </div>
              </div>
            </RealisticAppleCardMemo>

            {/* Secondary Stat: Rank */}
            <RealisticAppleCardMemo className="md:col-span-3">
              <div className="flex flex-col h-full justify-between gap-6">
                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 self-start">
                  <Trophy className="text-blue-400" size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-text-secondary opacity-60 uppercase tracking-[0.3em]">Global Rank</p>
                  <h4 className="text-3xl font-black text-text-primary">#{LEETCODE_STATS.rank.toLocaleString()}</h4>
                </div>
                <div className="py-2 bg-white/5 rounded-lg border border-white/5 text-center">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest text-center">Top Tier Active</span>
                </div>
              </div>
            </RealisticAppleCardMemo>

            {/* Difficulty Breakdown */}
            <RealisticAppleCardMemo className="md:col-span-5">
              <div className="flex flex-col h-full justify-between gap-4">
                <div className="flex items-center gap-2 mb-2">
                  <Layout className="text-text-secondary opacity-60" size={18} />
                  <span className="text-[10px] font-black tracking-[0.2em] text-text-secondary opacity-60 uppercase">Distribution</span>
                </div>
                <div className="space-y-5 flex-1 flex flex-col justify-center">
                  {LEETCODE_STATS.difficulty.map((d) => (
                    <div key={d.label} className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black text-text-secondary opacity-80 tracking-widest uppercase">{d.label}</span>
                        <span className="text-xs font-bold text-text-primary opacity-80">{d.solved}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(d.solved / d.total) * 100}%` }}
                          transition={{ duration: 1.2 }}
                          className="h-full rounded-full"
                          style={{ background: d.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </RealisticAppleCardMemo>

            {/* Recent Activity - Full Width Bottom */}
            <RealisticAppleCardMemo className="md:col-span-12">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <Activity className="text-emerald-400" size={20} />
                  <h4 className="text-sm font-bold text-white tracking-wide">Live Stream Activity</h4>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                {LEETCODE_STATS.recent.map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex items-center justify-between group/item cursor-pointer border-b border-white/5 pb-5 last:border-0 md:[&:nth-last-child(-n+2)]:border-0"
                  >
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-bold text-white/90 group-hover/item:text-amber-500 transition-colors">
                        {item.title}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="text-[9px] font-black text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/5 border border-emerald-500/10 uppercase tracking-widest">Accepted</span>
                        <span className="text-xs font-mono text-white/20">{item.date}</span>
                      </div>
                    </div>
                    <ArrowUpRight className="text-white/10 group-hover/item:text-amber-500 transition-all opacity-0 group-hover/item:opacity-100" size={18} />
                  </motion.div>
                ))}
              </div>
            </RealisticAppleCardMemo>
          </div>
        </div>
      </div>
    </section>
  );
});