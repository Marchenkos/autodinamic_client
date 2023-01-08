import { createAction } from 'typesafe-redux-helpers';
import { Basket, OrderProduct } from '../../../graphql/entities';

export interface EditBasketParams {
    productId: string;
    count: number;
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

export const REMOVE_FROM_BASKET = {
    TRIGGER: createAction('[Remove from Basket] Trigger', (id: string) => id),
    START: createAction('[Remove from Basket] Start', (id: string) => id),
    COMPLETED: createAction('[Remove from Basket] Completed', (payload: Basket) => payload),
};

export const EDIT_BASKET = {
    TRIGGER: createAction('[Edit Basket] Trigger', (payload: EditBasketParams) => payload),
    COMPLETED: createAction('[Edit Basket] Completed', (payload: Basket) => payload),
};

export const CLEAN_BASKET = createAction('[CLEAN_BASKET]');
