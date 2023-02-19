import { SagaIterator } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';

import { GET_FILTER_BY_CATEGORY } from '../../filter/actions';
import { SET_CATEGORY } from '../actions';

export function* setCategorySaga(action: ReturnType<typeof SET_CATEGORY>): SagaIterator {
    try {
        yield put(GET_FILTER_BY_CATEGORY.TRIGGER(action.payload.name));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForSetCategorySagaTrigger(): SagaIterator {
    yield takeLatest(SET_CATEGORY, setCategorySaga);
}
