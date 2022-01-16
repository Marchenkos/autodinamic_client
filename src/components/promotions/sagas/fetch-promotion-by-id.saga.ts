import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { Promotion } from '../../../graphql/entities';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { FETCH_PROMOTION_BY_ID } from '../actions';

export class FetchPromotionByIdError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public cause: any) {
        super(`Failed to fetch promotion by id, caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}

export function* fetchPromotionByIdSaga(action: ReturnType<typeof FETCH_PROMOTION_BY_ID.TRIGGER>): SagaIterator {
    try {
        yield put(FETCH_PROMOTION_BY_ID.STARTED(action.payload));
        const response: Promotion = yield call(graphqlApi.client.getPromotionDetails, action.payload);

        yield put(FETCH_PROMOTION_BY_ID.COMPLETED(response));
    } catch (err) {
        const error = new FetchPromotionByIdError(err);

        yield put(FETCH_PROMOTION_BY_ID.COMPLETED.failed(error));
    }
}

export function* listenForFetchPromotionByIdTrigger(): SagaIterator {
    yield takeLatest(FETCH_PROMOTION_BY_ID.TRIGGER, fetchPromotionByIdSaga);
}
