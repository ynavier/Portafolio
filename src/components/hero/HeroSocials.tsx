import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const HeroSocials = () => {
  return (
    <div className="flex justify-center space-x-6">
      <motion.a
        href="https://www.linkedin.com/in/yoriel-carvajalino"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
        whileHover={{ scale: 1.2, y: -4 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <Linkedin size={24} />
      </motion.a>
      <motion.a
        href="https://github.com/VidalYC"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
        whileHover={{ scale: 1.2, y: -4 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <Github size={24} />
      </motion.a>
      <motion.a
        href="mailto:yorielvidal@gmail.com"
        className="text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
        whileHover={{ scale: 1.2, y: -4 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <Mail size={24} />
      </motion.a>
    </div>
  );
};

export default HeroSocials;
