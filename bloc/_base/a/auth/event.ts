import BaseEvent from "../../core/base_event";
import { AuthResponseSchema } from "../../schema";
import type AuthState from "./state";
import type { AuthEventArgument, AuthStatus } from "./state";

export default abstract class AuthEvent extends BaseEvent<AuthState> {
  constructor(protected state: AuthEventArgument) {
    super();
  }
  protected abstract _tag: AuthEventArgument["statusOrErr"];
}

export class LogInEvent extends AuthEvent {
  protected _tag: AuthStatus = "login";
  update(state$: AuthState): void {
    this.ok({
      _tag: this._tag,
      state: this.state,
      schema: AuthResponseSchema,
    });
    state$.copy({
      statusOrErr: this._tag,
      from: this.state.to,
    });
  }
}

export class LogOutEvent extends AuthEvent {
  protected _tag: AuthStatus = "logout";
  update(state$: AuthState): void {
    state$.copy({ statusOrErr: this._tag });
  }
}
