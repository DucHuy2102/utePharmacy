import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Reducer Thunk
export const getNumCart = createAsyncThunk('numcart', async () => {
    const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ROOT}/api/cart/getCountCart.php?user_id=${sessionStorage.getItem('user_id')}`
    );
    return response.data;
});

// Create slice
const numCartSlice = createSlice({
    name: 'numCart',
    initialState: {
        numCart: 0,
        listCart: [],
    },
    reducers: {
        addCart(state, action) {
            if (!state.listCart.includes(action.payload)) {
                state.numCart += 1;
                state.listCart = [...state.listCart, action.payload];
            }
        },
        subCart(state, action) {
            state.listCart = state.listCart.filter((item) => item !== action.payload);
            state.numCart -= 1;
        },
    },
    extraReducers: {
        // Get all comment
        [getNumCart.pending]: (state, action) => {
            console.log('Fetching num cart by id from backend ....');
        },
        [getNumCart.fulfilled]: (state, action) => {
            console.log('Done');

            state.numCart = action.payload.data[0].count;
            state.listCart = action.payload.list.map((item) => item.id);
        },
        [getNumCart.rejected]: (state, action) => {
            console.log('Failed to get num cart by id!!!');
        },
    },
});

// Reducer
const numCartReducer = numCartSlice.reducer;

// Selector
export const numCartSelector = (state) => {
    console.log(state);
    return state.numCartSlice.numCart;
};

export const { addCart, subCart, markComplete } = numCartSlice.actions;

// Export reducer
export default numCartReducer;
