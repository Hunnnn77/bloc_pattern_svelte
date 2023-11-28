import { getContext, setContext } from "svelte";
import type { AnyErrArgument, AnyErrKeys, LogIn } from "./_base";
import AuthBloc from "./_base/a/auth/bloc";
import ErrBloc from "./_base/a/err/bloc";

const authBloc = new AuthBloc();
const authErrBloc = new ErrBloc();
const errBloc = new ErrBloc();

const ctx = {
  auth: {
    state: authBloc.state,
    err: authErrBloc.state,
    login: async (login: LogIn) =>
      authErrBloc.append(await authBloc.logIn(login)),
    logout: async () => authErrBloc.append(await authBloc.logOut()),
  },
  err: {
    err: errBloc.state,
    append: (e: AnyErrArgument) => errBloc.append(e),
    remove: (k: AnyErrKeys) => errBloc.remove(k),
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
