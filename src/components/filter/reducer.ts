import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { FilterObject, SORT_DIRECTION } from '../../graphql/interfaces';
import { GET_FILTER_BY_CATEGORY, SelectedFilterSection, SET_FILTER_SECTIONS, SET_SORT_SECTION } from './actions';

export interface FilterReducerState {
    filters?: FilterObject[];
    selectedFilterSections?: SelectedFilterSection[];
    selectedSort: SORT_DIRECTION;
}

export const filterReducer: Reducer<FilterReducerState> = createReducer<FilterReducerState>({
    filters: undefined,
    selectedFilterSections: undefined,
    selectedSort: SORT_DIRECTION.NEW,
})
    .handleAction(GET_FILTER_BY_CATEGORY.COMPLETED, (state, action) => ({
        filters: action.payload,
        selectedSort: state.selectedSort,
        selectedFilterSections: state.selectedFilterSections,
    }))

    .handleAction(SET_FILTER_SECTIONS, (state, action) => ({
        filters: state.filters,
        selectedFilterSections: action.payload,
        selectedSort: state.selectedSort,
    }))

    .handleAction(SET_SORT_SECTION, (state, action) => ({
        filters: state.filters,
        selectedFilterSections: state.selectedFilterSections,
        selectedSort: action.payload,
    }));
