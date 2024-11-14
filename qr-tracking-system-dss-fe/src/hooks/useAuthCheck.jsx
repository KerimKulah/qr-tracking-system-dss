import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { verifyToken } from '../redux/slices/authSlice';  // doğru path'e göre import edin

const useAuthCheck = (location) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const checkAuthStatus = async () => {
            const result = await dispatch(verifyToken()).unwrap();
            if (!result && location.pathname !== '/login') {
                navigate('/login');
            } else if (result && location.pathname === '/login') {
                navigate('/home');
            }
        };
        checkAuthStatus();
    }, [location.pathname, dispatch, navigate]);
};

export default useAuthCheck;
