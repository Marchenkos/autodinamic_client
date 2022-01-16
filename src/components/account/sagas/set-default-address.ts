import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { AddressInfo } from '../../../graphql/entities';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { SET_DEFAULT_ADDRESS } from '../actions';

export function* setDefaultAddressSaga(action: ReturnType<typeof SET_DEFAULT_ADDRESS.TRIGGER>): SagaIterator {
    try {
        yield put(SET_DEFAULT_ADDRESS.STARTED(action.payload));

        const response: AddressInfo[] = yield call(graphqlApi.client.setDefaultAddress, action.payload);

        yield put(SET_DEFAULT_ADDRESS.COMPLETED(response));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForSetDefaultAddressTrigger(): SagaIterator {
    yield takeLatest(SET_DEFAULT_ADDRESS.TRIGGER, setDefaultAddressSaga);
}
