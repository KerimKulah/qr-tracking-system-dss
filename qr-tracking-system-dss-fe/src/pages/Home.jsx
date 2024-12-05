import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Box, Button, Modal, Paper, Typography, IconButton } from '@mui/material';
import PerformansGrafigi from '../components/PerformansGrafigi';
import { useMediaQuery } from '@mui/material';
import DepoGrafigi from '../components/DepoGrafigi';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUser } from '../redux/slices/userSlice';
import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';


function Home() {
    const isMobile = useMediaQuery('(max-width:600px)');
    const [role, setRole] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        dispatch(getCurrentUser());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setRole(user.role);
        }
    }, [user]);

    const handleOpenModal = (event) => {
        setOpenModal(true)
    };

    const handleCloseModal = (event) => {
        setOpenModal(false)
    };


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
                    <Typography variant="body1" sx={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                        Qrtaksis, depo ortamlarında ürünlerin etkili bir şekilde yönetilmesi, izlenmesi ve güncellenmesi amacıyla geliştirilmiş bir yazılımdır.
                        Mobil cihazlar aracılığıyla QR kodlarının okutulabilmesi ve ürün bilgilerine erişim sağlanabilmesi,
                        stokların güncellenmesi ve web üzerinden ürünlerin yönetilmesi üzerine kuruludur.
                        <Typography sx={{ marginTop: "0.5rem" }}>
                            Detaylı bilgi için nasıl kullanılır butonuna basınız.
                        </Typography>
                        <Button
                            onClick={handleOpenModal}
                            sx={{
                                marginTop: '0.75rem',
                                fontSize: '12px', // Daha küçük metin boyutu
                                height: '20px', // Buton yüksekliği
                                maxWidth: '350px',
                                backgroundColor: '#003366',
                                color: 'white', // Butonun metin rengi, okunabilirlik için beyaz yapıldı.
                                '&:hover': {
                                    backgroundColor: '#002244', // Hover durumunda daha koyu bir renk.
                                },
                            }}>
                            Qrtaksis Nasıl Kullanılır?
                        </Button>
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

            {/* SADECE ADMINLERDE GÖZÜKÜR BU KISIM */}
            {role === 'ADMIN' && (
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
            )}


            {/* NASIL KULLANILIR MODALI  */}
            <Modal open={openModal} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        maxHeight: '80vh',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        overflowY: 'auto',
                    }}>
                    <IconButton
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'grey.500',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography>
                        <strong>ÜRÜN EKLEME</strong>
                        <br />- Paket oluşturmadan önce, pakette olacak ürünün sisteme eklenmesi gerekmektedir.
                        <br /><br />

                        <strong>ÜRÜN LİSTESİ</strong>
                        <br />- Sistemde mevcut olan ürünleri ve bilgilerini görebilirsiniz.
                        <br />- Aktif olarak bir pakette bulunan ürün güncellenemez.
                        <br />- Daha önce bir paketle işlem görmüş bir ürün sistemden kaldırılamaz.
                        <br />- Depodaki mevcut stok durumunu kritik, orta veya iyi olarak takip edebilirsiniz.
                        <br /><br />

                        <strong>RAF EKLEME</strong>
                        <br />- Depoya yeni raf eklemek için kapasite ve konum bilgisi giriniz.
                        <br />- Konum aralığı: A1-Z100 (Genişletilebilir).
                        <br /><br />

                        <strong>PAKET GİRİŞİ</strong>
                        <br />- Tedarik edilen paketin giriş işlemini buradan yapabilirsiniz.
                        <br />- Ürün ve adet bilgilerini giriniz; sistem uygun rafları önerir.
                        <br />- Son Kullanma Tarihi (S.K.T) olan ürünler için tarihi seçiniz.
                        <br />- Başarılı giriş sonrası QR kod oluşturulur ve pakete yapıştırılır.
                        <br /><br />

                        <strong>QR</strong>
                        <br />- QR kodu kameradan okuttuğumuzda paketin bilgilerine (SKT, Ağırlık, İçerik, Konum) erişiyoruz.
                        <br />- QR kodu Paket Çıkışı sekmesinden okuttuğumuzda  paketin çıkışını hızlıca yapabiliyoruz.
                        <br />- Çok amaçlı bir QR karşılıyor burada bizi.
                        <br /><br />

                        <strong>RAF LİSTESİ</strong>
                        <br />- Rafların konumlarını, üzerindeki paketleri ve kapasitelerini görüntüleyebilirsiniz.
                        <br />- Üzerinde paket olan raflar güncellenemez veya silinemez.(Rafda değişiklik yapmak için
                        üzerinde paket olmaması gerekiyor.)
                        <br />- Depo kapasitesi bilgileri grafik olarak sunulur.
                        <br /><br />

                        <strong>PAKET LİSTESİ</strong>
                        <br />- Depomuzdaki paketleri buradan görebiliyoruz, paketlerin QR kodunu buradan tekrar bulabiliyoruz.
                        <br />- Paket çıkış ve güncelleme işlemlerini gerçekleştirebilirsiniz.
                        <br /><br />

                        <strong>PAKET ÇIKIŞI (QR)</strong>
                        <br />- QR kodu okutarak paket çıkışını onaylayabilir ve işlemi tamamlayabilirsiniz.
                        <br /><br />

                        <strong>PERSONEL LİSTESİ (SADECE ADMIN)</strong>
                        <br />- Personellerin hareketlerini ve işlemlerini izleyebilirsiniz.
                        <br />- Admin rolü verme ve personel çıkarma işlemleri burada yapılır.
                        <br /><br />

                        <strong>PERSONEL OLUŞTURMA (SADECE ADMIN)</strong>
                        <br />- Sisteme yeni personel ekleyebilirsiniz.
                        <br /><br />

                        <strong>PERFORMANS GRAFİĞİ (SADECE ADMIN)</strong>
                        <br />- Personelin son 7, 30 ve 90 günlük performansını izleyebilirsiniz.
                        <br />- Performans durumu (Verimli, Orta, Verimsiz) grafikte belirtilir.
                        <br /><br />

                        <strong>PROFİL AYARLARI (ŞİFRE DEĞİŞTİRME)</strong>
                        <br />- Şifre değişikliklerini bu sekmeden gerçekleştirebilirsiniz.
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}

export default Home;
