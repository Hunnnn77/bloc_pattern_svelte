import type { Errable } from "../_base";
import { BaseBloc } from "../_base/core/base_bloc";
import type { LogIn, SignUp } from "../bloc_input_schema";
import type AuthEvent from "./event";
import { LogInEvent, LogOutEvent } from "./event";
import AuthState from "./state";

interface IAuthBloc {
  signUp(signUp: SignUp): Errable;
  logIn(logIn: LogIn): Errable;
  logOut(): Errable;
}

export default class AuthBloc
  extends BaseBloc<AuthState, AuthEvent>
  implements IAuthBloc
{
  constructor() {
    super(new AuthState());
  }

  async signUp(signUp: SignUp): Errable {
    return await this.try({
      result: this._controllers.authController.authService.signUp(signUp),
    });
  }

  async logIn(logIn: LogIn): Errable {
    return await this.try({
      result: this._controllers.authController.authService.logIn(logIn),
      emit: (ok) => this.setEvent(new LogInEvent({ status: "login", to: ok })),
    });
  }

  async logOut(): Errable {
    return await this.try({
      result: this._controllers.authController.authService.logOut(),
      emit: (_) => this.setEvent(new LogOutEvent({ status: "logout" })),
    });
  }
}
