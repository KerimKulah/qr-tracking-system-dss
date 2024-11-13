import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slices/authSlice'
import { useState } from 'react'
import { Box, Typography, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';

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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem',
                width: '100%',
                maxWidth: '400px',
                margin: '0 auto',
                boxShadow: 3,
                borderRadius: '8px',
                backgroundColor: 'white',
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                Giriş Yap
            </Typography>

            {error && (
                <Typography color="error" sx={{ marginBottom: '1rem' }}>
                    {error}
                </Typography>
            )}

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
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
                    sx={{ marginBottom: '1rem' }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ padding: '10px' }}
                >
                    Giriş Yap
                </Button>
            </form>
        </Box>
    );
}

export default Login;