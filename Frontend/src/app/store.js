import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../module/apiSlice';

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});


// const middleWares = [];
// const sagaMiddleware = createSagaMiddleware();
// middleWares.push(sagaMiddleware);
// // eslint-disable-next-line no-undef
// if (process.env.NODE_ENV === "development") {
//     middleWares.push(logger);
// }