import { IStateCore, type IArgumentCore } from "../../core";

export type AuthStatus = "login" | "logout";
export type AuthEventArgument = IArgumentCore<"auth", "auth">;
export default class AuthState extends IStateCore<"auth", "auth"> {
  constructor() {
    super({ status: "logout" });
  }
}
