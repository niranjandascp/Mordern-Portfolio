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
    <div className="bg-bg-primary text-text-primary font-sans selection:bg-purple-500/30 selection:text-purple-200 min-h-screen transition-colors duration-300">
      <Navbar />

      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Stats />
        <Badges />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="border-t border-border-main py-8 text-center bg-bg-secondary/50">
        <p className="text-text-secondary text-sm">
          &copy; {new Date().getFullYear()} Niranjan das. Built with React & Tailwind CSS.
        </p>
      </footer>
    </div>
  );
}

export default App;
