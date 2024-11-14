import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const addProduct = createAsyncThunk('/products/add', async (productData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post('/products/add', productData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Ürün eklenirken hata oluştu";
        return rejectWithValue(errorMessage);
    }
});

export const deleteProduct = createAsyncThunk('/products/delete', async (productId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.delete(`/products/delete/${productId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Ürün silinirken hata oluştu";
        return rejectWithValue(errorMessage);
    }
});

export const getProduct = createAsyncThunk('/getProducts', async (productId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/products/${productId}`);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Ürün getirilirken hata oluştu";
        return rejectWithValue(errorMessage);
    }
});

export const getAllProducts = createAsyncThunk('/getAllProducts', async (_, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get('/products');
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Ürünler getirilirken hata oluştu";
        return rejectWithValue(errorMessage);
    }
});

export const updateProduct = createAsyncThunk('/products/update', async (productData, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.put(`/products/update/${productData.id}`, productData);
        return response.data;
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Ürün güncellenirken hata oluştu";
        return rejectWithValue(errorMessage);
    }
});

export const getTotalQuantity = createAsyncThunk('/products/totalQuantity', async (productId, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.get(`/products/${productId}/totalQuantity`);
        return response.data; // sayı dönecek
    } catch (error) {
        const errorMessage = error.response?.data?.message || "Ürün adedi getirilirken hata oluştu";
        return rejectWithValue(errorMessage);
    }
});

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        product: null,
        totalQuantity: null,
        loading: false,
        message: null,
        error: null
    },
    reducers: {
        clearMessage: (state) => {
            state.message = null;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.message = "Ürün Başarıyla Eklendi";
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(deleteProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.message = "Ürün Başarıyla Silindi";
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        });
        builder.addCase(getProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getProduct.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getAllProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(getAllProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });


        builder.addCase(updateProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.message = "Ürün Başarıyla Güncellendi";
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            state.loading = false;
            state.error = "Ürün güncellenirken hata oluştu";
        });

        builder.addCase(getTotalQuantity.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getTotalQuantity.fulfilled, (state, action) => {
            state.loading = false;
            state.totalQuantity = action.payload;
        });
        builder.addCase(getTotalQuantity.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});


export const { clearMessage, clearError } = productSlice.actions;
export default productSlice.reducer;


