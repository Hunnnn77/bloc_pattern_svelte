export type DevMode = 'prod' | 'dev';

export const mode: DevMode = 'dev';

export function isProd(mod: DevMode) {
    if (mod === 'prod') return true;
    return false;
}
