import { createAction } from 'typesafe-redux-helpers';

import { Category } from '../../graphql/entities';
import { CategoryNames } from '../../graphql/interfaces';

export const FETCH_PRODUCT_CATEGORY = {
    TRIGGER: createAction('[FETCH_PRODUCT_CATEGORY] Trigger', (payload: string) => payload),
    STARTED: createAction('[FETCH_PRODUCT_CATEGORY] Started', (payload: string) => payload),
    COMPLETED: createAction('[FETCH_PRODUCT_CATEGORY] Completed', (product: Category) => product),
};

export const FETCH_PRODUCT_CATEGORY_NAMES = {
    TRIGGER: createAction('[FETCH_PRODUCT_CATEGORY_NAMES] Trigger'),
    STARTED: createAction('[FETCH_PRODUCT_CATEGORY_NAMES] Started'),
    COMPLETED: createAction('[FETCH_PRODUCT_CATEGORY_NAMES] Completed', (names: CategoryNames[]) => names),
};

export const SET_CATEGORY = createAction('[SET_CATEGORY]', (category: CategoryNames) => category);
