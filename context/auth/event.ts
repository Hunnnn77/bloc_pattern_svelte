import { Effect } from 'effect';
import type { Writable } from 'svelte/store';
import { BaseEvent, type Result, type SomeOr } from '../../_base';
import AuthState, { type AuthStatus, type IAuthState } from './state';

export default abstract class AuthEvent extends BaseEvent<AuthState> {
    protected abstract readonly _status: AuthStatus;
    constructor(protected props: IAuthState) {
        super();
    }

    private _check(cond: boolean): Result<SomeOr<never>, Error> {
        if (!cond)
            return Effect.fail(
                new Error(`eval:${this.props.status} / ok:${this._status}`)
            );
        return Effect.succeedNone;
    }

    protected _ok() {
        Effect.runSync(this._check(this._status === this.props.status));
    }
}

export class LogInEvent extends AuthEvent {
    protected readonly _status: AuthStatus = 'login';
    update(w$: Writable<AuthState>): void {
        this._ok();
        w$.update((_) =>
            AuthState.copy({
                status: this.props.status,
                user: this.props.user,
            })
        );
    }
}

export class LogOutEvent extends AuthEvent {
    protected readonly _status: AuthStatus = 'logout';
    update(w$: Writable<AuthState>): void {
        this._ok();
        w$.update((_) => AuthState.copy({ status: this.props.status }));
    }
}
