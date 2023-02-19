import { SagaIterator } from 'redux-saga';
import { graphqlApi } from '../graphql/graphqlApi';
import { call, put, spawn, takeLatest } from 'redux-saga/effects';

import { INITIALISATION } from './acrions';
import { FETCH_BASKET } from '../components/checkout/basket/actions';
import { FETCH_ACCOUNT_DETAILS } from '../components/account/actions';
import { GET_FILTER_BY_CATEGORY } from '../components/filter/actions';
import { INIT_COMPARE_LIST } from '../components/compare-products/actions';
import { LOG_IN } from '../components/auth/actions';
import { FETCH_PRODUCT_CATEGORY_NAMES, FETCH_CATEGORY_LIST } from '../components/product-category/actions';
import { automaticallyRefreshTokens } from '../components/auth/sagas/refresh-token.saga';
import { FETCH_PROMOTIONS_LIST } from '../components/promotions/actions';

export function* initialisationSaga(): SagaIterator {
    yield put(INITIALISATION.STARTED());

    try {
        yield call(configureApiClients);
        yield put(INITIALISATION.COMPLETED());
        yield put(FETCH_PRODUCT_CATEGORY_NAMES.TRIGGER());
        yield put(FETCH_CATEGORY_LIST.TRIGGER());
        // yield put(FETCH_BASKET.TRIGGER());
        // yield put(FETCH_PROMOTIONS_LIST.TRIGGER());
        // yield put(GET_FILTER_BY_CATEGORY.TRIGGER('all'));
        // yield put(INIT_COMPARE_LIST.TRIGGER());

        yield spawn(automaticallyRefreshTokens);

        yield call(configureAuthentication);
    } catch (error: any) {
        yield put(INITIALISATION.COMPLETED.failed(error));
    }
}

export function* listenForInitialisationTrigger(): SagaIterator {
    yield takeLatest(INITIALISATION.TRIGGER, initialisationSaga);
}

export function* configureApiClients(): SagaIterator {
    yield call(graphqlApi.init);
}

export function* configureAuthentication(): SagaIterator {
    const userToken = localStorage.getItem('userToken');

    if (userToken) {
        yield put(LOG_IN.COMPLETED({ token: userToken }));
        // yield put(FETCH_ACCOUNT_DETAILS.TRIGGER());
    }
}
