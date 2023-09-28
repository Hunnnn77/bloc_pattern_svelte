import type { Unsubscriber } from 'svelte/motion';
import type { Configs, Controllers } from './models';
import type { BaseEvent } from '../common';

export interface IBaseBlocCore<T, U extends BaseEvent<T>> {
    setEvent(e: U): void;
}

export interface IBaseBlocLifeCycle {
    add(unsubs: Unsubscriber[]): void;
    dispose: () => void;
}

export interface BaseChildren<T, U> {
    configs: T;
    controllers: U;
}

export type BaseChildrenKey<
    T = Record<string, unknown>,
    U = Record<string, unknown>,
> = keyof BaseChildren<T, U>;

export interface Children<T = Configs, U = Controllers>
    extends BaseChildren<T, U> {}
