import { createAction } from 'typesafe-redux-helpers';

export interface EditBasketParams {
    productId: string;
    count: number;
}

export const CLEAR_COMPARE_LIST = createAction('[CLEAR_COMPARE_LIST]');
export const HIDE_COMPARE_TOAST = createAction('[HIDE_COMPARE_TOAST]');

// export const FETCH_COMPARE_LIST = {
//     TRIGGER: createAction('[FETCH_COMPARE_LIST] Trigger', (ids: number[]) => ids),
//     START: createAction('[FETCH_COMPARE_LIST] Start', (ids: number[]) => ids),
//     COMPLETED: createAction('[FETCH_COMPARE_LIST] Completed', (payload: CompareResponse) => payload),
// };

export const INIT_COMPARE_LIST = {
    TRIGGER: createAction('[INIT_COMPARE_LIST] Trigger'),
    COMPLETED: createAction('[INIT_COMPARE_LIST] Completed', (payload: number[]) => payload),
};

export const TOGGLE_COMPARE_LIST = {
    TRIGGER: createAction('[TOGGLE_COMPARE_LIST] Trigger', (id: number) => id),
    COMPLETED: createAction('[TOGGLE_COMPARE_LIST] Completed', (payload: number[]) => payload),
};
