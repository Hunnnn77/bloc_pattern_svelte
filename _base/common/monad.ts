import { Effect, Option } from 'effect';
import type { HttpOk, HttpError } from '../types/http_core';
import type { ModelKeys, ModelByKey } from '../types/model_core';

export type Result<T, E> = Effect.Effect<never, E, T>;
export type SomeOr<T> = Option.Option<T>;
export type AsyncResult<K extends ModelKeys> = Promise<
    Result<HttpOk<ModelByKey<K>>, HttpError>
>;

interface IWrap<T> {
    isFalsy: () => boolean;
    unwrap: () => T | null;
}

export class Resulty<T, E extends Error> implements IWrap<T> {
    constructor(private result: Result<T, E>) {}

    isFalsy() {
        if (Effect.isFailure(this.result)) return true;
        else return false;
    }

    private tryResult(): SomeOr<T> {
        try {
            return Option.some(Effect.runSync(this.result));
        } catch (e: unknown) {
            if (e instanceof Error) {
                return Option.none();
            }
        }
        return Option.none();
    }

    unwrap() {
        const o = new Optionality(this.tryResult());
        return o.unwrap();
    }
}

export class Optionality<T> implements IWrap<T> {
    constructor(private option: SomeOr<T>) {}

    isFalsy() {
        if (Option.isNone(this.option)) return true;
        else return false;
    }

    unwrap() {
        if (this.isFalsy()) return null;
        else return Option.getOrNull<T>(this.option) as T;
    }
}
