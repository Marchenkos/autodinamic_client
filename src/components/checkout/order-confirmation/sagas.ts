import { SagaIterator } from 'redux-saga';
import { call, select, put, takeLatest, delay } from 'redux-saga/effects';

import { Basket, DELIVERY_METHODS, NewOrder, Order, OrderProduct, ORDER_STATUS } from '../../../graphql/entities';
import { graphqlApi } from '../../../graphql/graphqlApi';
import { CLEAN_BASKET, EDIT_BASKET } from '../basket/actions';
import { getBasketTotal, getBasketItems, getBasket } from '../basket/selectors';

import { CREATE_ORDER } from './actions';
import { randomString } from './helpers/random-string';

export function* createOrderSaga(action: ReturnType<typeof CREATE_ORDER.TRIGGER>): SagaIterator {
    try {
        const { userDetails, deliveryInfo, deliveryType, paymentType } = action.payload;
        const { email, ...otherUserDetails } = userDetails;
        const subtotal = yield select(getBasketTotal);
        const basketItems = yield select(getBasketItems);
        const startDate = new Date();

        const orderItems = basketItems.map((item: OrderProduct) => {
            return {
                productId: item.id,
                count: item.count,
            };
        });

        const deliveryCost = deliveryType === DELIVERY_METHODS.PICKUP ? 0 : 5;
        //TODO Mailing
        const order: NewOrder = {
            orderId: randomString(8),
            status: ORDER_STATUS.IN_PROGRESS,
            deliveryType,
            paymentType,
            address: deliveryInfo,
            deliveryCost,
            items: orderItems,
            subtotal,
            total: subtotal + deliveryCost,
            userDetails: otherUserDetails,
            userEmail: email,
            currentStep: 1,
            createdAt: startDate,
            stepDate: [startDate],
            isMailing: true,
        };

        yield delay(1000);

        const response = yield call(graphqlApi.client.addOrder, order);

        yield put(CREATE_ORDER.COMPLETED(response));
        yield put(CLEAN_BASKET());
    } catch (err) {
        console.log(err);
    }
}

export function* listenForCreateOrderTrigger(): SagaIterator {
    yield takeLatest(CREATE_ORDER.TRIGGER, createOrderSaga);
}
