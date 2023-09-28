import { Effect, pipe } from 'effect';
import { IllegalArgumentException, RuntimeException } from 'effect/Cause';
import { type Readable, type Writable, type Unsubscriber, readonly } from 'svelte/store';
import { mode, isProd } from '../config';
import {
    children,
    type BaseChildrenKey,
    type Children,
    type IBaseBlocCore,
    type IBaseBlocLifeCycle,
    type ModelKeys,
    type ModelByKey,
} from '../types';
import type { BaseEvent } from './base_event';
import { Resulty, type AsyncResult, type Result } from './monad';

export abstract class BaseBloc<T, U extends BaseEvent<T>>
    implements IBaseBlocCore<T, U>, IBaseBlocLifeCycle {
    constructor(
        protected w$: Writable<T>,
        private _children: Children = children
    ) {}

    get state(): Readable<T> {
        return readonly(this.w$)
    };

    setEvent(e: U) {
        e.update(this.w$);
    }

    protected unsubs = new Set<Unsubscriber>();

    add(unsubs: Unsubscriber[]): void {
        for (const unsub of unsubs) {
            this.unsubs.add(unsub);
        }
    }

    dispose(): void {
        this.unsubs.forEach((unsub) => unsub());
        this.unsubs.clear();
    }

    protected async emit<K extends ModelKeys>(ctx: {
        result: AsyncResult<K>;
        emitter?: (model: ModelByKey<K> | ModelByKey<K>[]) => void;
        w$?: Writable<unknown>;
    }) {
        await Effect.runPromise(
            Effect.match(await ctx.result, {
                onSuccess(value) {
                    pipe(value, (prev) => {
                        if (!isProd(mode)) console.log(value)

                        if (!ctx.emitter) {
                            console.warn(
                                'not passed event emitter, but network call has been succeed'
                            );
                            return;
                        }
                        ctx.emitter(prev.data);
                        if (!isProd(mode)) {
                            if (!ctx.w$)
                                throw IllegalArgumentException(
                                    'writable should be initialized!'
                                );
                            const unsub = ctx.w$.subscribe(console.log);
                            unsub();
                        }
                    });
                },
                onFailure(error) {
                    throw RuntimeException(`${error.code} - ${error.message}`);
                },
            })
        );
    }

    private _getChild<K extends BaseChildrenKey>(
        k: K
    ): Result<Children[K], Error> {
        if (!this._children[k]) {
            return Effect.fail(new Error('not exist: children[k]'));
        }
        return Effect.succeed(this._children[k]);
    }

    protected get _configs() {
        return new Resulty(this._getChild('configs')).unwrap()!;
    }

    protected get _controllers() {
        return new Resulty(this._getChild('controllers')).unwrap()!;
    }
}
