import { createAction } from 'typesafe-redux-helpers';

export interface ToggleDrawerPayload {
    isShow: boolean;
    children?: React.ReactNode;
}

export const TOGGLE_DRAWER = createAction('[TOGGLE_DRAWER]', (payload: ToggleDrawerPayload) => payload);
