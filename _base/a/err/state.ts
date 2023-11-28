import { IStateCore, type IArgumentCore } from "../../core";

export type ErrStatus = true | false;
export type ErrEventArgument = IArgumentCore<"err", "err">;
export default class ErrState extends IStateCore<"err", "err"> {
  constructor() {
    super({ statusOrErr: false });
  }
}
