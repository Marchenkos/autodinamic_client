import { createAction } from 'typesafe-redux-helpers';

import { IProductList, SORT_DIRECTION } from '../../graphql/interfaces';
import { SelectedFilterSection } from '../filter/actions';
export interface FetchProductListParams {
    limit: number;
    page: number;
    categoryName?: string;
    sort?: SORT_DIRECTION;
    filters?: SelectedFilterSection[];
    isNew?: boolean;
    isHasDiscount?: boolean;
    searchTerms?: string[];
}

export const FETCH_PRODUCT_LIST = {
    TRIGGER: createAction('[Fetch Product List] Trigger', (payload: FetchProductListParams) => payload),
    STARTED: createAction('[Fetch Product List] Started', (payload: FetchProductListParams) => payload),
    COMPLETED: createAction('[Fetch Product List] Completed', (payload: IProductList) => payload),
};

export const FETCH_NOVELTY_PRODUCT_LIST = {
    TRIGGER: createAction('[FETCH_NOVELTY_PRODUCT_LIST] Trigger', (payload: FetchProductListParams) => payload),
    STARTED: createAction('[FETCH_NOVELTY_PRODUCT_LIST] Started', (payload: FetchProductListParams) => payload),
    COMPLETED: createAction('[FETCH_NOVELTY_PRODUCT_LIST] Completed', (payload: IProductList) => payload),
};

export const FETCH_DISCOUNT_PRODUCT_LIST = {
    TRIGGER: createAction('[Fetch Discount Product List] Trigger', (payload: FetchProductListParams) => payload),
    STARTED: createAction('[Fetch Discount Product List] Started', (payload: FetchProductListParams) => payload),
    COMPLETED: createAction('[Fetch Discount Product List] Completed', (payload: IProductList) => payload),
};
