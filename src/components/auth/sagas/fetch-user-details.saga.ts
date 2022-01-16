import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { User } from '../../../graphql/interfaces';
import { FETCH_ACCOUNT_DETAILS } from '../../account/actions';

export function* fetchAccountDetailsSaga(): SagaIterator {
    try {
        yield put(FETCH_ACCOUNT_DETAILS.STARTED());

        const response: User = yield call(graphqlApi.client.getAccountDetails);

        yield put(FETCH_ACCOUNT_DETAILS.COMPLETED(response));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForFetchAccountDetailsTrigger(): SagaIterator {
    yield takeLatest(FETCH_ACCOUNT_DETAILS.TRIGGER, fetchAccountDetailsSaga);
}
