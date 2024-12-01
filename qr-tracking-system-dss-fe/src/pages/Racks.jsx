import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRacks, deleteRack, updateRack } from '../redux/slices/rackSlice';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Modal, TextField, Box, TableContainer, Paper, TablePagination } from '@mui/material';
import { clearError, clearMessage } from '../redux/slices/rackSlice';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Inventory } from '@mui/icons-material';
import { getRackPackages } from '../redux/slices/rackSlice';


const Racks = () => {
    const dispatch = useDispatch();
    const { racks, error, message, rackPackages } = useSelector((state) => state.rack);
    const [openModal, setOpenModal] = useState(false);
    const [selectedRack, setSelectedRack] = useState(null);
    const [errors, setErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRacks, setFilteredRacks] = useState([]);
    const [page, setPage] = useState(0);  // Sayfa numarası
    const [rowsPerPage, setRowsPerPage] = useState(5);  // Sayfa başına satır sayısı
    const [openPackagesModal, setOpenPackagesModal] = useState(false);
    const [packagesPage, setPackagesPage] = useState(0);  // Geçerli sayfa
    const [rowsPerPackagesPage, setRowsPerPackagesPage] = useState(5);  // Sayfa başına satır sayısı

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(clearError());
        dispatch(getRacks());
    }, [dispatch]);

    useEffect(() => {
        setFilteredRacks(
            racks.filter((rack) =>
                rack.location.toLowerCase().includes(searchTerm.toLowerCase())
                || rack.maxWeightCapacity.toString().includes(searchTerm)
                || rack.currentWeight.toString().includes(searchTerm)
                || rack.freeWeight.toString().includes(searchTerm)
                || rack.id.toString().includes(searchTerm)
            ));
    }, [racks, searchTerm]);

    // PAKET MODALI İÇİN SAYFALAMA
    const handleChangePackagesPage = (event, newPage) => {
        setPackagesPage(newPage);  // Sayfa numarasını güncelle
    };
    const handleChangeRowsPerPackagesPage = (event) => {
        setRowsPerPackagesPage(parseInt(event.target.value, 10));  // Sayfa başına gösterilecek satır sayısını güncelle
        setPackagesPage(0);  // Sayfa numarasını sıfırla
    };
    const displayedPackages = rackPackages.slice(packagesPage * rowsPerPackagesPage, packagesPage * rowsPerPackagesPage + rowsPerPackagesPage);

    // Grafik
    ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);
    const totalCapacity = racks.reduce((sum, rack) => sum + rack.maxWeightCapacity, 0);
    const totalCurrentWeight = racks.reduce((sum, rack) => sum + rack.currentWeight, 0);
    const freeSpace = totalCapacity - totalCurrentWeight;
    const chartData = {
        labels: ['Doluluk', 'Boş Alan'],
        datasets: [
            {
                data: [totalCurrentWeight, freeSpace],
                backgroundColor: ['#003366', 'rgba(255, 99, 132, 0.6)'],
                hoverBackgroundColor: ['#002244', 'rgba(255, 99, 132, 0.8)'],
            },
        ],
    };
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    // Sayfa değişimi 
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);  // 
    };


    const handleUpdateClick = (rack) => {
        setSelectedRack(rack);
        setErrors({});
        setOpenModal(true);
        dispatch(getRacks());
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedRack(null);
        setErrors({});
    };

    const validateForm = () => {
        let newErrors = {};
        if (!selectedRack.maxWeightCapacity) {
            newErrors.maxWeightCapacity = "Rafın maksimum kapasitesi gerekli.";
        } else if (selectedRack.maxWeightCapacity < 100) {
            newErrors.maxWeightCapacity = "Rafın maksimum kapasitesi 100 veya daha fazla olmalıdır.";
        }

        if (!selectedRack.location) {
            newErrors.location = "Rafın konumu belirtilmeli.";
        } else if (!/^[A-Z]([1-9][0-9]?|100)$/.test(selectedRack.location)) {
            newErrors.location = "Konum A1 ile Z100 arasında olmalıdır.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleUpdateSubmit = () => {
        if (validateForm()) {
            dispatch(updateRack(selectedRack)).then(() => {
                dispatch(getRacks());
            });
            handleCloseModal();
        }
    };

    const handleDelete = (rackId) => {
        dispatch(deleteRack(rackId)).then(() => {
            setTimeout(() => {
                dispatch(getRacks());
            }, 1000);
        });
    };

    const handleViewPackages = (rackId) => {
        dispatch(getRackPackages(rackId)).then(() => {
            dispatch(clearMessage());
            dispatch(clearError());
            setOpenPackagesModal(true);
        });
    };

    const handleClosePackagesModal = () => {
        setOpenPackagesModal(false);
    };

    const handleChange = (e) => {
        setSelectedRack({ ...selectedRack, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ height: '90vh' }}>
            <h2>RAF LİSTESİ</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}

            <Paper
                elevation={3}
                sx={{
                    padding: '1rem',
                    width: '100%',
                }}>

                <TextField
                    label="Raf Ara"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Raf, konum veya ağırlık arayın..."
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
                                <TableCell>Konum</TableCell>
                                <TableCell>Maksimum Kapasite</TableCell>
                                <TableCell>Mevcut Ağırlık</TableCell>
                                <TableCell>Kalan Kapasite</TableCell>
                                <TableCell>Aksiyonlar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRacks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rack) => (
                                <TableRow key={rack.id}>
                                    <TableCell>{rack.id}</TableCell>
                                    <TableCell>{rack.location}</TableCell>
                                    <TableCell>{rack.maxWeightCapacity} kg</TableCell>
                                    <TableCell>{rack.currentWeight} kg</TableCell>
                                    <TableCell>{rack.freeWeight} kg</TableCell>
                                    <TableCell
                                        sx={{
                                            display: 'flex', // Flexbox düzeni
                                            flexWrap: 'nowrap', // Alt alta geçmeyi önler
                                            gap: '4px', // Butonlar arası boşluk
                                            '@media (max-width: 600px)': {
                                                justifyContent: 'flex-start', // Mobilde hizalama
                                            },
                                        }}>
                                        <Button
                                            onClick={() => handleUpdateClick(rack)}
                                            variant="contained"
                                            sx={{
                                                marginLeft: '5px',
                                                padding: '3px',
                                                backgroundColor: 'white',  // İç kısım beyaz
                                                color: 'black',  // Yazı rengi siyah
                                                border: '1px solid black',  // Siyah border
                                                '&:hover': {
                                                    backgroundColor: 'black',  // Hover durumunda arka plan siyah olacak
                                                    color: 'white',  // Hover durumunda yazı beyaz olacak
                                                },
                                            }} >
                                            <EditNoteIcon sx={{ marginRight: '4px', fontSize: '18px' }} />
                                            Güncelle
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleDelete(rack.id)}
                                            sx={{
                                                marginLeft: '5px',
                                                padding: '3px',
                                                backgroundColor: 'white',  // İç kısım beyaz
                                                color: 'black',  // Yazı rengi siyah
                                                border: '1px solid black',  // Siyah border
                                                '&:hover': {
                                                    backgroundColor: 'black',  // Hover durumunda arka plan siyah olacak
                                                    color: 'white',  // Hover durumunda yazı beyaz olacak
                                                },
                                            }} >
                                            <DeleteIcon sx={{ marginRight: '3px', fontSize: '18px' }} />
                                            SİL
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={() => handleViewPackages(rack.id)}
                                            sx={{
                                                marginLeft: '5px',
                                                padding: '3px',
                                                backgroundColor: 'white',  // İç kısım beyaz
                                                color: 'black',  // Yazı rengi siyah
                                                border: '1px solid black',  // Siyah border
                                                '&:hover': {
                                                    backgroundColor: 'black',  // Hover durumunda arka plan siyah olacak
                                                    color: 'white',  // Hover durumunda yazı beyaz olacak
                                                },
                                            }} >
                                            <Inventory sx={{ marginRight: '5px', fontSize: '18px' }} />
                                            Paketler
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Sayfalama */}
                <TablePagination
                    component="div"
                    count={filteredRacks.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5]}
                />


                {/* Paketler Modalı */}
                <Modal open={openPackagesModal} onClose={handleClosePackagesModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 600,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Paketler
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Paket ID</TableCell>
                                        <TableCell>Paketteki Ürün</TableCell>
                                        <TableCell>Paket Ağırlığı</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {displayedPackages.map((packageItem) => (
                                        <TableRow key={packageItem.id}>
                                            <TableCell>{packageItem.id}</TableCell>
                                            <TableCell>{packageItem.product.productName}</TableCell>
                                            <TableCell>{packageItem.packageWeight} kg</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Sayfalama bileşeni */}
                        <TablePagination
                            rowsPerPageOptions={[5]}  // Sayfa başına 5 paket göster
                            component="div"
                            count={rackPackages.length}  // Tüm paketlerin sayısı
                            rowsPerPage={rowsPerPackagesPage}  // Sayfa başına gösterilen paket sayısı
                            page={packagesPage}  // Geçerli sayfa
                            onPageChange={handleChangePackagesPage}  // Sayfa numarası değiştiğinde çağrılır
                            onRowsPerPageChange={handleChangeRowsPerPackagesPage}  // Sayfa başına gösterilen paket sayısı değiştiğinde çağrılır
                        />

                        <Button
                            variant="contained"
                            onClick={handleClosePackagesModal}
                            sx={{ marginTop: '1rem', backgroundColor: '#003366', color: 'white' }}
                        >
                            Kapat
                        </Button>
                    </Box>
                </Modal>


                {/* Güncelleme Modalı */}
                <Modal open={openModal} onClose={handleCloseModal}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: 4,
                            borderRadius: 2,
                        }}>
                        <Typography variant="h6" gutterBottom>
                            Rafı Güncelle
                        </Typography>
                        <Typography variant="h7" gutterBottom>
                            Not : Paket bulunan rafın ağırlığı değiştirilemez.
                        </Typography>
                        <TextField
                            label="Maksimum Kapasite"
                            name="maxWeightCapacity"
                            type="number"
                            value={selectedRack?.maxWeightCapacity || ''}
                            onChange={handleChange}
                            error={Boolean(errors.maxWeightCapacity)}
                            helperText={errors.maxWeightCapacity}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Konum"
                            name="location"
                            value={selectedRack?.location || ''}
                            onChange={handleChange}
                            error={Boolean(errors.location)}
                            helperText={errors.location}
                            fullWidth
                            margin="normal"
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                            <Button variant="contained" color="primary" onClick={handleUpdateSubmit}>
                                Kaydet
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                                İptal
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </Paper>


            {/*  Doluluk Grafiği */}
            <Paper elevation={3} sx={{ padding: '1rem', marginTop: '2rem', maxHeight: { xs: '500px', sm: '250px' }, display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Doughnut data={chartData} options={chartOptions} />
                <Box
                    sx={{
                        width: { xs: '100%', sm: '60%' },
                        marginLeft: { sm: '2rem', xs: 0 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: { xs: 'column', sm: 'row' },
                        marginTop: { xs: '1rem', sm: 0 }
                    }}
                >
                    <Typography variant="body1"><b>Depo Toplam Kapasite:</b> {totalCapacity} kg</Typography>
                    <Typography variant="body1"><b>Doluluk:</b> {totalCurrentWeight} kg</Typography>
                    <Typography variant="body1"><b>Toplam Kalan Kapasite:</b> {freeSpace} kg</Typography>
                </Box>
            </Paper>

            {/* Burada DepoGrafigi componenti eklenmeli manuel olan kaldırılmalı */}
        </div>
    );
};

export default Racks;
