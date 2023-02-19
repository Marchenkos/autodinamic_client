import { createSelector, Selector } from 'reselect';

import { Basket, IProduct, OrderProduct } from '../../../graphql/entities';
import { ApplicationState } from '../../../store/ApplicationState';
import { BasketState } from './reducers/basket.reducer';

const getBasketRootState: Selector<ApplicationState, BasketState> = createSelector(
    (state) => state.basket,
    (basket) => basket
);

export const getBasket: Selector<ApplicationState, Basket> = createSelector(
    getBasketRootState,
    (basket) => basket.basket
);

export const getBasketItems: Selector<ApplicationState, OrderProduct[]> = createSelector(
    getBasket,
    (basket) => basket.orderItems
);

export const getBasketTotal: Selector<ApplicationState, number> = createSelector(getBasket, (basket) => basket.total);

export const getBasketItemsCount: Selector<ApplicationState, number> = createSelector(getBasketItems, (orderItems) => {
    let count = 0;

    orderItems.map((item) => {
        count = count + item.count;
    });

    return count;
});

export const getBasketIsFetching: Selector<ApplicationState, boolean> = createSelector(
    getBasketRootState,
    (basket) => basket.isFetching
);
