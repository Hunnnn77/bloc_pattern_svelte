import type { Configs, Controllers } from "$lib/bloc/bloc_http_controller";
import type { BaseEvent } from "../core/base_event";
import type { ArgumentsCore, ModelKeys, StatusKeys } from "./model_core";

export interface IBaseBlocCore<T, U extends BaseEvent<T>> {
  setEvent(e: U): void;
}
export abstract class IStateCore<S extends StatusKeys, M extends ModelKeys> {
  status: ArgumentsCore<S, M>["status"] | undefined = $state();
  from: ArgumentsCore<S, M>["from"] | undefined = $state();
  constructor(initial: ArgumentsCore<S, M>) {
    this.status = initial.status;
    this.from = initial.from;
  }
  copy(newState: Partial<ArgumentsCore<S, M>>): void {
    this.status = newState.status ?? this.status;
    this.from = newState.from ?? this.from;
  }
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
