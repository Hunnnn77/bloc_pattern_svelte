import BaseEvent from "../../core/base_event";
import type ErrState from "./state";
import type { ErrEventArgument, ErrStatus } from "./state";

export default abstract class ErrEvent extends BaseEvent<ErrState> {
  constructor(protected state: ErrEventArgument) {
    super();
  }
  protected abstract _tag: ErrEventArgument["status"];
}

export class OnErrEvent extends ErrEvent {
  protected _tag: ErrStatus = "err";
  update(state$: ErrState): void {
    const to = Object.assign({}, state$.from, this.state.to);
    state$.copy({
      status: this._tag,
      from: to,
    });
  }
}

export class NoErrEvent extends ErrEvent {
  protected _tag: ErrStatus = "none";
  update(state$: ErrState): void {
    state$.copy({
      status: this._tag,
    });
  }
}
