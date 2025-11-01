import { Building } from "lucide-react";
import { certifications } from "./educationData";

const Certifications = () => {
  return (
    <div className="mb-16">
      <div className="relative border-s border-gray-200 dark:border-gray-700">
        {certifications.map((cert, index) => (
          <div key={index} className="mb-16 ms-8">
            <span className="absolute flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full -start-5 ring-8 ring-slate-50 dark:ring-gray-900 dark:bg-blue-900">
              <cert.icon className="w-5 h-5 text-blue-800 dark:text-blue-300" />
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {cert.name}
                </h4>
                <time className="block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {cert.date}
                </time>
              </div>
              <p className="flex items-center text-base font-medium text-blue-600 dark:text-blue-400 mb-3">
                <Building className="w-4 h-4 mr-2" />
                {cert.issuer}
              </p>
              <p className="mb-6 text-base font-normal text-gray-500 dark:text-gray-400 leading-relaxed">
                {cert.description}
              </p>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
