import { useEffect } from 'react';
import Header from './components/header/Header';
import CustomCursor from './components/common/CustomCursor';
import ScrollLayout from './components/common/ScrollLayout';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import TechStack from './components/techStack/TechStack';
import Projects from './components/projects/Projects';
import Education from './components/education/Education';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import SmoothScroll from './components/common/SmoothScroll';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <div style={{ backgroundColor: 'var(--bg)', color: 'var(--fg)', minHeight: '100vh' }}>
        <Header />
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
