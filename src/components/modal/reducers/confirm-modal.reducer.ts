import { createReducer } from 'typesafe-redux-helpers';

import { SHOW_CONFIRM_MODAL, HIDE_CONFIRM_MODAL } from '../actions';

export interface ConfirmModalState {
    title?: string;
    description?: string;
    onChoose?: (choice: boolean, params?: any) => void;
    active: boolean;
    params?: any;
}

export const confirmModalReducer = createReducer<ConfirmModalState>({
    title: undefined,
    description: undefined,
    onChoose: undefined,
    active: false,
    params: undefined,
})
    .handleAction(SHOW_CONFIRM_MODAL, (_, action) => ({
        title: action.payload.title,
        description: action.payload.description,
        onChoose: action.payload.onChoose,
        active: true,
        params: action.payload.params,
    }))
    .handleAction(HIDE_CONFIRM_MODAL, (_) => ({
        title: undefined,
        description: undefined,
        onChoose: undefined,
        active: false,
        params: undefined,
    }));
