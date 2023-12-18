import { MODE } from "$lib/bloc/context";
import { z } from "zod";
import { tzNow } from "../utils";
import { isProd } from "./config";

const size = () => (!isProd(MODE) ? 2 : 8);

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(size()),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(size()),
  createdAt: z.string().optional().default(tzNow),
});

export const AuthResponseSchema = z.object({
  ok: z.boolean(),
});

export type LogIn = z.infer<typeof loginSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
