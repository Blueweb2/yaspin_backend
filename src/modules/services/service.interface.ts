export interface IService {
  title: string;

  slug?: string;

  description: string;

  icon: string;

  featured?: boolean;

  order?: number;

  isActive?: boolean;
}