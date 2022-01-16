import { SagaIterator } from 'redux-saga';
import { call, put, select, take, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { LOG_IN, REGISTRATION } from '../actions';
import { getToken } from '../selectors';

export enum RegisterErrorType {
    DUPLICATE_EMAIL = 'DUPLICATE_EMAIL',
    OTHER = 'OTHER',
}
export class RegisterError extends Error {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
    constructor(public email: string, public type: RegisterErrorType, public cause: any) {
        super(`Failed to register for email: '${email}', caused by: \n${cause.message || cause}`);

        if (cause.stack) {
            this.stack = cause.stack;
        }
    }
}

const defineRegisterErrorType = (error: any): RegisterErrorType => {
    let duplicateEmailError = [];

    if (error.graphQLErrors) {
        duplicateEmailError = error.graphQLErrors.filter(
            // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
            (error: any) => error.extensions && error.extensions.exception.validationErrors[0].property === 'email'
        );
    }

    return duplicateEmailError.length ? RegisterErrorType.DUPLICATE_EMAIL : RegisterErrorType.OTHER;
};

export function* registrationSaga(action: ReturnType<typeof REGISTRATION.TRIGGER>): SagaIterator {
    const { first_name, last_name, email, password } = action.payload;

    try {
        yield put(REGISTRATION.STARTED());

        const response: boolean = yield call(graphqlApi.client.registration, first_name, last_name, email, password);

        if (response) {
            yield put(LOG_IN.TRIGGER({ email, password }));
            yield take(LOG_IN.COMPLETED);

            const isAutoLoggedIn = yield select(getToken);

            yield put(REGISTRATION.COMPLETED({ isRegistered: response, isAutoLoggedIn: isAutoLoggedIn }));
        } else {
            throw new Error('New user has not registered');
        }
    } catch (err) {
        const errorType: RegisterErrorType = defineRegisterErrorType(err);
        const error = new RegisterError(email, errorType, err);

        console.log(err);
        yield put(REGISTRATION.COMPLETED.failed(error));
    }
}

export function* listenForRegistrationTrigger(): SagaIterator {
    yield takeLatest(REGISTRATION.TRIGGER, registrationSaga);
}
