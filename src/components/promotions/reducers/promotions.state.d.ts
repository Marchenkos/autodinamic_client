import { promotionDetailsReducer } from './promotions-details.reducer';
import { promotionListReducer } from './promotions-list.reducer';

export interface PromotionsState {
    readonly promotionDetails: ReturnType<typeof promotionDetailsReducer>;
    readonly promotionList: ReturnType<typeof promotionListReducer>;
}
