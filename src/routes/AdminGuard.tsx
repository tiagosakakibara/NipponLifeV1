import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function AdminGuard() {
    const { session, loading } = useAuth();
    const user = session?.user;

    // Temporary debug logs
    console.log("ADMIN EMAILS:", import.meta.env.VITE_ADMIN_EMAILS);
    console.log("USER:", user);
    console.log("USER EMAIL:", user?.email);

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

    // Check if user email is in the allowed admin emails list
    const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '')
        .split(',')
        .map((e: string) => e.trim());

    const isAllowed = user.email && adminEmails.includes(user.email);

    if (isAllowed) {
        return <Outlet />;
    } else {
        return <Navigate to="/403" replace />;
    }
}
