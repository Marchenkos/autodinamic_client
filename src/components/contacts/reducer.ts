import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';
import { SEND_REQUEST_TO_CALLBACK } from './actions';

export interface ContactMeState {
    isSending: boolean;
    isSuccess?: boolean;
}

export const contactMeReducer: Reducer<ContactMeState> = createReducer<ContactMeState>({
    isSending: false,
    isSuccess: undefined,
})
    .handleAction(SEND_REQUEST_TO_CALLBACK.STARTED, (state: ContactMeState) => ({
        isSending: true,
        isSuccess: undefined,
    }))
    .handleAction(SEND_REQUEST_TO_CALLBACK.COMPLETED, (_, action) => ({
        isSending: false,
        isSuccess: action.payload,
    }));
