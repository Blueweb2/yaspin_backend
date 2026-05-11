import { IUser } from "../users/user.interface";

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
}

export interface IAuthPayload {
  userId: string;
  email: string;
  role: "admin" | "user";
}

export interface IAuthResponse {
  token: string;
  user: Omit<IUser, "password">;
}
