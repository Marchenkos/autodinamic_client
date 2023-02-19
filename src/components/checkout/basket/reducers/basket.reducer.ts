import { PayloadAction } from '@reduxjs/toolkit';
import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { Basket, OrderProduct } from '../../../../graphql/entities';
import { createBasket } from '../../../../initialize/create-basket';
import { ADD_TO_BASKET, CLEAN_BASKET, EditBasketActionPayload, EDIT_BASKET, FETCH_BASKET, LOADING_DATA, RemoveBasketItemActionPayload, REMOVE_FROM_BASKET } from '../actions';
import { recalculateTotal } from '../helpers/recalculate-total';

export interface BasketState {
    basket: Basket;
    error?: Error;
    isFetching: boolean;
}

const initBasket = createBasket();

export const basketReducer: Reducer<BasketState> = createReducer<BasketState>({
    basket: initBasket,
    error: undefined,
    isFetching: false,
})
    .handleAction(LOADING_DATA, (state, action) => ({
        basket: state.basket,
        error: action.payload.status ? undefined : new Error("Data was not loaded"),
        isFetching: true,
    }))
    .handleAction(FETCH_BASKET.START, (state: BasketState) => ({
        basket: state.basket,
        error: undefined,
        isFetching: true,
    }))
    .handleAction(
        FETCH_BASKET.COMPLETED,
        (_, action) => ({
            basket: action.payload,
            error: undefined,
            isFetching: false,
        }),
        (state: BasketState, action) => ({
            basket: state.basket,
            error: action.payload,
            isFetching: false,
        })
    )

    .handleAction(ADD_TO_BASKET.START, (state: BasketState, action: PayloadAction<OrderProduct>) => {
      const updatedBasket = recalculateTotal({ ...state.basket, orderItems: [...state.basket.orderItems, action.payload]});

      return {
        ...state,
        basket: updatedBasket,
      }
    })
    // .handleAction(
    //     ADD_TO_BASKET.COMPLETED,
    //     (_, action) => ({
    //         basket: action.payload,
    //         error: undefined,
    //         isFetching: false,
    //     }),
    //     (state: BasketState, action) => ({
    //         basket: state.basket,
    //         error: action.payload,
    //         isFetching: false,
    //     })
    // )

    .handleAction(EDIT_BASKET, (state: BasketState, action: PayloadAction<EditBasketActionPayload>) => {
      const { productId, count } = action.payload;

      const newBasketItems = state.basket.orderItems.map((item) => item.id === productId ? { ...item, count: count } : item);
      const updatedBasket = recalculateTotal({ ...state.basket, orderItems: newBasketItems });

      return {
        basket: updatedBasket,
        error: undefined,
        isFetching: false,
      }
    })

    .handleAction(REMOVE_FROM_BASKET, (state: BasketState, action: PayloadAction<RemoveBasketItemActionPayload>) => {
      const { productId } = action.payload;

      const newBasketItems = state.basket.orderItems.filter((item) => item.id !== productId);
      const updatedBasket = recalculateTotal({ ...state.basket, orderItems: newBasketItems });

      return {
        basket: updatedBasket,
        error: undefined,
        isFetching: false,
      }
    })

    .handleAction(CLEAN_BASKET, (state) => ({
        basket: { ...state.basket, orderItems: [] },
        error: undefined,
        isFetching: false,
    }));
