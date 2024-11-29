import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Paper, Typography } from '@mui/material';
import PerformansGrafigi from '../components/PerformansGrafigi';
import { useMediaQuery } from '@mui/material';
import DepoGrafigi from '../components/DepoGrafigi';

function Home() {
    const isMobile = useMediaQuery('(max-width:600px)');
    return (
        <>
            <h2>ANA SAYFA</h2>
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <Paper
                    elevation={3}
                    sx={{
                        padding: '1rem',
                        width: '100%'
                    }}>
                    <Typography variant="h7" component="h7" sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Proje Tanımı :
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                        Qrtaksis, depo ortamlarında ürünlerin etkili bir şekilde yönetilmesi, izlenmesi ve güncellenmesi amacıyla geliştirilmiş bir yazılımdır.
                        Mobil cihazlar aracılığıyla QR kodlarının okutulabilmesi ve ürün bilgilerine erişim sağlanabilmesi,
                        stokların güncellenmesi ve web üzerinden ürünlerin yönetilmesi üzerine kuruludur.
                    </Typography>
                    <Typography variant="h7" component="h7" sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Yapımcı Hakkında :
                    </Typography>
                    <Typography variant="body1" sx={{ marginBottom: '1rem' }}>
                        Bu proje, Mehmet Kerim Külah tarafından geliştirilmiştir.
                    </Typography>
                    <Typography variant="h7" component="h7" sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        İletişim :
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Typography variant="body1">Beni takip edebilirsiniz:</Typography>
                        <a href="https://github.com/KerimKulah" target="_blank" rel="noopener noreferrer">
                            <GitHubIcon sx={{ fontSize: 30, color: '#003366' }} />
                        </a>
                        <a href="https://www.linkedin.com/in/kerimkulah" target="_blank" rel="noopener noreferrer">
                            <LinkedInIcon sx={{ fontSize: 30, color: '#003366' }} />
                        </a>
                    </Box>
                </Paper>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
                <Paper elevation={3} sx={{ padding: '1rem', marginTop: '1rem', width: isMobile ? '100%' : '50%' }}>
                    <Typography variant="h7" component="h7" sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Personel Performans Grafiği :
                    </Typography>
                    <PerformansGrafigi />
                </Paper>
                <Paper elevation={3} sx={{ width: isMobile ? '100%' : '50%', padding: '1rem', marginTop: '1rem' }}>
                    <Typography variant="h7" component="h7" sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
                        Depo Kapasite Grafiği :
                    </Typography>
                    <DepoGrafigi />
                </Paper>
            </Box>
        </>
    );
}

export default Home;
