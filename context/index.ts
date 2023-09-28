import { getContext, setContext } from 'svelte';
import type { Readable } from 'svelte/store';
import { authBloc } from './auth/bloc';

const ctx = {
    auth: {
        state: authBloc.state,
        dispose: () => authBloc.dispose(),
    },
};

const setter = <T extends { state: Readable<unknown> }, K = keyof T>(
    partOfCtx: T,
    k: K
) => setContext(k, partOfCtx);
export const setCtx = <K extends keyof typeof ctx>(k: K) => setter(ctx[k], k);
export const getCtx = <K extends keyof T, T = typeof ctx>(k: K): T[K] =>
    getContext(k) as T[K];
