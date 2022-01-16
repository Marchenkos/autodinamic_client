import { createSelector, Selector } from 'reselect';

import { CompareResponse } from '../../graphql/entities';
import { ApplicationState } from '../../store/ApplicationState';

export const getCompareItemsCount: Selector<ApplicationState, number> = createSelector(
    (state) => state.compare,
    (compare) => compare.itemsCount
);

export const getCompareItemsIds: Selector<ApplicationState, number[]> = createSelector(
    (state) => state.compare,
    (compare) => compare.productIds
);

export const getCompareData: Selector<ApplicationState, CompareResponse | undefined> = createSelector(
    (state) => state.compare,
    (compare) => compare.data
);

export const getCompareIsFetching: Selector<ApplicationState, boolean> = createSelector(
    (state) => state.compare,
    (compare) => compare.isFetching
);

export const getIsShowCompareItemsCount: Selector<ApplicationState, boolean> = createSelector(
    (state) => state.compare,
    (compare) => compare.isShow
);
