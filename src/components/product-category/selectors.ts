import { Selector, createSelector } from 'reselect';
import { Category, CategoryFields } from '../../graphql/entities';
import { CategoryNames } from '../../graphql/interfaces';

import { ApplicationState } from '../../store/ApplicationState';
import { ProductCategoryState } from './reducer';

const getProductCategoryRootState: Selector<ApplicationState, ProductCategoryState> = createSelector(
    (state) => state.category,
    (category) => category
);

export const getSelectedCategory: Selector<ApplicationState, CategoryNames> = createSelector(
    getProductCategoryRootState,
    (category) => category.selectedCategory
);

export const getProductCategory: Selector<ApplicationState, Category | undefined> = createSelector(
    getProductCategoryRootState,
    (category) => category.productCategory
);

export const getCategoryNames: Selector<ApplicationState, CategoryNames[] | undefined> = createSelector(
    getProductCategoryRootState,
    (products) => products.categoryNames
);

export const getCategoryFields: Selector<ApplicationState, CategoryFields[] | undefined> = createSelector(
    getProductCategoryRootState,
    (products) => products.categoryFields
);
