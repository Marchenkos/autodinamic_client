import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { CLEAR_SHOW_MODAL_FLAG, SET_LOCATION } from './actions';

export interface LocationState {
    showModal: boolean;
    currentLocation?: string;
}

export const locationReducer: Reducer<LocationState> = createReducer<LocationState>({
    showModal: false,
    currentLocation: undefined,
})
    .handleAction(CLEAR_SHOW_MODAL_FLAG, (state) => ({
        ...state,
        showModal: false,
    }))
    .handleAction(SET_LOCATION, (state, action) => ({
        currentLocation: action.payload.location,
        showModal: action.payload.showModal ?? state.showModal,
    }));
