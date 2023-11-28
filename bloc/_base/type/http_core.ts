import type { Domain, Params, Queries } from "../schema";
import type { IModels, OmittedErr } from "./bloc_core";

export type AnyErrKeys = "hello" | "world";
interface ErrorBound {
  http: HttpError;
  any: AnyError;
}
interface HttpResponse {
  message?: string;
}
interface HttpOK extends HttpResponse {}
interface HttpError extends HttpResponse {}
export type AnyError = Record<AnyErrKeys, true>;
export type SuccessResponse<T extends OmittedErr> = IModels[T] & HttpOK;
export type NullableErrPromise = Promise<
  HttpError | Record<string, any> | null
>;
export type Err<K extends keyof ErrorBound> = ErrorBound[K];
export type Unwrap<T> = T extends Promise<any>
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
