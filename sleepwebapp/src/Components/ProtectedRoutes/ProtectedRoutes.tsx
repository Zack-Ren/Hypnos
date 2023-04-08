import { useContext } from 'react';
import { useLocation } from 'react-router';
import { Navigate, Outlet } from 'react-router-dom';
import { DoctorContext } from '../DoctorProviderComponent/Context';

/**
 * It is a wrapper to wrap around sensitive routes
 * @returns A Route that protects all other routes from unauthorized users
 */
export const ProtectedRoutes = () => {
    // State
    const location = useLocation();
    const { doctor, isLoggedIn } = useContext(DoctorContext);

    // Condition to show Children Routes.
    if (doctor && isLoggedIn) {
        return <Outlet />;
    } else {
        return <Navigate to='/login' replace state={{ from: location }} />;
    }
};
