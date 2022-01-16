import { productListReducer } from './product-list.reducer';
import { selectedProductReducer } from '../../product-details/reducers/product-details.reducer';

export interface ProductState {
    readonly productList: ReturnType<typeof productListReducer>;
    readonly selectedProduct: ReturnType<typeof selectedProductReducer>;
}
