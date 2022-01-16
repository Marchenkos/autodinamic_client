import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';
import { User } from '../../../graphql/interfaces';

import { LOG_OUT } from '../../auth/actions';
import { FETCH_ACCOUNT_DETAILS, TOGGLE_WISHLIST } from '../actions';

export interface UserDetailsState {
    isFetching: boolean;
    user?: User;
}

export const userDetailsReducer: Reducer<UserDetailsState> = createReducer<UserDetailsState>({
    isFetching: false,
    user: undefined,
})
    .handleAction(FETCH_ACCOUNT_DETAILS.STARTED, () => ({
        isFetching: true,
        user: undefined,
    }))
    .handleAction(FETCH_ACCOUNT_DETAILS.COMPLETED, (_, action) => ({
        isFetching: false,
        user: action.payload,
    }))
    .handleAction(LOG_OUT.COMPLETED, () => ({
        isFetching: false,
        user: undefined,
    }))
    .handleAction(TOGGLE_WISHLIST.COMPLETED, (_, action) => ({
        isFetching: false,
        user: action.payload,
    }));
