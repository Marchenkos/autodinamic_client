import { configureStore, Store } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer, Persistor } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 

import { ApplicationState } from './ApplicationState';
import { rootReducer } from './rootReducer';

import { rootSaga } from './rootSaga';

export const createStore = async (): Promise<{ store: Store<ApplicationState>, persistor: Persistor }> => {
    const persistConfig = {
      key: 'root',
      storage: storage,
      whitelist: ['basket']
    };

    const pReducer = persistReducer(persistConfig, rootReducer);

    const sagaMiddleware = createSagaMiddleware({
        onError(err) {
            console.log(err);
        },
    });

    const store: Store<ApplicationState> = configureStore({ 
      reducer: pReducer, 
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddleware),
      devTools: true
    })

    const persistor = persistStore(store);

    // const store: Store<ApplicationState> = createReduxStore(rootReducer, applyMiddleware(sagaMiddleware));

    await sagaMiddleware.run(rootSaga).toPromise();

    return { store, persistor };
};
