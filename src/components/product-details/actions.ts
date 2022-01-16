import { createAction } from 'typesafe-redux-helpers';
import { GeneralProduct, ProductField } from '../../graphql/entities';

import { ProductDetails } from './reducers/product-details.reducer';

export interface FetchProductByIdParams {
    id: number;
}

export interface FetchSimilarPrParams {
    category_name: string;
    brand: string;
    excludedId: string;
}

export const FETCH_PRODUCT_BY_ID = {
    TRIGGER: createAction('[FETCH_PRODUCT_BY_ID] Trigger', (id: number) => id),
    STARTED: createAction('[FETCH_PRODUCT_BY_ID] Started', (id: number) => id),
    COMPLETED: createAction('[FETCH_PRODUCT_BY_ID] Completed', (product: ProductDetails) => product),
};

export const FETCH_SIMILAR_PRODUCTS = {
    TRIGGER: createAction('[FETCH_SIMILAR_PRODUCTS] Trigger', (payload: FetchSimilarPrParams) => payload),
    STARTED: createAction('[FETCH_SIMILAR_PRODUCTS] Started', (payload: FetchSimilarPrParams) => payload),
    COMPLETED: createAction('[FETCH_SIMILAR_PRODUCTS] Completed', (product: GeneralProduct[]) => product),
};

export const FETCH_SPECIFIC_PRODUCT_FIELDS = {
    TRIGGER: createAction('[FETCH_SPECIFIC_PRODUCT_FIELDS] Trigger', (categoryName: string) => ({ categoryName })),
    STARTED: createAction('[FETCH_SPECIFIC_PRODUCT_FIELDS] Start', (categoryName: string) => ({ categoryName })),
    COMPLETED: createAction('[FETCH_SPECIFIC_PRODUCT_FIELDS] Completed', (payload: ProductField[]) => payload),
};
