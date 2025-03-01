import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducers";
import rootSaga from "./rootSaga";
import { reducer as notificationsReducer } from "reapop";
import { persistStore, persistReducer } from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";

const middleWares = (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware);
const sagaMiddleware = createSagaMiddleware();
// middleWares.push(sagaMiddleware);
// eslint-disable-next-line no-undef
// if (process.env.NODE_ENV === "development") {
//   middleWares.push(logger);
// }

const persistConfig = {
    key: "root",
    storage: storage,
    stateReconciler: autoMergeLevel1,
    whitelist: ["profileDetails"]
};

const reducers = combineReducers({
    ...rootReducer,
    notifications: notificationsReducer()
});

const persistedReducer = persistReducer(persistConfig, reducers);


export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: middleWares
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
