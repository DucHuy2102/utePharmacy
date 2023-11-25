import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Reducer Thunk
export const getAllUser = createAsyncThunk('user/all', async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_ROOT}/api/user/read.php`);
    return response.data;
});
export const toggleStatus = createAsyncThunk('user/toggle', async (id) => {
    await axios.get(`${process.env.REACT_APP_BACKEND_ROOT}/api/user/status.php?id=${id}`);
    return id;
});
// Create slice
const usersSlice = createSlice({
    name: 'comments',
    initialState: {
        allUser: [],
    },
    reducers: {},
    extraReducers: {
        // get all user from backend
        [getAllUser.pending]: (state, action) => {
            console.log('Fetching all user from backend');
        },
        [getAllUser.fulfilled]: (state, action) => {
            console.log('Done');
            state.allUser = action.payload;
        },
        [getAllUser.rejected]: (state, action) => {
            console.log('Failed to get all user');
        },

        // toggle status
        [toggleStatus.pending]: (state, action) => {
            console.log('Toggle  status ');
        },
        [toggleStatus.fulfilled]: (state, action) => {
            console.log('Done');
            state.allUser = state.allUser.map((user) => {
                if (user.user_id === action.payload) {
                    return {
                        ...user,
                        isBlocked: 1 - user.isBlocked,
                    };
                }
                return user;
            });
        },
        [toggleStatus.rejected]: (state, action) => {
            console.log('Failed to toggle status');
        },
    },
});
// Reducer
const usersReducer = usersSlice.reducer;

// Selector
export const usersSelector = (state) => state.usersReducer.allUser;
export const { markComplete } = usersSlice.actions;

// Export reducer
export default usersReducer;
