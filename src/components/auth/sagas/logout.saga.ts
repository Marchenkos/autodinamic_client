import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { LOG_OUT } from '../actions';
import { LoginError, LoginErrorType } from './login.saga';

export class LogOutError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public cause: any) {
        super(`Failed to log out, caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}

export function* logoutSaga(): SagaIterator {
    try {
        yield put(LOG_OUT.STARTED());

        localStorage.removeItem('userToken');

        yield call(graphqlApi.client.logout);

        yield put(LOG_OUT.COMPLETED());
    } catch (err) {
        const errorType: LoginErrorType = LoginErrorType.FAILED_LOGOUT;
        const error = new LoginError(errorType, err);

        console.log(error);
        yield put(LOG_OUT.COMPLETED.failed(error));
    }
}

export function* listenForLogoutTrigger(): SagaIterator {
    yield takeLatest(LOG_OUT.TRIGGER, logoutSaga);
}
