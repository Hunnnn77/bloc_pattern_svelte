import { Effect, Option } from "effect";
import type {
  NullableErrPromise,
  OmittedErr,
  SuccessResponse,
  Transformer,
} from ".";

export type Failable<T, E> = Effect.Effect<never, E, T>;
export type Noneable<T> = Option.Option<T>;
export type FailablePromise<K extends OmittedErr> = Promise<
  Failable<SuccessResponse<K>, Transformer<NullableErrPromise>>
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
