import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Badges from './components/Badges';
import Education from './components/Education';
import Contact from './components/Contact';
import { ReactLenis } from 'lenis/react';
import LiquidEther from './components/ui/LiquidEther';

function App() {
  return (
    <ReactLenis root>
      <div className="bg-bg-primary text-text-primary font-sans selection:bg-[#C4521A]/30 selection:selection:text-orange-200 min-h-screen transition-colors duration-300 relative">
        {/* Global Cinematic Background System */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Global Interactive LiquidEther */}
          <div className="absolute inset-0 w-full h-full opacity-100 mix-blend-screen">
            <LiquidEther
              colors={['#C4521A', '#8b1e00', '#d97706']}
              isViscous={true}
              viscous={10}
              mouseForce={15}
              cursorSize={80}
            />
          </div>

          {/* Main Dramatic Spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-[radial-gradient(circle,var(--cinematic-glow)_0%,transparent_70%)] opacity-50" />

          {/* Ambient Corner Glows */}
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#C4521A]/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-orange-600/3 rounded-full blur-[120px]" />

          {/* Noise Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        </div>

        <Navbar />

        <main className="relative z-10 w-full">
          <Home />
          <About />
          <Skills />
          <Projects />
          <Stats />
          <Badges />
          <Education />
          {/* <Others1 /> */}
          <Contact />
        </main>

        {/* Footer */}
        <footer className="border-t border-border-main py-8 text-center bg-bg-secondary/50">
          <p className="text-text-secondary text-sm">
            &copy; {new Date().getFullYear()} Niranjan das. Built with React & Tailwind CSS.
          </p>
        </footer>
      </div>
    </ReactLenis>
  );
}

export default App;
