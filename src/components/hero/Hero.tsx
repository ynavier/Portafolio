import React from "react";
import HeroImage from "./HeroImage";
import HeroTitle from "./HeroTitle";
import HeroDescription from "./HeroDescription";
import HeroActions from "./HeroActions";
import HeroSocials from "./HeroSocials";
import AnimatedSection from "../common/AnimatedSection";

const Hero = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection delay={0}>
          <HeroImage />
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <HeroTitle />
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <HeroDescription />
        </AnimatedSection>
        <AnimatedSection delay={0.4}>
          <HeroActions />
        </AnimatedSection>
        <AnimatedSection delay={0.5}>
          <HeroSocials />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Hero;
