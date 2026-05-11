import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),

    email: z.string().email(),

    password: z.string().min(6),

    avatar: z.string().optional(),

    bio: z.string().optional(),
  }),
});

export const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),

    avatar: z.string().optional(),

    bio: z.string().optional(),

    socialLinks: z
      .object({
        github: z.string().optional(),
        linkedin: z.string().optional(),
        twitter: z.string().optional(),
        website: z.string().optional(),
      })
      .optional(),
  }),
});