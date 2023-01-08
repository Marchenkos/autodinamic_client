import { createSelector, Selector } from 'reselect';
import { AddressInfo, GeneralProduct, Order } from '../../graphql/entities';
import { User } from '../../graphql/interfaces';

import { ApplicationState } from '../../store/ApplicationState';
import { AccountState } from './reducers/account.state';

const getAccountState: Selector<ApplicationState, AccountState> = createSelector(
    (state) => state.account,
    (account) => account
);

export const getEditableAddress: Selector<ApplicationState, AddressInfo | undefined | []> = createSelector(
    getAccountState,
    (account) => account.profile.editableAddess
);

export const getUserOrders: Selector<ApplicationState, Order[] | undefined> = createSelector(
    getAccountState,
    (account) => account.orders.userOrders
);

export const getOrderDetails: Selector<ApplicationState, Order | undefined> = createSelector(
    getAccountState,
    (account) => account.orders.orderDetails
);

export const getIsOrderFetching: Selector<ApplicationState, boolean> = createSelector(
    getAccountState,
    (account) => account.orders.isFetching
);

export const getUser: Selector<ApplicationState, User | undefined> = createSelector(
    getAccountState,
    (account) => account.userDetails.user
);

export const geIsFetchingtUserDetails: Selector<ApplicationState, boolean> = createSelector(
    getAccountState,
    (account) => account.userDetails.isFetching
);

export const getWishlist: Selector<ApplicationState, GeneralProduct[] | undefined> = createSelector(getUser, (user) =>
    user ? user?.wishlist : []
);

export const getUserAddresses: Selector<ApplicationState, AddressInfo[] | undefined> = createSelector(
    getAccountState,
    (accountState) => accountState.addresses.addresses
);

export const getPrimaryAddress: Selector<ApplicationState, AddressInfo | undefined> = createSelector(
    getAccountState,
    (accountState) => accountState.addresses.primaryAddress
);
