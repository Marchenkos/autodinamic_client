import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { GET_ORDER_BY_EMAIL } from '../actions';

export function* getOrderByEmailSaga(action: ReturnType<typeof GET_ORDER_BY_EMAIL.TRIGGER>): SagaIterator {
    try {
        yield put(GET_ORDER_BY_EMAIL.STARTED());
        const response = yield call(graphqlApi.client.getOrderByEmail, action.payload);

        yield put(GET_ORDER_BY_EMAIL.COMPLETED(response));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForGetOrderByEmailOrderTrigger(): SagaIterator {
    yield takeLatest(GET_ORDER_BY_EMAIL.TRIGGER, getOrderByEmailSaga);
}
