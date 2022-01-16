import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { SHOW_TOAST } from '../../toast/actions';
import { TOGGLE_WISHLIST } from '../actions';

export function* getToggleWishlistSaga(action: ReturnType<typeof TOGGLE_WISHLIST.TRIGGER>): SagaIterator {
    try {
        yield put(TOGGLE_WISHLIST.STARTED(action.payload));
        const id = parseInt(action.payload);

        const response = yield call(graphqlApi.client.toggleWishlist, id);

        yield put(TOGGLE_WISHLIST.COMPLETED(response));
        // yield put(SHOW_TOAST({ message: 'Товар добавлен в избранные', status: 'success'}));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForToggleWishlistTrigger(): SagaIterator {
    yield takeLatest(TOGGLE_WISHLIST.TRIGGER, getToggleWishlistSaga);
}
