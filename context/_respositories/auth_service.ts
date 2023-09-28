import type { IAuth, SignUp, LogIn } from '../../_base/types';
import { BaseService } from '../../_base/common/base_service';
import type { AsyncResult } from '../../_base/common/monad';

export class AuthService extends BaseService implements IAuth<'User'> {
    async signUp(signUp: SignUp): AsyncResult<'User'> {
        return await this.tryOrCatch(
            'POST',
            {
                _key: 'root',
                domain: {
                    root: 'htts://localhost:3000',
                    param: 'signup',
                },
            },
            {
                data: signUp,
            }
        );
    }

    async logIn(logIn: LogIn): AsyncResult<'User'> {
        return await this.tryOrCatch(
            'POST',
            {
                _key: 'root',
                domain: {
                    root: 'htts://localhost:3000',
                    param: 'login',
                },
            },
            {
                data: logIn,
            }
        );
    }

    async logOut(): AsyncResult<'User'> {
        return this.tryOrCatch('POST', {
            _key: 'root',
            domain: {
                root: 'htts://localhost:3000',
                param: 'logout',
            },
        });
    }
}
