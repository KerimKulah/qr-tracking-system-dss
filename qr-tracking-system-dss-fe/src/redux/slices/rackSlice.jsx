import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const getRacks = createAsyncThunk('rack/getRacks', async () => {
    const response = await axiosInstance.get('/racks');
    return response.data;
});

export const getRack = createAsyncThunk('rack/getRack', async (rackId) => {
    const response = await axiosInstance.get(`/racks/${rackId}`);
    return response.data;
});

export const getRackPackages = createAsyncThunk('rack/getRackPackages', async (rackId) => {
    const response = await axiosInstance.get(`/racks/${rackId}/packages`);
    return response.data;
});

export const findSuitableRacks = createAsyncThunk('rack/findSuitableRacks', async ({ productId, quantityOfProduct }) => {
    const response = await axiosInstance.get(`/racks/findSuitableRacks/${productId}/${quantityOfProduct}`);
    return response.data;
});

export const addRack = createAsyncThunk('rack/addRack', async (rack) => {
    const response = await axiosInstance.post('/racks/add', rack);
    return response.data;
});

export const updateRack = createAsyncThunk('rack/updateRack', async (rack) => {
    const response = await axiosInstance.put(`/racks/update/${rack.id}`, rack);
    return response.data;
});

export const deleteRack = createAsyncThunk('rack/deleteRack', async (rackId) => {
    const response = await axiosInstance.delete(`/racks/delete/${rackId}`);
    return response.data;
});

const rackSlice = createSlice({
    name: 'rack',
    initialState: {
        racks: [],
        rack: {},
        rackPackages: [],
        suitableRacks: [],
        status: null,
        error: null,
        message: null,
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
            // Get Racks
            .addCase(getRacks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = null;
            })
            .addCase(getRacks.fulfilled, (state, action) => {
                state.racks = action.payload;
                state.status = 'success';
            })
            .addCase(getRacks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Raf listesi getirilemedi.';
            })
            // Get Rack
            .addCase(getRack.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = null;
            })
            .addCase(getRack.fulfilled, (state, action) => {
                state.rack = action.payload;
                state.status = 'success';
                state.message = 'Raf bilgisi başarıyla getirildi.';
            })
            .addCase(getRack.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Raf bilgisi getirilemedi.';
            })
            // Get Rack Packages
            .addCase(getRackPackages.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = null;
            })
            .addCase(getRackPackages.fulfilled, (state, action) => {
                state.rackPackages = action.payload;
                state.status = 'success';
                state.message = 'Raf içerisindeki paketler başarıyla getirildi.';
            })
            .addCase(getRackPackages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Paket bilgileri getirilemedi.';
            })
            // Find Suitable Racks
            .addCase(findSuitableRacks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = null;
            })
            .addCase(findSuitableRacks.fulfilled, (state, action) => {
                state.suitableRacks = action.payload;
                state.status = 'success';
                state.message = 'Uygun raflar başarıyla bulundu.';
            })
            .addCase(findSuitableRacks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Uygun raflar bulunamadı.';
            })
            // Add Rack
            .addCase(addRack.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = null;
            })
            .addCase(addRack.fulfilled, (state) => {
                state.status = 'success';
                state.message = 'Raf başarıyla eklendi.';
            })
            .addCase(addRack.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Raf eklenemedi.';
            })
            // Update Rack
            .addCase(updateRack.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = null;
            })
            .addCase(updateRack.fulfilled, (state) => {
                state.status = 'success';
                state.message = 'Raf başarıyla güncellendi.';
            })
            .addCase(updateRack.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Raf güncellenemedi.';
            })
            // Delete Rack
            .addCase(deleteRack.pending, (state) => {
                state.status = 'loading';
                state.error = null;
                state.message = null;
            })
            .addCase(deleteRack.fulfilled, (state) => {
                state.status = 'success';
                state.message = 'Raf başarıyla silindi.';
            })
            .addCase(deleteRack.rejected, (state, action) => {
                state.status = 'failed';
                state.error = 'Raf silinemedi.';
            });
    },
});

export const { clearMessage, clearError } = rackSlice.actions;
export default rackSlice.reducer;
