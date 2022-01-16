import { combineReducers, Reducer } from 'redux';

import { promotionDetailsReducer as promotionDetails } from './promotions-details.reducer';
import { promotionListReducer as promotionList } from './promotions-list.reducer';

import { PromotionsState } from './promotions.state';

export const reducer: Reducer<PromotionsState> = combineReducers<PromotionsState>({
    promotionDetails,
    promotionList,
});
