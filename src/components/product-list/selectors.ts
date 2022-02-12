import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../store/ApplicationState';
import { ProductState } from './reducers/product.state';
import { GeneralProduct } from '../../graphql/entities';
import { ProductListState } from './reducers/product-list.reducer';
import { SelectedFilterSection } from '../filter/actions';
import { GetProductListError } from './sagas/get-product-list.saga';
import { SearchProductListState } from './reducers/search-product-list.reducer';

const getProductRootState: Selector<ApplicationState, ProductState> = createSelector(
    (state) => state.products,
    (products) => products
);

const getProductListState: Selector<ApplicationState, ProductListState> = createSelector(
    getProductRootState,
    (products) => products.productList
);

const getSearchProductListState: Selector<ApplicationState, SearchProductListState> = createSelector(
    getProductRootState,
    (products) => products.searchProductList
);

const getDiscountProductListState: Selector<ApplicationState, ProductListState> = createSelector(
    getProductRootState,
    (products) => products.discountProductList
);

export const getProductList: Selector<ApplicationState, GeneralProduct[]> = createSelector(
    getProductListState,
    (productList) => productList.productList
);

export const getSearchProductList: Selector<ApplicationState, GeneralProduct[]> = createSelector(
    getSearchProductListState,
    (searchProductList) => searchProductList.productList
);

export const getDiscountProductList: Selector<ApplicationState, GeneralProduct[]> = createSelector(
    getDiscountProductListState,
    (discountProductList) => discountProductList.productList
);

export const getIsProductListFetching: Selector<ApplicationState, boolean> = createSelector(
    getProductListState,
    (productList) => productList.isFetching
);

export const getIsSearchProductListFetching: Selector<ApplicationState, boolean> = createSelector(
    getSearchProductListState,
    (searchProductList) => searchProductList.isFetching
);

export const getProductListError: Selector<ApplicationState, GetProductListError | undefined> = createSelector(
    getProductListState,
    (productList) => productList.error
);

export const getProductsCount: Selector<ApplicationState, number> = createSelector(
    getProductListState,
    (productList) => productList.productsCount
);

export const getSearchProductsCount: Selector<ApplicationState, number> = createSelector(
    getSearchProductListState,
    (searchProductList) => searchProductList.productsCount
);