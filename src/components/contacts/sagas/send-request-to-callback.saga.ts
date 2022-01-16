import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { RequestToCallbackResponse } from '../../../graphql/interfaces';
import { SHOW_TOAST } from '../../toast/actions';
import { SEND_REQUEST_TO_CALLBACK } from '../actions';

export function* fetchAccountDetailsSaga(action: ReturnType<typeof SEND_REQUEST_TO_CALLBACK.TRIGGER>): SagaIterator {
    try {
        const { name, email, phoneNumber, message } = action.payload;

        yield put(SEND_REQUEST_TO_CALLBACK.STARTED(action.payload));

        const response: RequestToCallbackResponse = yield call(
            graphqlApi.client.sendRequestToCallback,
            name,
            email,
            message,
            phoneNumber
        );

        yield put(SEND_REQUEST_TO_CALLBACK.COMPLETED(response.isSuccess));

        if (response.isSuccess) {
            yield put(SHOW_TOAST({ message: 'Ваше сообщение успешно отправлено', status: 'success' }));
        } else {
            yield put(SHOW_TOAST({ message: 'Не удалось отправить Ваше сообщение', status: 'error' }));
        }
    } catch (err) {
        console.log(err);
    }
}

export function* listenForSendRequestToCallbackTrigger(): SagaIterator {
    yield takeLatest(SEND_REQUEST_TO_CALLBACK.TRIGGER, fetchAccountDetailsSaga);
}
