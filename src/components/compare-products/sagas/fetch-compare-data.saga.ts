import { SagaIterator } from 'redux-saga';

// export function* getCompareListSaga(action: ReturnType<typeof FETCH_COMPARE_LIST.TRIGGER>): SagaIterator {
//     try {
//         yield put(FETCH_COMPARE_LIST.START(action.payload));

//         // const response: CompareResponse = yield call(graphqlApi.client.fetchCompareList, action.payload);

//         // yield put(FETCH_COMPARE_LIST.COMPLETED(response));
//     } catch (err) {
//         console.log(err);
//     }
// }

export function* listenForGetCompareListTrigger(): SagaIterator {
    // yield takeLatest(FETCH_COMPARE_LIST.TRIGGER, getCompareListSaga);
}
