import React from "react";

const HeroTitle = () => {
  return (
    <>
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
        Yoriel Carvajalino
      </h1>
      <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 space-y-2">
        <p>Ingeniero de Datos</p>
        <div className="flex items-center justify-center">
          <div className="w-12 h-0.5 bg-blue-600 mr-3"></div>
          <span className="text-blue-600 font-medium">|</span>
          <div className="w-12 h-0.5 bg-blue-600 ml-3"></div>
        </div>
        <p>Business Intelligence</p>
      </div>
    </>
  );
};

export default HeroTitle;
