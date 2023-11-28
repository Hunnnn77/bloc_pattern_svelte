import { MODE } from "$lib/bloc/context";
import { Effect, Option } from "effect";
import { isProd } from "../a/config";
import { children } from "../a/type";
import {
  Optionality,
  type BaseChildrenKey,
  type Children,
  type FailablePromise,
  type Noneable,
  type NullableErrPromise,
  type OmittedErr,
  type SuccessResponse,
} from "../type";
import type BaseEvent from "./base_event";

interface IBaseBlocCore<T, U extends BaseEvent<T>> {
  setEvent(e: U): void;
}

export default abstract class BaseBloc<T, U extends BaseEvent<T>>
  implements IBaseBlocCore<T, U>
{
  constructor(private readonly state$: T) {}

  get state(): T {
    return this.state$;
  }

  setEvent(e: U) {
    e.update(this.state$);
  }

  private getOne<K extends BaseChildrenKey>(k: K): Noneable<Children[K]> {
    if (!children[k]) return Option.none();
    return Option.some(children[k]);
  }

  protected get _configs() {
    return Optionality.wrap(this.getOne("configs")).unwrap()!;
  }

  protected get _controllers() {
    return Optionality.wrap(this.getOne("controllers")).unwrap()!;
  }

  protected async try<K extends OmittedErr>(context: {
    result: FailablePromise<K>;
    emit?: (ok: SuccessResponse<K>) => void;
  }): NullableErrPromise {
    return await Effect.runPromise(
      Effect.match(await context.result, {
        onSuccess(ok) {
          if (!isProd(MODE)) {
            console.log(`success|>\n${JSON.stringify(ok, null, 2)}\n`);
          }
          if (!context.emit) {
            if (!isProd(MODE))
              console.warn("anything has't been emit to event");
            return null;
          }
          context.emit(ok);
          return null;
        },
        onFailure(error) {
          if (!isProd(MODE)) {
            console.log(`failure|>\n${JSON.stringify(error, null, 2)}`);
          }
          return error;
        },
      }),
    );
  }
}
