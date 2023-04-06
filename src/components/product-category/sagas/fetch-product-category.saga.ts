import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { ICategory } from '../../../graphql/entities';
import { graphqlApi } from '../../../graphql/graphqlApi';
import { FETCH_PRODUCT_CATEGORY } from '../actions';

export function* getProductCategorySaga(action: ReturnType<typeof FETCH_PRODUCT_CATEGORY.TRIGGER>): SagaIterator {
    try {
        yield put(FETCH_PRODUCT_CATEGORY.STARTED(action.payload));

        const category: ICategory = yield call(graphqlApi.client.getCategoryByName, action.payload);

        yield put(FETCH_PRODUCT_CATEGORY.COMPLETED(category));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForGetProductCategorySagaTrigger(): SagaIterator {
    yield takeLatest(FETCH_PRODUCT_CATEGORY.TRIGGER, getProductCategorySaga);
}
