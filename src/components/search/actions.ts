import { createAction } from 'typesafe-redux-helpers';
import { ProductList } from '../../graphql/interfaces';

export const FETCH_BY_SEARCH = {
    TRIGGER: createAction('[Fetch By Search] Trigger', (payload: string) => payload),
    STARTED: createAction('[Fetch By Search] Started', (payload: string) => payload),
    COMPLETED: createAction('[Fetch By Search] Completed', (payload: ProductList) => payload),
};

export const SET_SEARCH_TERMS = createAction('[FETCH_SEARCH_TERMS] Trigger', (payload: string[]) => payload);
