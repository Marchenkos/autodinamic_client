import { createAction } from 'typesafe-redux-helpers';

import {
    DELIVERY_METHODS,
    Order,
    OrderAddressInfo,
    PAYMENT_METHODS,
    UserDetailsDataForm,
} from '../../../graphql/entities';
import { OrderDetailsResponse } from '../../../graphql/interfaces';

interface CreateOrderProps {
    userDetails: UserDetailsDataForm;
    deliveryInfo: OrderAddressInfo;
    deliveryType: DELIVERY_METHODS;
    paymentType: PAYMENT_METHODS;
}

export const CREATE_ORDER = {
    TRIGGER: createAction('[Create Order] Trigger', (payload: CreateOrderProps) => payload),
    START: createAction('[Create Order] Start'),
    COMPLETED: createAction('[Create Order] Completed', (orderDetails: OrderDetailsResponse) => orderDetails),
};

export const GET_ORDER_BY_ID = {
    TRIGGER: createAction('[Get Order By ID] Trigger', (payload: string) => payload),
    START: createAction('[Get Order By ID] Start'),
    COMPLETED: createAction('[Get Order By ID] Completed', (order: Order) => order),
};

export const SET_USER_DETAILS_FOR_ORDER = createAction(
    '[SET_USER_DETAILS_FOR_ORDER] Trigger',
    (payload: UserDetailsDataForm) => payload
);

export const SET_DELIVERY_DETAILS_FOR_ORDER = createAction(
    '[SET_DELIVERY_DETAILS_FOR_ORDER] Trigger',
    (payload: OrderAddressInfo) => payload
);

export const SET_DELIVERY_METHOD_FOR_ORDER = createAction(
    '[SET_DELIVERY_METHOD_FOR_ORDER] Trigger',
    (payload: DELIVERY_METHODS) => payload
);

export const SET_PAYMENT_DETAILS_FOR_ORDER = createAction(
    '[SET_PAYMENT_DETAILS_FOR_ORDER] Trigger',
    (payload: PAYMENT_METHODS) => payload
);
