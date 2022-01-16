import { SagaIterator } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import { graphqlApi } from '../../../graphql/graphqlApi';
import { User } from '../../../graphql/interfaces';
import { UPDATE_PROFILE_INFO } from '../../account/actions';
import { SHOW_TOAST } from '../../toast/actions';

export function* updateProfileDetailsSaga(action: ReturnType<typeof UPDATE_PROFILE_INFO.TRIGGER>): SagaIterator {
    try {
        yield put(UPDATE_PROFILE_INFO.STARTED(action.payload));

        const { first_name, last_name, email, phone_number, birthday } = action.payload;

        const response: User = yield call(
            graphqlApi.client.updateProfileDetails,
            first_name,
            last_name,
            email,
            phone_number,
            birthday
        );

        yield put(UPDATE_PROFILE_INFO.COMPLETED(response));
        yield put(SHOW_TOAST({ message: 'Информация изменена успешно', status: 'success' }));
    } catch (err) {
        console.log(err);
    }
}

export function* listenForUpdateProfileDetailsTrigger(): SagaIterator {
    yield takeLatest(UPDATE_PROFILE_INFO.TRIGGER, updateProfileDetailsSaga);
}
