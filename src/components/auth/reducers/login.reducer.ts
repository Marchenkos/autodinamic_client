import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { CLEAR_LOGIN_ERROR, LOG_IN, LOG_OUT } from '../actions';
import { LoginError } from '../sagas/login.saga';

export interface LoginState {
    isLogging: boolean;
    error?: LoginError;
    token?: string;
}

export const loginReducer: Reducer<LoginState> = createReducer<LoginState>({
    isLogging: false,
    token: undefined,
    error: undefined,
})
    .handleAction(LOG_IN.STARTED, () => ({
        isLogging: true,
        token: undefined,
        error: undefined,
    }))
    .handleAction(
        LOG_IN.COMPLETED,
        (_, action) => ({
            isLogging: false,
            error: undefined,
            token: action.payload.token,
        }),
        (_, action) => ({
            isLogging: false,
            error: action.payload as LoginError,
            token: undefined,
        })
    )

    .handleAction(LOG_OUT.STARTED, (state) => ({
        isLogging: true,
        error: undefined,
        token: state.token,
    }))
    .handleAction(
        LOG_OUT.COMPLETED,
        () => ({
            isLogging: false,
            error: undefined,
            token: undefined,
        }),
        (state, action) => ({
            isLogging: false,
            error: action.payload as LoginError,
            token: state.token,
        })
    )

    .handleAction(CLEAR_LOGIN_ERROR, (state) => ({
        ...state,
        error: undefined,
    }));
