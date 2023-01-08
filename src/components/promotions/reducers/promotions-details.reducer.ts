import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { Promotion } from '../../../graphql/entities';
import { FETCH_PROMOTION_BY_ID } from '../actions';
import { FetchPromotionByIdError } from '../sagas/fetch-promotion-by-id.saga';

export interface PromotionDetailsState {
    promotionDetails?: Promotion;
    isFetching: boolean;
    error?: FetchPromotionByIdError;
}

export const promotionDetailsReducer: Reducer<PromotionDetailsState> = createReducer<PromotionDetailsState>({
    error: undefined,
    promotionDetails: undefined,
    isFetching: false,
})
    .handleAction(FETCH_PROMOTION_BY_ID.STARTED, (state) => ({
        ...state,
        isFetching: true,
    }))
    .handleAction(
        FETCH_PROMOTION_BY_ID.COMPLETED,
        (_, action) => ({
            error: undefined,
            promotionDetails: action.payload,
            isFetching: false,
        }),
        (state, action) => ({
            promotionDetails: state.promotionDetails,
            isFetching: false,
            error: action.payload as FetchPromotionByIdError,
        })
    );
