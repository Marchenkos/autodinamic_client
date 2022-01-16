import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { listenForAddAddressTrigger } from './add-address.saga';
import { listenForGetOrderByEmailOrderTrigger } from './get-order-by-email.sagas';
import { listenForRemoveAccountTrigger } from './remove-account.saga';
import { listenFoRemoveAddressTrigger } from './remove-adress.saga';
import { listenForUpdateDeliveryDetailsTrigger } from './update-adress-details.saga';
import { listenForToggleWishlistTrigger } from './toggle-wishlist.sagas';
import { listenForSetDefaultAddressTrigger } from './set-default-address';

export function* listenForAccountTriggers(): SagaIterator {
    yield fork(listenForToggleWishlistTrigger);
    yield fork(listenForSetDefaultAddressTrigger);
    yield fork(listenForUpdateDeliveryDetailsTrigger);
    yield fork(listenFoRemoveAddressTrigger);
    yield fork(listenForRemoveAccountTrigger);
    yield fork(listenForGetOrderByEmailOrderTrigger);
    yield fork(listenForAddAddressTrigger);
}
