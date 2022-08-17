import { combineReducers, Reducer } from 'redux';

import { reducer as products } from '../components/product-list/reducers';
import { basketReducer as basket } from '../components/checkout/basket/reducers/basket.reducer';
import { toastReducer as toast } from '../components/toast/reducer';
import { reducer as account } from '../components/account/reducers';
import { orderReducer as order } from '../components/checkout/order-confirmation/reducer';
import { reducer as modals } from '../components/modal/reducers';
import { searchReducer as search } from '../components/search/reducer';
import { contactMeReducer as contactMe } from '../components/contacts/reducer';
import { filterReducer as filters } from '../components/filter/reducer';
import { compareReducer as compare } from '../components/compare-products/reducer';
import { reducer as authentication } from '../components/auth/reducers';
import { ApplicationState } from './ApplicationState';
import { productCategoryReducer as category } from '../components/product-category/reducer';
import { reducer as promotions } from '../components/promotions/reducers';
import { reducer as drawer } from '../components/drawer/drawer.reducer';

export const rootReducer: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    products,
    basket,
    toast,
    account,
    order,
    modals,
    search,
    contactMe,
    filters,
    compare,
    authentication,
    category,
    promotions,
	drawer
});
