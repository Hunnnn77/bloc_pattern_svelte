import type { Domain, Params, Queries } from "../a/service";
import type { AnyErrKeys, IModels } from "../a/type";
import type { OmittedErr } from "./bloc_core";

interface ErrorBound {
  http: HttpError;
  any: AnyError;
}
interface HttpResponse {
  message?: string;
}
interface HttpOK extends HttpResponse {}
interface HttpError extends HttpResponse {}
export type AnyError = { [K in AnyErrKeys]: true };
export type SuccessResponse<T extends OmittedErr> = IModels[T] & HttpOK;
export type NullableErrPromise = Promise<
  HttpError | Record<string, any> | null
>;
export type Err<K extends keyof ErrorBound> = ErrorBound[K];
export type Transformer<T> = T extends Promise<any>
  ? Awaited<NullableErrPromise> | null
  : Partial<T>;
export interface Req<
  R extends DomainKeys,
  M extends MethodKeys,
  Q extends PathQueriesKeys,
> {
  _domain: R;
  request: {
    url: Domain[R];
    param?: Param<M>;
    query?: {
      key: Queries[Q];
      value: string;
    };
    body?: unknown;
  };
}
export type DomainKeys = keyof Domain;
export type PathQueriesKeys = keyof Queries;
export type MethodKeys = keyof Params;
export type Param<T extends MethodKeys> = Params[T];
