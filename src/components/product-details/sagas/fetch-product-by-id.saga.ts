import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { GeneralProduct } from '../../../graphql/entities';
import { graphqlApi } from '../../../graphql/graphqlApi';
import { ProductCharacteristicInfo } from '../../../graphql/interfaces';
import { FETCH_PRODUCT_CATEGORY } from '../../product-category/actions';
import { FETCH_PRODUCT_BY_ID, FETCH_SIMILAR_PRODUCTS, FETCH_SPECIFIC_PRODUCT_FIELDS } from '../actions';
import { ProductDetails } from '../reducers/product-details.reducer';

export function* getProductByIdSaga(action: ReturnType<typeof FETCH_PRODUCT_BY_ID.TRIGGER>): SagaIterator {
    try {
        yield put(FETCH_PRODUCT_BY_ID.STARTED(action.payload));

        const product: GeneralProduct = yield call(graphqlApi.client.fetchProductById, action.payload);
        let productDetails: ProductCharacteristicInfo | undefined;

        switch (product.category_name) {
            case 'magnitols': {
                productDetails = yield call(graphqlApi.client.fetchMagnitolDetails, action.payload);

                break;
            }
            case 'sound_speakers': {
                productDetails = yield call(graphqlApi.client.fetchAudioSpeakerDetails, action.payload);

                break;
            }
            case 'subwoofers': {
                productDetails = yield call(graphqlApi.client.fetchSubwooferDetails, action.payload);

                break;
            }
            case 'signalisation': {
                productDetails = yield call(graphqlApi.client.fetchSignalisationDetails, action.payload);

                break;
            }
            case 'dvrs': {
                productDetails = yield call(graphqlApi.client.fetchDVRDetails, action.payload);

                break;
            }
            case 'auto_amplifiers': {
                productDetails = yield call(graphqlApi.client.fetchAmplifierDetails, action.payload);

                break;
            }
            default: {
                productDetails = undefined;
            }
        }

        yield put(FETCH_SPECIFIC_PRODUCT_FIELDS.TRIGGER(product.category_name));

        yield put(
            FETCH_SIMILAR_PRODUCTS.TRIGGER({
                category_name: product.category_name,
                brand: product.brand,
                excludedId: product.id,
            })
        );

        const result: ProductDetails = {
            product,
            productDetails,
        };

        yield put(FETCH_PRODUCT_BY_ID.COMPLETED(result));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForFetchProductByIdTrigger(): SagaIterator {
    yield takeLatest(FETCH_PRODUCT_BY_ID.TRIGGER, getProductByIdSaga);
}
