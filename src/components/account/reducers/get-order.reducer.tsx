import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { Order } from '../../../graphql/entities';
import { GET_ORDER_BY_ID } from '../../checkout/order-confirmation/actions';
import { GET_ORDER_BY_EMAIL } from '../actions';

export interface GetOrderState {
    isFetching: boolean;
    orderDetails?: Order;
    userOrders?: Order[];
    error?: Error;
}

export const getOrderReducer: Reducer<GetOrderState> = createReducer<GetOrderState>({
    isFetching: false,
    orderDetails: undefined,
    userOrders: undefined,
    error: undefined,
})
    .handleAction(GET_ORDER_BY_ID.START, (state) => ({
        userOrders: state.userOrders,
        isFetching: true,
        order: undefined,
        error: undefined,
    }))
    .handleAction(GET_ORDER_BY_ID.COMPLETED, (state, action) => ({
        isFetching: false,
        userOrders: state.userOrders,
        orderDetails: action.payload,
        error: undefined,
    }))

    .handleAction(GET_ORDER_BY_EMAIL.STARTED, (state) => ({
        userOrders: undefined,
        isFetching: true,
        orderDetails: state.orderDetails,
        error: undefined,
    }))
    .handleAction(GET_ORDER_BY_EMAIL.COMPLETED, (state, action) => ({
        isFetching: false,
        userOrders: action.payload,
        orderDetails: state.orderDetails,
        error: undefined,
    }));
