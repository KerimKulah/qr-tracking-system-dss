import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, deleteUser, makeAdmin, getMovements } from '../redux/slices/adminSlice';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, Box, Typography, TextField, TablePagination } from '@mui/material';
import { clearError, clearMessage } from '../redux/slices/adminSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

const Users = () => {
    const dispatch = useDispatch();
    const { users, userMovements, loading, error, message } = useSelector(state => state.admin);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // Arama terimi için state
    const [filteredUsers, setFilteredUsers] = useState([]); // Filtrelenmiş kullanıcılar için state
    const [userPage, setUserPage] = useState(0); // Kullanıcılar sayfa
    const [movementPage, setMovementPage] = useState(0); // Hareketler sayfa
    const [rowsPerUserPage, setRowsPerUserPage] = useState(5); // Kullanıcılar sayfa başına gösterilecek satır sayısı
    const [rowsPerMovementPage, setRowsPerMovementPage] = useState(5); // Hareketler sayfa başına gösterilecek satır sayısı


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
        setTimeout(() => {
            dispatch(clearMessage());
            dispatch(clearError());
        }, 1500);
    };

    const handleDeleteUser = async (userId) => {
        await dispatch(deleteUser(userId));
        dispatch(getAllUsers());
        setTimeout(() => {
            dispatch(clearMessage());
            dispatch(clearError());
        }, 1500);
    };

    // Kullanıcı sayfa değişimi
    const handleChangeUserPage = (event, newPage) => {
        setUserPage(newPage);
    };

    // Hareket sayfa değişimi
    const handleChangeMovementPage = (event, newPage) => {
        setMovementPage(newPage);
    };

    // Kullanıcılar sayfa başına satır değişimi
    const handleChangeRowsPerUserPage = (event) => {
        setRowsPerUserPage(parseInt(event.target.value, 10));
        setUserPage(0); // Sayfa sıfırlama
    };

    // Hareketler sayfa başına satır değişimi
    const handleChangeRowsPerMovementPage = (event) => {
        setRowsPerMovementPage(parseInt(event.target.value, 10));
        setMovementPage(0); // Sayfa sıfırlama
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
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>İsim Soyisim</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>Kullanıcı Adı</TableCell>
                                <TableCell>Rol</TableCell>
                                <TableCell>İşlemler</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsers.slice(userPage * rowsPerUserPage, userPage * rowsPerUserPage + rowsPerUserPage).map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.fullName}</TableCell>
                                    <TableCell>{user.username}</TableCell>
                                    <TableCell>{user.role}</TableCell>
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
                                            onClick={() => handleMakeAdmin(user.id)}
                                            color="primary"
                                            variant="contained"
                                            sx={{
                                                whiteSpace: 'nowrap',
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
                                            <AdminPanelSettingsIcon sx={{ marginRight: '3px', fontSize: '18px' }} />
                                            Admin Yap
                                        </Button>
                                        <Button
                                            onClick={() => handleDeleteUser(user.id)}
                                            variant="contained"
                                            sx={{
                                                whiteSpace: 'nowrap',
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
                                            Sil
                                        </Button>
                                        <Button
                                            onClick={() => handleOpenMovements(user.id)}
                                            variant="contained"
                                            sx={{
                                                whiteSpace: 'nowrap',
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
                                            <FingerprintIcon sx={{ marginRight: '3px', fontSize: '18px' }} />
                                            Hareketler
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TablePagination
                    rowsPerPageOptions={[5]}
                    component="div"
                    count={filteredUsers.length}
                    rowsPerPage={rowsPerUserPage}
                    page={userPage}
                    onPageChange={handleChangeUserPage}
                    onRowsPerPageChange={handleChangeRowsPerUserPage}
                />
            </Paper>

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
                        width: { xs: '90%', sm: 700 },
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: { xs: 2, sm: 4 },
                        borderRadius: 2,
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
                                    <TableCell>Paketteki Ürün</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {userMovements.slice(movementPage * rowsPerMovementPage, movementPage * rowsPerMovementPage + rowsPerMovementPage).map((movement) => (
                                    <TableRow key={movement.id}>
                                        <TableCell>{movement.id}</TableCell>
                                        <TableCell>{movement.movementDate}</TableCell>
                                        <TableCell>{movement.movementType}</TableCell>
                                        <TableCell>{movement.packageId}</TableCell>
                                        <TableCell>{movement.productName}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <Typography id="movements-modal-description">
                            Bu kullanıcı için hareket bulunmamaktadır.
                        </Typography>
                    )}
                    <TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        count={userMovements.length}
                        rowsPerPage={rowsPerMovementPage}
                        page={movementPage}
                        onPageChange={handleChangeMovementPage}
                        onRowsPerPageChange={handleChangeRowsPerMovementPage}
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default Users;
