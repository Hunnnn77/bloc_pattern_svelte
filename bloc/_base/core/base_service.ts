import type { IModels } from "$lib/bloc/bloc_output_schema";
import { mode } from "$lib/config";
import { Effect } from "effect";
import type {
  DomainKeys,
  HttpError,
  HttpOK,
  MethodKeys,
  Req,
} from "../types/http_core";
import type { ModelKeys } from "../types/model_core";
import type { FailablePromise } from "../utils/wrap";

export default abstract class BaseService {
  protected async try<
    V extends DomainKeys,
    M extends MethodKeys,
    K extends ModelKeys,
  >(method: M, req: Req<V, M, V>): FailablePromise<K> {
    const query = (req: Req<V, M, V>) => {
      let path: string;
      let q: string;

      if (req.request.param) path = `/${req.request.param}`;
      else path = "";

      if (req.request.query) {
        q = `/?${req.request.query?.key}=${req.request.query?.value}`;
      } else q = "";

      return `${req.request.url}${path}${q}`.trim();
    };

    const isDev = () => {
      if (mode === "dev") {
        console.log(`request|>\n${method.toUpperCase()}: ${query(req)}`);
        if (req.request.body)
          console.log(
            `with body: ${JSON.stringify(req.request.body, null, 2)}\n`,
          );
      }
    };

    return await this._fetcher<K>(
      await Effect.runPromise(
        Effect.tryPromise({
          try: () => {
            isDev();
            return fetch(query(req), {
              credentials: "include",
              method,
              headers: {
                "Content-Type": "application/json",
              },
              body: !req.request.body ? null : JSON.stringify(req.request.body),
            });
          },
          catch: (err) => {
            isDev();
            return err;
          },
        }),
      ),
    );
  }

  private async _fetcher<K extends ModelKeys>(
    res: Response,
  ): FailablePromise<K> {
    const isSuccess = (code: number): boolean => {
      const regex = /^2\d\d$/;
      return regex.test(code.toString()) ? true : false;
    };

    if (!isSuccess(res.status)) {
      const err: HttpError = {
        code: res.status,
        message: res.statusText,
      };
      return Effect.fail(err);
    }
    const ok = (await res.json()) as IModels[K] & HttpOK;
    return Effect.succeed(ok);
  }
}
