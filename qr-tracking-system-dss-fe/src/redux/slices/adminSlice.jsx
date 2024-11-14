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

export const getAllUsers = createAsyncThunk('/admin/getAllUsers', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/admin/getAllUsers');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Kullanıcılar getirilirken hata oluştu";
        return rejectWithValue(errorMessage);
    }
});

export const deleteUser = createAsyncThunk('/admin/deleteUser', async (userId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/admin/deleteUser/${userId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Kullanıcı silinirken hata oluştu";
        return rejectWithValue(errorMessage);
    }
});

export const makeAdmin = createAsyncThunk('/admin/makeAdmin', async (userId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post(`/admin/makeAdmin/${userId}`);
        return response.data;
    }
    catch (error) {
        const errorMessage = error.response?.data?.message || "Admin yapma işlemi sırasında hata oluştu";
        return rejectWithValue(errorMessage);
    }
});

export const getMovements = createAsyncThunk('/admin/getMovements', async (userId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/admin/getMovements/${userId}`);
        return response.data;
    }
    catch (error) {
        const errorMessage = error.response?.data?.message || "Hareketler getirilirken hata oluştu";
        return rejectWithValue(errorMessage);
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        userMovements: [],
        users: [],
        loading: false,
        error: null,
        message: null
    },
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
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
            })
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Kullanıcılar getirilirken hata oluştu";
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.message = "Kullanıcı başarıyla silindi";
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Kullanıcı silinirken hata oluştu";
            })
            .addCase(makeAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(makeAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.message = "Kullanıcı başarıyla admin yapıldı";
            })
            .addCase(makeAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Admin yapma işlemi sırasında hata oluştu";
            })
            .addCase(getMovements.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMovements.fulfilled, (state, action) => {
                state.loading = false;
                state.userMovements = action.payload;
            })
            .addCase(getMovements.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Kullanıcının hareketleri getirilirken hata oluştu";
            })
    }
});

export const { clearMessage, clearError } = adminSlice.actions;
export default adminSlice.reducer;






