import { combineReducers, Reducer } from 'redux';

import { AuthenticationState } from './authentication.state';

import { loginReducer as login } from './login.reducer';
import { registerReducer as register } from './registration.reducer';

export const reducer: Reducer<AuthenticationState> = combineReducers<AuthenticationState>({
    register,
    login,
});
