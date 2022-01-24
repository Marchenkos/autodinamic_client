import { combineReducers, Reducer } from 'redux';

import { productListReducer as productList } from './product-list.reducer';
import { selectedProductReducer as selectedProduct } from '../../product-details/reducers/product-details.reducer';
import { discountProductListReducer as discountProductList } from './discount-product-list.reducer';

import { ProductState } from './product.state';

export const reducer: Reducer<ProductState> = combineReducers<ProductState>({
    productList,
    selectedProduct,
    discountProductList
});
