import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { TOGGLE_AUTH_DRAWER } from '../actions';

export interface AuthDrawerState {
    isShow: boolean;
}

export const authDrawerReducer: Reducer<AuthDrawerState> = createReducer<AuthDrawerState>({
    isShow: false,
}).handleAction(TOGGLE_AUTH_DRAWER, (_, action) => ({
    isShow: action.payload.isShow,
}));
