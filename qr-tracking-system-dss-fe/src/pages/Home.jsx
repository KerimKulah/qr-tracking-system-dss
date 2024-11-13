import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Paper, Typography } from '@mui/material';

function Home() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Paper
                elevation={3}
                sx={{
                    padding: '2rem',
                    width: '100%',
                    maxWidth: '800px',
                    borderRadius: '8px',
                    bgcolor: 'background.paper',
                }}>
                <Typography variant="h4" component="h1" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                    Ana Sayfadasınız!
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1.5rem' }}>
                    Bu panel üzerinden sistemdeki işlemlerinizi hızlı ve kolay bir şekilde gerçekleştirebilirsiniz. Yandaki menüden gerekli sekmelere erişim sağlayarak işlemlerinizi yönetebilirsiniz.
                </Typography>
                <Typography variant="h6" component="h2" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                    Proje Tanımı
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1.5rem' }}>
                    Qrtaksis, depo ortamlarında ürünlerin etkili bir şekilde yönetilmesi, izlenmesi ve güncellenmesi amacıyla geliştirilmiş bir yazılımdır. Mobil cihazlar aracılığıyla QR kodlarının okutulabilmesi ve ürün bilgilerine erişim sağlanabilmesi, stokların güncellenmesi ve web üzerinden ürünlerin yönetilmesi üzerine kuruludur.
                </Typography>
                <Typography variant="h6" component="h2" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                    Yapımcı Hakkında
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '1.5rem' }}>
                    Bu proje, Mehmet Kerim Külah tarafından geliştirilmiştir.
                </Typography>
                <Typography variant="h6" component="h2" sx={{ marginBottom: '1rem', fontWeight: 'bold' }}>
                    İletişim
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
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
    );
}

export default Home;