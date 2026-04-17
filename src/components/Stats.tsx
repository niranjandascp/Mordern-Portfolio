import { motion } from 'motion/react';

export default function Stats() {
  const username = "niranjandascp";

  return (
    <section id="stats" className="py-24 relative bg-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Code Analytics</h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full" />
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            My live coding statistics spanning GitHub contributions and LeetCode algorithmic problem solving.
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
            
          {/* GitHub Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-purple-500 hidden sm:block"></span> 
              GitHub Statistics
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <img 
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&hide_border=true&bg_color=0D1117`} 
                alt="GitHub Stats" 
                className="w-full rounded-2xl"
              />
              
              <img 
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical&hide_border=true&background=0D1117`} 
                alt="GitHub Streak" 
                className="w-full rounded-2xl"
              />
            </div>
            <div className="mt-6 flex justify-center">
              <img 
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical&hide_border=true&bg_color=0D1117`} 
                alt="Top Languages" 
                className="w-full max-w-2xl rounded-2xl"
              />
            </div>
          </motion.div>

          {/* LeetCode Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-8 border-t border-white/5"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-yellow-500 hidden sm:block"></span> 
              LeetCode Journey
            </h3>
            <div className="flex justify-center flex-wrap gap-6">
              <img 
                src={`https://leetcard.jacoblin.cool/${username}?theme=dark&font=Inter&ext=activity`} 
                alt="LeetCode Stats" 
                className="w-full max-w-lg rounded-2xl shadow-[0_0_20px_rgba(255,161,22,0.1)]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
