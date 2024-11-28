import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';  // Yönlendirme için React Router
import Paper from '@mui/material/Paper';  // Kağıt bileşeni

// 404 Sayfası Bileşeni
const NotFoundPage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>

            {/* 404 Başlık */}
            <Typography variant="h1" sx={{ fontSize: '100px', fontWeight: 'bold', color: '#ff5733' }}>
                404
            </Typography>

            {/* Sayfa Bulunamadı */}
            <Typography variant="h5" sx={{ marginBottom: '20px', color: '#555' }}>
                Oops! Sayfa Bulunamadı.
            </Typography>

            {/* Yönlendirme Mesajı */}
            <Typography variant="body1" sx={{ marginBottom: '30px', color: '#777' }}>
                İstediğiniz sayfa burada değil. Lütfen aşağıdaki bağlantıya tıklayarak ana sayfaya dönün.
            </Typography>

            {/* Ana Sayfaya Git Butonu */}
            <Button
                component={Link}
                to="/"  // Ana sayfaya yönlendirme
                variant="contained"
                sx={{
                    backgroundColor: '#003366',
                    padding: '5px 10px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    boxShadow: '2px 2px 12px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        backgroundColor: '#002244',
                        boxShadow: '2px 2px 15px rgba(0, 0, 0, 0.3)'
                    }
                }}>
                Ana Sayfaya Dön
            </Button>
        </Box>
    );
};

export default NotFoundPage;
