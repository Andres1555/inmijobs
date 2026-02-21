import * as z from "zod/v4";
import { userSchema } from "./user";

export const createApplicationRequestSchema = z.object({
  coverLetter: z.string(),
})

export type CreateApplicationRequest = z.infer<typeof createApplicationRequestSchema>;

export const CrateApplicationResponseSchema = z.object({
  message: z.string(),
})

export type CreateApplicationResponse = z.infer<typeof CrateApplicationResponseSchema>;

export const companyApplicationSchema = z.object({
  id: z.string(),
  user: userSchema,
  coverLetter: z.string(),
  status: z.string(),
  createdAt: z.coerce.date(),
})

export type CompanyApplication = z.infer<typeof companyApplicationSchema>;
