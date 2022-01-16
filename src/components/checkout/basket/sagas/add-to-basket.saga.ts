import { SagaIterator } from 'redux-saga';
import { call, select, put, takeLatest } from 'redux-saga/effects';

import { ADD_TO_BASKET } from '../actions';
import { Basket, OrderItem } from '../../../../graphql/entities';

import { getBasket, getBasketItems } from '../selectors';
import { recalculateTotal } from '../helpers/recalculate-total';
import { SHOW_TOAST } from '../../../toast/actions';

export function* addToBasketSaga(action: ReturnType<typeof ADD_TO_BASKET.TRIGGER>): SagaIterator {
    try {
        const basket: Basket = yield select(getBasket);

        const newBasket: Basket = {
            ...basket,
            orderItems: [...basket.orderItems, action.payload],
        };

        const updatedTotal = recalculateTotal(newBasket);
        localStorage.setItem('basket', JSON.stringify(updatedTotal));

        // yield call(localStorage.setItem, 'basket', JSON.stringify(updatedTotal));
        yield put(ADD_TO_BASKET.COMPLETED(updatedTotal));
        yield put(SHOW_TOAST({ message: 'Товар добавлен в корзину', status: 'success' }));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForAddToBasketTrigger(): SagaIterator {
    yield takeLatest(ADD_TO_BASKET.TRIGGER, addToBasketSaga);
}
