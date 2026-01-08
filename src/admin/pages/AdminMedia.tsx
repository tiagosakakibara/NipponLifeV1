import { useRef } from 'react';
import { useAdminData } from '../data/useAdminData';
import { Trash2, Image as ImageIcon } from 'lucide-react';

export function AdminMedia() {
    const { media, addMediaItem, deleteMediaItem } = useAdminData();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            addMediaItem({
                id: Date.now().toString(),
                url: base64String,
                name: file.name,
                type: file.type,
                size: file.size,
                createdAt: new Date().toISOString(),
            });
        };
        reader.readAsDataURL(file);

        // Clear input
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleDelete = (id: string) => {
        if (window.confirm('Delete this media item?')) {
            deleteMediaItem(id);
        }
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Media Library</h1>
                <div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        accept="image/*"
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#2271b1] text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-[#135e96] transition-colors shadow-sm"
                    >
                        Add New
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 items-center border border-zinc-200 shadow-sm rounded-lg mb-6 flex gap-4 text-zinc-900">
                <select className="bg-white text-zinc-900 border border-zinc-300 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All media items</option>
                    <option>Images</option>
                </select>
                <div className="text-sm text-zinc-500 ml-auto">
                    {media.length} items
                </div>
            </div>

            {media.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-zinc-200 rounded-xl p-20 text-center">
                    <ImageIcon className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
                    <p className="text-zinc-500 font-medium">No media items found. Upload your first image!</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {media.map((item) => (
                        <div key={item.id} className="group relative aspect-square bg-white border border-zinc-200 rounded-lg overflow-hidden shadow-sm hover:border-blue-500 transition-all">
                            <img
                                src={item.url}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2 text-center">
                                <p className="text-white text-[10px] truncate w-full px-2 mb-1">{item.name}</p>
                                <p className="text-zinc-300 text-[9px] mb-3">{formatSize(item.size)}</p>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(item.id);
                                        }}
                                        className="p-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                        title="Delete media"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigator.clipboard.writeText(item.url);
                                            alert('URL copied to clipboard!');
                                        }}
                                        className="p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-[10px] font-bold px-2"
                                    >
                                        COPY URL
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
