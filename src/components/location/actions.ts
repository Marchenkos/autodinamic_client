import { createAction } from 'typesafe-redux-helpers';

export const CLEAR_SHOW_MODAL_FLAG = createAction('Clear show modal flag');

export interface SetLocationPayload {
    location: string;
    showModal?: boolean;
}

export const SET_LOCATION = createAction('Set location', (payload: SetLocationPayload) => payload);
