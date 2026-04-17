import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';
import VariableProximity from '../VariableProximity';
import { FaGithub, FaLinkedin} from 'react-icons/fa';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Content */}
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            Available for new opportunities
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl text-gray-400 font-medium tracking-tight">
              Hello, I am
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
              <VariableProximity
                label="Niranjan das"
                className="cursor-default"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 900, 'opsz' 40"
                containerRef={containerRef}
                radius={150}
                falloff="linear"
              />
            </h1>
            <h3 className="text-xl md:text-2xl text-gray-300 font-medium max-w-xl leading-relaxed">
              Full-Stack Developer building modern, interactive, and scalable web experiences.
            </h3>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <a href="#projects" className="px-6 py-3 rounded-xl bg-white text-black font-semibold flex items-center gap-2 hover:bg-gray-200 transition-colors">
              View Work <ArrowRight size={18} />
            </a>
            <div className="flex items-center gap-4 px-4">
              <a href="https://github.com/niranjandascp" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin size={24} />
              </a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Content / Graphic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative hidden md:block"
        >
          <div className="aspect-square w-full max-w-[500px] mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm p-4 relative flex items-center justify-center overflow-hidden">
             {/* Abstract Code graphic or Image placeholder */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
             <div className="relative text-center text-gray-500 font-mono text-sm leading-loose">
               {`const developer = {
  name: 'Niranjan das',
  skills: ['React', 'Node.js', 'Typescript'],
  passion: 'Building awesome web apps'
};
// Enjoy scrolling down!`}
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
