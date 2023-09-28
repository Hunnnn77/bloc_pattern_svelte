import { AuthService } from '$lib/bloc/context/_respositories/auth_service';
import type { Services } from '../types/models';

export abstract class BaseController implements Services {
    authService: AuthService = new AuthService();
}
