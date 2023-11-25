import { children } from "$lib/bloc/bloc_http_controller";
import type { IModels } from "$lib/bloc/bloc_output_schema";
import { isProd, mode } from "$lib/config";
import { Effect, Option } from "effect";
import type {
  BaseChildrenKey,
  Children,
  HttpError,
  HttpOK,
  IBaseBlocCore,
  ModelKeys,
} from "../types";
import { Optionality, type FailablePromise, type Noneable } from "../utils";
import type { BaseEvent } from "./base_event";

export abstract class BaseBloc<T, U extends BaseEvent<T>>
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

  protected async try<K extends ModelKeys>(context: {
    result: FailablePromise<K>;
    emit?: (ok: IModels[K] & HttpOK) => void;
  }): Promise<HttpError | null> {
    return await Effect.runPromise(
      Effect.match(await context.result, {
        onSuccess(ok) {
          if (!isProd(mode))
            console.log(`success|>\n${JSON.stringify(ok, null, 2)}\n`);
          if (!context.emit) {
            if (!isProd(mode))
              console.warn("anything has't been emit to event");
            return null;
          }
          context.emit(ok);
          return null;
        },
        onFailure(error) {
          if (!isProd(mode))
            console.log(`failure|>\n${JSON.stringify(error, null, 2)}`);
          return error;
        },
      }),
    );
  }
}
