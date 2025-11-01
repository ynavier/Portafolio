import { Award, ShieldCheck, Cpu } from "lucide-react";
import { FC } from "react";

export interface Certificate {
  id: number;
  title: string;
  institution: string;
  date: string;
  url: string;
  icon: FC<{ className?: string }>;
}

export const certificatesData: Certificate[] = [
  {
    id: 1,
    title: "Data Engineering Professional Certificate",
    institution: "Google",
    date: "Enero 2024",
    url: "#",
    icon: Award,
  },
  {
    id: 2,
    title: "Apache Spark for Big Data",
    institution: "Databricks",
    date: "Junio 2023",
    url: "#",
    icon: Cpu,
  },
  {
    id: 3,
    title: "Azure Data Fundamentals (DP-900)",
    institution: "Microsoft",
    date: "Diciembre 2022",
    url: "#",
    icon: ShieldCheck,
  },
];