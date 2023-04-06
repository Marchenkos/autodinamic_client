import { createAction } from 'typesafe-redux-helpers';
import { IProduct } from '../../graphql/entities';

export interface FetchProductByIdParams {
    id: number;
}

export interface FetchSimilarPrParams {
    category_name: string;
    brand: string;
    excludedId: number;
}

export const FETCH_PRODUCT_BY_ID = {
    TRIGGER: createAction('[FETCH_PRODUCT_BY_ID] Trigger', (id: number) => id),
    STARTED: createAction('[FETCH_PRODUCT_BY_ID] Started', (id: number) => id),
    COMPLETED: createAction('[FETCH_PRODUCT_BY_ID] Completed', (product: IProduct) => product),
};

export const FETCH_SIMILAR_PRODUCTS = {
    TRIGGER: createAction('[FETCH_SIMILAR_PRODUCTS] Trigger', (payload: FetchSimilarPrParams) => payload),
    STARTED: createAction('[FETCH_SIMILAR_PRODUCTS] Started', (payload: FetchSimilarPrParams) => payload),
    COMPLETED: createAction('[FETCH_SIMILAR_PRODUCTS] Completed', (product: IProduct[]) => product),
};
