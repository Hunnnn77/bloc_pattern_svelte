import type { AuthStatus } from "../a/auth/state";
import type { ErrStatus } from "../a/err/state";
import type { AuthResponse, Configs, Controllers } from "../schema";
import type { AnyError, NullableErrPromise, Unwrap } from "./http_core";

export type AnyErrArgument = IModels["err"]["any"];
export interface IStatus {
  err: ErrStatus;
  auth: AuthStatus;
}

export interface IModels {
  err: {
    http: Unwrap<NullableErrPromise>;
    any: Unwrap<AnyError>;
  };
  auth: AuthResponse;
}

interface BaseChildren<T, U> {
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
