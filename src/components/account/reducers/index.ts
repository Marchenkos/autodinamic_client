import { combineReducers, Reducer } from 'redux';

import { AccountState } from './account.state';
import { getOrderReducer as orders } from './get-order.reducer';
import { profileReducer as profile } from './profile.reducer';
import { userDetailsReducer as userDetails } from './user-details.reducer';
import { addressesReducer as addresses } from './account-addresses.reducer';

export const reducer: Reducer<AccountState> = combineReducers<AccountState>({
    orders,
    profile,
    userDetails,
    addresses,
});
