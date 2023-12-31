import { z } from "zod";

const businessSchema = z.object({
  id: z.string(),
  name: z.string().email(),
  image: z.string(),
});
export type Business = z.infer<typeof businessSchema>;
