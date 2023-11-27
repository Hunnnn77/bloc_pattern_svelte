export type DevMode = "prod" | "dev";
export const mode: DevMode = "dev";
export const isProd = (mod: DevMode) => (mod === "prod" ? true : false);
