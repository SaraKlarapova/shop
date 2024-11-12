import { Navigate, Outlet } from 'react-router-dom'
import { useJwtStore } from 'stores/jwt';

export const Redirect = () => {
    const role = useJwtStore((state) => state.role);

    if (role) {
        return <Navigate to={'/panel'} replace />
    } else {
        return <Navigate to={'/auth/sign-in'} replace />
    }
}
