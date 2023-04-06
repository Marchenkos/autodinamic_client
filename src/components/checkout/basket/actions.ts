import { createAction } from 'typesafe-redux-helpers';
import { Basket, OrderProduct } from '../../../graphql/entities';

export interface EditBasketActionPayload {
    productId: number;
    count: number;
}

export interface RemoveBasketItemActionPayload {
  productId: number;
}

export interface LoadingDataPayload {
    status: boolean;
}

export const LOADING_DATA = createAction('LOADING_DATA', (payload: LoadingDataPayload) => payload);

export const FETCH_BASKET = {
    TRIGGER: createAction('[Fetch Basket] Trigger'),
    START: createAction('[Fetch Basket] Start'),
    COMPLETED: createAction('[Fetch Basket] Completed', (payload: Basket) => payload),
};

export const ADD_TO_BASKET = {
    TRIGGER: createAction('[Add to Basket] Trigger', (payload: OrderProduct) => payload),
    START: createAction('[Add to Basket] Start', (payload: OrderProduct) => payload),
    COMPLETED: createAction('[Add to Basket] Completed', (payload: Basket) => payload),
};

export const REMOVE_FROM_BASKET = createAction('[Remove from Basket]', (payload: RemoveBasketItemActionPayload) => payload);

export const EDIT_BASKET = createAction('[Edit Basket]', (payload: EditBasketActionPayload) => payload);

export const CLEAN_BASKET = createAction('[CLEAN_BASKET]');
