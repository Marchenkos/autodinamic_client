import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { AddressInfo } from '../../../graphql/entities';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { ADD_DELIVERY_ADDRESS } from '../actions';

export function* addAddressSaga(action: ReturnType<typeof ADD_DELIVERY_ADDRESS.TRIGGER>): SagaIterator {
    try {
        yield put(ADD_DELIVERY_ADDRESS.STARTED(action.payload));

        const { address, city, postcode, isDefault } = action.payload;
        const response: AddressInfo[] = yield call(
            graphqlApi.client.addDeliveryAddress,
            address,
            city,
            postcode,
            isDefault
        );

        yield put(ADD_DELIVERY_ADDRESS.COMPLETED(response));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForAddAddressTrigger(): SagaIterator {
    yield takeLatest(ADD_DELIVERY_ADDRESS.TRIGGER, addAddressSaga);
}
