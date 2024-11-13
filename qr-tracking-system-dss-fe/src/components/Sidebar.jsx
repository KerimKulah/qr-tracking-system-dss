import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon, Collapse, Typography, Divider, Box, IconButton, Drawer } from '@mui/material';
import { ExpandLess, ExpandMore, Inventory, Category, Menu, AlignHorizontalLeft, People, Settings } from '@mui/icons-material';
import LogoutButton from './LogoutButton';

function Sidebar() {
    const [openMenu, setOpenMenu] = useState({});
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleMenu = (menu) => {
        setOpenMenu((prevState) => ({
            ...prevState,
            [menu]: !prevState[menu],
        }));
    };

    const toggleMobileSidebar = () => {
        setMobileOpen(!mobileOpen);
    };

    // USER BILGISI (fullName ve Role) ALMASI GEREKIYOR HOŞGELDINIZ DENMESI İÇİN VE KULLANICI AYARLARI SEKMESININ YOKOLMASI İÇİN

    const drawerContent = (
        <Box
            sx={{
                width: '300px',
                bgcolor: '#003366', // Koyu mavi tonu
                color: 'white',
                padding: '1rem',
                height: '100%', // Yüksekliği %100 yapıyoruz, çünkü Drawer otomatik olarak sayfa yüksekliğine uyar
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            {/* Logo - Tıklanabilir Logo */}
            <Box component={Link} to="/home" sx={{ marginBottom: '1rem' }}>
                <img
                    src="https://i.hizliresim.com/3vm68u7.png"
                    alt="Logo"
                    style={{ width: '150px', cursor: 'pointer' }}
                />
            </Box>

            {/* Hoşgeldin Mesajı */}
            <Typography variant="h6" align="center">Hoşgeldin, Kerim Kulah</Typography>
            <Divider sx={{ width: '100%', my: 2, bgcolor: 'white' }} />

            {/* Menü Listesi */}
            <List component="nav" sx={{ width: '100%' }}>
                {/* Ürünler Menüsü */}
                <ListItem button onClick={() => toggleMenu('products')} sx={{ backgroundColor: openMenu.products ? '#004080' : 'transparent' }}>
                    <ListItemIcon sx={{ minWidth: '35px' }}>
                        <Category sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Ürün İşlemleri" sx={{ ml: 2 }} />
                    {openMenu.products ? <ExpandLess sx={{ color: 'black' }} /> : <ExpandMore sx={{ color: 'black' }} />}
                </ListItem>
                <Collapse in={openMenu.products} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={Link} to="/products" sx={{ pl: 4, backgroundColor: 'transparent' }}>
                            <ListItemText primary="Ürün Listesi" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/addProduct" sx={{ pl: 4, backgroundColor: 'transparent' }}>
                            <ListItemText primary="Ürün Ekleme" sx={{ color: 'white' }} />
                        </ListItem>
                    </List>
                </Collapse>

                {/* Paketler Menüsü */}
                <ListItem button onClick={() => toggleMenu('packages')} sx={{ backgroundColor: openMenu.packages ? '#004080' : 'transparent' }}>
                    <ListItemIcon sx={{ minWidth: '35px' }}>
                        <Inventory sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Paket İşlemleri" sx={{ ml: 2 }} />
                    {openMenu.packages ? <ExpandLess sx={{ color: 'black' }} /> : <ExpandMore sx={{ color: 'black' }} />}
                </ListItem>
                <Collapse in={openMenu.packages} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={Link} to="/packageEntry" sx={{ pl: 4, backgroundColor: 'transparent' }}>
                            <ListItemText primary="Paket Ekleme" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/packages" sx={{ pl: 4, backgroundColor: 'transparent' }}>
                            <ListItemText primary="Paket Listesi" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/packageExit" sx={{ pl: 4, backgroundColor: 'transparent' }}>
                            <ListItemText primary="QR Okuyucu" sx={{ color: 'white' }} />
                        </ListItem>
                    </List>
                </Collapse>

                {/* Raflar Menüsü */}
                <ListItem button onClick={() => toggleMenu('racks')} sx={{ backgroundColor: openMenu.racks ? '#004080' : 'transparent' }}>
                    <ListItemIcon sx={{ minWidth: '35px' }}>
                        <AlignHorizontalLeft sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Raf İşlemleri" sx={{ ml: 2 }} />
                    {openMenu.racks ? <ExpandLess sx={{ color: 'black' }} /> : <ExpandMore sx={{ color: 'black' }} />}
                </ListItem>
                <Collapse in={openMenu.racks} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={Link} to="/racks" sx={{ pl: 4, backgroundColor: 'transparent' }}>
                            <ListItemText primary="Raf Listesi" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/addRack" sx={{ pl: 4, backgroundColor: 'transparent' }}>
                            <ListItemText primary="Raf Ekleme" sx={{ color: 'white' }} />
                        </ListItem>
                    </List>
                </Collapse>

                {/* Kullanıcılar Menüsü */}
                <ListItem button onClick={() => toggleMenu('users')} sx={{ backgroundColor: openMenu.users ? '#004080' : 'transparent' }}>
                    <ListItemIcon sx={{ minWidth: '35px' }}>
                        <People sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Personel İşlemleri" sx={{ ml: 2 }} />
                    {openMenu.users ? <ExpandLess sx={{ color: 'black' }} /> : <ExpandMore sx={{ color: 'black' }} />}
                </ListItem>
                <Collapse in={openMenu.users} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={Link} to="/users" sx={{ pl: 4, backgroundColor: 'transparent' }}>
                            <ListItemText primary="Personel Listesi" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/movements/" sx={{ pl: 4, backgroundColor: 'transparent' }}>
                            <ListItemText primary="Personel Hareketleri" sx={{ color: 'white' }} />
                        </ListItem>
                        <ListItem button component={Link} to="/createUser/" sx={{ pl: 4, backgroundColor: 'transparent' }}>
                            <ListItemText primary="Personel Oluşturma" sx={{ color: 'white' }} />
                        </ListItem>
                    </List>
                </Collapse>


                {/* Profil Ayarları Menüsü */}
                <ListItem button onClick={() => toggleMenu('profile')} sx={{ backgroundColor: openMenu.profile ? '#004080' : 'transparent' }}>
                    <ListItemIcon sx={{ minWidth: '35px' }}>
                        <Settings sx={{ color: 'white' }} />
                    </ListItemIcon>
                    <ListItemText primary="Profil Ayarları" sx={{ ml: 2 }} />
                    {openMenu.profile ? <ExpandLess sx={{ color: 'black' }} /> : <ExpandMore sx={{ color: 'black' }} />}
                </ListItem>
                <Collapse in={openMenu.profile} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem button component={Link} to="/change-password" sx={{ pl: 4, backgroundColor: 'transparent' }}>
                            <ListItemText primary="Şifre Değiştir" sx={{ color: 'white' }} />
                        </ListItem>
                    </List>
                </Collapse>

            </List>

            {/* Logout Bileşeni - En alt kısım */}
            <Box sx={{ marginTop: 'auto', width: '100%' }}>
                <LogoutButton />
            </Box>
        </Box>
    );

    return (
        <>
            {/* Mobilde açma-kapama düğmesi */}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleMobileSidebar}
                sx={{ display: { md: 'none' }, position: 'fixed', top: 10, left: 10 }}
            >
                <Menu sx={{ color: 'black' }} />
            </IconButton>

            {/* Masaüstü Sidebar */}
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                {drawerContent}
            </Box>

            {/* Mobil Sidebar (Drawer) */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={toggleMobileSidebar}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: '#003366', // Koyu mavi tonu
                        color: 'white',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </>
    );
}

export default Sidebar;
