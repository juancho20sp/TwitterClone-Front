import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLoggedIn: false,
        awsUserData: ''
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;

            if (action.payload) {
                state.awsUserData = {...JSON.parse(action.payload)};
            }

        },
        logout: (state, action) => {
            state.isLoggedIn = false;
        }
    }
});

export const {
    login,
    logout
} = loginSlice.actions;

export default loginSlice.reducer;