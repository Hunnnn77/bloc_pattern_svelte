import type { IModels, OmittedErr } from "./bloc_core";
import type { Domain, Params, Queries } from "../schema";

interface HttpResponse {
  code: number;
}
export interface HttpOK extends HttpResponse {}
export interface HttpError extends HttpResponse {
  message?: string;
}
export type SuccessResponse<T extends OmittedErr> = IModels[T] & HttpOK;
export type NullableErrBound = Promise<HttpErrBound | null>;
export type HttpErrBound = HttpError | Record<string, any>;
export type UnwrapFailureOr<T> = T extends Promise<any>
  ? Awaited<NullableErrBound> | null
  : Partial<T> | null;
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
