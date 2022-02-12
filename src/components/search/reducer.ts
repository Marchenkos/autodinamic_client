import { Reducer } from 'redux';
import { createReducer } from 'typesafe-redux-helpers';
import { GeneralProduct } from '../../graphql/entities';

import { FETCH_BY_SEARCH } from './actions';

export interface SearchState {
    terms: string[];
    currentTerm?: string;
    searchResult?: GeneralProduct[];
    searchResultCount: number;
    isFetching: boolean;
}

export const searchReducer: Reducer<SearchState> = createReducer<SearchState>({
    terms: [],
    currentTerm: undefined,
    searchResult: undefined,
    searchResultCount: 0,
    isFetching: false,
})

    .handleAction(FETCH_BY_SEARCH.STARTED, (state, action) => ({
        terms: state.terms,
        currentTerm: action.payload,
        searchResult: undefined,
        searchResultCount: 0,
        isFetching: true,
    }))

    .handleAction(FETCH_BY_SEARCH.COMPLETED, (state, action) => ({
        terms: state.terms,
        currentTerm: state.currentTerm,
        searchResult: action.payload.products,
        searchResultCount: parseInt(action.payload.count),
        isFetching: false,
    }));
