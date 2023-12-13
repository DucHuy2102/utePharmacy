import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCommentById = createAsyncThunk('comment/id', async (id) => {
    const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_ROOT}/api/comment/read_single.php?product_id=${id}`
    );
    return response.data;
});
export const removeCommentById = createAsyncThunk('comment/delete', async (id) => {
    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_ROOT}/api/comment/delete.php?id=${id}`);
    return res.data.id;
});

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        allComments: [],
    },
    reducers: {},
    extraReducers: {
        // Get all comment
        [getCommentById.pending]: (state, action) => {
            console.log('Fetching comments by id from backend ....');
        },
        [getCommentById.fulfilled]: (state, action) => {
            console.log('Done');
            state.allComments = action.payload;
        },
        [getCommentById.rejected]: (state, action) => {
            console.log('Failed to get comment by id!!!');
        },

        // remove comment by id
        [removeCommentById.pending]: (state, action) => {
            console.log('Fetching delete comment by id from backend ....');
        },
        [removeCommentById.fulfilled]: (state, action) => {
            console.log('Done');
            state.allComments = state.allComments.filter((comment) => comment.id !== action.payload);
        },
        [removeCommentById.rejected]: (state, action) => {
            console.log('Failed to delete comment by id!!!');
        },
    },
});
// Reducer
const commentsReducer = commentsSlice.reducer;

// Selector
export const commentsSelector = (state) => state.commentsReducer.allComments;
export const {
    // addTodo,
    markComplete,
    // deleteTodo
    // todosFetched
} = commentsSlice.actions;

// Export reducer
export default commentsReducer;
