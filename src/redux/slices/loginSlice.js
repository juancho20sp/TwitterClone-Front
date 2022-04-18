import { createSlice } from '@reduxjs/toolkit';

const saveToLocalStorage = (state) => {
    localStorage.setItem('globalState', JSON.stringify(state));
};

const getFromLocalStorage = (keyName) => {
    const item = localStorage.getItem(keyName);

    if (item) {
        return JSON.parse(item);
    }

    return false;
}

export const loginSlice = createSlice({
    name: 'login',
    initialState: getFromLocalStorage('globalState') ? getFromLocalStorage('globalState') : {
        isLoggedIn: false,
        awsUserData: {},
        userData: {}
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;

            if (action.payload) {
                state.awsUserData = {...JSON.parse(action.payload)};
            }

            saveToLocalStorage(state);
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.awsUserData = {};

            saveToLocalStorage(state);
        },
        setUserData: (state, action) => {
            state.userData = {...action.payload};

            saveToLocalStorage(state);
        }
    }
});

export const {
    login,
    logout,
    setUserData
} = loginSlice.actions;

export default loginSlice.reducer;