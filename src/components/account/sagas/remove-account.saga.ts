import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { AddressInfo } from '../../../graphql/entities';
import { graphqlApi } from '../../../graphql/graphqlApi';
import { LOG_OUT } from '../../auth/actions';
import { REMOVE_ACCOUNT } from '../actions';

export class RemoveAccountError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public cause: any) {
        super(`Failed to remove account, caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}

export function* removeAccountSaga(action: ReturnType<typeof REMOVE_ACCOUNT.TRIGGER>): SagaIterator {
    try {
        yield put(REMOVE_ACCOUNT.STARTED(action.payload));

        const response: boolean = yield call(graphqlApi.client.removeAccount, action.payload);

        yield put(REMOVE_ACCOUNT.COMPLETED(response));
        yield put(LOG_OUT.TRIGGER());
    } catch (err) {
        const error = new RemoveAccountError(err);

        yield put(REMOVE_ACCOUNT.COMPLETED.failed(error));
    }
}

export function* listenForRemoveAccountTrigger(): SagaIterator {
    yield takeLatest(REMOVE_ACCOUNT.TRIGGER, removeAccountSaga);
}
