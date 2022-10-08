import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';
import { Promotion } from '../../../graphql/entities';

import { FETCH_PROMOTIONS_LIST } from '../actions';
import { FetchPromotionsListError } from '../sagas/fetch-promotions-list.saga';

export interface PromotionListState {
    promotionsList?: Promotion[];
    isFetching: boolean;
    error?: FetchPromotionsListError;
}

export const promotionListReducer: Reducer<PromotionListState> = createReducer<PromotionListState>({
    promotionsList: undefined,
    error: undefined,
    isFetching: false,
})
    .handleAction(FETCH_PROMOTIONS_LIST.STARTED, (state) => ({
        ...state,
        isFetching: true,
    }))
    .handleAction(
        FETCH_PROMOTIONS_LIST.COMPLETED,
        (_, action) => ({
            promotionsList: action.payload,
            isFetching: false,
            error: undefined,
        }),
        (state, action) => ({
            ...state,
            isFetching: false,
            error: action.payload as FetchPromotionsListError,
        })
    );
