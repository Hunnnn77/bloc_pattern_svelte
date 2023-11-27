import { getContext, setContext } from "svelte";
import AuthBloc from "./_base/a/auth/bloc";
import ErrBloc from "./_base/a/err/bloc";
import type { LogIn, ErrHttp, ErrAny } from "./_base";

const authBloc = new AuthBloc();
const authErrBloc = new ErrBloc();
const errBloc = new ErrBloc();

const ctx = {
  auth: {
    state: authBloc.state,
    login: async (login: LogIn) => await authBloc.logIn(login),
    logout: async () => await authBloc.logOut(),
    err: authErrBloc.state,
    catchErr: (e: ErrHttp) => authErrBloc.catchErr(e),
  },
  err: {
    err: errBloc.state,
    catchErr: (e: ErrAny) => errBloc.catchErr(e),
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
