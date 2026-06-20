import { useEffect, useState } from "react";
import { RepoInfo } from "../types/project";
import { REPOS, manualData } from "../config/projectsConfig";

export const useProjects = () => {
  const [projects, setProjects] = useState<RepoInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepo = async (owner: string, name: string): Promise<RepoInfo | null> => {
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${name}`);
        if (!res.ok) return null;
        const apiData = await res.json();
        const manual = manualData[name] || {};
        return {
          ...apiData,
          description: manual.description ?? apiData.description ?? "Sin descripción",
          technologies: manual.technologies ?? [apiData.language || "No especificado"],
        };
      } catch {
        return null;
      }
    };

    const fetchAll = async () => {
      const results = await Promise.all(REPOS.map(r => fetchRepo(r.owner, r.name)));
      const publicProjects = results.filter(Boolean) as RepoInfo[];
      setProjects(publicProjects);
      setLoading(false);
    };

    fetchAll();
  }, []);

  return { projects, loading };
};
