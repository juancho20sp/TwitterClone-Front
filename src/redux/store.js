import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import postsReducer from './slices/postsSlice';

export default configureStore({
    reducer: {
        login: loginReducer,
        posts: postsReducer
    }
});