import { createSlice } from '@reduxjs/toolkit';
import { register, login, getCurrentUser, logout } from './authOperations';

const handlePending = state => {
    state.isLoading = true;
};

const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
};
const initialState = {
    user: {
        name: '',
        email: ''
    },
    isLoading: false,
    error: null,
    token: localStorage.getItem('authToken') || null
};


const userSlice = createSlice({
    name: 'user',
    initialState: { ...initialState },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(register.pending, handlePending)
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                const {user, token} = action.payload
                state.user.name = user.name
                state.user.email = user.email
                state.token = token
            })
            .addCase(register.rejected, handleRejected)

            .addCase(login.pending, handlePending)
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                const {user, token} = action.payload
                state.user.name = user.name
                state.user.email = user.email
                state.token = token
            })
            .addCase(login.rejected, handleRejected)

            .addCase(getCurrentUser.pending, handlePending)
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.user.name = action.payload.name
                state.user.email = action.payload.email
                state.isLoading = false;
                state.error = null;
            })
            .addCase(getCurrentUser.rejected, handleRejected)

            .addCase(logout.fulfilled, (state) => {
                state.user = { name: '', email: '' };
                state.token = null;
                state.isLoading = false;
                state.error = null;
            });
    }
});

export const userReducer = userSlice.reducer;