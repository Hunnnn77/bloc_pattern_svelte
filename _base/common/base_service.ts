import { Effect } from 'effect';
import { RuntimeException } from 'effect/Cause';
import type {
    HttpError,
    HttpOk,
    MethodKeys,
    PathVarsKeys,
    Req,
} from '../types/http_core';
import type { ModelByKey, ModelKeys } from '../types/model_core';
import type { AsyncResult } from './monad';
import { mode } from '../config';

export abstract class BaseService {
    private async fetcher<K extends ModelKeys>(res: Response): AsyncResult<K> {
        if (!res.ok) {
            const err: HttpError = {
                code: res.status,
                message: res.statusText,
            };
            return Effect.fail(err);
        } else {
            const data = (await res.json()) as ModelByKey<K> | ModelByKey<K>[];
            const ok: HttpOk<ModelByKey<K>> = {
                code: res.status,
                message: res.statusText,
                data,
            };
            return Effect.succeed(ok);
        }
    }

    protected async tryOrCatch<
        V extends PathVarsKeys,
        M extends MethodKeys,
        K extends ModelKeys,
    >(
        method: M,
        req: Req<V, M, V>,
        ctx?: {
            data: unknown;
        }
    ): AsyncResult<K> {
        function query(req: Req<V, M, V>): string {
            let path: string;
            let q: string;

            if (req.domain.param) path = `/${req.domain.param}`;
            else path = '';

            if (req.domain.query)
                q = `/?${req.domain.query?.key}=${req.domain.query?.value}`;
            else q = '';

            return `${req.domain.root}${path}${q}`.trim();
        }

        const ops =
            method !== 'GET'
                ? {
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(ctx?.data ?? {}),
                  }
                : {
                      headers: {
                          'Content-Type': 'application/json',
                      },
                  };

        const isDev = () => {
            if (mode === 'dev') {
                console.log(query(req));
            }
        };

        return await this.fetcher<K>(
            await Effect.runPromise(
                Effect.tryPromise({
                    try: () => {
                        isDev();
                        return fetch(query(req), {
                            method,
                            ...ops,
                        });
                    },
                    catch: (err) => {
                        isDev();
                        if (err instanceof Error) {
                            throw RuntimeException(
                                `${err.name} - ${err.message} - ${err.cause}`
                            );
                        }
                    },
                })
            )
        );
    }
}
