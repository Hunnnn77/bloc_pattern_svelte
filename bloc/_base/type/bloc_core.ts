import type { AuthStatus } from "../a/auth/state";
import type { ErrStatus } from "../a/err/state";
import type { Configs, Controllers, ResponseData } from "../schema";
import type { NullableErrBound, UnwrapFailureOr } from "./http_core";

export type ErrAny = IModels["err"]["any"];
export type ErrHttp = IModels["err"]["http"];
export type ErrBound = ErrAny | ErrHttp | null;
export interface IStatus {
  err: ErrStatus;
  auth: AuthStatus;
}
export interface IModels {
  err: {
    http: UnwrapFailureOr<NullableErrBound>;
    any: UnwrapFailureOr<{ hello: string; world: string }>;
  };
  auth: ResponseData;
}
export interface BaseChildren<T, U> {
  configs: T;
  controllers: U;
}
export type BaseChildrenKey<
  T = Record<string, unknown>,
  U = Record<string, unknown>,
> = keyof BaseChildren<T, U>;
export interface Children<T = Configs, U = Controllers>
  extends BaseChildren<T, U> {}

export type StatusKeys = keyof IStatus;
export type OmittedErr = keyof Omit<IModels, "err">;
export type ConstraintByStatus<S> = S extends OmittedErr ? OmittedErr : "err";
