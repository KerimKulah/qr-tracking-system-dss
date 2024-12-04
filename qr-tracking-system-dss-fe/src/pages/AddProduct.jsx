import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, clearMessage, clearError } from '../redux/slices/productSlice';
import { Button, TextField, MenuItem, Select, InputLabel, FormControl, Box, Paper, Alert, FormControlLabel, Checkbox } from '@mui/material';

const AddProduct = () => {
    const dispatch = useDispatch();
    const { message, error, loading } = useSelector((state) => state.product);

    const [productData, setProductData] = useState({
        productName: '',
        productDescription: '',
        productWeight: '',
        productCategory: ''
    });

    const [weightError, setWeightError] = useState(false);
    const [suggestedCategory, setSuggestedCategory] = useState('');
    const [selectManual, setSelectManual] = useState(false);  // Kategori manual seçilecek mi?

    const categories = ['Elektronik', 'Telefon', 'Giyilebilir Teknoloji', 'Gida ve İcecek', 'Giyim', 'Spor', 'Egitim', 'Kozmetik', 'Oyuncak', 'Saglik', 'Diger'];

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'productWeight') {
            const weight = parseFloat(value);
            setWeightError(weight <= 0);
        }

        if (name === 'productName') {
            setProductData((prevData) => ({
                ...prevData,
                [name]: value
            }));

            fetchCategorySuggestion(value);
        } else {
            setProductData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const fetchCategorySuggestion = async (productName) => {
        if (!productName.trim()) return;

        try {
            const response = await fetch('https://192.168.1.104:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: productName })
            });

            const data = await response.json();
            if (data.category) {
                // Kategoriyi alırken etrafındaki tırnakları kaldırıyoruz
                const trimmedCategory = data.category.replace(/['"]+/g, ''); // Tırnakları kaldırıyoruz
                setSuggestedCategory(trimmedCategory);
            } else {
                setSuggestedCategory('');
            }
        } catch (error) {
            console.error('Kategori önerisi alırken hata oluştu:', error);
        }
    };

    const handleCategorySelect = (e) => {
        setProductData((prevData) => ({
            ...prevData,
            productCategory: e.target.value
        }));
    };

    const handleManualCheckbox = (e) => {
        const isManualSelected = e.target.checked;
        setSelectManual(isManualSelected);

        if (!isManualSelected) {
            // Eğer manuel seçim kapandıysa, önerilen kategoriyi geri getirelim
            setProductData((prevData) => ({
                ...prevData,
                productCategory: suggestedCategory || ''  // Önerilen kategori mevcutsa, onu kullanıyoruz
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Eğer manuel kategori seçilmediyse, önerilen kategoriyi kullan
        const categoryToSubmit = selectManual ? productData.productCategory : suggestedCategory;

        // Eğer kategori hala boşsa (ve önerilen kategori de yoksa), işlem yapılmasın
        if (!categoryToSubmit.trim()) {
            alert('Ürün kategorisi boş olamaz.');
            return;
        }

        // Ürün verisini güncelle
        const updatedProductData = {
            ...productData,
            productCategory: categoryToSubmit
        };

        dispatch(addProduct(updatedProductData));
        dispatch(clearMessage());
        dispatch(clearError());
    };

    const isFormValid =
        productData.productName.trim() !== '' &&
        productData.productDescription.trim() !== '' &&
        productData.productWeight.trim() !== '' &&
        !weightError &&
        (productData.productCategory.trim() !== '' || suggestedCategory.trim() !== '');  // Kategori, manuel veya önerilen olmalı
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
                            error={weightError}
                            helperText={weightError ? 'Ağırlık 0 ve altı olamaz.' : ''}
                        />

                        {/* Önerilen Kategori TextField */}
                        {!selectManual && suggestedCategory && (
                            <TextField
                                label="Önerilen Kategori"
                                name="productCategory"
                                value={selectManual ? productData.productCategory : suggestedCategory}
                                fullWidth
                                onChange={handleChange}
                                disabled={!selectManual}
                                InputProps={{
                                    style: { fontWeight: 'bold' }
                                }}
                            />
                        )}

                        {/* Manuel Seçim Checkbox ve Dropdown */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectManual}
                                    onChange={handleManualCheckbox}
                                    name="selectManual"
                                    color="primary"
                                />
                            }
                            label="Kategoriyi El İle Seç"
                        />

                        {selectManual && (
                            <FormControl fullWidth required>
                                <InputLabel>Kategori</InputLabel>
                                <Select
                                    name="productCategory"
                                    value={productData.productCategory}
                                    onChange={handleCategorySelect}>
                                    {categories.map((category, index) => (
                                        <MenuItem key={index} value={category}>
                                            {category}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        )}

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={!isFormValid || loading}
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