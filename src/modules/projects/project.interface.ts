export interface IProjectFeature {
  label: string;
}

export interface IProject {
  title: string;

  slug: string;

  description?: string;

  thumbnail: string;

  gallery?: string[];

  category: string;

  technologies?: string[];

  features?: IProjectFeature[];

  location?: string;

  client?: string;

  completionYear?: number;

  featured: boolean;

  order: number;

  status: "ongoing" | "completed";

  projectUrl?: string;

}