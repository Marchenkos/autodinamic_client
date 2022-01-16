import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { GeneralProduct, ProductField } from '../../../graphql/entities';
import { ProductCharacteristicInfo } from '../../../graphql/interfaces';
import { FETCH_PRODUCT_BY_ID, FETCH_SIMILAR_PRODUCTS, FETCH_SPECIFIC_PRODUCT_FIELDS } from '../actions';

export interface ProductDetails {
    product: GeneralProduct;
    productDetails?: ProductCharacteristicInfo;
}
export interface SelectedProductState {
    isFetching: boolean;
    error?: Error;
    selectedProduct?: ProductDetails;
    similarProducts?: GeneralProduct[];
    productFields?: ProductField[];
}

export const selectedProductReducer: Reducer<SelectedProductState> = createReducer<SelectedProductState>({
    isFetching: false,
    error: undefined,
    selectedProduct: undefined,
    similarProducts: undefined,
    productFields: undefined,
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
    }))

    .handleAction(FETCH_SPECIFIC_PRODUCT_FIELDS.COMPLETED, (state: SelectedProductState, action) => ({
        ...state,
        productFields: action.payload,
    }));
