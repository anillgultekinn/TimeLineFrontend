import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import { ADMIN_ROLE } from '../../environment/environment';

type Props = {
    children: any;
};

const AdminProtectedRoute = (props: Props) => {
    const navigate = useNavigate();
    const tokenState = useSelector((state: any) => state.auth);
    const user = authService.getUserInfo();
    useEffect(() => {
        if (user?.role !== ADMIN_ROLE || !tokenState.isAuthenticated) {
            navigate("/anasayfa");
        }
    }, []);

    return <>{props.children}</>;
};

export default AdminProtectedRoute;