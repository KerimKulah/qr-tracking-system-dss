import React from 'react'
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRacks } from '../redux/slices/rackSlice';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';


function DepoGrafigi() {
    const { racks, error, message, rackPackages } = useSelector((state) => state.rack);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRacks());
    }, [dispatch]);

    // Grafik
    ChartJS.register(ArcElement, CategoryScale, LinearScale, Tooltip, Legend);
    const totalCapacity = racks.reduce((sum, rack) => sum + rack.maxWeightCapacity, 0);
    const totalCurrentWeight = racks.reduce((sum, rack) => sum + rack.currentWeight, 0);
    const freeSpace = totalCapacity - totalCurrentWeight;
    const chartData = {
        labels: ['Doluluk', 'Boş Alan'],
        datasets: [
            {
                data: [totalCurrentWeight, freeSpace],
                backgroundColor: ['#003366', 'rgba(255, 99, 132, 0.6)'],
                hoverBackgroundColor: ['#002244', 'rgba(255, 99, 132, 0.8)'],
            },
        ],
    };
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };


    return (
        <Box>
            <Box sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <Box>
                    <Doughnut data={chartData} options={chartOptions} />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        marginLeft: { sm: '2rem', xs: 0 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'column',
                        marginTop: { xs: '1rem', sm: '2rem' }
                    }}
                >
                    <Typography variant="body1"><b>Depo Toplam Kapasite:</b> {totalCapacity} kg</Typography>
                    <Typography variant="body1"><b>Doluluk:</b> {totalCurrentWeight} kg</Typography>
                    <Typography variant="body1"><b>Toplam Kalan Kapasite:</b> {freeSpace} kg</Typography>
                </Box>
            </Box>
        </Box >
    )
}

export default DepoGrafigi