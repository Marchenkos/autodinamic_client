import { createAction } from 'typesafe-redux-helpers';
import { FILTER_TYPE, IFilter, ISelectedFilter, IUpdateFilter, SORT_DIRECTION } from '../../graphql/interfaces';
import { SortSection } from '../catalog/interfaces';

export const UPDATE_FILTERS = createAction('[Update Filters List] Trigger', (payload: IUpdateFilter) => payload)
export const REMOVE_FILTER = createAction('[Remove Filter] Trigger', (payload: IUpdateFilter) => payload)

export const CLEAR_FILTERS = createAction('[Clear Filters] Trigger');
export const SET_SORT_SECTION = createAction('[Set Sort Section] Trigger', (payload: SORT_DIRECTION) => payload);

export const GET_FILTER_BY_CATEGORY = {
    TRIGGER: createAction('[GET_FILTER_BY_CATEGORY] Trigger', (payload: number) => payload),
    STARTED: createAction('[GET_FILTER_BY_CATEGORY] Started', (payload: number) => payload),
    COMPLETED: createAction('[GET_FILTER_BY_CATEGORY] Completed', (payload: IFilter[]) => payload),
};

export const GET_DEFAULT_FILTER = {
  TRIGGER: createAction('[GET_DEFAULT_FILTER] Trigger'),
  STARTED: createAction('[GET_DEFAULT_FILTER] Started'),
  COMPLETED: createAction('[GET_DEFAULT_FILTER] Completed', (payload: IFilter[]) => payload),
};