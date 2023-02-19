import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../store/ApplicationState';
import { FilterObject, SORT_DIRECTION } from '../../graphql/interfaces';
import { SelectedFilterSection } from './actions';

export const getFilters: Selector<ApplicationState, FilterObject[] | undefined> = createSelector(
    (state) => state.filters,
    (filters) => filters.filters
);

export const getSelectedFilters: Selector<ApplicationState, SelectedFilterSection[] | undefined> = createSelector(
    (state) => state.filters,
    (filters) => filters.selectedFilterSections
);

export const getSelectedSort: Selector<ApplicationState, SORT_DIRECTION> = createSelector(
    (state) => state.filters,
    (filters) => filters.selectedSort
);
