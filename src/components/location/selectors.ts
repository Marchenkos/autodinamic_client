import { createSelector, Selector } from 'reselect';

import { ApplicationState } from '../../store/ApplicationState';

import { LocationState } from './reducer';

const getTerritoriesState: Selector<ApplicationState, LocationState> = createSelector(
    (state) => state.location,
    (location) => location
);

export const getShouldShowAutoSelectedTerritoryModal: Selector<ApplicationState, boolean> = createSelector(
    getTerritoriesState,
    (location) => location.showModal
);

export const getCurrentLocation: Selector<ApplicationState, string | undefined> = createSelector(
    getTerritoriesState,
    (location) => location.currentLocation
);
