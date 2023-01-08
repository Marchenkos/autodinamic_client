import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { Category, CategoryFields, PRODUCT_CATEGORY_TYPE } from '../../graphql/entities';
import { CategoryNames } from '../../graphql/interfaces';
import { FETCH_PRODUCT_CATEGORY, FETCH_PRODUCT_CATEGORY_NAMES, SET_CATEGORY } from './actions';

export interface ProductCategoryState {
    isFetching: boolean;
    error?: Error;
    selectedCategory: CategoryNames;
    productCategory?: Category;
    categoryNames?: CategoryNames[];
    categoryFields?: CategoryFields[];
}

export const defaultCategory: Category = {
    category_name: PRODUCT_CATEGORY_TYPE.ALL,
    title: 'все товары',
    description_sections: [],
    description_section_fields: [],
};

export const productCategoryReducer: Reducer<ProductCategoryState> = createReducer<ProductCategoryState>({
    isFetching: false,
    error: undefined,
    selectedCategory: {
        category_name: PRODUCT_CATEGORY_TYPE.ALL,
        title: 'все товары',
    },
    categoryNames: undefined,
    productCategory: undefined,
    categoryFields: undefined,
})
    .handleAction(FETCH_PRODUCT_CATEGORY.STARTED, (state) => ({
        ...state,
        isFetching: true,
        error: undefined,
    }))
    .handleAction(FETCH_PRODUCT_CATEGORY.COMPLETED, (state, action) => ({
        ...state,
        isFetching: false,
        error: undefined,
        productCategory: action.payload,
    }))

    .handleAction(FETCH_PRODUCT_CATEGORY_NAMES.STARTED, (state) => ({
        ...state,
        isFetching: true,
        error: undefined,
    }))
    .handleAction(FETCH_PRODUCT_CATEGORY_NAMES.COMPLETED, (state, action) => ({
        ...state,
        isFetching: false,
        error: undefined,
        categoryNames: action.payload,
    }))

    .handleAction(SET_CATEGORY, (state, action) => ({
        ...state,
        isFetching: false,
        error: undefined,
        selectedCategory: action.payload,
    }));
