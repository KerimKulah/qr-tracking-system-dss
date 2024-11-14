import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

// admin/cretaUser
// admin/deleteUser
// admin/makeAdmin/{id}
// admin/getMovements/{id]
// admin/getAllUsers
// admin/getAllMovements

export const createUser = createAsyncThunk('/admin/createUser', async (userData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/admin/createUser', userData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Kullanıcı oluşturma işlemi sırasında hata oluştu";
        return rejectWithValue(errorMessage);
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        loading: false,
        error: null,
        message: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = "Kullanıcı başarıyla oluşturuldu";
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Kullanıcı oluşturulurken hata oluştu";
            });
    }
});


export default adminSlice.reducer;






