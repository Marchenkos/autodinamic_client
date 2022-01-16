import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { CLEAR_REGISTRATiON_ERROR, REGISTRATION } from '../actions';
import { RegisterError } from '../sagas/registration.saga';

export interface RegistrationState {
    isRegistering: boolean;
    isAutoLoggedIn: boolean;
    error?: RegisterError;
    isRegistered: boolean;
}

export const registerReducer: Reducer<RegistrationState> = createReducer<RegistrationState>({
    isRegistering: false,
    isRegistered: false,
    isAutoLoggedIn: false,
    error: undefined,
})
    .handleAction(REGISTRATION.STARTED, (state) => ({
        ...state,
        isRegistering: true,
    }))
    .handleAction(
        REGISTRATION.COMPLETED,
        (_, action) => ({
            isRegistering: false,
            isRegistered: action.payload.isRegistered,
            isAutoLoggedIn: action.payload.isAutoLoggedIn,
            error: undefined,
        }),
        (_, action) => ({
            error: action.payload as RegisterError,
            isRegistering: false,
            isAutoLoggedIn: false,
            isRegistered: false,
        })
    )

    .handleAction(CLEAR_REGISTRATiON_ERROR, (state) => ({
        ...state,
        error: undefined,
    }));
