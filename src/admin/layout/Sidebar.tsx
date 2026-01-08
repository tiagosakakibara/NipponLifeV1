import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Layers,
    Image as ImageIcon,
    Settings,
    ExternalLink
} from 'lucide-react';

const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Media', path: '/admin/media', icon: ImageIcon },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export function Sidebar() {
    const location = useLocation();

    return (
        <aside className="w-64 bg-[#23282d] text-[#eee] flex flex-col min-h-screen">
            <div className="p-4 bg-[#1d2127] flex items-center gap-2 border-b border-[#32373c]">
                <div className="w-8 h-8 rounded bg-nippon-red flex items-center justify-center font-bold text-white">
                    NL
                </div>
                <span className="font-semibold tracking-wide">NipponLife Admin</span>
            </div>

            <nav className="flex-1 mt-4">
                <ul className="space-y-1">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors hover:bg-[#191e23] hover:text-[#72aee6] ${isActive ? 'bg-[#72aee6] text-white' : ''
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <div className="p-4 border-t border-[#32373c]">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-xs text-[#999] hover:text-[#72aee6] transition-colors"
                >
                    <ExternalLink className="w-3 h-3" />
                    <span>Go to Site</span>
                </Link>
            </div>
        </aside>
    );
}
