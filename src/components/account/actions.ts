import { createAction } from 'typesafe-redux-helpers';

import { AddressInfo, Order } from '../../graphql/entities';
import { User } from '../../graphql/interfaces';
import { AddAddressPayload, AddressTypeInput, EditProfilePayload } from '../../graphql/mutations/user.mutation';

export const FETCH_ACCOUNT_DETAILS = {
    TRIGGER: createAction('[Fetch account details] Trigger'),
    STARTED: createAction('[Fetch account details] Started'),
    COMPLETED: createAction('[Fetch account details] Completed', (payload: User) => payload),
};

export const REMOVE_ACCOUNT = {
    TRIGGER: createAction('[Remove account] Trigger', (email: string) => email),
    STARTED: createAction('[Remove account] Started', (email: string) => email),
    COMPLETED: createAction('[Remove account] Completed', (result: boolean) => result),
};

export const UPDATE_PROFILE_INFO = {
    TRIGGER: createAction('[Update account details] Trigger', (payload: EditProfilePayload) => payload),
    STARTED: createAction('[Update account details] Started', (payload: EditProfilePayload) => payload),
    COMPLETED: createAction('[Update account details] Completed', (payload: User) => payload),
};

export const EDIT_DELIVERY_ADDRESS = {
    TRIGGER: createAction('[Update addresses details] Trigger', (payload: AddressTypeInput) => payload),
    STARTED: createAction('[Update addresses details] Started', (payload: AddressTypeInput) => payload),
    COMPLETED: createAction('[Update addresses details] Completed', (payload: AddressInfo[]) => payload),
};

export const ADD_DELIVERY_ADDRESS = {
    TRIGGER: createAction('[Add address details] Trigger', (payload: AddAddressPayload) => payload),
    STARTED: createAction('[Add address details] Started', (payload: AddAddressPayload) => payload),
    COMPLETED: createAction('[Add address details] Completed', (payload: AddressInfo[]) => payload),
};

export const SET_EDITABLE_ADDRESS = {
    STARTED: createAction('[Add address details] Started', (payload: AddressInfo | []) => payload),
    COMPLETED: createAction('[Add address details] Completed'),
};

export const SET_DEFAULT_ADDRESS = {
    TRIGGER: createAction('[Set default address] Trigger', (id: number) => id),
    STARTED: createAction('[Set default address] Started', (id: number) => id),
    COMPLETED: createAction('[Set default address] Completed', (payload: AddressInfo[]) => payload),
};

export const REMOVE_ADDRESS = {
    TRIGGER: createAction('[Remove address] Trigger', (id: number) => id),
    STARTED: createAction('[Remove address] Started', (id: number) => id),
    COMPLETED: createAction('[Remove address] Completed', (payload: AddressInfo[]) => payload),
};

export const GET_ORDER_BY_EMAIL = {
    TRIGGER: createAction('[Get Order By Email] Trigger', (payload: string) => payload),
    STARTED: createAction('[Get Order By Email] Start'),
    COMPLETED: createAction('[Get Order By Email] Completed', (order: Order[]) => order),
};

export const TOGGLE_WISHLIST = {
    TRIGGER: createAction('[Toggle wishlist] Trigger', (id: string) => id),
    STARTED: createAction('[Toggle wishlist] Started', (id: string) => id),
    COMPLETED: createAction('[Toggle wishlist] Completed', (payload: User) => payload),
};
