import React from 'react'
import PerformansGrafigi from '../components/PerformansGrafigi'
import { Paper } from '@mui/material'

function PersonelAnaliz() {

    return (
        <div>
            <h2>PERFORMANS GRAFİĞİ</h2>
            <Paper elevation={3} sx={{ padding: '1rem', marginTop: '1rem' }}>
                <PerformansGrafigi />
            </Paper>
        </div>
    )
}

export default PersonelAnaliz;
