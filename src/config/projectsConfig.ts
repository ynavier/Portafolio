import { RepoInfo } from "../types/project";

export const REPOS = [
  { owner: "ynavier", name: "Desnutricion-PG" }, // carta de presentación
  { owner: "VidalYC", name: "Hackaton_2025" },
  { owner: "VidalYC", name: "Gestor_de_Tareas" },
];

export const fallbackImages: Record<string, string> = {
  TrinoLab: "/trino.png",
  Hackaton_2025: "/Hackton.png",
  FinancyBank: "/bank.jpg",
  Gestor_de_Tareas: "/gestor.png",
  frontend: "/salon.png",
};

// URLs de demos desplegados en Vercel
export const projectDemos: Record<string, string> = {
  "Desnutricion-PG": "https://nutrivigilancia.vercel.app/",
  "Gestor_de_Tareas": "https://gestor-de-tareas-simple.vercel.app",
  "frontend": "https://frontend-alpha-rust.vercel.app",
  "Hackaton_2025": "https://energy-analitics-2025.vercel.app",
};

export const manualData: Record<string, Partial<RepoInfo>> = {
  "Desnutricion-PG": {
    title: "NutriVigilancia",
    description: "Plataforma de vigilancia epidemiológica nutricional para niños menores de 5 años en Colombia. Integra modelos de ML supervisado (scikit-learn) para predicción de estados nutricionales, proyecciones SARIMA, análisis con IA (Gemini) y un asistente clínico de voz basado en Llama 3.3.",
    technologies: ["Python", "scikit-learn", "SARIMA", "FastAPI", "Google Cloud", "Groq / Llama 3.3"]
  },
  Hackaton_2025: {
    title: "EnergyAnalytics",
    description: "Proyecto desarrollado en Hackaton 2025. Análisis y predicción de producción de energía renovable (solar y eólica) en Colombia usando Random Forest, Prophet para series de tiempo y dashboards interactivos con 2.050 registros de producción en MWh.",
    technologies: ["Python", "scikit-learn", "Prophet", "Random Forest", "Pandas", "Flask"]
  },
  Gestor_de_Tareas: {
    title: "Gestor de Tareas",
    description: "Aplicación web para la gestión de tareas y proyectos colaborativos, con frontend en Vue y backend en Python. Permite crear, editar, y visualizar tareas en tiempo real.",
    technologies: ["Vue", "Python", "JavaScript", "HTML", "Mako"]
  }
};

export const financyBankManual: RepoInfo = {
  id: 999999,
  name: "FinancyBank",
  description: "Aplicación para gestión financiera personal y bancaria, desarrollada en Flutter/Dart. Incluye manejo de cuentas, presupuestos y visualizaciones modernas.",
  html_url: "https://github.com/aluciacastro/FinancyBank",
  language: "Dart",
  owner: { login: "aluciacastro" },
  topics: ["Flutter", "Dart", "Finanzas"],
  technologies: ["Dart", "Flutter", "C++", "CMake", "Swift", "C"]
};