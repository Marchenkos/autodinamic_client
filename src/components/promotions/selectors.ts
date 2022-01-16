import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../store/ApplicationState';
import { Promotion } from '../../graphql/entities';
import { PromotionsState } from './reducers/promotions.state';
import { FetchPromotionsListError } from './sagas/fetch-promotions-list.saga';

const getPromotionsRootState: Selector<ApplicationState, PromotionsState> = createSelector(
    (state) => state.promotions,
    (promotions) => promotions
);

export const getPromotionsList: Selector<ApplicationState, Promotion[] | undefined> = createSelector(
    getPromotionsRootState,
    (promotions) => promotions.promotionList.promotionsList
);

export const getIsPromotionsListFetching: Selector<ApplicationState, boolean> = createSelector(
    getPromotionsRootState,
    (promotions) => promotions.promotionList.isFetching
);

export const getPromotionsListError: Selector<ApplicationState, FetchPromotionsListError | undefined> = createSelector(
    getPromotionsRootState,
    (promotions) => promotions.promotionList.error
);

export const getPromotionDetails: Selector<ApplicationState, Promotion | undefined> = createSelector(
    getPromotionsRootState,
    (promotions) => promotions.promotionDetails.promotionDetails
);

export const getIsPromotionDetailsFetching: Selector<ApplicationState, boolean> = createSelector(
    getPromotionsRootState,
    (promotions) => promotions.promotionDetails.isFetching
);

export const getPromotionDetailsError: Selector<ApplicationState, FetchPromotionsListError | undefined> = createSelector(
    getPromotionsRootState,
    (promotions) => promotions.promotionDetails.error
);
