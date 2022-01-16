import { createReducer } from 'typesafe-redux-helpers';

import { SHOW_FORM_MODAL, HIDE_FORM_MODAL } from '../actions';

export interface FromModalState {
    content?: React.ReactNode;
    isOpen: boolean;
    handleCloseModal?: () => void;
}

export const formModalReducer = createReducer<FromModalState>({
    content: undefined,
    isOpen: false,
    handleCloseModal: undefined,
})
    .handleAction(SHOW_FORM_MODAL, (_, action) => ({
        content: action.payload.content,
        isOpen: true,
        handleCloseModal: action.payload.handleCloseModal,
    }))
    .handleAction(HIDE_FORM_MODAL, (_) => ({
        content: undefined,
        isOpen: false,
        handleCloseModal: undefined,
    }));
