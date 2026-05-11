export interface IUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;

  role: "admin" | "user";

  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}