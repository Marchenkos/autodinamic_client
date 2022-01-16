import { SagaIterator } from 'redux-saga';
import { put, select, takeLatest } from 'redux-saga/effects';

import { TOGGLE_COMPARE_LIST } from '../actions';
import { getCompareItemsIds } from '../selectors';

export function* toggleFromCompareSaga(action: ReturnType<typeof TOGGLE_COMPARE_LIST.TRIGGER>): SagaIterator {
    try {
        const ids = yield select(getCompareItemsIds);
        const isExist = ids.indexOf(action.payload);
        let result: number[] = [];

        if (isExist !== -1) {
            result = ids.filter((id: number) => id !== action.payload);
        } else {
            result = [...ids, action.payload];
        }

        localStorage.setItem('compareList', JSON.stringify(result));

        yield put(TOGGLE_COMPARE_LIST.COMPLETED(result));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForToggleCompareListTrigger(): SagaIterator {
    yield takeLatest(TOGGLE_COMPARE_LIST.TRIGGER, toggleFromCompareSaga);
}
