import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { Basket } from '../../../../graphql/entities';
import { createBasket } from '../../../../initialize/create-basket';
import { ADD_TO_BASKET, CLEAN_BASKET, EDIT_BASKET, FETCH_BASKET, LOADING_DATA, REMOVE_FROM_BASKET } from '../actions';

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
        error: action.payload.status,
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

    .handleAction(ADD_TO_BASKET.START, (state: BasketState) => ({
        basket: state.basket,
        error: undefined,
        isFetching: true,
    }))
    .handleAction(
        ADD_TO_BASKET.COMPLETED,
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

    .handleAction(EDIT_BASKET.COMPLETED, (_, action) => ({
        basket: action.payload,
        error: undefined,
        isFetching: false,
    }))

    .handleAction(REMOVE_FROM_BASKET.START, (state: BasketState) => ({
        basket: state.basket,
        error: undefined,
        isFetching: true,
    }))
    .handleAction(
        REMOVE_FROM_BASKET.COMPLETED,
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

    .handleAction(CLEAN_BASKET, (state) => ({
        basket: { ...state.basket, orderItems: [] },
        error: undefined,
        isFetching: false,
    }));
