import React from "react";
import { Github, Linkedin } from "lucide-react";

const SocialLinks: React.FC = () => {
  return (
    <div>
      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Sígueme en
      </h4>
      <div className="flex space-x-4">
        <a
          href="https://www.linkedin.com/in/yoriel-carvajalino"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-lg hover:bg-blue-700 hover:scale-110 transition-all"
        >
          <Linkedin className="h-6 w-6" />
        </a>
        <a
          href="https://github.com/ynavier"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-gray-800 text-white rounded-lg hover:bg-gray-900 hover:scale-110 transition-all"
        >
          <Github className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
