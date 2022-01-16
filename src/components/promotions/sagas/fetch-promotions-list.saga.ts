import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Promotion } from '../../../graphql/entities';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { FETCH_PROMOTIONS_LIST } from '../actions';

export class FetchPromotionsListError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public cause: any) {
        super(`Failed to fetch promotions list, caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}

export function* fetchPromotionsListSaga(): SagaIterator {
    try {
        yield put(FETCH_PROMOTIONS_LIST.STARTED());
        const response: Promotion[] = yield call(graphqlApi.client.getPromotionsList);

        yield put(FETCH_PROMOTIONS_LIST.COMPLETED(response));
    } catch (err) {
        const error = new FetchPromotionsListError(err);

        yield put(FETCH_PROMOTIONS_LIST.COMPLETED.failed(error));
    }
}

export function* listenForFetchPromotionsListTrigger(): SagaIterator {
    yield takeLatest(FETCH_PROMOTIONS_LIST.TRIGGER, fetchPromotionsListSaga);
}
