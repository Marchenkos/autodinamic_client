import { loginReducer } from './login.reducer';
import { registerReducer } from './registration.reducer';
import { authDrawerReducer } from './auth-drawer.reducer';

export interface AuthenticationState {
    readonly login: ReturnType<typeof loginReducer>;
    readonly register: ReturnType<typeof registerReducer>;
    readonly authDrawer: ReturnType<typeof authDrawerReducer>;
}
