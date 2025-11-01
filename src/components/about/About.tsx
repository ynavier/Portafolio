import React from "react";
import AboutText from "./AboutText";
import ProfileImage from "./ProfileImage";
import AnimatedSection from "../common/AnimatedSection";

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="py-20 bg-slate-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Sobre Mí
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Columna Izquierda: Texto */}
          <AnimatedSection delay={0.2} direction="left">
            <AboutText />
          </AnimatedSection>

          {/* Columna Derecha: Imagen */}
          <AnimatedSection delay={0.3} direction="right">
            <ProfileImage />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default About;
