import { AuthController } from '$lib/bloc/context/_respositories/auth_controller';
import type { AuthService } from '$lib/bloc/context/_respositories/auth_service';
import { z } from 'zod';
import { BlocConfig, isProd, mode, type DevMode } from '../config';
import { tzNow } from '../utils';
import type { Children } from './bloc_core';

//bloc
export interface Configs {
    blocConfig: BlocConfig;
}

export interface Controllers {
    authController: AuthController;
}

//should update base_controller.ts
export interface Services {
    authService: AuthService;
}

export const children: Children = {
    configs: {
        blocConfig: new BlocConfig(),
    },
    controllers: {
        authController: new AuthController(),
    },
};

//http
export interface Domain {
    root: 'htts://localhost:3000';
    test: 'https://jsonplaceholder.typicode.com';
}

export interface ParamBy {
    GET: 'posts';
    POST: 'signup' | 'login' | 'logout';
    DELETE: 'user';
    PUT: 'user';
}

//[root]: p1 | p2 | p3 ..
export interface Queries {
    root: 'name' | 'name2';
    test: 'id' | 'id2';
}

// models: AsyncResult<T>
export interface IModels {
    User: User;
}

// define app models
export interface User {
    email: string;
    rtToken: string;
}

export type LogIn = z.infer<typeof loginSchema>;
export type SignUp = z.infer<typeof signUpSchema>;

function checker() {
    if (!isProd(mode)) return 2;
    return 8;
}

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(checker()),
});

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(checker()),
    messanger: z.string().nullable().default(null),
    subscribed: z.boolean().optional().default(false),
    createdAt: z.string().optional().default(tzNow),
    purchasedAt: z.string().datetime().nullable().default(null),
    expiredAt: z.string().datetime().nullable().default(null),
});
