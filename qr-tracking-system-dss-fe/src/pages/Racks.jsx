import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRacks, deleteRack, updateRack } from '../redux/slices/rackSlice';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Typography, Modal, TextField, Box, TableContainer, Paper } from '@mui/material';
import { clearError, clearMessage } from '../redux/slices/rackSlice';


const Racks = () => {
    const dispatch = useDispatch();
    const { racks, error, message } = useSelector((state) => state.rack);
    const [openModal, setOpenModal] = useState(false);
    const [selectedRack, setSelectedRack] = useState(null);
    const [errors, setErrors] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRacks, setFilteredRacks] = useState([]);

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
        dispatch(deleteRack(rackId));
    };

    const handleViewPackages = (rackId) => {
        console.log('Paketleri Görüntüle:', rackId);
    };

    const handleChange = (e) => {
        setSelectedRack({ ...selectedRack, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2>Raf Listesi</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}

            <TextField
                label="Raf Ara"
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Raf, konum veya ağırlık arayın..."
            />

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Konum</TableCell>
                            <TableCell>Maksimum Kapasite</TableCell>
                            <TableCell>Mevcut Ağırlık</TableCell>
                            <TableCell>Boş Ağırlık</TableCell>
                            <TableCell>Aksiyonlar</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredRacks.map((rack) => (
                            <TableRow key={rack.id}>
                                <TableCell>{rack.id}</TableCell>
                                <TableCell>{rack.location}</TableCell>
                                <TableCell>{rack.maxWeightCapacity} kg</TableCell>
                                <TableCell>{rack.currentWeight} kg</TableCell>
                                <TableCell>{rack.freeWeight} kg</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="primary" onClick={() => handleUpdateClick(rack)} style={{ marginRight: '8px' }}>
                                        Güncelle
                                    </Button>
                                    <Button variant="outlined" color="secondary" onClick={() => handleDelete(rack.id)} style={{ marginRight: '8px' }} >
                                        Sil
                                    </Button>
                                    <Button variant="outlined" onClick={() => handleViewPackages(rack.id)}
                                    >
                                        Paketler
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

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
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Rafı Güncelle
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
        </div>
    );
};

export default Racks;
