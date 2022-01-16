import { createAction } from 'typesafe-redux-helpers';

import { Promotion } from '../../graphql/entities';

export const FETCH_PROMOTIONS_LIST= {
    TRIGGER: createAction('[FETCH_PROMOTIONS_LIST] Trigger'),
    STARTED: createAction('[FETCH_PROMOTIONS_LIST] Started'),
    COMPLETED: createAction('[FETCH_PROMOTIONS_LIST] Completed', (payload: Promotion[]) => payload),
};

export const FETCH_PROMOTION_BY_ID = {
    TRIGGER: createAction('[FETCH_PROMOTION_BY_ID] Trigger', (payload: number) => payload),
    STARTED: createAction('[FETCH_PROMOTION_BY_ID] Started', (payload: number) => payload),
    COMPLETED: createAction('[FETCH_PROMOTION_BY_ID] Completed', (payload: Promotion) => payload),
};
