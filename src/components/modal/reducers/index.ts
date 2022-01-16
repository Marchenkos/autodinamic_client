import { combineReducers, Reducer } from 'redux';

import { ModalState } from './modal.state';
import { confirmModalReducer as confirmModal } from './confirm-modal.reducer';
import { formModalReducer as formModal } from './form-modal.reducer';
import { simpleModalReducer as simpleModal } from './simple-modal.reducer';

export const reducer: Reducer<ModalState> = combineReducers<ModalState>({
    formModal,
    confirmModal,
    simpleModal,
});
