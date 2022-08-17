import { createAction } from 'typesafe-redux-helpers';
import { AuthResponse } from '../../graphql/interfaces';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface ToggleAuthDrawerPayload {
    isShow: boolean;
}

export interface RegistrationPayload {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

export interface RegistrationResult {
    isAutoLoggedIn: boolean;
    isRegistered: boolean;
}

export const LOG_IN = {
    TRIGGER: createAction('[Login] Trigger', (payload: LoginPayload) => payload),
    STARTED: createAction('[Login] Started', (payload: LoginPayload) => payload),
    COMPLETED: createAction('[Login] Completed', (payload: AuthResponse) => payload),
};

export const REGISTRATION = {
    TRIGGER: createAction('[Registration] Trigger', (payload: RegistrationPayload) => payload),
    STARTED: createAction('[Registration] Started'),
    COMPLETED: createAction('[Registration] Completed', (payload: RegistrationResult) => payload),
};

export const LOG_OUT = {
    TRIGGER: createAction('[Logout] Trigger'),
    STARTED: createAction('[Logout] Started'),
    COMPLETED: createAction('[Logout] Completed'),
};

export const LOGIN_AS_GUEST = {
    STARTED: createAction('[Login as guest] Started'),
    COMPLETED: createAction('[Login as guest] Completed'),
};

export const CLEAR_REGISTRATiON_ERROR = createAction('[Clear Registration Error]');
export const CLEAR_LOGIN_ERROR = createAction('[Clear Login Error]');

export const RESET_AUTH_ERROR = createAction('[RESET_AUTH_ERROR]');
