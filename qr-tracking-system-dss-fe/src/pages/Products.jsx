import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Modal, Box, FormControl, InputLabel, Select, MenuItem, Typography, Alert } from '@mui/material';
import { getAllProducts, deleteProduct, updateProduct, getTotalQuantity } from '../redux/slices/productSlice';

const Products = () => {
    const dispatch = useDispatch();
    const { products, loading, error, message } = useSelector(state => state.product);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productWeight, setProductWeight] = useState('');
    const [productCategory, setProductCategory] = useState('');
    const [quantities, setQuantities] = useState({});

    const categories = ['Elektronik', 'Gida', 'Giyim', 'Spor', 'Egitim', 'Kozmetik', 'Oyuncak', 'Diger'];

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    useEffect(() => {
        products.forEach((product) => {
            dispatch(getTotalQuantity(product.id)).then((response) => {
                setQuantities((prevQuantities) => ({
                    ...prevQuantities,
                    [product.id]: response.payload,
                }));
            });
        });
    }, [dispatch, products]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleUpdateProduct = (product) => {
        setSelectedProduct(product);
        setProductName(product.productName);
        setProductDescription(product.productDescription);
        setProductWeight(product.productWeight);
        setProductCategory(product.productCategory);
        setOpenModal(true);
    };

    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId)).then(() => {
            dispatch(getAllProducts());
        });
    };

    const handleSaveUpdate = () => {
        const updatedProduct = {
            id: selectedProduct.id,
            productName,
            productDescription,
            productWeight,
            productCategory
        };
        dispatch(updateProduct(updatedProduct)).then(() => {
            dispatch(getAllProducts());
        });
        setOpenModal(false);
    };

    const filteredProducts = products.filter(product =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.productCategory.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>Ürün Listesi</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}

            <TextField
                label="Ürün Ara"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{ marginBottom: '20px' }}
                placeholder="Ürün adı veya bilgilerini arayın..."
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Adı</TableCell>
                            <TableCell>Açıklaması</TableCell>
                            <TableCell>Ağırlığı</TableCell>
                            <TableCell>Kategorisi</TableCell>
                            <TableCell>Toplam Miktar</TableCell> {/* New column for total quantity */}
                            <TableCell>İşlemler</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.id}</TableCell>
                                <TableCell>{product.productName}</TableCell>
                                <TableCell>{product.productDescription}</TableCell>
                                <TableCell>{product.productWeight} kg</TableCell>
                                <TableCell>{product.productCategory}</TableCell>
                                <TableCell>
                                    {quantities[product.id] !== undefined ? quantities[product.id] : 'Yükleniyor...'} {/* Display total quantity */}
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => handleUpdateProduct(product)} variant="outlined" color="primary">Güncelle</Button>
                                    <Button onClick={() => handleDeleteProduct(product.id)} variant="outlined" color="secondary" style={{ marginLeft: 8 }}>Sil</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/*Güncelleme Modal */}
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="update-product-modal"
                aria-describedby="update-product-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        backgroundColor: 'white',
                        padding: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Ürün Güncelle
                    </Typography>
                    {/* Success and error messages */}
                    <Box sx={{ marginBottom: 2 }}>
                        {message && <Alert severity="success">{message}</Alert>}
                        {error && <Alert severity="error">{error}</Alert>}
                    </Box>
                    <form>
                        <TextField
                            label="Ürün Adı"
                            variant="outlined"
                            fullWidth
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <TextField
                            label="Ürün Açıklaması"
                            variant="outlined"
                            fullWidth
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <TextField
                            label="Ürün Ağırlığı"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={productWeight}
                            onChange={(e) => setProductWeight(e.target.value)}
                            style={{ marginBottom: '10px' }}
                            required
                        />
                        <FormControl fullWidth style={{ marginBottom: '10px' }} required>
                            <InputLabel>Kategori</InputLabel>
                            <Select
                                value={productCategory}
                                onChange={(e) => setProductCategory(e.target.value)}
                            >
                                {categories.map((category, index) => (
                                    <MenuItem key={index} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button onClick={handleSaveUpdate} variant="contained" color="primary" fullWidth>
                                Kaydet
                            </Button>
                            <Button onClick={() => setOpenModal(false)} variant="outlined" color="secondary" fullWidth>
                                Kapat
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default Products;
