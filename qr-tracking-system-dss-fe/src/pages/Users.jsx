import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser, makeAdmin, getMovements } from '../redux/slices/adminSlice';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Typography, TextField } from '@mui/material';
import { clearError, clearMessage } from '../redux/slices/adminSlice';

const Users = () => {
    const dispatch = useDispatch();
    const { users, userMovements, loading, error, message } = useSelector(state => state.admin);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // Arama terimi için state
    const [filteredUsers, setFilteredUsers] = useState([]); // Filtrelenmiş kullanıcılar için state

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(clearError());
        dispatch(getAllUsers());
    }, [dispatch]);

    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.role.toLowerCase().includes(searchTerm.toLowerCase())
            ));
    }, [users, searchTerm]);

    const handleOpenMovements = (userId) => {
        setSelectedUserId(userId);
        dispatch(getMovements(userId));
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleMakeAdmin = (userId) => {
        dispatch(makeAdmin(userId));
        dispatch(getAllUsers());
    };

    const handleDeleteUser = async (userId) => {
        await dispatch(deleteUser(userId));
        dispatch(getAllUsers());
    };

    return (
        <div>
            <h2>PERSONEL LİSTESİ</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            <Paper
                elevation={3}
                sx={{
                    padding: '1rem',
                    width: '100%',
                }}>
                <TextField
                    label="Personel Ara"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="İsim, kullanıcı adı veya rol arayın..."
                />

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>İsim Soyisim</TableCell>
                                <TableCell>Kullanıcı Adı</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.role}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleMakeAdmin(user.id)} variant="outlined" color="primary">Admin Yap</Button>
                                        <Button onClick={() => handleDeleteUser(user.id)} variant="outlined" color="secondary" style={{ marginLeft: 8 }}>Sil</Button>
                                        <Button onClick={() => handleOpenMovements(user.id)} variant="outlined" color="info" style={{ marginLeft: 8 }}>Hareketlerini Göster</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Hareketler Modal */}
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="movements-modal-title"
                    aria-describedby="movements-modal-description"
                >
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: { xs: '90%', sm: 600 }, // Mobilde genişlik %90, daha büyük ekranlarda 600px
                            maxHeight: '90vh', // Yükseklik kısıtlaması, taşmayı önler
                            overflowY: 'auto', // İçeriğin taşması durumunda kaydırma sağlar
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            p: { xs: 2, sm: 4 }, // Mobilde padding daha az, büyük ekranlarda daha fazla
                            borderRadius: 2, // Daha yumuşak kenarlar için
                        }}
                    >
                        <Typography id="movements-modal-title" variant="h6" component="h2">
                            Kullanıcı Hareketleri
                        </Typography>
                        {userMovements.length > 0 ? (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Tarih</TableCell>
                                        <TableCell>Tür</TableCell>
                                        <TableCell>Paket ID</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {userMovements.map((movement) => (
                                        <TableRow key={movement.id}>
                                            <TableCell>{movement.id}</TableCell>
                                            <TableCell>{movement.movementDate}</TableCell>
                                            <TableCell>{movement.movementType}</TableCell>
                                            <TableCell>{movement.packageId}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <Typography id="movements-modal-description">
                                Bu kullanıcı için hareket bulunmamaktadır.
                            </Typography>
                        )}
                    </Box>
                </Modal>
            </Paper>
        </div>
    );
};

export default Users;
