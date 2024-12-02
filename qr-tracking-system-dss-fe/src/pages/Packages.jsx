import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPackages, exitPackage, clearState } from '../redux/slices/packageSlice';
import {
    Button,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TablePagination
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import EditNoteIcon from '@mui/icons-material/EditNote';

const Packages = () => {
    const dispatch = useDispatch();
    const { packages, status, message, error } = useSelector((state) => state.package);
    const [selectedQrCode, setSelectedQrCode] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0); // Aktif sayfa
    const [rowsPerPage, setRowsPerPage] = useState(5); // Her sayfada gösterilecek paket sayısı

    useEffect(() => {
        dispatch(getPackages());
        dispatch(clearState())
    }, [dispatch]);

    const handleExitPackage = (id) => {
        dispatch(exitPackage(id)).then(() => {
            setTimeout(() => {
                dispatch(clearState())
            }, 1000);
        });
    };

    const handleShowQrCode = (qrCode) => {
        setSelectedQrCode(qrCode);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedQrCode(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage); // Sayfa değiştirildiğinde yeni sayfa set edilir
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10)); // Gösterilecek satır sayısını değiştir
        setPage(0); // Yeni satır sayısı seçildiğinde ilk sayfaya dön
    };

    // Arama kriterlerine göre filtreleme
    const filteredPackages = packages.filter((pkg) =>
        pkg.product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Son kullanma tarihi ile gün sayısını hesaplama fonksiyonu
    const getDaysRemaining = (expiryDate) => {
        if (!expiryDate) return null;

        const today = new Date();
        const expDate = new Date(expiryDate);
        const timeDiff = expDate - today; // Zaman farkı milisaniye cinsinden
        const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Milisaniyeyi gün sayısına çevir

        return daysRemaining;
    };

    // Sayfalandırma için dilimleme
    const paginatedPackages = filteredPackages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <h2>PAKET LİSTESİ</h2>
            {status === 'failed' && <Typography color="red">{error}</Typography>}
            {status === 'success' && <Typography color="green">{message}</Typography>}
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
                    placeholder="Ürünlere göre arama yapın..."
                />
                <TableContainer>
                    <Table
                        sx={{
                            '@media (max-width: 600px)': {
                                '& .MuiTableCell-root': {
                                    padding: '10px', // Hücre içi boşlukları küçültmek
                                },
                            },
                        }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>Paketteki Ürün</TableCell>
                                <TableCell>Adet</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>Son Kullanma Tarihi</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>Paket Ağırlığı</TableCell>
                                <TableCell>Raf</TableCell>
                                <TableCell>İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {paginatedPackages.length > 0 ? (
                                paginatedPackages.map((pkg) => (
                                    <TableRow key={pkg.id}>
                                        <TableCell >{pkg.id}</TableCell>
                                        <TableCell>{pkg.product.productName}</TableCell>
                                        <TableCell>{pkg.quantityOfProduct}</TableCell>
                                        <TableCell>
                                            {pkg.productExpDate ? (
                                                <>
                                                    {new Date(pkg.productExpDate).toLocaleDateString()}
                                                    <Typography sx={{ whiteSpace: 'nowrap', marginLeft: '5px' }} variant="caption" color={getDaysRemaining(pkg.productExpDate) <= 7 ? 'red' : 'green'}>
                                                        ({getDaysRemaining(pkg.productExpDate)} gün kaldı)
                                                    </Typography>
                                                </>
                                            ) : (
                                                '-'
                                            )}
                                        </TableCell>
                                        <TableCell>{pkg.packageWeight} kg</TableCell>
                                        <TableCell>{pkg.rack.location}</TableCell>
                                        <TableCell
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'nowrap',
                                                gap: '4px',
                                                '@media (max-width: 600px)': {
                                                    justifyContent: 'flex-start',
                                                },
                                            }}>
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    marginLeft: '5px',
                                                    padding: '3px',
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    border: '1px solid black',
                                                    '&:hover': {
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                    },
                                                }}>
                                                <EditNoteIcon sx={{ marginRight: '4px', fontSize: '18px' }} />
                                                Güncelle
                                            </Button>
                                            <Button
                                                onClick={() => handleExitPackage(pkg.id)}
                                                variant="contained"
                                                sx={{
                                                    marginLeft: '5px',
                                                    padding: '3px',
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    border: '1px solid black',
                                                    '&:hover': {
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                    },
                                                }}>
                                                <ExitToAppIcon sx={{ marginRight: '4px', fontSize: '17px' }} />
                                                Çıkart
                                            </Button>
                                            <Button
                                                onClick={() => handleShowQrCode(pkg.qrCode)}
                                                variant="contained"
                                                sx={{
                                                    marginLeft: '5px',
                                                    padding: '3px',
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                    border: '1px solid black',
                                                    '&:hover': {
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                    },
                                                }}>
                                                <QrCodeIcon sx={{ marginRight: '4px', fontSize: '17px' }} />
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

                {/* Sayfalandırma Kontrolleri */}
                <TablePagination
                    component="div"
                    count={filteredPackages.length} // Toplam öğe sayısı
                    page={page} // Aktif sayfa
                    onPageChange={handleChangePage} // Sayfa değiştirme
                    rowsPerPage={rowsPerPage} // Sayfada gösterilecek öğe sayısı
                    onRowsPerPageChange={handleChangeRowsPerPage} // Öğe sayısını değiştirme
                    rowsPerPageOptions={[5]} // Seçenekler
                />

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
