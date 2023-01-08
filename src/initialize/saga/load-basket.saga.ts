import { SagaIterator } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';

import { FETCH_BASKET } from '../../components/checkout/basket/actions';
import { Basket } from '../../graphql/entities';

import { createBasket } from '../create-basket';

export function* getBasketSaga(): SagaIterator {
    try {
        let basket: Basket;
        let searchTerms: string[];

        const basketObject = localStorage.getItem('basket');
        const searchTermsArray = localStorage.getItem('searchTerms');

        if (searchTermsArray) {
            searchTerms = JSON.parse(searchTermsArray) as string[];

            if (searchTerms.length > 4) {
                searchTerms = searchTerms.slice(searchTerms.length - 5);
            }
        } else {
            searchTerms = [];
            localStorage.setItem('searchTerms', JSON.stringify(searchTerms));
        }

        if (basketObject) {
            basket = JSON.parse(basketObject) as Basket;
        } else {
            basket = createBasket();
            localStorage.setItem('basket', JSON.stringify(basket));
        }

        yield put(FETCH_BASKET.COMPLETED(basket));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForFetchBasketTrigger(): SagaIterator {
    yield takeLatest(FETCH_BASKET.TRIGGER, getBasketSaga);
}
