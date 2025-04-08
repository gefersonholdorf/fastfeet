import { z } from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().optional().default(3000),
    DATABASE_URL: z.string(),
    SECRET_KEY: z.string(),
    EMAIL_HOST: z.string(),
    EMAIL_DEFAULT: z.string(),
    EMAIL_PORT: z.coerce.number(),
    EMAIL_USER: z.string(),
    EMAIL_PASS: z.string(),
})

export type Env = z.infer<typeof envSchema>