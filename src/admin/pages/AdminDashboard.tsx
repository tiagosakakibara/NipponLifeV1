import { useAdminData } from '../data/useAdminData';

export function AdminDashboard() {
    const { posts, categories } = useAdminData();

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium">Total Posts</h3>
                    <p className="text-3xl font-bold mt-1 text-gray-800">{posts.length}</p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium">Categories</h3>
                    <p className="text-3xl font-bold mt-1 text-gray-800">{categories.length}</p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 text-sm font-medium">Drafts</h3>
                    <p className="text-3xl font-bold mt-1 text-gray-800">{posts.filter(p => p.status === 'draft').length}</p>
                </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-800 mb-4 text-xs uppercase tracking-wider">At a Glance</h3>
                <p className="text-sm text-gray-600 italic">Welcome to your new dashboard. Here you can see a summary of your site's activity.</p>
            </div>
        </div>
    );
}
