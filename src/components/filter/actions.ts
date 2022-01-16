import { createAction } from 'typesafe-redux-helpers';
import { FilterObject } from '../../graphql/interfaces';
import { SortSection } from '../product-list/interfaces';

export interface SelectedFilterSection {
    name: string;
    values: string[];
    type: string;
}

export const SET_FILTER_SECTIONS = createAction(
    '[Set Filter Section] Trigger',
    (payload?: SelectedFilterSection[]) => payload
);

export const SET_SORT_SECTION = createAction('[Set Sort Section] Trigger', (payload: string) => payload);

export const GET_FILTER_BY_CATEGORY = {
    TRIGGER: createAction('[GET_FILTER_BY_CATEGORY] Trigger', (payload: string) => payload),
    STARTED: createAction('[GET_FILTER_BY_CATEGORY] Started', (payload: string) => payload),
    COMPLETED: createAction('[GET_FILTER_BY_CATEGORY] Completed', (payload: FilterObject[]) => payload),
};
