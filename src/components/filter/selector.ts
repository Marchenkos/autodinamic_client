import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../store/ApplicationState';
import { IFilter, ISelectedFilter, SORT_DIRECTION } from '../../graphql/interfaces';

export const getFilters: Selector<ApplicationState, IFilter[] | []> = createSelector(
    (state) => state.filters,
    (filters) => filters.filters
);

export const getSelectedFilters: Selector<ApplicationState, ISelectedFilter[] | []> = createSelector(
    (state) => state.filters,
    (filters) => filters.selectedFilters
);

export const getSelectedSort: Selector<ApplicationState, SORT_DIRECTION> = createSelector(
    (state) => state.filters,
    (filters) => filters.selectedSort
);
