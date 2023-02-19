import { createAction } from 'typesafe-redux-helpers';

import { ICategory } from '../../graphql/entities';
import { ICategoryName } from '../../graphql/interfaces';

export const FETCH_PRODUCT_CATEGORY = {
    TRIGGER: createAction('[FETCH_PRODUCT_CATEGORY] Trigger', (payload: string) => payload),
    STARTED: createAction('[FETCH_PRODUCT_CATEGORY] Started', (payload: string) => payload),
    COMPLETED: createAction('[FETCH_PRODUCT_CATEGORY] Completed', (product: ICategory) => product),
};

export const FETCH_PRODUCT_CATEGORY_NAMES = {
    TRIGGER: createAction('[FETCH_PRODUCT_CATEGORY_NAMES] Trigger'),
    STARTED: createAction('[FETCH_PRODUCT_CATEGORY_NAMES] Started'),
    COMPLETED: createAction('[FETCH_PRODUCT_CATEGORY_NAMES] Completed', (names: ICategoryName[]) => names),
};

export const FETCH_CATEGORY_LIST = {
  TRIGGER: createAction('[FETCH_CATEGORY_LIST] Trigger'),
  STARTED: createAction('[FETCH_CATEGORY_LIST] Started'),
  COMPLETED: createAction('[FETCH_CATEGORY_LIST] Completed', (categories: ICategory[]) => categories),
};


export const SET_CATEGORY = createAction('[SET_CATEGORY]', (category: ICategoryName) => category);
