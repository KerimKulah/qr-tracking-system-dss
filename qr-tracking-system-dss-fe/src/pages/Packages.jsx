import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPackages, exitPackage } from '../redux/slices/packageSlice';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Packages = () => {
    const dispatch = useDispatch();
    const { packages, status, message, error } = useSelector((state) => state.package);
    const [selectedQrCode, setSelectedQrCode] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        dispatch(getPackages());
    }, [dispatch]);

    const handleExitPackage = (id) => {
        dispatch(exitPackage(id));
    };

    const handleShowQrCode = (qrCode) => {
        setSelectedQrCode(qrCode);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedQrCode(null);
    };

    return (
        <>
            <h2>PAKET LİSTESİ</h2>
            {status === 'failed' && <Typography color="error">{error}</Typography>}
            {status === 'success' && <Typography color="primary">{message}</Typography>}
            <Paper
                elevation={3}
                sx={{
                    padding: '1rem',
                    width: '100%',
                }}>
                <TextField
                    label="Paketlerde Ara"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ürün adı, paket ID, son kullanma tarihi, ağırlık gibi kriterlerle arama yapabilirsiniz."
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Ürün Adı</TableCell>
                                <TableCell>Raf</TableCell>
                                <TableCell>Adet</TableCell>
                                <TableCell>Son Kullanma Tarihi</TableCell>
                                <TableCell>Paket Ağırlığı</TableCell>
                                <TableCell>İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {packages && packages.length > 0 ? (
                                packages.map((pkg) => (
                                    <TableRow key={pkg.id}>
                                        <TableCell>{pkg.id}</TableCell>
                                        <TableCell>{pkg.product.productName}</TableCell>
                                        <TableCell>{pkg.rack.location}</TableCell>
                                        <TableCell>{pkg.quantityOfProduct}</TableCell>
                                        <TableCell>{pkg.productExpDate ? new Date(pkg.productExpDate).toLocaleDateString() : '-'}</TableCell>
                                        <TableCell>{pkg.packageWeight} kg</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleExitPackage(pkg.id)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Çıkart
                                            </Button>
                                            <Button variant="outlined" color="secondary" onClick={() => console.log(pkg)}>
                                                Güncelle
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="info"
                                                onClick={() => handleShowQrCode(pkg.qrCode)} // QR kodunu gösterme
                                                style={{ marginLeft: '10px' }}
                                            >
                                                QR
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        Paket bulunamadı.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* QR Kodu Gösteren Modal */}
                <Dialog open={open} onClose={handleCloseModal}>
                    <DialogTitle>QR Kodu</DialogTitle>
                    <DialogContent>
                        {selectedQrCode ? (
                            <Box sx={{ textAlign: 'center' }}>
                                <img
                                    src={`data:image/png;base64,${selectedQrCode}`}
                                    alt="QR Code"
                                    style={{ maxWidth: '100%', height: 'auto' }}
                                />
                            </Box>
                        ) : (
                            <Typography>QR kodu yükleniyor...</Typography>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Kapat
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </>
    );
};

export default Packages;
