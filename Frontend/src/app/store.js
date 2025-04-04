import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { appSlice } from '../module/appSlice';
import authReducer from '../module/Authentication/authSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    [appSlice.reducerPath]: appSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(appSlice.middleware),
});


// const middleWares = [];
// const sagaMiddleware = createSagaMiddleware();
// middleWares.push(sagaMiddleware);
// // eslint-disable-next-line no-undef
// if (process.env.NODE_ENV === "development") {
//     middleWares.push(logger);
// }