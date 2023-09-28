import { BaseBloc, type SignUp, type LogIn } from '../../_base';
import type AuthEvent from './event';
import { LogInEvent, LogOutEvent } from './event';
import type AuthState from './state';
import { authWritable } from './state';

class AuthBloc extends BaseBloc<AuthState, AuthEvent> {
    constructor() {
        super(authWritable);
    }

    async signUp(signUp: SignUp) {
        await this.emit({
            result: this._controllers.authController.signUp(signUp),
        });
    }

    async logIn(logIn: LogIn) {
        await this.emit({
            result: this._controllers.authController.logIn(logIn),
            emitter: (user) => {
                if (!Array.isArray(user)) {
                    this.setEvent(new LogInEvent({ status: 'login', user }));
                }
            },
            w$: this.w$,
        });
    }

    async logOut() {
        await this.emit({
            result: this._controllers.authController.logOut(),
            emitter: (_) =>
                this.setEvent(
                    new LogOutEvent({ status: 'logout', user: null })
                ),
            w$: this.w$,
        });
    }
}

export const authBloc = new AuthBloc();
