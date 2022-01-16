import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { Category } from '../../../graphql/entities';
import { graphqlApi } from '../../../graphql/graphqlApi';
import { GET_FILTER_BY_CATEGORY } from '../../filter/actions';
import { FETCH_PRODUCT_CATEGORY } from '../actions';
import { defaultCategory } from '../reducer';

export function* getProductCategorySaga(action: ReturnType<typeof FETCH_PRODUCT_CATEGORY.TRIGGER>): SagaIterator {
    try {
        yield put(FETCH_PRODUCT_CATEGORY.STARTED(action.payload));

        let category: Category = defaultCategory;

        if (action.payload !== 'all') {
            category = yield call(graphqlApi.client.getCategoryByName, action.payload);
        }

        yield put(FETCH_PRODUCT_CATEGORY.COMPLETED(category));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForGetProductCategorySagaTrigger(): SagaIterator {
    yield takeLatest(FETCH_PRODUCT_CATEGORY.TRIGGER, getProductCategorySaga);
}
