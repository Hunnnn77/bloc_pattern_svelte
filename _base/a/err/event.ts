import BaseEvent from "../../core/base_event";
import type ErrState from "./state";
import type { ErrEventArgument, ErrStatus } from "./state";

export default abstract class ErrEvent extends BaseEvent<ErrState> {
  constructor(protected state: ErrEventArgument) {
    super();
  }
  protected abstract _tag: ErrEventArgument["statusOrErr"];
}

export class InitialErrEvent extends ErrEvent {
  protected _tag: ErrStatus = false;
  update(state$: ErrState): void {
    state$.copy({ statusOrErr: this._tag });
  }
}

export class AppendErrEvent extends ErrEvent {
  protected _tag: ErrStatus = true;
  update(state$: ErrState): void {
    state$.copy({
      statusOrErr: this._tag,
      from: !state$.from
        ? this.state.to
        : {
          ...state$.from,
          ...this.state.to,
        },
    });
  }
}

export class UpdateErrEvent extends ErrEvent {
  protected _tag: ErrStatus = true;
  update(state$: ErrState): void {
    state$.copy({
      statusOrErr: this._tag,
      from: this.state.to
    });
  }
}
