import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ProductField } from '../../../graphql/entities';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { FETCH_SPECIFIC_PRODUCT_FIELDS } from '../actions';

export function* fetchProductsFieldsSaga(
    action: ReturnType<typeof FETCH_SPECIFIC_PRODUCT_FIELDS.TRIGGER>
): SagaIterator {
    const { categoryName } = action.payload;

    try {
        yield put(FETCH_SPECIFIC_PRODUCT_FIELDS.STARTED(categoryName));

        const response: ProductField[] = yield call(graphqlApi.client.getProductFields, categoryName);

        yield put(FETCH_SPECIFIC_PRODUCT_FIELDS.COMPLETED(response));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForFetchSpecificProductsFieldsTrigger(): SagaIterator {
    yield takeLatest(FETCH_SPECIFIC_PRODUCT_FIELDS.TRIGGER, fetchProductsFieldsSaga);
}
