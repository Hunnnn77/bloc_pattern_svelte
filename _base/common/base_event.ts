import type { Writable } from 'svelte/store';

export abstract class BaseEvent<T> {
    abstract update(w$: Writable<T>): void;
}
