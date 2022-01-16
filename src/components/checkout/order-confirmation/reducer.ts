import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';
import {
    DELIVERY_METHODS,
    Order,
    OrderAddressInfo,
    PAYMENT_METHODS,
    UserDetailsDataForm,
} from '../../../graphql/entities';
import { OrderDetailsResponse } from '../../../graphql/interfaces';

import {
    CREATE_ORDER,
    GET_ORDER_BY_ID,
    SET_DELIVERY_DETAILS_FOR_ORDER,
    SET_DELIVERY_METHOD_FOR_ORDER,
    SET_PAYMENT_DETAILS_FOR_ORDER,
    SET_USER_DETAILS_FOR_ORDER,
} from './actions';

export interface OrderState {
    orderDetails?: OrderDetailsResponse;
    userDetailsOrder?: UserDetailsDataForm;
    deliveryDetailsOrder?: OrderAddressInfo;
    deliveryMethod: DELIVERY_METHODS;
    paymentMethod: PAYMENT_METHODS;
    isFetching: boolean;
    order?: Order;
}

export const orderReducer: Reducer<OrderState> = createReducer<OrderState>({
    orderDetails: undefined,
    userDetailsOrder: undefined,
    deliveryDetailsOrder: undefined,
    deliveryMethod: DELIVERY_METHODS.PICKUP,
    paymentMethod: PAYMENT_METHODS.CASH,
    order: undefined,
    isFetching: false,
})
    .handleAction(CREATE_ORDER.START, (state: OrderState) => ({
        ...state,
        isFetching: true,
        order: state.order,
    }))
    .handleAction(CREATE_ORDER.COMPLETED, (state, action) => ({
        ...state,
        orderDetails: action.payload,
        isFetching: false,
        order: state.order,
    }))

    .handleAction(GET_ORDER_BY_ID.START, (state: OrderState) => ({
        ...state,
        isFetching: true,
        order: state.order,
    }))
    .handleAction(GET_ORDER_BY_ID.COMPLETED, (state, action) => ({
        ...state,
        isFetching: false,
        order: action.payload,
    }))

    .handleAction(SET_USER_DETAILS_FOR_ORDER, (state: OrderState, action) => ({
        ...state,
        userDetailsOrder: action.payload,
    }))

    .handleAction(SET_DELIVERY_DETAILS_FOR_ORDER, (state: OrderState, action) => ({
        ...state,
        deliveryDetailsOrder: action.payload,
    }))

    .handleAction(SET_DELIVERY_METHOD_FOR_ORDER, (state: OrderState, action) => ({
        ...state,
        deliveryMethod: action.payload,
    }))

    .handleAction(SET_PAYMENT_DETAILS_FOR_ORDER, (state: OrderState, action) => ({
        ...state,
        paymentMethod: action.payload,
    }));
