import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import adminReducer from './slices/adminSlice';
import productReducer from './slices/productSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        admin: adminReducer,
        product: productReducer,
    },
});

export default store;