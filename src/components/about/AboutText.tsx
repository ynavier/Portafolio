import React from "react";
import AnimatedWords from "../common/AnimatedWords";

const AboutText: React.FC = () => {
  const skills = [
    "ETL/ELT",
    "Data Warehousing",
    "Big Data",
    "Cloud Migration",
    "BI Dashboards",
    "Data Modeling",
    "Python/SQL",
    "Apache Spark",
  ];

  return (
    <div className="space-y-6">
      <AnimatedWords
        text="🌟 Soy estudiante de Ingeniería de Sistemas (10.º semestre) en la Universidad Popular del Cesar, con gran interés y formación en el ecosistema de datos moderno 📊."
        className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
      />

      <AnimatedWords
        text="🚀 Me apasiona transformar datos en conocimiento útil, desde la ingesta y transformación hasta la visualización y análisis predictivo 🤖. Durante mi formación he fortalecido mis competencias en programación, bases de datos, BI y herramientas cloud, lo que me ha permitido desarrollar proyectos académicos y personales orientados a la analítica de datos y la inteligencia de negocios."
        className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
      />

      <AnimatedWords
        text="💡 Mi objetivo es seguir aprendiendo y crecer como Ingeniero de Datos, aportando soluciones innovadoras que impulsen la toma de decisiones estratégicas en las organizaciones."
        className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
      />
    </div>
  );
};

export default AboutText;
