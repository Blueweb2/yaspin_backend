declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: "admin" | "user";
      };
      files?: {
        [fieldname: string]: Express.Multer.File[];
      };
    }
  }
}

export {};