import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const addPackage = createAsyncThunk('package/add', async ({ productId, rackId, packageData }) => {
    const response = await axiosInstance.post(`/packages/add?productId=${productId}&rackId=${rackId}`, packageData);
    return response.data;
});

export const exitPackage = createAsyncThunk('package/exit', async (id) => {
    const response = await axiosInstance.delete(`/packages/exit/${id}`);
    return response.data;
});

export const getPackage = createAsyncThunk('package/get', async (id) => {
    const response = await axiosInstance.get(`/packages/${id}`);
    return response.data;
});

export const getPackages = createAsyncThunk('package/getAll', async () => {
    const response = await axiosInstance.get('/packages');
    return response.data;
});

export const updatePackage = createAsyncThunk('package/update', async (data) => {
    const response = await axiosInstance.put(`/packages/update/${data.id}`, data);
    return response.data;
});

export const changeRack = createAsyncThunk('package/changeRack', async (data) => {
    const response = await axiosInstance.put(`/packages/changeRack/${data.packageId}/${data.newRackId}`);
    return response.data;
});

const packageSlice = createSlice({
    name: 'package',
    initialState: {
        packages: [],
        package: {},
        savedPackageQr: null,
        status: null,
        error: null,
        message: null,
    },
    reducers: {
        clearState: (state) => {
            state.status = null;
            state.error = null;
            state.message = null;
            state.savedPackageQr = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addPackage.fulfilled, (state, action) => {
            state.status = 'success';
            state.message = "Paket başarıyla oluşturuldu.";
            state.savedPackageQr = action.payload.qrCode;
        });
        builder.addCase(addPackage.rejected, (state, action) => {
            state.status = 'failed';
            state.error = "Paket oluşturulurken bir hata oluştu.";
        });
        builder.addCase(exitPackage.fulfilled, (state, action) => {
            state.status = 'success';
            state.message = action.payload.message;
        });
        builder.addCase(exitPackage.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
        builder.addCase(getPackage.fulfilled, (state, action) => {
            state.status = 'success';
            state.package = action.payload;
        });
        builder.addCase(getPackage.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
        builder.addCase(getPackages.fulfilled, (state, action) => {
            state.status = 'success';
            state.packages = action.payload;
        });
        builder.addCase(getPackages.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
        builder.addCase(updatePackage.fulfilled, (state, action) => {
            state.status = 'success';
            state.message = action.payload.message;
        });
        builder.addCase(updatePackage.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
        builder.addCase(changeRack.fulfilled, (state, action) => {
            state.status = 'success';
            state.message = action.payload.message;
        });
        builder.addCase(changeRack.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        });
    }
});

export default packageSlice.reducer;


