import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import { listenForFetchProductCategoryNamesTrigger } from './fetch-all-product-category-names.saga';
import { listenForGetCategoryListSagaTrigger } from './fetch-category-list.saga';
import { listenForGetProductCategorySagaTrigger } from './fetch-product-category.saga';
import { listenForSetCategorySagaTrigger } from './set-category.saga';

export function* listenForCategoryTriggers(): SagaIterator {
    yield fork(listenForFetchProductCategoryNamesTrigger);
    yield fork(listenForGetProductCategorySagaTrigger);
    yield fork(listenForSetCategorySagaTrigger);
    yield fork(listenForGetCategoryListSagaTrigger);

}
