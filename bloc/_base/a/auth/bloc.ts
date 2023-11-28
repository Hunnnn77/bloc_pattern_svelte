import BaseBloc from "../../core/base_bloc";
import type { LogIn, SignUp } from "../../schema";
import type { IModels } from "../../type";
import type AuthEvent from "./event";
import { LogInEvent, LogOutEvent } from "./event";
import AuthState from "./state";

export default class AuthBloc extends BaseBloc<AuthState, AuthEvent> {
  constructor() {
    super(new AuthState());
  }

  async signUp(signUp: SignUp) {
    return await this.try({
      result: this._controllers.authController.authService.signUp(signUp),
    });
  }

  async logIn(logIn: LogIn) {
    return await this.try({
      result: this._controllers.authController.authService.logIn(logIn),
      emit: (ok) =>
        this.setEvent(
          new LogInEvent({ statusOrErr: "login", to: ok as IModels["auth"] }),
        ),
    });
  }

  async logOut() {
    return await this.try({
      result: this._controllers.authController.authService.logOut(),
      emit: (_) => this.setEvent(new LogOutEvent({ statusOrErr: "logout" })),
    });
  }
}
