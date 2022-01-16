import { SagaIterator } from 'redux-saga';
import { call, put, delay, takeLatest } from 'redux-saga/effects';

import { FETCH_PRODUCT_LIST } from '../actions';
import { graphqlApi } from '../../../graphql/graphqlApi';
import { ProductList } from '../../../graphql/interfaces';
import { getSelectedFilters } from '../../filter/selector';

export class GetProductListError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public cause: any) {
        super(`Failed to fetch product list, caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}

export function* getProductListSaga(action: ReturnType<typeof FETCH_PRODUCT_LIST.TRIGGER>): SagaIterator {
    try {
        const { limit, next, categoryName, sort, filters, isNew = false, searchTerms } = action.payload;

        yield put(FETCH_PRODUCT_LIST.STARTED(action.payload));

        const response: ProductList = yield call(graphqlApi.client.fetchProductList, limit, next, categoryName, sort, isNew, filters, searchTerms);

        yield put(FETCH_PRODUCT_LIST.COMPLETED(response));
    } catch (err) {
        const error = new GetProductListError(err);

        yield put(FETCH_PRODUCT_LIST.COMPLETED.failed(error));
    }
}

export function* listenForFetchProductListTrigger(): SagaIterator {
    yield takeLatest(FETCH_PRODUCT_LIST.TRIGGER, getProductListSaga);
}
