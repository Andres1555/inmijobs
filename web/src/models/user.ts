import * as z from "zod/v4";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
  image: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
