import { getContext, setContext } from "svelte";
import AuthBloc from "./auth/bloc";
import type { LogIn } from "./bloc_input_schema";

const authBloc = new AuthBloc();

const ctx = {
  auth: {
    state: authBloc.state,
    login: async (login: LogIn) => await authBloc.logIn(login),
    logout: async () => await authBloc.logOut(),
  },
} as const;

type Keys = keyof typeof ctx;
export const setCtx = () => {
  const keys = Object.keys(ctx) as Keys[];
  for (const k of keys) {
    setContext(k, ctx[k]);
  }
};
export const getCtx = <K extends keyof T, T = typeof ctx>(k: K): T[K] =>
  getContext(k) as T[K];
