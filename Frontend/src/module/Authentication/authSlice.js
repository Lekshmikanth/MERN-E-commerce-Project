// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

let storedUser = null;
try {
    const storedUserRaw = localStorage.getItem('user');
    storedUser = storedUserRaw && storedUserRaw !== 'undefined' ? JSON.parse(storedUserRaw) : null;
} catch (err) {
    storedUser = null;
}

const initialState = {
    user: storedUser,
    isLoggedIn: !!storedUser,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logoutUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem('user');
        },
    },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
