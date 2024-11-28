import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '../redux/slices/userSlice';
import { TextField, Button, Alert, Paper } from '@mui/material';

const ChangePassword = () => {
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { loading } = useSelector((state) => state.user);

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorMessage('Şifreler eşleşmiyor.');
            return;
        }

        try {
            const resultAction = await dispatch(changePassword({ newPassword }));
            if (changePassword.fulfilled.match(resultAction)) {
                setSuccessMessage('Şifre başarıyla değiştirildi.');
                setErrorMessage('');
                setNewPassword('');
                setConfirmPassword('');
            } else {
                setErrorMessage('Şifre değiştirme sırasında bir hata oluştu.');
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage('Beklenmedik bir hata oluştu.');
            setSuccessMessage('');
        }
    };

    return (
        <>

            <h2>ŞİFRE DEĞİŞTİRME</h2>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

            <Paper
                elevation={3}
                sx={{
                    padding: '1rem',
                    width: '100%',
                }}>
                <form onSubmit={handleChangePassword}>
                    <TextField
                        label="Yeni Şifre"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <TextField
                        label="Yeni Şifreyi Onayla"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={loading}
                        sx={{ mt: 2, backgroundColor: '#003366', color: 'white', '&:hover': { backgroundColor: '#002244', } }}
                    >
                        {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                    </Button>
                </form>
            </Paper>
        </>

    );
};

export default ChangePassword;