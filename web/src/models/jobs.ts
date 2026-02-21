import * as z from "zod/v4";

export const jobSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  employmentType: z.string(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Job = z.infer<typeof jobSchema>;

export const updateJobRequestSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  salaryMin: z.number().optional(),
  salaryMax: z.number().optional(),
  employmentType: z.string(),
  isActive: z.boolean(),
});

export type UpdateJobRequest = z.infer<typeof updateJobRequestSchema>;
