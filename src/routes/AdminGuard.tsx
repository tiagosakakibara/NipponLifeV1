import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function AdminGuard() {
    const { session, role, loading } = useAuth();
    const user = session?.user;

    // Enhanced logging for debugging in production
    if (!loading) {
        console.group('AdminGuard Debug');
        console.log('Session User:', user);
        console.log('User Role from Context:', role);

        const rawEnv = import.meta.env.VITE_ADMIN_EMAILS || '';
        const adminEmails = rawEnv
            .split(',')
            .map((e: string) => e.trim().toLowerCase());

        const userEmail = user?.email?.toLowerCase();
        const isEmailAllowed = userEmail && adminEmails.includes(userEmail);
        const isRoleAllowed = role === 'admin';
        const isAllowed = isEmailAllowed || isRoleAllowed;

        console.log('Is Email Allowed (ENV):', isEmailAllowed);
        console.log('Is Role Allowed (DB):', isRoleAllowed);
        console.log('Final Decision:', isAllowed ? 'ALLOWED' : 'DENIED');
        console.groupEnd();
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-gray-500 font-medium">Loading session...</div>
            </div>
        );
    }

    if (!session || !user) {
        return <Navigate to="/admin/login" replace />;
    }

    const rawEnv = import.meta.env.VITE_ADMIN_EMAILS || '';
    const adminEmails = rawEnv
        .split(',')
        .map((e: string) => e.trim().toLowerCase());

    const userEmail = user.email?.toLowerCase();
    const isAllowed = (userEmail && adminEmails.includes(userEmail)) || role === 'admin';

    if (isAllowed) {
        return <Outlet />;
    } else {
        return <Navigate to="/403" replace />;
    }
}
