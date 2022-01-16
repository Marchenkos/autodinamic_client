import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { AddressInfo, Order } from '../../../graphql/entities';
import { GET_ORDER_BY_EMAIL, SET_EDITABLE_ADDRESS } from '../actions';

export interface AccountInfoState {
    editableAddess?: AddressInfo | [];
    userOrders?: Order[];
}

export const profileReducer: Reducer<AccountInfoState> = createReducer<AccountInfoState>({
    editableAddess: undefined,
    userOrders: undefined,
})
    .handleAction(SET_EDITABLE_ADDRESS.STARTED, (state, action) => ({
        editableAddess: action.payload,
        userOrders: state.userOrders,
    }))
    .handleAction(SET_EDITABLE_ADDRESS.COMPLETED, (state, action) => ({
        editableAddess: undefined,
        userOrders: state.userOrders,
    }));
