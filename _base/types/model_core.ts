import type { IModels } from './models';

export type ModelKeys = keyof IModels;
export type ModelByKey<T extends ModelKeys> = Pick<IModels, T>;
