import { createSelector, Selector } from 'reselect';
import { KJUR } from 'jsrsasign';

import { ApplicationState } from '../../store/ApplicationState';
import { AuthenticationState } from './reducers/authentication.state';
import { LoginError } from './sagas/login.saga';
import { RegisterError } from './sagas/registration.saga';

interface BaseJwtClaims {
    iat: number;
    exp: number;
    sub: string;
}

export interface UnauthenticatedTokenData extends BaseJwtClaims {
    brand: string;
    locale: string;
    channel_identifier: string;
    tracking_session_id: string;
}

const getAuthenticationState: Selector<ApplicationState, AuthenticationState> = createSelector(
    (state) => state.authentication,
    (authentication) => authentication
);

export const getToken: Selector<ApplicationState, string | undefined> = createSelector(
    getAuthenticationState,
    (authentication) => authentication.login.token
);

export const getTokenObject: Selector<ApplicationState, BaseJwtClaims | undefined> = createSelector(getToken, (token) =>
    token ? (KJUR.jws.JWS.parse(token).payloadObj as BaseJwtClaims) : undefined
);

export const getTokenExpiredAt: Selector<ApplicationState, number | undefined> = createSelector(
    getTokenObject,
    (tokenObject) => (tokenObject ? tokenObject.exp : undefined)
);

export const getLoginError: Selector<ApplicationState, LoginError | undefined> = createSelector(
    getAuthenticationState,
    (authentication) => authentication.login.error
);

export const getRegisterError: Selector<ApplicationState, RegisterError | undefined> = createSelector(
    getAuthenticationState,
    (authentication) => authentication.register.error
);

export const getIsRegistering: Selector<ApplicationState, boolean> = createSelector(
    getAuthenticationState,
    (authentication) => authentication.register.isRegistering
);

export const getIsLogging: Selector<ApplicationState, boolean> = createSelector(
    getAuthenticationState,
    (authentication) => authentication.login.isLogging
);

export const getIsRegistered: Selector<ApplicationState, boolean> = createSelector(
    getAuthenticationState,
    (authentication) => authentication.register.isRegistered
);

export const getIsAutoLoggedIn: Selector<ApplicationState, boolean> = createSelector(
    getAuthenticationState,
    (authentication) => authentication.register.isAutoLoggedIn
);
