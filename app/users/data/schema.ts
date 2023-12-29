import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.union([z.literal("Admin"), z.literal("SuperAdmin")]),
  lastSignIn: z.date().nullable(),
});
export type User = z.infer<typeof userSchema>;
