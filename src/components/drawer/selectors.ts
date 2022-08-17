import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../store/ApplicationState';
import React from 'react';

export const getIsShowDrawer: Selector<ApplicationState, boolean> = createSelector(
    (state) => state.drawer,
    (drawer) => drawer.isShow
);

export const getDrawerContent: Selector<ApplicationState, React.ReactNode | undefined> = createSelector(
    (state) => state.drawer,
    (drawer) => drawer.content
);
