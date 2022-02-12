import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { graphqlApi } from '../../graphql/graphqlApi';

import { FETCH_PRODUCT_LIST_BY_SEARCH } from './actions';

export class GetSearchProductListError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public cause: any) {
        super(`Failed to fetch product list by search term, caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}

export function* getProductBySearchSaga(action: ReturnType<typeof FETCH_PRODUCT_LIST_BY_SEARCH.TRIGGER>): SagaIterator {
    try {
        const { limit, next, filters, searchTerms, sort} = action.payload;
        yield put(FETCH_PRODUCT_LIST_BY_SEARCH.STARTED(action.payload));

        const response = yield call(graphqlApi.client.fetchProductListByTerms, limit,
            next,
            sort,
            searchTerms,
            filters
        );

        yield put(FETCH_PRODUCT_LIST_BY_SEARCH.COMPLETED(response));
    } catch (err) {
        const error = new GetSearchProductListError(err);

        yield put(FETCH_PRODUCT_LIST_BY_SEARCH.COMPLETED.failed(error));
    }
}

export function* listenForFetchProductBySearchTrigger(): SagaIterator {
    yield takeLatest(FETCH_PRODUCT_LIST_BY_SEARCH.TRIGGER, getProductBySearchSaga);
}
