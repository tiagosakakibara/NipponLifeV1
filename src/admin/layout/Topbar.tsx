import { User, LogOut, Bell } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Topbar() {
    const navigate = useNavigate();
    const { session } = useAuth();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    return (
        <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4 text-sm text-gray-500">
                <span>Admin Panel</span>
            </div>

            <div className="flex items-center gap-6">
                <button className="text-gray-400 hover:text-gray-600 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="flex items-center gap-3 border-l border-gray-200 pl-6 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-medium text-gray-700">{session?.user?.email || 'Admin'}</p>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">User</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 group-hover:bg-gray-200 transition-colors">
                        <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <button
                        onClick={handleLogout}
                        title="Logout"
                    >
                        <LogOut className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                    </button>
                </div>
            </div>
        </header>
    );
}
