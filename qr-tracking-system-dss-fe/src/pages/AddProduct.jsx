import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, clearMessage, clearError } from '../redux/slices/productSlice';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography, Box, Paper, Alert } from '@mui/material';

const AddProduct = () => {
    const dispatch = useDispatch();
    const { message, error, loading, validationError } = useSelector((state) => state.product);

    const [productData, setProductData] = useState({
        productName: '',
        productDescription: '',
        productWeight: '',
        productCategory: ''
    });

    const categories = ['Elektronik', 'Gida', 'Giyim', 'Spor', 'Egitim', 'Kozmetik', 'Oyuncak', 'Diger'];

    const handleChange = (e) => {
        const { name, value } = e.target;
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

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Ürün Ekle
                </Typography>

                {/* Hata mesajları ve başarı mesajı */}
                <Box sx={{ marginBottom: 2 }}>
                    {message && <Alert severity="success">{message}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                </Box>

                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                                disabled={loading}
                                sx={{
                                    fontWeight: 'bold',
                                    backgroundColor: '#3f51b5',
                                    '&:hover': {
                                        backgroundColor: '#303f9f',
                                    },
                                    mt: 2,
                                }}
                            >
                                {loading ? 'Yükleniyor...' : ' Ekle'}
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default AddProduct;
