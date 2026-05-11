import bcrypt from "bcryptjs";

import { User } from "../users/user.model";
import { IUser } from "../users/user.interface";
import {
  createAuthToken,
  sanitizeUser,
} from "./auth.utils";
import {
  IAuthPayload,
  IAuthResponse,
  IRegisterInput,
} from "./auth.interface";

const registerAdmin = async (
  payload: IRegisterInput
): Promise<IAuthResponse> => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const user = await User.create({
    ...payload,
    role: "admin",
  } as IUser);

  const tokenPayload: IAuthPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const token = createAuthToken(tokenPayload);
  const sanitizedUser = sanitizeUser(user);

  return {
    token,
    user: sanitizedUser,
  };
};

const loginUser = async (
  email: string,
  password: string
): Promise<IAuthResponse> => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid credentials");
  }

  const tokenPayload: IAuthPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const token = createAuthToken(tokenPayload);
  const sanitizedUser = sanitizeUser(user);

  return {
    token,
    user: sanitizedUser,
  };
};

const registerUser = async (
  payload: IRegisterInput
): Promise<IAuthResponse> => {
  const existingUser = await User.findOne({ email: payload.email });

  if (existingUser) {
    throw new Error("Email already registered");
  }

  const user = await User.create({
    ...payload,
    role: "user",
  } as IUser);

  const tokenPayload: IAuthPayload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const token = createAuthToken(tokenPayload);
  const sanitizedUser = sanitizeUser(user);

  return {
    token,
    user: sanitizedUser,
  };
};

export const AuthService = {
  loginUser,
  registerUser,
  registerAdmin,
};