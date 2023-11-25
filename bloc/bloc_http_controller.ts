import type { Children } from "./_base";
import AuthService from "./bloc_http_service";

interface Services {
  authService: AuthService;
}

class AuthController implements Services {
  authService: AuthService = new AuthService();
}

export interface Configs {}
export interface Controllers {
  authController: AuthController;
}

export const children: Children = {
  configs: {},
  controllers: {
    authController: new AuthController(),
  },
};
