import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function AdminGuard() {
    const { session, loading } = useAuth();
    const user = session?.user;

    // Enhanced logging for debugging in production
    if (!loading) {
        console.group('AdminGuard Debug');
        console.log('Session User:', user);
        console.log('User Email:', user?.email);

        const rawEnv = import.meta.env.VITE_ADMIN_EMAILS || '';
        console.log('VITE_ADMIN_EMAILS (raw):', rawEnv);

        const adminEmails = rawEnv
            .split(',')
            .map((e: string) => e.trim().toLowerCase());
        console.log('Allowed Admin Emails (parsed):', adminEmails);

        const userEmail = user?.email?.toLowerCase();
        const isAllowed = userEmail && adminEmails.includes(userEmail);
        console.log('Authorization Decision:', isAllowed ? 'ALLOWED' : 'DENIED');
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

    const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '')
        .split(',')
        .map((e: string) => e.trim().toLowerCase());

    const userEmail = user.email?.toLowerCase();
    const isAllowed = userEmail && adminEmails.includes(userEmail);

    if (isAllowed) {
        return <Outlet />;
    } else {
        return <Navigate to="/403" replace />;
    }
}
