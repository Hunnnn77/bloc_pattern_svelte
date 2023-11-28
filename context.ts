import type { AnyErrKeys, LogIn } from "./_base";
import AuthBloc from "./_base/a/auth/bloc";
import type { DevMode } from "./_base/a/config";
import ErrBloc from "./_base/a/err/bloc";
import type { AnyErrType } from "./_base/type";

export const MODE: DevMode = "dev";

const authBloc = new AuthBloc();
const authErrBloc = new ErrBloc();
const errBloc = new ErrBloc();

export const ctx = {
  auth: {
    state: authBloc.state,
    err: authErrBloc.state,
    login: async (login: LogIn) =>
      authErrBloc.append(await authBloc.logIn(login)),
    logout: async () => authErrBloc.append(await authBloc.logOut()),
  },
  err: {
    err: errBloc.state,
    append: (e: AnyErrType) => errBloc.append(e),
    remove: (k: AnyErrKeys) => errBloc.remove(k),
  },
} as const;
