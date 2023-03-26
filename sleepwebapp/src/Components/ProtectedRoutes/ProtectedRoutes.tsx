import { useContext } from 'react';
import { useLocation } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';
import { DoctorContext } from '../DoctorProviderComponent/Context';

export const ProtectedRoutes = () => {
    const location = useLocation();
    const { doctor, isLoggedIn } = useContext(DoctorContext);

    // Condition to show Children Routes.
    if (doctor && isLoggedIn) {
        return <Outlet />;
    } else {
        return <Navigate to='/login' replace state={{ from: location }} />;
    }
};
