import { createSelector, Selector } from 'reselect';
import {
    DELIVERY_METHODS,
    Order,
    OrderAddressInfo,
    PAYMENT_METHODS,
    UserDetailsDataForm,
} from '../../../graphql/entities';
import { OrderDetailsResponse } from '../../../graphql/interfaces';

import { ApplicationState } from '../../../store/ApplicationState';
import { OrderState } from './reducer';

const getOrderRootState: Selector<ApplicationState, OrderState> = createSelector(
    (state) => state.order,
    (order) => order
);

export const getAddedOrder: Selector<ApplicationState, OrderDetailsResponse | undefined> = createSelector(
    getOrderRootState,
    (order) => order.orderDetails
);

export const getIsLoadingOrder: Selector<ApplicationState, boolean> = createSelector(
    getOrderRootState,
    (order) => order.isFetching
);

export const getOrder: Selector<ApplicationState, Order | undefined> = createSelector(
    getOrderRootState,
    (order) => order.order
);

export const getOrderDeliveryMethod: Selector<ApplicationState, DELIVERY_METHODS> = createSelector(
    getOrderRootState,
    (order) => order.deliveryMethod
);

export const getOrderPaymentMethod: Selector<ApplicationState, PAYMENT_METHODS> = createSelector(
    getOrderRootState,
    (order) => order.paymentMethod
);

export const getOrderDeliveryDetails: Selector<ApplicationState, OrderAddressInfo | undefined | undefined> =
    createSelector(getOrderRootState, (order) => order.deliveryDetailsOrder);

export const getOrderUserDetails: Selector<ApplicationState, UserDetailsDataForm | undefined> = createSelector(
    getOrderRootState,
    (order) => order.userDetailsOrder
);
