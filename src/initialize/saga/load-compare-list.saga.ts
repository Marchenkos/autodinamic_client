import { SagaIterator } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';

import { INIT_COMPARE_LIST } from '../../components/compare-products/actions';

export function* getCompareListSaga(): SagaIterator {
    try {
        let initData: number[] = [];

        const compareList = localStorage.getItem('compareList');

        if (compareList) {
            initData = JSON.parse(compareList) as number[];
        } else {
            localStorage.setItem('compareList', JSON.stringify([]));
        }

        yield put(INIT_COMPARE_LIST.COMPLETED(initData));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForFetchCompareListTrigger(): SagaIterator {
    yield takeLatest(INIT_COMPARE_LIST.TRIGGER, getCompareListSaga);
}
