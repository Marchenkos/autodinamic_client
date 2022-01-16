import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { graphqlApi } from '../../graphql/graphqlApi';

import { FETCH_BY_SEARCH, SET_SEARCH_TERMS } from './actions';

export function* getProductBySearchSaga(action: ReturnType<typeof FETCH_BY_SEARCH.TRIGGER>): SagaIterator {
    try {
        yield put(FETCH_BY_SEARCH.STARTED(action.payload));
        const terms = action.payload.split(' ');
        const searchTermsArray = localStorage.getItem('searchTerms');
        let searchTerms: string[];

        if (searchTermsArray) {
            let savedSearchTerms = JSON.parse(searchTermsArray) as string[];
            if (savedSearchTerms.length > 4) {
                savedSearchTerms = savedSearchTerms.slice(savedSearchTerms.length - 5);
            }

            searchTerms = [...savedSearchTerms, action.payload];
        } else {
            searchTerms = [action.payload];
        }

        localStorage.setItem('searchTerms', JSON.stringify(searchTerms));

        const response = yield call(graphqlApi.client.fetchProductListByTerms, 20, 0, terms);

        console.log(response);

        yield put(FETCH_BY_SEARCH.COMPLETED(response));
        yield put(SET_SEARCH_TERMS(searchTerms));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForFetchProductBySearchTrigger(): SagaIterator {
    yield takeLatest(FETCH_BY_SEARCH.TRIGGER, getProductBySearchSaga);
}
