import type { ErrBound } from "../..";
import BaseBloc from "../../core/base_bloc";
import type ErrEvent from "./event";
import { NoErrEvent, OnErrEvent } from "./event";
import ErrState from "./state";

export default class ErrBloc extends BaseBloc<ErrState, ErrEvent> {
  constructor() {
    super(new ErrState());
  }
  catchErr<T extends ErrBound>(e: T): void {
    if (e !== null) {
      this.setEvent(new OnErrEvent({ status: "err", to: e }));
    } else {
      this.setEvent(new NoErrEvent({ status: "none" }));
    }
  }
}
