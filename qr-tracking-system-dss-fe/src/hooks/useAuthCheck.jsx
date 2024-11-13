import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, logout } from '../redux/slices/authSlice';  // doğru path'e göre import edin

const useAuthCheck = (token, isAuthenticated, location) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthStatus = async () => {
            if (!token && location.pathname !== '/login') {
                navigate('/login');
            }
            else if (token && location.pathname !== '/login') {
                await dispatch(verifyToken());
                if (!isAuthenticated) {
                    await dispatch(logout());
                    navigate('/login');
                }
            }
            else if (token && location.pathname === '/login') {
                await dispatch(verifyToken());
                if (isAuthenticated) {
                    navigate('/home');
                } else {
                    await dispatch(logout());
                    navigate('/login');
                }
            }
        };

        checkAuthStatus();
    }, [token, location.pathname, navigate, dispatch, isAuthenticated]);
};

export default useAuthCheck;
