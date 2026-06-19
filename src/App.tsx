import { useDarkMode } from './hooks/useDarkMode';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import TechStack from './components/techStack/TechStack';
import Projects from './components/projects/Projects';
import Education from './components/education/Education';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import SmoothScroll from './components/common/SmoothScroll';

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-slate-50 dark:bg-gray-900 transition-colors duration-300">
        <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <Hero />
        <About />
        <TechStack />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;