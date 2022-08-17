import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { TOGGLE_DRAWER } from './actions';

export interface AuthDrawerState {
    isShow: boolean;
	content?: React.ReactNode
}

export const reducer: Reducer<AuthDrawerState> = createReducer<AuthDrawerState>({
    isShow: false,
}).handleAction(TOGGLE_DRAWER, (_, action) => ({
    isShow: action.payload.isShow,
	content: action.payload.children,
}));
