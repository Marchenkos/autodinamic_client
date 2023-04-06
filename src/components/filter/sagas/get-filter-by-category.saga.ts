import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { GET_FILTER_BY_CATEGORY } from '../actions';

export function* getFilterByCategorySaga(action: ReturnType<typeof GET_FILTER_BY_CATEGORY.TRIGGER>): SagaIterator {
    try {
        yield put(GET_FILTER_BY_CATEGORY.STARTED(action.payload));

        const response = yield call(graphqlApi.client.getFiltersByCategoryId, action.payload);

        yield put(GET_FILTER_BY_CATEGORY.COMPLETED(response));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForGetFilterByCategoryTrigger(): SagaIterator {
    yield takeLatest(GET_FILTER_BY_CATEGORY.TRIGGER, getFilterByCategorySaga);
}
