import { Selector, createSelector } from 'reselect';
import { IProduct } from '../../graphql/entities';

import { ApplicationState } from '../../store/ApplicationState';
import { ProductState } from '../catalog/reducers/product.state';

const getProductRootState: Selector<ApplicationState, ProductState> = createSelector(
    (state) => state.products,
    (products) => products
);

export const getSelectedProduct: Selector<ApplicationState, IProduct | undefined> = createSelector(
    getProductRootState,
    (products) => products.selectedProduct.selectedProduct
);

export const getIsSelectedProductFetching: Selector<ApplicationState, boolean> = createSelector(
    getProductRootState,
    (products) => products.selectedProduct.isFetching
);

export const getSimilarProducts: Selector<ApplicationState, IProduct[] | undefined> = createSelector(
    getProductRootState,
    (products) => products.selectedProduct.similarProducts
);
