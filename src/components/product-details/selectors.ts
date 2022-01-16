import { Selector, createSelector } from 'reselect';
import { GeneralProduct, ProductField } from '../../graphql/entities';

import { ApplicationState } from '../../store/ApplicationState';
import { ProductState } from '../product-list/reducers/product.state';
import { ProductDetails } from './reducers/product-details.reducer';

const getProductRootState: Selector<ApplicationState, ProductState> = createSelector(
    (state) => state.products,
    (products) => products
);

export const getSelectedProduct: Selector<ApplicationState, ProductDetails | undefined> = createSelector(
    getProductRootState,
    (products) => products.selectedProduct.selectedProduct
);

export const getIsSelectedProductFetching: Selector<ApplicationState, boolean> = createSelector(
    getProductRootState,
    (products) => products.selectedProduct.isFetching
);

export const getSimilarProducts: Selector<ApplicationState, GeneralProduct[] | undefined> = createSelector(
    getProductRootState,
    (products) => products.selectedProduct.similarProducts
);

export const getProductFields: Selector<ApplicationState, ProductField[] | undefined> = createSelector(
    getProductRootState,
    (products) => products.selectedProduct.productFields
);
