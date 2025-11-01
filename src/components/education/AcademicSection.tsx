import { GraduationCap, Calendar } from "lucide-react";
import { education } from "./educationData";

const AcademicSection = () => {
  return (
    <div className="mb-16">
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
        <GraduationCap className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
        Formación Académica
      </h3>
      <div className="space-y-6">
        {education.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {item.degree}
                </h4>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  {item.institution}
                </p>
              </div>
              <div className="mt-2 md:mt-0 text-right">
                <span className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                  <Calendar className="w-4 h-4 mr-1" />
                  {item.year}
                </span>
                
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicSection;
