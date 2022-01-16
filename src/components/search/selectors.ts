import { createSelector, Selector } from 'reselect';
import { GeneralProduct } from '../../graphql/entities';

import { ApplicationState } from '../../store/ApplicationState';

export const getSearchTermsState: Selector<ApplicationState, string[]> = createSelector(
    (state) => state.search,
    (search) => search.terms
);

export const getCurrentSearchTermState: Selector<ApplicationState, string | undefined> = createSelector(
    (state) => state.search,
    (search) => search.currentTerm
);

export const getSearchResultState: Selector<ApplicationState, GeneralProduct[] | undefined> = createSelector(
    (state) => state.search,
    (search) => search.searchResult
);

export const getSearchResultCountState: Selector<ApplicationState, number> = createSelector(
    (state) => state.search,
    (search) => search.searchResultCount
);

export const getIsSearchResultFetchingState: Selector<ApplicationState, boolean> = createSelector(
    (state) => state.search,
    (search) => search.isFetching
);
