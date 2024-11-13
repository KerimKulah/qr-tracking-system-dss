import React from 'react';
import { Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login');
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', width: '100%', padding: '1rem', marginTop: 'auto', }}>
            <Button sx={{ padding: '10px 15px', backgroundColor: '#003366', color: 'white', '&:hover': { backgroundColor: '#002244', }, textTransform: 'none', width: '100%', }}
                onClick={handleLogout}>
                Oturumu Kapat
            </Button>
        </Box>
    );
}

export default LogoutButton;
