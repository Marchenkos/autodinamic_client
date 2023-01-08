import { productListReducer } from './product-list.reducer';
import { selectedProductReducer } from '../../product-details/reducers/product-details.reducer';
import { discountProductListReducer } from './discount-product-list.reducer';
import { searchProductListReducer } from './search-product-list.reducer';

export interface ProductState {
    readonly productList: ReturnType<typeof productListReducer>;
    readonly selectedProduct: ReturnType<typeof selectedProductReducer>;
    readonly discountProductList: ReturnType<typeof selectedPdiscountProductListReducerroductReducer>;
    readonly searchProductList: ReturnType<typeof searchProductListReducer>;
}
