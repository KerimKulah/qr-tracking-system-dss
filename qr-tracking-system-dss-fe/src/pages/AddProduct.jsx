import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, clearMessage, clearError } from '../redux/slices/productSlice';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Box, Paper, Alert } from '@mui/material';

const AddProduct = () => {
    const dispatch = useDispatch();
    const { message, error, loading } = useSelector((state) => state.product);

    const [productData, setProductData] = useState({
        productName: '',
        productDescription: '',
        productWeight: '',
        productCategory: ''
    });

    const [weightError, setWeightError] = useState(false); // Ağırlık hatasını tutar

    const categories = ['Elektronik', 'Gida', 'Giyim', 'Spor', 'Egitim', 'Kozmetik', 'Oyuncak', 'Diger'];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'productWeight') {
            const weight = parseFloat(value);
            // 0 veya daha küçükse hata durumu tetiklenir
            setWeightError(weight <= 0);
        }

        setProductData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addProduct(productData));
        dispatch(clearMessage());
        dispatch(clearError());
    };

    // Form validasyonları
    const isFormValid =
        productData.productName.trim() !== '' &&
        productData.productDescription.trim() !== '' &&
        productData.productWeight.trim() !== '' &&
        !weightError && // Ağırlık hatası yoksa
        productData.productCategory.trim() !== '';

    return (
        <>
            <h2>ÜRÜN EKLEME</h2>
            <Box sx={{ marginBottom: '1rem' }}>
                {message && <Alert severity="success">{message}</Alert>}
                {error && <Alert severity="error">{error}</Alert>}
            </Box>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 1.5 }}>
                        <TextField
                            label="Ürün Adı"
                            name="productName"
                            value={productData.productName}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Açıklama"
                            name="productDescription"
                            value={productData.productDescription}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Ağırlık (kg)"
                            name="productWeight"
                            type="number"
                            value={productData.productWeight}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={weightError} // Hata varsa kırmızı renkte gösterir
                            helperText={weightError ? 'Ağırlık 0 ve altı olamaz.' : ''} // Hata mesajı
                        />
                        <FormControl fullWidth required>
                            <InputLabel>Kategori</InputLabel>
                            <Select
                                name="productCategory"
                                value={productData.productCategory}
                                onChange={handleChange}
                            >
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!isFormValid || loading} // Form doğru değilse veya yükleniyorsa buton devre dışı
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: '#003366',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#002244' }
                                }}
                            >
                                {loading ? 'Yükleniyor...' : 'Ekle'}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Paper>
        </>
    );
};

export default AddProduct;
