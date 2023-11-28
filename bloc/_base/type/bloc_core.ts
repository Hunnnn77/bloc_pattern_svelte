import type { Configs, Controllers } from "../a/config";
import type { IModels, IStatus } from "../a/type";

export type AnyErrType = IModels["err"]["any"];
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
