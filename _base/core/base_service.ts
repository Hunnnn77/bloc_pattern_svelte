import { MODE } from "$lib/bloc/context";
import { Effect } from "effect";
import type {
  DomainKeys,
  Err,
  FailablePromise,
  MethodKeys,
  OmittedErr,
  Req,
  SuccessResponse,
} from "../type";

export default abstract class BaseService {
  protected async try<
    V extends DomainKeys,
    M extends MethodKeys,
    K extends OmittedErr,
  >(method: M, req: Req<V, M, V>): FailablePromise<OmittedErr> {
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

    return await this._fetcher<K>(
      await Effect.runPromise(
        Effect.tryPromise({
          try: () => {
            if (MODE === "dev") {
              console.log(`request|>\n${method.toUpperCase()}: ${query(req)}`);
              if (req.request.body)
                console.log(
                  `body|> ${JSON.stringify(req.request.body, null, 2)}\n`,
                );
            }
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
            if (MODE === "dev") {
              console.error(`err|>\n${method.toUpperCase()}: ${query(req)}`);
            }
            return err;
          },
        }),
      ),
    );
  }

  private async _fetcher<K extends OmittedErr>(
    res: Response,
  ): FailablePromise<K> {
    const isSuccess = (code: number): boolean => {
      const regex = /^2\d\d$/;
      return regex.test(code.toString()) ? true : false;
    };

    if (!isSuccess(res.status)) {
      const err: Err<"http"> = {
        message: res.statusText,
      };
      return Effect.fail(err);
    }
    const ok = (await res.json()) as SuccessResponse<K>;
    return Effect.succeed(ok);
  }
}
