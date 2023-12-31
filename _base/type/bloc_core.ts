import type { Controllers } from "../a/service";
import type { Configs, IModels, IStatus } from "../a/type";

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
export type AnyErrType = IModels["err"]["any"];
