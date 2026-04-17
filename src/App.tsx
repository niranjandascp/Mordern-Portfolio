import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Badges from './components/Badges';
import Education from './components/Education';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-black text-gray-50 font-sans selection:bg-purple-500/30 selection:text-purple-200 min-h-screen">
      <Navbar />

      <main>
        <Home />
        <About />
        <Projects />
        <Skills />
        <Stats />
        <Badges />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center bg-white/5">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Niranjan das. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}

export default App;
