import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { AddressInfo } from '../../../graphql/entities';
import { graphqlApi } from '../../../graphql/graphqlApi';
import { TOGGLE_DRAWER } from '../../drawer/actions';
import { SHOW_TOAST } from '../../toast/actions';
import { EDIT_DELIVERY_ADDRESS } from '../actions';

export function* updateDeliveryDetailsSaga(action: ReturnType<typeof EDIT_DELIVERY_ADDRESS.TRIGGER>): SagaIterator {
    try {
        yield put(EDIT_DELIVERY_ADDRESS.STARTED(action.payload));

        const { address, city, postcode, isDefault, id } = action.payload;
        const response: AddressInfo[] = yield call(
            graphqlApi.client.editAddressDetails,
            address,
            city,
            postcode,
            id,
            isDefault
        );

        yield put(EDIT_DELIVERY_ADDRESS.COMPLETED(response));
		yield put(TOGGLE_DRAWER({
			isShow: false
		}));
    } catch (err) {
		yield put(TOGGLE_DRAWER({
			isShow: false
		}));
		yield put(SHOW_TOAST({
			message: 'Не удалось изменить адресс.', 
			status: 'error'
		}));
    }
}

export function* listenForUpdateDeliveryDetailsTrigger(): SagaIterator {
    yield takeLatest(EDIT_DELIVERY_ADDRESS.TRIGGER, updateDeliveryDetailsSaga);
}
