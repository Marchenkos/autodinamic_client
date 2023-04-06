import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { FETCH_CATEGORY_LIST } from '../actions';

export function* getCategoryListSaga(): SagaIterator {
    try {
        yield put(FETCH_CATEGORY_LIST.STARTED());

        const categoryList = yield call(graphqlApi.client.getCategoryList);

        yield put(FETCH_CATEGORY_LIST.COMPLETED(categoryList));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForGetCategoryListSagaTrigger(): SagaIterator {
    yield takeLatest(FETCH_CATEGORY_LIST.TRIGGER, getCategoryListSaga);
}
