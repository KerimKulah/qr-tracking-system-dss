import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyToken, logout } from '../redux/slices/authSlice';  // doğru path'e göre import edin

const useAuthCheck = (location) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthStatus = async () => {
            if (location.pathname !== '/login') {
                const result = await dispatch(verifyToken()).unwrap();
                if (!result) {
                    navigate('/login');
                }
                else if (location.pathname === '/login') {
                    const result = await dispatch(verifyToken()).unwrap();
                    if (result) {
                        navigate('/home');
                    }
                }
                checkAuthStatus();
            }
        }
        checkAuthStatus();
    }, [location, navigate, dispatch]);
};

export default useAuthCheck;
