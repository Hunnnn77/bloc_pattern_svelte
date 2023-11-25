import { BaseEvent } from "../_base/core";
import { ResponseDataSchema } from "../bloc_output_schema";
import type AuthState from "./state";
import type { AuthEventArgument, AuthStatus } from "./state";

export default abstract class AuthEvent extends BaseEvent<AuthState> {
  constructor(protected state: AuthEventArgument) {
    super();
  }
  protected abstract _tag: AuthEventArgument["status"];
}

export class LogInEvent extends AuthEvent {
  protected _tag: AuthStatus = "login";
  update(state$: AuthState): void {
    this.ok({
      _tag: this._tag,
      state: this.state,
      schema: ResponseDataSchema,
    });
    state$.copy({
      status: this._tag,
      from: this.state.to,
    });
  }
}

export class LogOutEvent extends AuthEvent {
  protected _tag: AuthStatus = "logout";
  update(state$: AuthState): void {
    state$.copy({ status: this._tag });
  }
}
