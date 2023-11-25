import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsSlice';
import commentsReducer from './reducers/commentsSlice';
import usersReducer from './reducers/usersSlice';
import ordersReducer from './reducers/ordersSlice';

// Store
const store = configureStore({
    reducer: {
        productsReducer,
        commentsReducer,
        usersReducer,
        ordersReducer,
    },
});

// Export
export default store;
