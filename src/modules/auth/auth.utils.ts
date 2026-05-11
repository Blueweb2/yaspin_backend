import jwt from "jsonwebtoken";

import { IUser } from "../users/user.interface";
import { IAuthPayload } from "./auth.interface";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return secret;
};

export const createAuthToken = (payload: IAuthPayload) => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "7d",
  });
};

export const sanitizeUser = (
  user: IUser | any
): Omit<IUser, "password"> => {
  const result = user.toObject ? user.toObject() : { ...user };

  delete result.password;
  delete result.__v;

  return result;
};
