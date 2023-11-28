import BaseService from "../core/base_service";
import type { LogIn, SignUp } from "./schema";

class AuthService extends BaseService {
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

export interface Domain {
  root: "http://localhost:3000";
}
export interface Params {
  GET: "";
  POST: "signup" | "login" | "logout";
  DELETE: "";
  PUT: "";
}
export interface Queries {
  root: "";
}
export default class AuthController {
  authService: AuthService = new AuthService();
}
export interface Controllers {
  authController: AuthController;
}
