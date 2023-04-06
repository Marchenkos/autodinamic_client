import { PayloadAction } from '@reduxjs/toolkit';
import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { IFilter, ISelectedFilter, IUpdateFilter, SORT_DIRECTION } from '../../graphql/interfaces';
import { CLEAR_FILTERS, GET_DEFAULT_FILTER, GET_FILTER_BY_CATEGORY, REMOVE_FILTER, SET_SORT_SECTION, UPDATE_FILTERS } from './actions';

export interface FilterReducerState {
  filters: IFilter[] | [];
  selectedFilters: ISelectedFilter[] | [];
  selectedSort: SORT_DIRECTION;
}

export const filterReducer: Reducer<FilterReducerState> = createReducer<FilterReducerState>({
    filters: [],
    selectedFilters: [],
    selectedSort: SORT_DIRECTION.NEW,
})
    .handleAction(GET_FILTER_BY_CATEGORY.COMPLETED, (state, action) => ({
      ...state,
      filters: action.payload,
    }))

    .handleAction(GET_DEFAULT_FILTER.COMPLETED, (state, action) => ({
      ...state,
      filters: action.payload,
  }))

    .handleAction(UPDATE_FILTERS, (state, action: PayloadAction<IUpdateFilter>) => {
      const filter = action.payload;
      const fiterListWithoutSelected = state.selectedFilters.filter(f => f.id !== filter.id)

      if (filter.values) {
        const isExist = state.selectedFilters.find(f => f.id === filter.id)

        return ({
          ...state,
          selectedFilters: isExist ? [...fiterListWithoutSelected, filter as ISelectedFilter] : [...state.selectedFilters, filter as ISelectedFilter]
        })
      }

      return ({
        ...state,
        selectedFilters: fiterListWithoutSelected
      })
    })

    .handleAction(CLEAR_FILTERS, (state) => ({
      ...state,
      selectedFilters: []
    }))

    .handleAction(REMOVE_FILTER, (state, action: PayloadAction<IUpdateFilter>) => ({
      ...state,
      selectedFilters: state.selectedFilters.filter(f => f.id !== action.payload.id)
    }))

    .handleAction(SET_SORT_SECTION, (state, action) => ({
      ...state,
      selectedSort: action.payload,
    }));
