import { createAction } from 'typesafe-redux-helpers';
import { RequestToCallbackPayload } from '../../graphql/interfaces';

export const SEND_REQUEST_TO_CALLBACK = {
    TRIGGER: createAction('[SEND_REQUEST_TO_CALLBACK] Trigger', (payload: RequestToCallbackPayload) => payload),
    STARTED: createAction('[SEND_REQUEST_TO_CALLBACK] Started', (payload: RequestToCallbackPayload) => payload),
    COMPLETED: createAction('[SEND_REQUEST_TO_CALLBACK] Completed', (payload: boolean) => payload),
};
