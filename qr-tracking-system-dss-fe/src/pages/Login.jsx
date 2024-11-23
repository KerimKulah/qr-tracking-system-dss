import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock'; // Kilit simgesi

function Login() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Kullanıcı adı ve şifre boş bırakılamaz');
            return;
        }
        const userData = { username, password };
        dispatch(login(userData))
            .then(() => {
                navigate('/home');
            })
            .catch(() => {
                setError('Giriş başarısız.');
            });
    };

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '3rem',
                    width: '100%',
                    maxWidth: '400px',
                    margin: '0 auto',
                    boxShadow: 3,
                    backgroundColor: 'white',
                }}
            >
                <IconButton sx={{ backgroundColor: '#3f51b5', padding: '1rem', borderRadius: '50%' }}>
                    <LockIcon sx={{ color: 'white', fontSize: '2rem' }} />
                </IconButton>
                <Typography variant="h5" sx={{ marginBottom: '1.5rem', fontWeight: 'bold', color: '#3f51b5' }}>
                    Giriş Yap
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Kullanıcı Adı"
                        variant="outlined"
                        fullWidth
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{ marginBottom: '1.5rem' }}
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
                            backgroundColor: '#3f51b5',
                            '&:hover': {
                                backgroundColor: '#303f9f',
                            },
                            fontWeight: 'bold',
                        }}
                    >
                        Giriş Yap
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default Login;
