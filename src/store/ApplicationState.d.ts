import { reducer as productReducer } from '../components/catalog/reducers/index';
import { basketReducer } from '../components/checkout/basket/reducers/basket.reducer';
import { toastReducer } from '../components/toast/reducer';
import { reducer as modalReducer } from '../components/modal/reducers';
import { reducer as accountReducer } from '../components/account/reducers';
import { orderReducer } from '../components/checkout/order-confirmation/reducer';
import { searchReducer } from '../components/search/reducer';
import { contactMeReducer } from '../components/contacts/reducer';
import { filterReducer } from '../components/filter/reducer';
import { compareReducer } from '../components/compare-products/reducer';
import { reducer as authenticationReducer } from '../components/auth/reducers';
import { productCategoryReducer } from '../components/product-category/reducer';
import { reducer as promotionsReducer } from '../components/promotions/reducers';
import { reducer as drawerReducer } from '../components/drawer/drawer.reducer';

export interface ApplicationState {
    products: ReturnType<typeof productReducer>;
    basket: ReturnType<typeof basketReducer>;
    toast: ReturnType<typeof toastReducer>;
    modals: ReturnType<typeof modalReducer>;
    account: ReturnType<typeof accountReducer>;
    order: ReturnType<typeof orderReducer>;
    search: ReturnType<typeof searchReducer>;
    contactMe: ReturnType<typeof contactMeReducer>;
    filters: ReturnType<typeof filterReducer>;
    // compare: ReturnType<typeof compareReducer>;
    authentication: ReturnType<typeof authenticationReducer>;
    category: ReturnType<typeof productCategoryReducer>;
    promotions: ReturnType<typeof promotionsReducer>;
    drawer: ReturnType<typeof drawerReducer>;
}
