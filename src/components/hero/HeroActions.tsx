import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

const handleDownloadCV = () => {
  const link = document.createElement("a");
  link.href =
    "https://drive.google.com/uc?export=download&id=1Kb1dzbOli2npQ52kdhbbXcvxp4b-B0ze";
  link.download = "CV_Yoriel_Carvajalino.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const HeroActions = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
      <motion.button
        onClick={handleDownloadCV}
        className="flex items-center space-x-2 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-[0.375em] rounded-lg font-semibold text-xl transition-all duration-150 ease-in-out cursor-pointer
        shadow-[inset_0_1px_0_0_rgba(59,130,246,0.8),0_1px_0_0_rgba(37,99,235,1),0_2px_0_0_rgba(29,78,216,1),0_4px_0_0_rgba(30,64,175,1),0_5px_0_0_rgba(30,58,138,1),0_6px_0_0_rgba(23,37,84,1),0_7px_0_0_rgba(15,23,42,1),0_7px_8px_0_rgba(51,65,85,0.4)]
        dark:shadow-[inset_0_1px_0_0_rgba(96,165,250,0.8),0_1px_0_0_rgba(59,130,246,1),0_2px_0_0_rgba(37,99,235,1),0_4px_0_0_rgba(29,78,216,1),0_5px_0_0_rgba(30,64,175,1),0_6px_0_0_rgba(30,58,138,1),0_7px_0_0_rgba(23,37,84,1),0_7px_8px_0_rgba(71,85,105,0.4)]
        active:translate-y-[0.225rem]"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <Download size={20} />
        <span>Descargar CV</span>
      </motion.button>
    </div>
  );
};

export default HeroActions;
