import { SagaIterator } from 'redux-saga';
import { call, put, delay, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { ProductList } from '../../../graphql/interfaces';
import { FETCH_DISCOUNT_PRODUCT_LIST } from '../../product-list/actions';

export class GetDiscountProductListError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public cause: any) {
        super(`Failed to fetch discount product list, caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}

export function* getDiscountProductListSaga(action: ReturnType<typeof FETCH_DISCOUNT_PRODUCT_LIST.TRIGGER>): SagaIterator {
    try {
        const { limit, next, categoryName, sort, filters, isNew = false, isHasDiscount = true } = action.payload;

        yield put(FETCH_DISCOUNT_PRODUCT_LIST.STARTED(action.payload));

        const response: ProductList = yield call(graphqlApi.client.fetchProductList, limit, next, categoryName, sort, isNew, isHasDiscount, filters);

        yield put(FETCH_DISCOUNT_PRODUCT_LIST.COMPLETED(response));
    } catch (err) {
        const error = new GetDiscountProductListError(err);

        yield put(FETCH_DISCOUNT_PRODUCT_LIST.COMPLETED.failed(error));
    }
}

export function* listenForFetchDiscountProductListTrigger(): SagaIterator {
    yield takeLatest(FETCH_DISCOUNT_PRODUCT_LIST.TRIGGER, getDiscountProductListSaga);
}
