import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { CategoryNames } from '../../../graphql/interfaces';
import { FETCH_PRODUCT_CATEGORY_NAMES } from '../actions';

export function* fetchProductCategoryNames(
    action: ReturnType<typeof FETCH_PRODUCT_CATEGORY_NAMES.TRIGGER>
): SagaIterator {
    try {
        yield put(FETCH_PRODUCT_CATEGORY_NAMES.STARTED(action.payload));

        const result: CategoryNames[] = yield call(graphqlApi.client.getCategoryNames);

        yield put(FETCH_PRODUCT_CATEGORY_NAMES.COMPLETED(result));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForFetchProductCategoryNamesTrigger(): SagaIterator {
    yield takeLatest(FETCH_PRODUCT_CATEGORY_NAMES.TRIGGER, fetchProductCategoryNames);
}
