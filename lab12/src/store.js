import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './redux/rootReducer';

const getInitialAuthState = () => {
    const token = localStorage.getItem('token');
    return token ? { isAuthenticated: true } : { isAuthenticated: false };
};

const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
        auth: getInitialAuthState(),
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;