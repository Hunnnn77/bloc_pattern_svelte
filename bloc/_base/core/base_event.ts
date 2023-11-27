import { Effect } from "effect";
import type { z } from "zod";

interface Ok {
  _tag: string;
  state: { status: string; from?: unknown; to?: unknown };
  schema: z.ZodObject<any>;
}

export default abstract class BaseEvent<T> {
  constructor() {}
  abstract update(state$: T): void;
  protected ok(arg: Ok) {
    const evaluator = () => {
      switch (true) {
        case arg._tag !== arg.state.status:
          return Effect.fail(
            `_tag needs: ${arg._tag} / get: ${arg.state.status}`,
          );
        case arg.state.from:
          return Effect.fail(
            `"from" not acceptable, use "to" in event argument`,
          );
        case !arg.state.to:
          return Effect.fail('none of data passed "to"');
        case !arg.schema.safeParse(arg.state.to).success:
          return Effect.fail(
            `schema needs: ${Object.keys(
              arg.schema.shape,
            )} / get: ${Object.keys(arg.state.to as object)}`,
          );
        default:
          return Effect.succeedNone;
      }
    };
    Effect.runSync(evaluator());
  }
}
