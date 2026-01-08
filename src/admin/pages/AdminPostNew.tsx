import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../data/useAdminData';
import { AdminPost } from '../data/types';

export function AdminPostNew() {
    const navigate = useNavigate();
    const { categories, addPost } = useAdminData();
    const [formData, setFormData] = useState<Partial<AdminPost>>({
        title: '',
        slug: '',
        categoryKey: '',
        language: 'pt',
        excerpt: '',
        content: '',
        status: 'draft',
        coverImageUrl: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.slug || !formData.categoryKey) {
            alert('Por favor, preencha o título, slug e categoria.');
            return;
        }

        const newPost: AdminPost = {
            ...formData as AdminPost,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt: formData.status === 'published' ? new Date().toISOString() : undefined
        };

        addPost(newPost);
        navigate('/admin/posts');
    };

    return (
        <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Post</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter title here"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                className="w-full text-2xl font-bold border-b border-gray-200 py-2 focus:border-[#72aee6] outline-none bg-white text-zinc-900 placeholder-gray-300"
                                required
                            />

                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full border border-gray-300 p-2 text-sm rounded outline-none bg-white text-zinc-900 focus:border-[#72aee6]"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Excerpt (Summary)</label>
                                <textarea
                                    rows={3}
                                    value={formData.excerpt}
                                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                    className="w-full border border-gray-300 p-2 text-sm rounded outline-none bg-white text-zinc-900 focus:border-[#72aee6]"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-gray-400 uppercase mb-1">Content (HTML allowed)</label>
                                <textarea
                                    rows={15}
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                    className="w-full border border-gray-300 p-2 text-sm rounded outline-none bg-white text-zinc-900 font-mono focus:border-[#72aee6]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Sidebar Area */}
                <div className="lg:col-span-1 space-y-6">
                    {/* Publishing Box */}
                    <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="text-sm font-bold text-gray-700">Publish</h3>
                        </div>
                        <div className="p-4 space-y-4 text-xs text-gray-600">
                            <div>
                                <label className="font-bold block mb-1">Status</label>
                                <select
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                                    className="w-full border border-gray-200 p-1 bg-white text-zinc-900 outline-none focus:border-[#72aee6]"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <div>
                                <label className="font-bold block mb-1">Language</label>
                                <select
                                    value={formData.language}
                                    onChange={e => setFormData({ ...formData, language: e.target.value as any })}
                                    className="w-full border border-gray-200 p-1 bg-white text-zinc-900 outline-none focus:border-[#72aee6]"
                                >
                                    <option value="pt">Português (PT)</option>
                                    <option value="jp">日本語 (JP)</option>
                                    <option value="en">English (EN)</option>
                                </select>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/posts')}
                                className="text-[#2271b1] hover:underline text-xs"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-[#2271b1] text-white px-4 py-2 rounded text-sm hover:bg-[#135e96] transition-colors font-medium shadow-sm"
                            >
                                {formData.status === 'published' ? 'Publish' : 'Save Draft'}
                            </button>
                        </div>
                    </div>

                    {/* Category Box */}
                    <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="text-sm font-bold text-gray-700">Category</h3>
                        </div>
                        <div className="p-4 h-48 overflow-y-auto">
                            {categories.map(cat => (
                                <div key={cat.key} className="flex items-center gap-2 mb-2">
                                    <input
                                        type="radio"
                                        name="category"
                                        id={cat.key}
                                        checked={formData.categoryKey === cat.key}
                                        onChange={() => setFormData({ ...formData, categoryKey: cat.key })}
                                        className="text-zinc-900 focus:ring-[#72aee6]"
                                    />
                                    <label htmlFor={cat.key} className="text-sm text-gray-700">{cat.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
                        <div className="p-4 border-b border-zinc-100 bg-gray-50">
                            <h3 className="text-sm font-bold text-gray-700">Featured Image</h3>
                        </div>
                        <div className="p-4 space-y-4">
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={formData.coverImageUrl}
                                onChange={e => setFormData({ ...formData, coverImageUrl: e.target.value })}
                                className="w-full bg-white text-zinc-900 border border-zinc-300 p-2 text-xs rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-400"
                            />
                            {formData.coverImageUrl && (
                                <div className="space-y-2">
                                    <img src={formData.coverImageUrl} className="w-full aspect-video object-cover rounded-md shadow-inner" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, coverImageUrl: '' })}
                                        className="text-red-600 text-[11px] font-bold hover:underline uppercase"
                                    >
                                        Remove Featured Image
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
