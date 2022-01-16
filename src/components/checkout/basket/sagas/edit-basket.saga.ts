import { SagaIterator } from 'redux-saga';
import { put, select, takeLatest } from 'redux-saga/effects';
import { Basket } from '../../../../graphql/entities';

import { EDIT_BASKET } from '../actions';

import { recalculateTotal } from '../helpers/recalculate-total';
import { getBasket } from '../selectors';

export function* editBasketSaga(action: ReturnType<typeof EDIT_BASKET.TRIGGER>): SagaIterator {
    try {
        const basket: Basket = yield select(getBasket);
        const { productId, count } = action.payload;

        const newBasketItems = basket.orderItems.map((item) => {
            if (item.id === productId) {
                return {
                    ...item,
                    count: count,
                };
            }

            return item;
        });

        const newBasket: Basket = {
            ...basket,
            orderItems: newBasketItems,
        };

        const updatedTotal = recalculateTotal(newBasket);

        localStorage.setItem('basket', JSON.stringify(updatedTotal));

        // yield call(localStorage.setItem, 'basket', JSON.stringify(updatedTotal));
        yield put(EDIT_BASKET.COMPLETED(updatedTotal));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForEditBasketTrigger(): SagaIterator {
    yield takeLatest(EDIT_BASKET.TRIGGER, editBasketSaga);
}
