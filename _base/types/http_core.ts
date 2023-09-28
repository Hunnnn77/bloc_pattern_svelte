import type { Domain, Queries, ParamBy } from './models';

interface HttpResponse {
    code: number;
    message: string;
}
export interface HttpOk<T> extends HttpResponse {
    data: T | T[];
}
export interface HttpError extends HttpResponse {}

export interface Req<
    R extends PathVarsKeys,
    M extends MethodKeys,
    Q extends PathQueriesKeys,
> {
    _key: R;
    domain: {
        root: Domain[R];
        param?: Param<M>;
        query?: {
            key: Queries[Q];
            value: string;
        };
    };
}

export type PathVarsKeys = keyof Domain;
export type PathQueriesKeys = keyof Queries;
export type MethodKeys = keyof ParamBy;
export type Param<T extends MethodKeys> = ParamBy[T];
