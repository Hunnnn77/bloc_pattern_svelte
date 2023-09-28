import type { SignUp, LogIn } from './models';
import type { ModelKeys } from './model_core';
import type { AsyncResult } from '../common/monad';

//for controller & service
export interface IAuth<T extends ModelKeys> {
    signUp(signUp: SignUp): AsyncResult<T>;
    logIn(logIn: LogIn): AsyncResult<T>;
    logOut(): AsyncResult<T>;
}
