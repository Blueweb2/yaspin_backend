import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export const validateRequest = (
  schema: ZodSchema
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await schema.parseAsync(req);
      next();
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.errors[0]?.message || "Validation error",
      });
    }
  };
};