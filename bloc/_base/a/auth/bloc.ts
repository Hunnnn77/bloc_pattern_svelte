import BaseBloc from "../../core/base_bloc";
import type { LogIn, SignUp } from "../../schema";
import type { IModels, NullableErrBound } from "../../type";
import type AuthEvent from "./event";
import { LogInEvent, LogOutEvent } from "./event";
import AuthState from "./state";

interface IAuthBloc {
  signUp(signUp: SignUp): NullableErrBound;
  logIn(logIn: LogIn): NullableErrBound;
  logOut(): NullableErrBound;
}

export default class AuthBloc
  extends BaseBloc<AuthState, AuthEvent>
  implements IAuthBloc
{
  constructor() {
    super(new AuthState());
  }

  async signUp(signUp: SignUp): NullableErrBound {
    return await this.try({
      result: this._controllers.authController.authService.signUp(signUp),
    });
  }

  async logIn(logIn: LogIn): NullableErrBound {
    return await this.try({
      result: this._controllers.authController.authService.logIn(logIn),
      emit: (ok) =>
        this.setEvent(
          new LogInEvent({ status: "login", to: ok as IModels["auth"] }),
        ),
    });
  }

  async logOut(): NullableErrBound {
    return await this.try({
      result: this._controllers.authController.authService.logOut(),
      emit: (_) => this.setEvent(new LogOutEvent({ status: "logout" })),
    });
  }
}
