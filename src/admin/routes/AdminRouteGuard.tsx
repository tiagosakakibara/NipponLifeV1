import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AdminRouteGuardProps {
    children: ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
    // For now, we allow access to everyone. 
    // Future implementation: check if user is authenticated and is an admin.
    const isAuthenticated = true;
    const isAdmin = true;

    if (!isAuthenticated || !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
