import type { IModels } from "$lib/bloc/bloc_output_schema";
import { Effect, Option } from "effect";
import type { HttpError, HttpOK } from "../types/http_core";
import type { ModelKeys } from "../types/model_core";

export type Failable<T, E> = Effect.Effect<never, E, T>;
export type Noneable<T> = Option.Option<T>;
export type FailablePromise<K extends ModelKeys> = Promise<
  Failable<IModels[K] & HttpOK, HttpError>
>;

interface IWrap<T> {
  ok: () => boolean;
  unwrap: () => T | null;
}

export class Resulty<T, E extends string> implements IWrap<T> {
  static wrap<T, E extends string>(a: Failable<T, E>) {
    return new Resulty(a);
  }

  private constructor(private result: Failable<T, E>) {}

  ok() {
    return Effect.isSuccess(this.result) ? true : false;
  }

  private try(): Noneable<T> {
    if (!this.ok()) return Option.none();
    return Option.some(Effect.runSync(this.result));
  }

  unwrap() {
    return Optionality.wrap(this.try()).unwrap();
  }
}

export class Optionality<T> implements IWrap<T> {
  static wrap<T>(a: Noneable<T>) {
    return new Optionality(a);
  }

  private constructor(private option: Noneable<T>) {}

  ok() {
    return Option.isSome(this.option) ? true : false;
  }

  unwrap() {
    if (!this.ok()) return null;
    else return Option.getOrNull<T>(this.option) as T;
  }
}
