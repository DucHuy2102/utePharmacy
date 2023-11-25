import { configureStore } from '@reduxjs/toolkit';
import numCartSlice from './reducers/numCartSlice';

// Store
const store = configureStore({
    reducer: {
        numCartSlice,
    },
});

// Export
export default store;
