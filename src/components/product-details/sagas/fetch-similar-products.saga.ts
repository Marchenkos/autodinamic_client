import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { IProduct } from '../../../graphql/entities';
import { graphqlApi } from '../../../graphql/graphqlApi';
import { FETCH_SIMILAR_PRODUCTS } from '../actions';

export function* getSimilarProductsSaga(action: ReturnType<typeof FETCH_SIMILAR_PRODUCTS.TRIGGER>): SagaIterator {
    try {
        const { category_name, brand, excludedId } = action.payload;
        yield put(FETCH_SIMILAR_PRODUCTS.STARTED(action.payload));

        const products: IProduct[] = yield call(
            graphqlApi.client.fetchSimilarProducts,
            category_name,
            brand,
            excludedId
        );

        yield put(FETCH_SIMILAR_PRODUCTS.COMPLETED(products));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForFetchSimilarProductsTrigger(): SagaIterator {
    yield takeLatest(FETCH_SIMILAR_PRODUCTS.TRIGGER, getSimilarProductsSaga);
}
