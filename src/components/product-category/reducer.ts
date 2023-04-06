import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { ICategory, PRODUCT_CATEGORY_TYPE } from '../../graphql/entities';
import { ICategoryName } from '../../graphql/interfaces';
import { FETCH_PRODUCT_CATEGORY, FETCH_PRODUCT_CATEGORY_NAMES, SET_CATEGORY } from './actions';

export interface ProductCategoryState {
    isFetching: boolean;
    error?: Error;
    selectedCategory?: ICategoryName;
    productCategory?: ICategory;
    categoryNames: ICategoryName[];
    categoryList: ICategory[];
}

// export const defaultCategory: Category = {
//     category_name: PRODUCT_CATEGORY_TYPE.ALL,
//     title: 'все товары',
//     description_sections: [],
//     description_section_fields: [],
// };

export const productCategoryReducer: Reducer<ProductCategoryState> = createReducer<ProductCategoryState>({
    isFetching: false,
    error: undefined,
    selectedCategory: undefined,
    categoryNames: [],
    productCategory: undefined,
    categoryList: []
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
