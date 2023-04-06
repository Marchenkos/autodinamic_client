import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { IProduct } from '../../../graphql/entities';
import { graphqlApi } from '../../../graphql/graphqlApi';
import { FETCH_PRODUCT_BY_ID } from '../actions';

export function* getProductByIdSaga(action: ReturnType<typeof FETCH_PRODUCT_BY_ID.TRIGGER>): SagaIterator {
    try {
        yield put(FETCH_PRODUCT_BY_ID.STARTED(action.payload));

        const product: IProduct = yield call(graphqlApi.client.fetchProductById, action.payload);

        // yield put(
        //     FETCH_SIMILAR_PRODUCTS.TRIGGER({
        //         category_name: product.category_name,
        //         brand: product.brand,
        //         excludedId: product.id,
        //     })
        // );

        yield put(FETCH_PRODUCT_BY_ID.COMPLETED(product));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForFetchProductByIdTrigger(): SagaIterator {
    yield takeLatest(FETCH_PRODUCT_BY_ID.TRIGGER, getProductByIdSaga);
}
