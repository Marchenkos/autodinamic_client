import { SagaIterator } from 'redux-saga';
import { call, spawn } from 'redux-saga/effects';

import { listenForFetchProductListTrigger } from '../components/product-list/sagas/get-product-list.saga';
import { listenForFetchProductByIdTrigger } from '../components/product-details/sagas/fetch-product-by-id.saga';
import { listenForFetchBasketTrigger } from '../initialize/saga/load-basket.saga';
import { listenForAddToBasketTrigger } from '../components/checkout/basket/sagas/add-to-basket.saga';
import { listenForRemoveFromBasketTrigger } from '../components/checkout/basket/sagas/remove-from-basket.saga';
import { listenForLogoutTrigger } from '../components/auth/sagas/logout.saga';
import { listenForLoginTrigger } from '../components/auth/sagas/login.saga';
import { listenForFetchAccountDetailsTrigger } from '../components/auth/sagas/fetch-user-details.saga';
import { listenForRegistrationTrigger } from '../components/auth/sagas/registration.saga';
import { listenForUpdateProfileDetailsTrigger } from '../components/auth/sagas/update-profile-details.saga';
import { listenForUpdateDeliveryDetailsTrigger } from '../components/account/sagas/update-adress-details.saga';

import { initialisationSaga } from './init.saga';
import { listenForEditBasketTrigger } from '../components/checkout/basket/sagas/edit-basket.saga';
import { listenForCreateOrderTrigger } from '../components/checkout/order-confirmation/sagas';
import { listenForFetchProductBySearchTrigger } from '../components/search/saga';
import { listenForGetOrderByIdOrderTrigger } from '../components/order/sagas/get-order-by-id.sagas';
import { listenForFetchPromotionsListTrigger } from '../components/promotions/sagas/fetch-promotions-list.saga';
import { listenForFetchPromotionByIdTrigger } from '../components/promotions/sagas/fetch-promotion-by-id.saga';
import { listenForSendRequestToCallbackTrigger } from '../components/contacts/sagas/send-request-to-callback.saga';
import { listenForGetFilterByCategoryTrigger } from '../components/filter/sagas/get-filter-by-category.saga';
import { listenForFetchSimilarProductsTrigger } from '../components/product-details/sagas/fetch-similar-products.saga';
import { listenForFetchCompareListTrigger } from '../initialize/saga/load-compare-list.saga';
import { listenForGetCompareListTrigger } from '../components/compare-products/sagas/fetch-compare-data.saga';
import { listenForToggleCompareListTrigger } from '../components/compare-products/sagas/toggle-compare-list.saga';
import { listenForCategoryTriggers } from '../components/product-category/sagas';
import { listenForFetchSpecificProductsFieldsTrigger } from '../components/product-details/sagas/fetch-product-fields.saga';
import { listenForAccountTriggers } from '../components/account/sagas/index.saga';
import { listenForFetchDiscountProductListTrigger } from '../components/product-list/sagas/get-discount-product-list.saga';

export function* rootSaga(): SagaIterator {
    yield spawn(listenForFetchProductListTrigger);
    yield spawn(listenForFetchProductByIdTrigger);
    yield spawn(listenForFetchBasketTrigger);
    yield spawn(listenForAddToBasketTrigger);
    yield spawn(listenForRemoveFromBasketTrigger);
    yield spawn(listenForLoginTrigger);
    yield spawn(listenForRegistrationTrigger);
    yield spawn(listenForLogoutTrigger);
    yield spawn(listenForFetchAccountDetailsTrigger);
    yield spawn(listenForUpdateProfileDetailsTrigger);
    yield spawn(listenForUpdateDeliveryDetailsTrigger);
    yield spawn(listenForAccountTriggers);
    yield spawn(listenForEditBasketTrigger);
    yield spawn(listenForCreateOrderTrigger);
    yield spawn(listenForFetchProductBySearchTrigger);
    yield spawn(listenForGetOrderByIdOrderTrigger);
    yield spawn(listenForFetchPromotionsListTrigger);
    yield spawn(listenForFetchPromotionByIdTrigger);
    yield spawn(listenForSendRequestToCallbackTrigger);
    yield spawn(listenForGetFilterByCategoryTrigger);
    yield spawn(listenForFetchSimilarProductsTrigger);
    yield spawn(listenForFetchCompareListTrigger);
    yield spawn(listenForGetCompareListTrigger);
    yield spawn(listenForToggleCompareListTrigger);
    yield spawn(listenForCategoryTriggers);
    yield spawn(listenForFetchSpecificProductsFieldsTrigger);
    yield spawn(listenForFetchDiscountProductListTrigger);

    yield call(initialisationSaga);
}
