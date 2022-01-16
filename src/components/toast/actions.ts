import { createAction } from 'typesafe-redux-helpers';

export interface ShowToastOptions {
    message: string;
    status: string;
}

export const SHOW_TOAST = createAction('[Toasts] Show toast', (payload: ShowToastOptions) => payload);
export const HIDE_TOAST = createAction('[Toasts] Hide toast');
