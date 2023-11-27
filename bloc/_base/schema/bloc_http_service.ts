import BaseService from "../core/base_service";
import type { LogIn, SignUp } from "./bloc_input_schema";

export default class AuthService extends BaseService {
  async signUp(signUp: SignUp) {
    return await this.try("POST", {
      _domain: "root",
      request: {
        url: "http://localhost:3000",
        param: "signup",
        body: signUp,
      },
    });
  }

  async logIn(logIn: LogIn) {
    return await this.try("POST", {
      _domain: "root",
      request: {
        url: "http://localhost:3000",
        param: "login",
        body: logIn,
      },
    });
  }

  async logOut() {
    return this.try("POST", {
      _domain: "root",
      request: {
        url: "http://localhost:3000",
        param: "logout",
      },
    });
  }
}
