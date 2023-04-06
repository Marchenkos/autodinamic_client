import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import {
    TOGGLE_COMPARE_LIST,
    CLEAR_COMPARE_LIST,
    INIT_COMPARE_LIST,
    HIDE_COMPARE_TOAST,
} from './actions';

export interface CompareState {
    itemsCount: number;
    // data?: CompareResponse;
    productIds: number[] | [];
    isFetching: boolean;
    isShow: boolean;
}

export const compareReducer: Reducer<CompareState> = createReducer<CompareState>({
    itemsCount: 0,
    // data: undefined,
    productIds: [],
    isFetching: false,
    isShow: true,
})
    .handleAction(INIT_COMPARE_LIST.COMPLETED, (state: CompareState, action) => ({
        ...state,
        itemsCount: action.payload.length,
        productIds: action.payload,
    }))

    .handleAction(TOGGLE_COMPARE_LIST.COMPLETED, (state: CompareState, action) => ({
        itemsCount: action.payload.length,
        productIds: action.payload,
        // data: state.data,
        isFetching: false,
        isShow: true,
    }))

    .handleAction(CLEAR_COMPARE_LIST, () => ({
        itemsCount: 0,
        productIds: [],
        data: undefined,
        isFetching: false,
        isShow: false,
    }))

    .handleAction(HIDE_COMPARE_TOAST, (state) => ({
        ...state,
        isShow: false,
    }));
