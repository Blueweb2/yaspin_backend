import { z } from "zod";

export const createProjectValidationSchema =
  z.object({
    body: z.object({
      title: z.string(),

      description:
        z.string().optional(),

      category: z.string(),

      technologies: z
        .array(z.string())
        .optional(),

      features: z
        .array(
          z.object({
            label: z.string(),
          })
        )
        .optional(),

      featured: z
        .boolean()
        .optional(),

      order: z.number().optional(),

      status: z
        .enum([
          "ongoing",
          "completed",
        ])
        .optional(),

      location:
        z.string().optional(),

      client:
        z.string().optional(),

      projectUrl:
        z.string().optional(),

      completionYear:
        z.number().optional(),
    }),
  });