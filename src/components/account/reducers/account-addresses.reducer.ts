import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';

import { AddressInfo } from '../../../graphql/entities';
import {
    ADD_DELIVERY_ADDRESS,
    EDIT_DELIVERY_ADDRESS,
    FETCH_ACCOUNT_DETAILS,
    REMOVE_ADDRESS,
    SET_DEFAULT_ADDRESS,
} from '../actions';

export interface AddressesState {
    addresses?: AddressInfo[];
    primaryAddress?: AddressInfo;
    isLoading: boolean;
}

export const addressesReducer: Reducer<AddressesState> = createReducer<AddressesState>({
    addresses: [],
    primaryAddress: undefined,
    isLoading: false,
})
    .handleAction(FETCH_ACCOUNT_DETAILS.COMPLETED, (_, action) => ({
        addresses: action.payload.addresses,
        primaryAddress: action.payload.addresses
            ? action.payload.addresses.find((item: AddressInfo) => item.isDefault)
            : undefined,
        isLoading: true,
    }))
    .handleAction(SET_DEFAULT_ADDRESS.STARTED, (state) => ({
        addresses: state.addresses,
        primaryAddress: state.primaryAddress,
        isLoading: true,
    }))
    .handleAction(SET_DEFAULT_ADDRESS.COMPLETED, (_, action) => ({
        addresses: action.payload,
        primaryAddress: action.payload.find((item: AddressInfo) => item.isDefault),
        isLoading: false,
    }))

    .handleAction(ADD_DELIVERY_ADDRESS.STARTED, (state) => ({
        addresses: state.addresses,
        primaryAddress: state.primaryAddress,
        isLoading: true,
    }))
    .handleAction(ADD_DELIVERY_ADDRESS.COMPLETED, (_, action) => ({
        addresses: action.payload,
        primaryAddress: action.payload.find((item: AddressInfo) => item.isDefault),
        isLoading: true,
    }))

    .handleAction(REMOVE_ADDRESS.STARTED, (state) => ({
        addresses: state.addresses,
        primaryAddress: state.primaryAddress,
        isLoading: true,
    }))
    .handleAction(REMOVE_ADDRESS.COMPLETED, (_, action) => ({
        addresses: action.payload,
        primaryAddress: action.payload.find((item: AddressInfo) => item.isDefault),
        isLoading: true,
    }))

    .handleAction(EDIT_DELIVERY_ADDRESS.STARTED, (state) => ({
        addresses: state.addresses,
        primaryAddress: state.primaryAddress,
        isLoading: true,
    }))
    .handleAction(EDIT_DELIVERY_ADDRESS.COMPLETED, (_, action) => ({
        addresses: action.payload,
        primaryAddress: action.payload.find((item: AddressInfo) => item.isDefault),
        isLoading: true,
    }));
