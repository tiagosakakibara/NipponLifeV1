import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../data/useAdminData';
import { Trash2, Edit } from 'lucide-react';

export function AdminPosts() {
    const { posts, deletePost, loading } = useAdminData();
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredPosts = posts.filter(p => {
        if (filterStatus === 'all') return true;
        return p.status === filterStatus;
    });

    const handleDelete = (id: string, title: string) => {
        if (window.confirm(`Tem certeza que deseja excluir o post "${title}"?`)) {
            deletePost(id);
        }
    };

    if (loading) {
        return <div className="p-8">Loading posts...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Posts</h1>
                <Link to="/admin/posts/new" className="bg-[#2271b1] text-white px-3 py-1.5 rounded text-sm hover:bg-[#135e96] transition-colors">
                    Add New Post
                </Link>
            </div>

            <div className="mb-4 flex gap-4 text-sm">
                <button
                    onClick={() => setFilterStatus('all')}
                    className={`${filterStatus === 'all' ? 'text-black font-bold' : 'text-[#2271b1]'}`}
                >
                    All ({posts.length})
                </button>
                <span className="text-gray-300">|</span>
                <button
                    onClick={() => setFilterStatus('published')}
                    className={`${filterStatus === 'published' ? 'text-black font-bold' : 'text-[#2271b1]'}`}
                >
                    Published ({posts.filter(p => p.status === 'published').length})
                </button>
                <span className="text-gray-300">|</span>
                <button
                    onClick={() => setFilterStatus('draft')}
                    className={`${filterStatus === 'draft' ? 'text-black font-bold' : 'text-[#2271b1]'}`}
                >
                    Drafts ({posts.filter(p => p.status === 'draft').length})
                </button>
            </div>

            <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[11px] font-bold">
                        <tr>
                            <th className="px-4 py-3">Title</th>
                            <th className="px-4 py-3">Category</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 text-gray-700">
                        {filteredPosts.map((post) => (
                            <tr key={post.id} className="group hover:bg-gray-50">
                                <td className="px-4 py-4">
                                    <div className="font-medium text-[#2271b1] hover:text-[#135e96] cursor-pointer">
                                        {post.title}
                                    </div>
                                    <div className="text-[11px] text-gray-400 mt-1 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                                        Slug: {post.slug}
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-500 capitalize">{post.categoryKey}</td>
                                <td className="px-4 py-4 text-gray-400">
                                    {post.status === 'published' ? 'Published' : 'Draft'}<br />
                                    {new Date(post.updatedAt).toLocaleDateString('pt-BR')}
                                </td>
                                <td className="px-4 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Link to={`/admin/posts/${post.id}`} className="p-1 hover:text-[#2271b1]">
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(post.id, post.title);
                                            }}
                                            className="p-1 hover:text-red-600"
                                            title="Delete post"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
