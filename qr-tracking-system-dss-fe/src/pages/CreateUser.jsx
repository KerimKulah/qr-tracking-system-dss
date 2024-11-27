import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../redux/slices/adminSlice';
import { Button, TextField, Typography, Box, CircularProgress, Alert, Paper } from '@mui/material';
import { useEffect } from 'react';
import { clearError, clearMessage } from '../redux/slices/adminSlice';

const CreateUser = () => {
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector(state => state.admin);
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState(null);

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(clearError());
    }, [dispatch]);

    const validateForm = () => {
        const fullNamePattern = /^[A-Za-zÇĞİÖŞÜçğıöşü]+\s[A-Za-zÇĞİÖŞÜçğıöşü]+$/;
        if (!fullNamePattern.test(fullName)) {
            setValidationError("Ad soyad sadece harflerden oluşmalı ve bir boşluk ile ayrılmalıdır");
            return false;
        }
        if (!username.trim()) {
            setValidationError("Kullanıcı adı boş olamaz");
            return false;
        }
        if (!password.trim()) {
            setValidationError("Şifre boş olamaz");
            return false;
        }
        setValidationError(null);
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        dispatch(createUser({ fullName, username, password }));
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Kullanıcı Oluştur
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Ad Soyad"
                    variant="outlined"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Kullanıcı Adı"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Şifre"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#003366', color: 'white', '&:hover': { backgroundColor: '#002244', },
                        mt: 2,
                    }}
                >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Oluştur"}
                </Button>
            </form>

            {validationError && <Alert severity="error" sx={{ mt: 2 }}>{validationError}</Alert>}
            {error && !validationError && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {message && !error && !validationError && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
        </Paper>
    );
};

export default CreateUser;
