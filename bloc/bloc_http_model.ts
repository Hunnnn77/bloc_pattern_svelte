export interface Domain {
  root: "http://localhost:3000";
}
// DOMAIN/[P]
export interface Params {
  GET: "";
  POST: "signup" | "login" | "logout";
  DELETE: "";
  PUT: "";
}
// PARAM?[Q]
export interface Queries {
  root: "";
}
