import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { IFilter } from '../../../graphql/interfaces';
import { GET_DEFAULT_FILTER } from '../actions';

export function* getFilterByCategorySaga(): SagaIterator {
    try {
        yield put(GET_DEFAULT_FILTER.STARTED());

        const response: IFilter[] = yield call(graphqlApi.client.getDefaultFilters);

        yield put(GET_DEFAULT_FILTER.COMPLETED(response));
    } catch (err) {
      console.log(err);
    }
}

export function* listenForGetDefaultFiltersTrigger(): SagaIterator {
    yield takeLatest(GET_DEFAULT_FILTER.TRIGGER, getFilterByCategorySaga);
}
