import type { IStatus } from "$lib/bloc";
import type { IModels } from "$lib/bloc/bloc_output_schema";

export type ModelKeys = keyof IModels;
export type StatusKeys = keyof IStatus;
export interface ArgumentsCore<S extends StatusKeys, M extends ModelKeys> {
  status: IStatus[S];
  from?: IModels[M];
  to?: IModels[M];
}
