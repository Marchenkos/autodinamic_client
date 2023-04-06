import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { IProduct } from '../../../graphql/entities';
import { FETCH_PRODUCT_LIST_BY_SEARCH } from '../../search/actions';
import { GetSearchProductListError } from '../../search/saga';
import { FETCH_PRODUCT_LIST } from '../actions';

export interface SearchProductListState {
    isFetching: boolean;
    productList: IProduct[];
    productsCount: number;
    error?: GetSearchProductListError;
}

export const searchProductListReducer: Reducer<SearchProductListState> = createReducer<SearchProductListState>({
    productList: [],
    productsCount: 0,
    isFetching: false,
    error: undefined,
})
    .handleAction(FETCH_PRODUCT_LIST_BY_SEARCH.STARTED, (state) => ({
        isFetching: true,
        productList: state.productList,
        productsCount: state.productsCount,
        error: undefined,
    }))
    .handleAction(
        FETCH_PRODUCT_LIST_BY_SEARCH.COMPLETED,
        (_, action) => ({
            isFetching: false,
            productList: action.payload.products,
            productsCount: parseInt(action.payload.count),
            error: undefined,
        }),
        (state, action) => ({
            isFetching: false,
            productList: state.productList,
            productsCount: state.productsCount,
            error: action.payload as GetSearchProductListError,
        })
    );
