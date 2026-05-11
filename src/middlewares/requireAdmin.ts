import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../modules/users/user.model";

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Allow initial admin registration if no admins exist
  const adminCount = await User.countDocuments({ role: "admin" });
  if (adminCount === 0) {
    return next();
  }

  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Admin access required",
    });
  }
  next();
};

export const requireAuthOrInitialAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const adminCount = await User.countDocuments({ role: "admin" });
  if (adminCount === 0) {
    // No auth required for initial admin
    return next();
  }

  // Otherwise, require auth
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new Error("Unauthorized");
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as any;

    req.user = decoded;
    next();
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};