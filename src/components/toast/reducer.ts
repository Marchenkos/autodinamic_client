import { createReducer } from 'typesafe-redux-helpers';

import { SHOW_TOAST, HIDE_TOAST } from './actions';

export interface ToastState {
    message?: string;
    status?: string;
    active: boolean;
}

export const toastReducer = createReducer<ToastState>({
    status: undefined,
    message: undefined,
    active: false,
})
    .handleAction(SHOW_TOAST, (_, action) => ({
        status: action.payload.status,
        message: action.payload.message,
        active: true,
    }))
    .handleAction(HIDE_TOAST, (_, action) => ({
        status: undefined,
        message: undefined,
        active: false,
    }));
