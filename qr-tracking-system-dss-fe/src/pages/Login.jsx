import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    Paper,
    Input,
} from '@mui/material';

function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Kullanıcı adı veya şifre boş bırakılamaz');
            return;
        }
        const userData = { username, password };
        dispatch(login(userData))
            .then(() => navigate('/home'))
            .catch(() => setError('Giriş başarısız.'));
    };

    return (
        <>
            <style>
                {`
                    html, body {
                        margin: 0;
                        padding: 0;
                        width: 100%;
                        height: 100%;
                        overflow: hidden; 
                    }
                    @media (max-width: 900px) {
                        .left-panel {
                            display: none;
                        }
                    }
                `}
            </style>

            <Box
                sx={{
                    display: 'flex',
                    height: '100vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        display: 'flex',
                        width: '80%',
                        height: '450px',
                        maxWidth: '1200px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                    }}
                >
                    {/* Sol Panel */}
                    <Box
                        className="left-panel"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            backgroundColor: '#003366',
                            color: 'white',
                            padding: '3rem',
                            flex: 1, // Take remaining space
                        }}
                    >
                        <img
                            src="https://i.hizliresim.com/3vm68u7.png"
                            alt="Qrtaksis Logo"
                            style={{ maxWidth: '180px', marginBottom: '1.5rem' }}
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                textAlign: 'center',
                                maxWidth: '400px',
                                lineHeight: '1.6',
                                fontSize: '1.1rem',
                            }}
                        >
                            Yeni nesil depo takip sistemi. QR kodlar ile paket çıkışı ve takip süreçlerinizi hızlandırın!
                        </Typography>
                    </Box>

                    {/* Sağ Panel */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '3rem',
                            backgroundColor: 'white',
                            flex: 1,
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: 400,
                            }}
                        >
                            <Typography
                                variant="h5"
                                sx={{
                                    fontWeight: 'bold',
                                    color: '#003366',
                                    textAlign: 'center',
                                    marginBottom: '1.5rem',
                                }}
                            >
                                Kullanıcı Girişi
                            </Typography>

                            {error && (
                                <Alert severity="error" sx={{ marginBottom: '1.5rem' }}>
                                    {error}
                                </Alert>
                            )}

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Kullanıcı Adı"
                                    variant="outlined"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    sx={{ marginBottom: '1rem' }}
                                />
                                <TextField
                                    label="Şifre"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    sx={{ marginBottom: '1.5rem' }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{
                                        padding: '10px',
                                        backgroundColor: '#003366',
                                        '&:hover': {
                                            backgroundColor: '#002244',
                                        },
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Giriş Yap
                                </Button>
                            </form>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </>
    );
}

export default Login;
