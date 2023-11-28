import type { Children } from "../type";
import { AuthController } from "./service";

export type DevMode = "prod" | "dev";
export const mode: DevMode = "dev";
export const isProd = (mod: DevMode) => (mod === "prod" ? true : false);

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
