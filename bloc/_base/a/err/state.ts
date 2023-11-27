import { IStateCore, type IArgumentCore } from "../../core";

export type ErrStatus = "none" | "err";
export type ErrEventArgument = IArgumentCore<"err", "err">;
export default class ErrState extends IStateCore<"err", "err"> {
  constructor() {
    super({ status: "none" });
  }
}
