import { SagaIterator } from 'redux-saga';
import { call, put, select, delay } from 'redux-saga/effects';

import { LOG_OUT } from '../actions';
import { getToken, getTokenExpiredAt } from '../selectors';

export const REFRESH_TOKEN_CHECK_PERIOD = 30 * 1000;
export const REFRESH_TOKEN_OFFSET = 120;

export function* checkForTokenRefresh(): SagaIterator {
    const authToken = yield select(getToken);

    if (!authToken) {
        return;
    }

    const expires: number | undefined = yield select(getTokenExpiredAt);

    const now = new Date().getTime() / 1000;
    const isExpiredToken = (expires || 0) - REFRESH_TOKEN_OFFSET < now;

    if (!isExpiredToken) {
        return;
    }

    yield put(LOG_OUT.TRIGGER());
}

export function* automaticallyRefreshTokens(): SagaIterator {
    while (true) {
        yield call(checkForTokenRefresh);
        yield delay(REFRESH_TOKEN_CHECK_PERIOD);
    }
}
