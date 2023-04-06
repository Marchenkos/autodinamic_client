import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { IProduct } from '../../../graphql/entities';
import { FETCH_PRODUCT_BY_ID, FETCH_SIMILAR_PRODUCTS } from '../actions';

export interface SelectedProductState {
    isFetching: boolean;
    error?: Error;
    selectedProduct?: IProduct;
    similarProducts?: IProduct[];
}

export const selectedProductReducer: Reducer<SelectedProductState> = createReducer<SelectedProductState>({
    isFetching: false,
    error: undefined,
    selectedProduct: undefined,
    similarProducts: undefined,
})
    .handleAction(FETCH_PRODUCT_BY_ID.STARTED, (state: SelectedProductState) => ({
        ...state,
        isFetching: true,
        error: undefined,
        similarProducts: undefined,
    }))
    .handleAction(FETCH_PRODUCT_BY_ID.COMPLETED, (state, action) => ({
        ...state,
        isFetching: false,
        error: undefined,
        selectedProduct: action.payload,
    }))

    .handleAction(FETCH_SIMILAR_PRODUCTS.STARTED, (state: SelectedProductState) => ({
        ...state,
        isFetching: true,
        error: undefined,
        similarProducts: undefined,
    }))
    .handleAction(FETCH_SIMILAR_PRODUCTS.COMPLETED, (state, action) => ({
        ...state,
        isFetching: false,
        error: undefined,
        similarProducts: action.payload,
    }));
