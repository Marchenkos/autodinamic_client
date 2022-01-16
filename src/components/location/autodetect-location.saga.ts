import { SagaIterator } from 'redux-saga';
// import { call, put, select } from 'redux-saga/effects';

// import { CurrencyConfig, Territory } from '../../environment/environment.state';
// import { getAvailableTerritories, getDefaultTerritoryId, getDetectedTerritoryId } from '../../environment/selectors';
// import { SET_TERRITORY_AND_CURRENCY } from '../actions';
// import { getCurrentLocation } from './selectors';

// const getCity = (coordinates: number[]) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=pk.732061efdbb226a69031dc07e6e562b3&lat=" +
//         coordinates[0] + "&lon=" + coordinates[1] + "&format=json", true);
//     xhr.send();
//     xhr.onreadystatechange = processRequest;
//     xhr.addEventListener("readystatechange", processRequest, false);

//     function processRequest(e: any) {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             const response = JSON.parse(xhr.responseText);
//             const city = response.address.city;

//             setCurrentLocation(city);

//             return;
//         }
//     }
// }

// export function* autodetectLocation(): SagaIterator {
//     const currentLocation: Territory = yield select(getCurrentLocation);

//     if (currentLocation) {
//         return;
//     }

//     navigator.geolocation.getCurrentPosition(function(position) {
//         console.log("Latitude is :", position.coords.latitude);
//         console.log("Longitude is :", position.coords.longitude);

//         getCity([position.coords.latitude, position.coords.longitude]);
//     });

//     let showModal = false;

//     if (territoryId === '') {
//         territoryId = yield select(getDefaultTerritoryId);
//         showModal = true;
//     }

//     // Check if territory for detected id exists in available territories and set current territory and currency,
//     // using first currency on the list.
//     const detectedTerritory = availableTerritories.find((item: Territory) => item.id === territoryId);
//     const detectedCurrencyId = detectedTerritory?.currencies[0]?.id;

//     if (detectedCurrencyId) {
//         yield put(
//             SET_TERRITORY_AND_CURRENCY({
//                 territory: territoryId,
//                 currency: detectedCurrencyId,
//                 showModal,
//             })
//         );
//         return;
//     }

//     yield call(
//         Logger.error,
//         new Error(
//             `Failed to set current territory and currency with detected territory id ${territoryId} and currency id ${detectedCurrencyId}`
//         )
//     );

//     // Set current territory and currency to first available from the list
//     const firstAvailableTerritory = availableTerritories[0];
//     const firstAvailableTerritoryCurrency = firstAvailableTerritory?.currencies[0];

//     if (firstAvailableTerritory && firstAvailableTerritoryCurrency) {
//         yield put(
//             SET_TERRITORY_AND_CURRENCY({
//                 territory: firstAvailableTerritory.id,
//                 currency: firstAvailableTerritoryCurrency.id,
//                 showModal: true, // show modal here because we've had to force a territory
//             })
//         );
//         return;
//     }

//     yield call(
//         Logger.error,
//         new Error(`Failed to set current territory and currency as there are no available territories`)
//     );
// }
