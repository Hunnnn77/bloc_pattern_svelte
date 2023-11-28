import type { AnyError, NullableErrPromise, Transformer } from "../type";
import type { AuthStatus } from "./auth/state";
import type { ErrStatus } from "./err/state";
import type { AuthResponse } from "./schema";

export type AnyErrKeys = "hello" | "world";
export interface IStatus {
  err: ErrStatus;
  auth: AuthStatus;
}
export interface IModels {
  err: {
    http: Transformer<NullableErrPromise>;
    any: Transformer<AnyError>;
  };
  auth: AuthResponse;
}
