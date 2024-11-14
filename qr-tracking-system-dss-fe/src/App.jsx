import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Box, CssBaseline, Container } from '@mui/material';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Login from './pages/Login';
import useAuthCheck from './hooks/useAuthCheck';
import CreateUser from './pages/CreateUser';

function App() {
  const location = useLocation();

  useAuthCheck(location);

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
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
