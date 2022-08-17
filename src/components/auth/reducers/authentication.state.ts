import { loginReducer } from './login.reducer';
import { registerReducer } from './registration.reducer';

export interface AuthenticationState {
    readonly login: ReturnType<typeof loginReducer>;
    readonly register: ReturnType<typeof registerReducer>;
}
