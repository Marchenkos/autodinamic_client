import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { AddressInfo } from '../../../graphql/entities';
import { graphqlApi } from '../../../graphql/graphqlApi';
import { REMOVE_ADDRESS } from '../actions';

export function* removeAddressSaga(action: ReturnType<typeof REMOVE_ADDRESS.TRIGGER>): SagaIterator {
    try {
        yield put(REMOVE_ADDRESS.STARTED(action.payload));

        const response: AddressInfo[] = yield call(graphqlApi.client.removeAddressDetails, action.payload);

        yield put(REMOVE_ADDRESS.COMPLETED(response));
    } catch (err) {
        console.log(err);
    }
}

export function* listenFoRemoveAddressTrigger(): SagaIterator {
    yield takeLatest(REMOVE_ADDRESS.TRIGGER, removeAddressSaga);
}
