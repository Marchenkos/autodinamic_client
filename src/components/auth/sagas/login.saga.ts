import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { AuthResponse } from '../../../graphql/interfaces';
import { FETCH_ACCOUNT_DETAILS } from '../../account/actions';
import { SHOW_TOAST } from '../../toast/actions';
import { LOG_IN } from '../actions';

export enum LoginErrorType {
    WRONG_CREDENTIALS = 'WRONG_CREDENTIALS',
    OTHER = 'OTHER',
    FAILED_LOGOUT = 'FAILED_LOGOUT',
}

const defineLoginErrorType = (error: any): LoginErrorType => {
    let wrongCredentialsError = [];

    if (error.graphQLErrors) {
        wrongCredentialsError = error.graphQLErrors.filter(
            // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
            (error: any) => error.message === 'Invalid credentials'
        );
    }

    return wrongCredentialsError.length ? LoginErrorType.WRONG_CREDENTIALS : LoginErrorType.OTHER;
};

export class LoginError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public type: LoginErrorType, public cause: any) {
        super(`Failed to login, caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}

export function* loginSaga(action: ReturnType<typeof LOG_IN.TRIGGER>): SagaIterator {
    try {
        yield put(LOG_IN.STARTED(action.payload));

        const response: AuthResponse = yield call(
            graphqlApi.client.login,
            action.payload.email,
            action.payload.password
        );

        localStorage.setItem('userToken', response.token);

        yield put(LOG_IN.COMPLETED(response));
        yield put(FETCH_ACCOUNT_DETAILS.TRIGGER());
    } catch (err) {
        const errorType: LoginErrorType = defineLoginErrorType(err);
        const error = new LoginError(errorType, err);

        console.log(error);
        yield put(LOG_IN.COMPLETED.failed(error));
    }
}

export function* listenForLoginTrigger(): SagaIterator {
    yield takeLatest(LOG_IN.TRIGGER, loginSaga);
}
