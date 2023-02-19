import { Selector, createSelector } from 'reselect';
import { ICategory } from '../../graphql/entities';
import { ICategoryName } from '../../graphql/interfaces';

import { ApplicationState } from '../../store/ApplicationState';
import { ProductCategoryState } from './reducer';

const getProductCategoryRootState: Selector<ApplicationState, ProductCategoryState> = createSelector(
    (state) => state.category,
    (category) => category
);

export const getSelectedCategory: Selector<ApplicationState, ICategoryName | undefined> = createSelector(
    getProductCategoryRootState,
    (category) => category.selectedCategory
);

export const getCategoryList: Selector<ApplicationState, ICategory[]> = createSelector(
  getProductCategoryRootState,
  (category) => category.categoryList
);

export const getProductCategory: Selector<ApplicationState, ICategory | undefined> = createSelector(
    getProductCategoryRootState,
    (category) => category.productCategory
);

export const getCategoryNames: Selector<ApplicationState, ICategoryName[]> = createSelector(
    getProductCategoryRootState,
    (products) => products.categoryNames
);

