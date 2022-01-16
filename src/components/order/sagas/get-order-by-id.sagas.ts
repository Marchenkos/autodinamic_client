import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { GET_ORDER_BY_ID } from '../../checkout/order-confirmation/actions';

export function* getOrderByIdSaga(action: ReturnType<typeof GET_ORDER_BY_ID.TRIGGER>): SagaIterator {
    try {
        yield put(GET_ORDER_BY_ID.START());
        const response = yield call(graphqlApi.client.getOrderById, action.payload);

        yield put(GET_ORDER_BY_ID.COMPLETED(response));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForGetOrderByIdOrderTrigger(): SagaIterator {
    yield takeLatest(GET_ORDER_BY_ID.TRIGGER, getOrderByIdSaga);
}
