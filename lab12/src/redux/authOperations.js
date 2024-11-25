import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Notify } from 'notiflix';


const setAuthToken = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('authToken', token);
};

const clearAuthToken = () => {
    axios.defaults.headers.common.Authorization = '';
    localStorage.removeItem('authToken');
};


export const login = createAsyncThunk('api/user/login', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:5005/users/signin', credentials);
        return response.data;
    } catch (error) {
        Notify.failure(error.message)
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const register = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
        await axios.post('http://localhost:5005/users/signup', userData);
        const response = await axios.post('http://localhost:5005/users/signin', userData)
        setAuthToken(response.data.token)
        return response.data;
    } catch (error) {
        Notify.failure(error.message)
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const getCurrentUser = createAsyncThunk('user/current',
    async(_, thunkAPI) =>{
        const state = thunkAPI.getState();
        const persistedToken = state.auth.token;

        if (persistedToken === null) {
            return thunkAPI.rejectWithValue('Unable to download user information');
        }
        try {
            persistedToken && setAuthToken(persistedToken);
            const res = await axios.get('/users/current');
            return res.data;
        } catch (error) {
            if (error.response.data.message === 'jwt expired') {
                clearAuthToken();
                thunkAPI.dispatch({ type: 'persist/PURGE', key: 'persist:auth' });
            }
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const logout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
    try {
        await axios.post('http://localhost:5005/users/logout');
        localStorage.removeItem('authToken');
        return { message: 'Logged out successfully' };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
        }
    }
);