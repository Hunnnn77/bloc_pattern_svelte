import { isProd, mode } from "$lib/bloc/config";
import { z } from "zod";
import { tzNow } from "../utils";

const size = () => (!isProd(mode) ? 2 : 8);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(size()),
});
export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(size()),
  createdAt: z.string().optional().default(tzNow),
});

export type LogIn = z.infer<typeof loginSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
