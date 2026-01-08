import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AdminLayout() {
    return (
        <div className="flex bg-[#f1f1f1] min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Topbar />
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
