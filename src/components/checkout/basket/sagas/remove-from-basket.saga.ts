import { SagaIterator } from 'redux-saga';
import { call, select, put, takeLatest } from 'redux-saga/effects';

import { FETCH_BASKET, REMOVE_FROM_BASKET } from '../actions';
import { Basket } from '../../../../graphql/entities';

import { getBasket } from '../selectors';
import { recalculateTotal } from '../helpers/recalculate-total';

export function* removeFromBasketSaga(action: ReturnType<typeof REMOVE_FROM_BASKET.TRIGGER>): SagaIterator {
    try {
        const basket: Basket = yield select(getBasket);

        const newBasket: Basket = {
            ...basket,
            orderItems: basket.orderItems.filter((item) => item.id !== action.payload),
        };

        const updatedTotal = recalculateTotal(newBasket);
        localStorage.setItem('basket', JSON.stringify(updatedTotal));
        console.log(updatedTotal);

        // yield call(localStorage.setItem, 'basket', JSON.stringify(updatedTotal));
        yield put(REMOVE_FROM_BASKET.COMPLETED(updatedTotal));
        yield put(FETCH_BASKET.TRIGGER());
    } catch (err) {
        console.log(err);
    }
}

export function* listenForRemoveFromBasketTrigger(): SagaIterator {
    yield takeLatest(REMOVE_FROM_BASKET.TRIGGER, removeFromBasketSaga);
}
