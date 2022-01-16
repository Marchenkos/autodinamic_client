import { createReducer } from 'typesafe-redux-helpers';

import { HIDE_SIMPLE_MODAL, SHOW_SIMPLE_MODAL } from '../actions';

export interface SimpleModalState {
    text?: string;
    additionalAction?: () => void;
    additionalButtonText?: string;
    active: boolean;
}

export const simpleModalReducer = createReducer<SimpleModalState>({
    text: undefined,
    additionalAction: undefined,
    additionalButtonText: undefined,
    active: false,
})
    .handleAction(SHOW_SIMPLE_MODAL, (_, action) => ({
        text: action.payload.text,
        additionalAction: action.payload.additionalAction,
        additionalButtonText: action.payload.additionalButtonText,
        active: true,
    }))
    .handleAction(HIDE_SIMPLE_MODAL, (_) => ({
        text: undefined,
        additionalAction: undefined,
        additionalButtonText: undefined,
        active: false,
    }));
