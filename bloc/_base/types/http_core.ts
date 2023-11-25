import type { Domain, Params, Queries } from "../../bloc_http_model";

interface HttpResponse {
  code: number;
}
export interface HttpOK extends HttpResponse {}
export interface HttpError extends HttpResponse {
  message?: string;
}
export type Errable = Promise<HttpError | null>;
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
