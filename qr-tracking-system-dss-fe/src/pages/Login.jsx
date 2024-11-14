import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../redux/slices/authSlice'
import { useState } from 'react'
import { Box, Typography, TextField, Button, Alert } from '@mui/material'
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
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '90vh',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '800px',
                    margin: '0 auto',
                    boxShadow: 3,
                }}>
                <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
                    Giriş Yap
                </Typography>

                {error && (<Alert severity="error" sx={{ mb: 2, width: '100%' }}> {error}</Alert>)}

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
                        fullWidth
                        sx={{
                            padding: '10px',
                            backgroundColor: '#3f51b5',
                            '&:hover': {
                                backgroundColor: '#303f9f',
                            },
                            fontWeight: 'bold',
                        }}>
                        Giriş Yap
                    </Button>
                </form>
            </Box>
        </div>
    );
}

export default Login;