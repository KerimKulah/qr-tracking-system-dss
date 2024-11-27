import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../redux/slices/productSlice';
import { findSuitableRacks } from '../redux/slices/rackSlice';
import { addPackage } from '../redux/slices/packageSlice';
import { Typography, Checkbox, FormControlLabel, Button, Select, Paper, MenuItem, InputLabel, FormControl, TextField, CircularProgress, Box } from '@mui/material';

const AddPackage = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const qrCode = useSelector((state) => state.package.savedPackageQr);
    const suitableRacks = useSelector((state) => state.rack.suitableRacks);
    const { status, message, error } = useSelector((state) => state.package);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [selectedRack, setSelectedRack] = useState('');
    const [hasExpDate, setHasExpDate] = useState(false);
    const [productExpDate, setProductExpDate] = useState(null);
    const [expDateError, setExpDateError] = useState(false);


    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        if (selectedProduct && quantity) {
            dispatch(findSuitableRacks({ productId: selectedProduct, quantityOfProduct: quantity }));
        }
    }, [dispatch, selectedProduct, quantity]);

    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleRackChange = (event) => {
        setSelectedRack(event.target.value);
    };

    const handleCreatePackage = async () => {
        const packageData = { productExpDate: productExpDate, quantityOfProduct: quantity };
        dispatch(addPackage({ productId: selectedProduct, rackId: selectedRack, packageData }));
    };

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 3 }}>
            <Paper elevation={3} sx={{ padding: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Paket Girişi
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    Ürün seçiniz ve adetini giriniz, kapasiteye göre uygun raflar listelenecek.
                </Typography>

                {/* Ürün Seçimi */}
                <FormControl fullWidth>
                    <InputLabel>Ürün Seç</InputLabel>
                    <Select
                        value={selectedProduct}
                        onChange={handleProductChange}
                        label="Ürün Seç">
                        {products.map((product) => (
                            <MenuItem key={product.id} value={product.id}>
                                {product.productName}
                            </MenuItem>))}
                    </Select>
                </FormControl>

                {/* Adet Girişi */}
                <TextField
                    label="Adet"
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e)}
                    error={quantity <= 0 && quantity !== ""}
                    helperText={quantity <= 0 && quantity !== "" ? "Adet 0'dan büyük olmalı" : ""}
                    fullWidth
                    margin="normal"
                />

                {/* Son Kullanma Tarihi alanı */}
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={hasExpDate}
                            onChange={(e) => setHasExpDate(e.target.checked)}
                        />
                    }
                    label="S.K.T Var"
                />
                {hasExpDate && (
                    <TextField
                        label="Son Kullanma Tarihi"
                        type="date"
                        value={productExpDate}
                        onChange={(e) => {
                            const selectedDate = new Date(e.target.value);
                            const today = new Date();
                            today.setHours(0, 0, 0, 0); // Bugünün başlangıç saatini ayarla
                            if (selectedDate >= today) {
                                setProductExpDate(e.target.value); // Geçerli tarihi ayarla
                                setExpDateError(false); // Hata durumunu sıfırla
                            } else {
                                setExpDateError(true); // Hata durumunu göster
                            }
                        }}
                        error={expDateError}
                        helperText={expDateError ? "Bugünden önceki bir tarih seçilemez" : ""}
                        fullWidth
                        margin="normal"
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                )}

                {/* Uygun Rafların Listelenmesi */}
                {suitableRacks.length > 0 && (
                    <FormControl fullWidth>
                        <InputLabel>Raf Seç</InputLabel>
                        <Select
                            value={selectedRack}
                            onChange={handleRackChange}
                            label="Raf Seç">
                            {suitableRacks.map((rack) => (
                                <MenuItem key={rack.id} value={rack.id}>
                                    {rack.location}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}

                {/* Paket Oluşturma */}
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreatePackage}
                    disabled={!selectedProduct || quantity <= 0 || !quantity || !selectedRack || status === 'loading' || expDateError}
                    sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#003366', color: 'white', '&:hover': { backgroundColor: '#002244', },
                        mt: 2,
                    }}
                >
                    {status === 'loading' ? <CircularProgress size={24} /> : 'Paket Girişini Yap'}
                </Button>

                {/* QR Kodunun Gösterimi */}
                {qrCode && (
                    <Box sx={{ marginTop: '20px', textAlign: 'center', maxWidth: '100%' }}>
                        <h3>QR Kodu:</h3>
                        <img
                            src={`data:image/png;base64,${qrCode}`}
                            alt="QR Code"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </Box>
                )}

                {/* Hata veya Başarı Mesajı */}
                {status === 'failed' && <div style={{ color: 'red' }}>{error}</div>}
                {status === 'success' && <div style={{ color: 'green' }}>{message}</div>}
            </Paper>
        </Box>
    );
};

export default AddPackage;
