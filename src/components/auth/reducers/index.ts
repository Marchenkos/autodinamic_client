import { combineReducers, Reducer } from 'redux';

import { AuthenticationState } from './authentication.state';

import { loginReducer as login } from './login.reducer';
import { registerReducer as register } from './registration.reducer';
import { authDrawerReducer as authDrawer } from './auth-drawer.reducer';

export const reducer: Reducer<AuthenticationState> = combineReducers<AuthenticationState>({
    register,
    login,
    authDrawer,
});
