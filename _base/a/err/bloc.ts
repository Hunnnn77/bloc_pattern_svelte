import BaseBloc from "../../core/base_bloc";
import type { AnyErrKeys } from "../type";
import type ErrEvent from "./event";
import { AppendErrEvent, InitialErrEvent, UpdateErrEvent } from "./event";
import ErrState from "./state";

export default class ErrBloc extends BaseBloc<ErrState, ErrEvent> {
  constructor() {
    super(new ErrState());
  }

  private isEmpty(obj: Record<string, any>): boolean {
    for (const k in obj) {
      if (Object.hasOwn(obj, k)) return false;
    }
    return true;
  }

  append<T>(e: T): void {
    if (e) {
      this.setEvent(new AppendErrEvent({ statusOrErr: true, to: e }));
    }
  }

  remove(k: AnyErrKeys): void {
    if (this.state.from) {
      console.log(this.state.from)
      delete this.state.from[k];
      console.log(this.state.from)
      this.setEvent(new UpdateErrEvent({ statusOrErr: this.state.statusOrErr ?? true, to: this.state.from }))
      if (this.isEmpty(this.state.from)) {
        this.setEvent(new InitialErrEvent({ statusOrErr: false }));
      }
    }
  }
}
