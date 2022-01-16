import { getOrderReducer } from './get-order.reducer';
import { profileReducer } from './profile.reducer';
import { userDetailsReducer } from './user-details.reducer';
import { addressesReducer } from './account-addresses.reducer';

export interface AccountState {
    readonly profile: ReturnType<typeof profileReducer>;
    readonly orders: ReturnType<typeof getOrderReducer>;
    readonly userDetails: ReturnType<typeof userDetailsReducer>;
    readonly addresses: ReturnType<typeof addressesReducer>;
}
