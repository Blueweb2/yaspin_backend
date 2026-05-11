import { z } from "zod";

export const createServiceValidationSchema =
  z.object({
    body: z.object({
      title: z.string(),

      description: z.string(),

      icon: z.string(),

      featured: z
        .boolean()
        .optional(),

      order: z.number().optional(),

      isActive: z
        .boolean()
        .optional(),
    }),
  });

export const updateServiceValidationSchema =
  z.object({
    body: z.object({
      title: z.string().optional(),

      description: z.string().optional(),

      icon: z.string().optional(),

      featured: z
        .boolean()
        .optional(),

      order: z.number().optional(),

      isActive: z
        .boolean()
        .optional(),
    }),
  });