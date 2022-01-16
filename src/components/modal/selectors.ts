import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../store/ApplicationState';
import { ConfirmModalState } from './reducers/confirm-modal.reducer';
import { FromModalState } from './reducers/form-modal.reducer';
import { SimpleModalState } from './reducers/simple-modal.reducer';

export const getConfirmModalState: Selector<ApplicationState, ConfirmModalState> = createSelector(
    (state) => state.modals.confirmModal,
    (confirmModal) => confirmModal
);

export const getFormModalState: Selector<ApplicationState, FromModalState> = createSelector(
    (state) => state.modals.formModal,
    (formModal) => formModal
);

export const getSimpleModalState: Selector<ApplicationState, SimpleModalState> = createSelector(
    (state) => state.modals.simpleModal,
    (simpleModal) => simpleModal
);
