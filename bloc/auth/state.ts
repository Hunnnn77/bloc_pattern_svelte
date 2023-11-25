import { IStateCore, type ArgumentsCore } from "../_base";

export type AuthStatus = "login" | "logout";
export type AuthEventArgument = ArgumentsCore<"auth", "user">;
export default class AuthState extends IStateCore<"auth", "user"> {
  constructor() {
    super({ status: "logout" });
  }
}
