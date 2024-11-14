import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const getCurrentUser = createAsyncThunk('/users/current', async () => {
    try {
        const response = await axiosInstance.get('/users/current');
        return response.data;
    } catch (error) {
        console.error("Kullanıcı bilgileri getirilirken hata oluştu:", error);
    }
});

export const changePassword = createAsyncThunk('/users/changePassword', async (newPassword) => {
    try {
        const response = await axiosInstance.post('/users/changePassword', newPassword);
        return response.data;
    } catch (error) {
        console.error("Şifre değiştirilirken hata oluştu:", error);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getCurrentUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(getCurrentUser.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        });
    }
});

export default userSlice.reducer;