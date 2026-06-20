export interface ProjectProps {
  id: number;
  index?: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  icon: React.ElementType;
  demo?: string;
  github: string;
  category: string;
  hasLiveDemo: boolean;
}

export type RepoInfo = {
  id: number;
  name: string;
  title?: string;
  description: string;
  html_url: string;
  language: string;
  owner: { login: string };
  topics?: string[];
  technologies?: string[];
};