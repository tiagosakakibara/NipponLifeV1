import { useState } from 'react';
import { useAdminData } from '../data/useAdminData';
import { AdminCategory } from '../data/types';
import { Trash2, Edit } from 'lucide-react';

export function AdminCategories() {
    const { categories, addCategory, updateCategory, deleteCategory, loading } = useAdminData();
    const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);
    const [formData, setFormData] = useState({
        key: '',
        label: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.key || !formData.label) return;

        if (editingCategory) {
            await updateCategory(editingCategory.key, formData);
            setEditingCategory(null);
        } else {
            await addCategory(formData);
        }
        setFormData({ key: '', label: '' });
    };

    const handleEdit = (cat: AdminCategory) => {
        setEditingCategory(cat);
        setFormData(cat);
    };

    const handleDelete = (key: string, label: string) => {
        if (window.confirm(`Excluir categoria "${label}"?`)) {
            deleteCategory(key);
        }
    };

    if (loading) {
        return <div className="p-8">Loading categories...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Categories</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-zinc-200 text-zinc-900">
                        <h3 className="font-semibold text-gray-700 mb-4">
                            {editingCategory ? 'Edit Category' : 'Add New Category'}
                        </h3>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                                <input
                                    type="text"
                                    value={formData.label}
                                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                                    className="w-full bg-white text-zinc-900 border border-zinc-300 p-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Slug/Key</label>
                                <input
                                    type="text"
                                    value={formData.key}
                                    onChange={e => setFormData({ ...formData, key: e.target.value })}
                                    disabled={!!editingCategory}
                                    className="w-full bg-white text-zinc-900 border border-zinc-300 p-2 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-400"
                                    required
                                />
                            </div>

                            <div className="flex gap-2">
                                <button type="submit" className="bg-[#2271b1] text-white px-4 py-2 rounded text-sm hover:bg-[#135e96] transition-colors flex-1 font-medium">
                                    {editingCategory ? 'Update' : 'Add New'}
                                </button>
                                {editingCategory && (
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingCategory(null);
                                            setFormData({ key: '', label: '' });
                                        }}
                                        className="bg-gray-100 text-gray-600 px-4 py-2 rounded text-sm hover:bg-gray-200 transition-colors font-medium border border-gray-200"
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <div className="bg-white rounded shadow-sm border border-gray-200 overflow-hidden text-sm">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase text-[11px] font-bold">
                                <tr>
                                    <th className="px-4 py-3">Name</th>
                                    <th className="px-4 py-3">Slug</th>
                                    <th className="px-4 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {categories.map((cat) => (
                                    <tr key={cat.key} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium text-[#2271b1]">{cat.label}</td>
                                        <td className="px-4 py-3 text-gray-400">{cat.key}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex justify-end gap-2 text-gray-400">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEdit(cat);
                                                    }}
                                                    className="hover:text-[#2271b1]"
                                                    title="Edit category"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(cat.key, cat.label);
                                                    }}
                                                    className="hover:text-red-600"
                                                    title="Delete category"
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
            </div>
        </div>
    );
}
