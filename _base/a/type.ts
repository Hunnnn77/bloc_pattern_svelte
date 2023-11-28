import type {
  AnyError,
  Children,
  NullableErrPromise,
  Transformer,
} from "../type";
import type { AuthStatus } from "./auth/state";
import type { ErrStatus } from "./err/state";
import type { AuthResponse } from "./schema";
import AuthController from "./service";

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
export type AnyErrKeys = "hello" | "world";

export interface Configs {}
export const children: Children = {
  configs: {},
  controllers: {
    authController: new AuthController(),
  },
};
