import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../store/ApplicationState';
import { ToastState } from './reducer';

export const getToastState: Selector<ApplicationState, ToastState> = createSelector(
    (state) => state.toast,
    (toast) => toast
);
