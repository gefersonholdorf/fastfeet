import { z } from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().optional().default(3000),
    DATABASE_URL: z.string(),
    SECRET_KEY: z.string()
})

export type Env = z.infer<typeof envSchema>