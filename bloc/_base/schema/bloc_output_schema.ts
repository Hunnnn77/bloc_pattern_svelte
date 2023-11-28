import { z } from "zod";

export const AuthResponseSchema = z.object({
  ok: z.boolean(),
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;
