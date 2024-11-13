import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const login = createAsyncThunk('/auth/login', async (userData) => {
    try {
        const response = await axiosInstance.post('/auth/login', userData);
        localStorage.setItem('token', response.data.token); // Token'ı kaydediyoruz
        return response.data;
    }
    catch (error) {
        console.error("Giriş işlemi sırasında hata oluştu:", error);
    }
}
);

export const logout = createAsyncThunk('/auth/logout', async () => {
    try {
        await axiosInstance.post('/auth/logout');
        localStorage.removeItem('token');
    } catch (error) {
        console.error("Çıkış işlemi sırasında hata oluştu:", error);
        throw error;
    }
});

export const verifyToken = createAsyncThunk('/auth/verifyToken', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false;
    }
    try {
        const response = await axiosInstance.post('/auth/verifyToken', null, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data; // False ya da True dönecek. True dönerse token, user geçerli demektir.
    } catch (error) {
        console.error("Token doğrulama sırasında hata oluştu:", error);
        return false;
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('token') || null,
        loading: false,
        error: null,
        isAuthenticated: false
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            state.isAuthenticated = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        });
        builder.addCase(verifyToken.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuthenticated = true;
            } else {
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
            }
        });
    }
});

export default authSlice.reducer;



