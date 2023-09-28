import { writable } from 'svelte/store';
import type { ModelByKey } from '../../_base/types/model_core';

export type AuthStatus = 'login' | 'logout';

export interface IAuthState {
    status: AuthStatus;
    user?: ModelByKey<'User'> | null;
}

export default class AuthState {
    constructor(public state: IAuthState) {}

    static copy(newState: Partial<IAuthState>): AuthState {
        return new AuthState({
            status: newState.status ?? 'logout',
        });
    }
}

export const authWritable = writable(new AuthState({ status: 'logout' }));
