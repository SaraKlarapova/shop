import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import { useJwtStore } from 'stores/jwt';

export const RequireAuth = () => {
    const jwt = useJwtStore((state) => state.jwt);

    if (!jwt) {
        return <Navigate to={'/panel/'} replace />
    }

    return <Outlet />;
}
