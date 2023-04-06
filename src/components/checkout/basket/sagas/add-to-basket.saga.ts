import { SagaIterator } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';

import { ADD_TO_BASKET } from '../actions';
import { SHOW_TOAST } from '../../../toast/actions';

export function* addToBasketSaga(action: ReturnType<typeof ADD_TO_BASKET.TRIGGER>): SagaIterator {
    try {
      yield put(ADD_TO_BASKET.START(action.payload));
      yield put(SHOW_TOAST({ message: 'Товар добавлен в корзину', status: 'success' }));

    } catch (err) {
        console.log(err);
    }
}

export function* listenForAddToBasketTrigger(): SagaIterator {
    yield takeLatest(ADD_TO_BASKET.TRIGGER, addToBasketSaga);
}
