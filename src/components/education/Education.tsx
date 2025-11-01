import AcademicSection from "./AcademicSection";
import Certifications from "./Certifications";
import AnimatedSection from "../common/AnimatedSection";

const Education = () => {
  return (
    <section
      id="education"
      className="py-20 bg-slate-50 dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Educación y Certificaciones
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Formación académica sólida complementada con certificaciones
            industriales y aprendizaje continuo en tecnologías emergentes
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <AcademicSection />
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <Certifications />
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Education;
