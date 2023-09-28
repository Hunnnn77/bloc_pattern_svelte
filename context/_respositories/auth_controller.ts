import type { IAuth, SignUp, LogIn } from '../../_base/types';
import { BaseController } from '../../_base/common/base_controller';
import type { AsyncResult } from '../../_base/common/monad';

export class AuthController extends BaseController implements IAuth<'User'> {
    async signUp(signUp: SignUp): AsyncResult<'User'> {
        return await this.authService.signUp(signUp);
    }

    async logIn(logIn: LogIn): AsyncResult<'User'> {
        return await this.authService.logIn(logIn);
    }

    async logOut(): AsyncResult<'User'> {
        return await this.authService.logOut();
    }
}
