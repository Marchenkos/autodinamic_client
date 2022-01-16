import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../store/ApplicationState';

export const getIsSending: Selector<ApplicationState, boolean> = createSelector(
    (state) => state.contactMe,
    (contactMe) => contactMe.isSending
);

export const getIsRequestWasSendedSuccess: Selector<ApplicationState, boolean | undefined> = createSelector(
    (state) => state.contactMe,
    (contactMe) => contactMe.isSuccess
);
