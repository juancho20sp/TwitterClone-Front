import { createSlice } from '@reduxjs/toolkit';

export const postsSlice = createSlice({
    name: 'login',
    initialState: {
        posts: []
    },
    reducers: {
        setFetchedTweets: (state, action) => {
            const data = action.payload;
            state.posts = [...data];
        },
        addTweet: (state, action) => {
            const tweet = action.payload;

            state.posts = [...tweet, ...state.posts];
        }
    }
});

export const {
    setFetchedTweets,
    addTweet
} = postsSlice.actions;

export default postsSlice.reducer;