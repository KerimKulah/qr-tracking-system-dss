import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box, CssBaseline, Container } from '@mui/material';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import useAuthCheck from './hooks/useAuthCheck';
import CreateUser from './pages/CreateUser';
import Users from './pages/Users';
import ProductAddPage from './pages/ProductAddPage';
import ProductListPage from './pages/ProductListPage';

function App() {
  const location = useLocation();
  useAuthCheck(location); // Custom hook'u kullanarak kullanıcı oturumunu kontrol et

  return (
    <Box sx={{ display: 'flex' }}>
      {location.pathname !== '/login' && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, height: '100vh', overflow: 'auto', }}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="/users" element={<Users />} />
            <Route path="/addProduct" element={<ProductAddPage />} />
            <Route path="/products" element={<ProductListPage />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
