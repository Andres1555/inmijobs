import * as z from "zod/v4";

export const updateCompanyRequestSchema = z.object({
  name: z.string().optional(),
  weblink: z.string().optional(),
  linkedinUrl: z.string().optional(),
  number: z.string().optional(),
  description: z.string().optional(),
  sector: z.string().optional(),
  foundation: z.string().optional(),
  size: z.string().optional(),
  logo: z.string().optional(),
  banner: z.string().optional(),
})

export type UpdateCompanyRequest = z.infer<typeof updateCompanyRequestSchema>;


export const updateCompanyResponseSchema = z.object({
  message: z.string(),
})

export type UpdateCompanyResponse = z.infer<typeof updateCompanyResponseSchema>;
