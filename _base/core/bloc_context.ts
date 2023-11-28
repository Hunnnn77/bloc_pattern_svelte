import { ctx } from "$lib/bloc/context";
import { getContext, setContext } from "svelte";

type Keys = keyof typeof ctx;
export const setCtx = () => {
  const keys = Object.keys(ctx) as Keys[];
  for (const k of keys) {
    setContext(k, ctx[k]);
  }
};
export const getCtx = <K extends keyof T, T = typeof ctx>(k: K): T[K] =>
  getContext(k) as T[K];
