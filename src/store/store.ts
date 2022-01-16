import { createStore as createReduxStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { ApplicationState } from './ApplicationState';
import { rootReducer } from './rootReducer';

import { rootSaga } from './rootSaga';

export const createStore = async (): Promise<{ store: Store<ApplicationState> }> => {
    const sagaMiddleware = createSagaMiddleware({
        onError(err) {
            console.log(err);
        },
    });

    const store: Store<ApplicationState> = createReduxStore(rootReducer, applyMiddleware(sagaMiddleware));

    await sagaMiddleware.run(rootSaga).toPromise();

    return { store };
};
