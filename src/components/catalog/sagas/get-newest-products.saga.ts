import { SagaIterator } from 'redux-saga';
import { call, put, delay, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { IProductList } from '../../../graphql/interfaces';
import { FETCH_DISCOUNT_PRODUCT_LIST } from '../actions';

export class GetNewestProductsError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public cause: any) {
        super(`Failed to fetch newest products, caused by: \n${cause.message || cause}`);

        if (cause.stack) {
          this.stack = cause.stack;
        }
    }
}

export function* getNewestProductsSaga(
    action: ReturnType<typeof FETCH_DISCOUNT_PRODUCT_LIST.TRIGGER>
): SagaIterator {
    try {
        yield put(FETCH_DISCOUNT_PRODUCT_LIST.STARTED(action.payload));

        const response: IProductList = yield call(
            graphqlApi.client.fetchProductList,
            action.payload
        );

        yield put(FETCH_DISCOUNT_PRODUCT_LIST.COMPLETED(response));
    } catch (err) {
        const error = new GetNewestProductsError(err);

        yield put(FETCH_DISCOUNT_PRODUCT_LIST.COMPLETED.failed(error));
    }
}

export function* listenForFetchNewestProductsTrigger(): SagaIterator {
    yield takeLatest(FETCH_DISCOUNT_PRODUCT_LIST.TRIGGER, getNewestProductsSaga);
}
