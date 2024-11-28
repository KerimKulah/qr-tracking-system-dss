import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRack } from '../redux/slices/rackSlice';
import { clearError, clearMessage } from '../redux/slices/rackSlice';
import { Button, TextField, Typography, Box, CircularProgress, Alert, Paper } from '@mui/material';

const RackAdd = () => {
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector((state) => state.rack);
    const [location, setLocation] = useState('');
    const [maxWeightCapacity, setMaxWeightCapacity] = useState('');
    const [validationError, setValidationError] = useState(null);

    useEffect(() => {
        dispatch(clearMessage());
        dispatch(clearError());
    }, [dispatch]);

    const validateForm = () => {
        const locationPattern = /^[A-Z]([1-9][0-9]?|100)$/; // A1 ile Z100 arasında kontrol
        if (!locationPattern.test(location)) {
            setValidationError('Konum A1 ile Z100 arasında olmalıdır');
            return false;
        }
        if (!maxWeightCapacity || isNaN(maxWeightCapacity) || maxWeightCapacity < 100) {
            setValidationError('Maksimum ağırlık kapasitesi 100 veya daha fazla bir sayı olmalıdır');
            return false;
        }
        setValidationError(null);
        return true;
    };

    const isFormValid = () => {
        const locationPattern = /^[A-Z]([1-9][0-9]?|100)$/;
        const isLocationValid = locationPattern.test(location);
        const isWeightValid = maxWeightCapacity && !isNaN(maxWeightCapacity) && maxWeightCapacity >= 100;

        return isLocationValid && isWeightValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        dispatch(addRack({ location, maxWeightCapacity: parseFloat(maxWeightCapacity) }));
    };

    return (
        <>
            <h2>RAF EKLEME</h2>
            <Paper elevation={3} sx={{ mx: 'auto', mt: 4, p: 3 }}>
                <Typography variant="body1" component="body1" >
                    Konum A1 ile Z100 arasında olmalıdır ve Ağrılık kapasitesi en az 100 kg olmalıdır.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Konum (ör. A1)"
                        variant="outlined"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Maksimum Ağırlık Kapasitesi (kg)"
                        variant="outlined"
                        type="number"
                        value={maxWeightCapacity}
                        onChange={(e) => setMaxWeightCapacity(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={!isFormValid() || loading} // Buton sadece form geçerli ve loading değilse aktif
                        sx={{
                            fontWeight: 'bold',
                            backgroundColor: '#003366',
                            color: 'white',
                            '&:hover': { backgroundColor: '#002244' },
                            mt: 2,
                        }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Ekle'}
                    </Button>
                </form>

                {validationError && <Alert severity="error" sx={{ mt: 2 }}>{validationError}</Alert>}
                {error && !validationError && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
                {message && !error && !validationError && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
            </Paper>
        </>
    );
};

export default RackAdd;
