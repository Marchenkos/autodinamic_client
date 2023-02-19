import { createAction } from 'typesafe-redux-helpers';
import { IProductList } from '../../graphql/interfaces';
import { SelectedFilterSection } from '../filter/actions';

export const FETCH_BY_SEARCH = {
    TRIGGER: createAction('[Fetch By Search] Trigger', (payload: string) => payload),
    STARTED: createAction('[Fetch By Search] Started', (payload: string) => payload),
    COMPLETED: createAction('[Fetch By Search] Completed', (payload: IProductList) => payload),
};

export interface FetchProductListBySearchParams {
    limit: number;
    next: number;
    sort: string;
    searchTerms: string[];
    filters?: SelectedFilterSection[];
}

export const FETCH_PRODUCT_LIST_BY_SEARCH = {
    TRIGGER: createAction(
        '[Fetch Product List By Search] Trigger',
        (payload: FetchProductListBySearchParams) => payload
    ),
    STARTED: createAction(
        '[Fetch Product List By Search] Started',
        (payload: FetchProductListBySearchParams) => payload
    ),
    COMPLETED: createAction('[Fetch Product List By Search] Completed', (payload: IProductList) => payload),
};
