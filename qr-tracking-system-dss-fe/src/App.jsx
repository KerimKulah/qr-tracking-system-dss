import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box, CssBaseline, Container } from '@mui/material';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import useAuthCheck from './hooks/useAuthCheck';
import CreateUser from './pages/CreateUser';
import Users from './pages/Users';
import AddProduct from './pages/AddProduct';
import Products from './pages/Products';
import Racks from './pages/Racks';
import AddRack from './pages/AddRack';
import AddPackage from './pages/AddPackage';
import Packages from './pages/Packages';
import ChangePassword from './pages/ChangePassword';
import PackageExit from './pages/PackageExit';

function App() {
  const location = useLocation();
  useAuthCheck(location); // Custom hook'u kullanarak kullanıcı oturumunu kontrol et

  return (
    <Routes>
      {/* Login sayfası bağımsız bir sayfa olduğu için Box dışında tutuldu */}
      <Route path="/login" element={<Login />} />

      {/* Diğer sayfalara sadece oturum açmış kullanıcılar erişebilir */}
      {location.pathname !== '/login' && (
        <Route
          path="/*"
          element={
            <Box sx={{ display: 'flex' }}>
              <Sidebar />
              <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, height: '100vh', overflow: 'auto' }}>
                <CssBaseline />
                <Container maxWidth="lg">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/CreateUser" element={<CreateUser />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/addProduct" element={<AddProduct />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/racks" element={<Racks />} />
                    <Route path="/addRack" element={<AddRack />} />
                    <Route path="/packageEntry" element={<AddPackage />} />
                    <Route path="/packages" element={<Packages />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/packageExit" element={<PackageExit />} />
                  </Routes>
                </Container>
              </Box>
            </Box>
          }
        />
      )}
    </Routes>
  );
}

export default App;
