import { useState, useEffect } from 'react';
import { useAdminData } from '../data/useAdminData';

export function AdminSettings() {
    const { settings, saveSettings } = useAdminData();
    const [formData, setFormData] = useState(settings);
    const [showFeedback, setShowFeedback] = useState(false);

    useEffect(() => {
        setFormData(settings);
    }, [settings]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        saveSettings(formData);
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 3000);
    };

    return (
        <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">General Settings</h1>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-zinc-200 text-zinc-900">
                <form className="space-y-8" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <label className="text-sm font-semibold text-zinc-700">Site Title</label>
                        <div className="md:col-span-2">
                            <input
                                type="text"
                                value={formData.siteTitle}
                                onChange={e => setFormData({ ...formData, siteTitle: e.target.value })}
                                className="w-full bg-white text-zinc-900 border border-zinc-300 p-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <label className="text-sm font-semibold text-zinc-700">Tagline</label>
                        <div className="md:col-span-2">
                            <input
                                type="text"
                                value={formData.tagline}
                                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                                className="w-full bg-white text-zinc-900 border border-zinc-300 p-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-[11px] text-zinc-400 mt-1.5 font-medium">In a few words, explain what this site is about.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <label className="text-sm font-semibold text-zinc-700">Administration Email Address</label>
                        <div className="md:col-span-2">
                            <input
                                type="email"
                                value={formData.adminEmail}
                                onChange={e => setFormData({ ...formData, adminEmail: e.target.value })}
                                className="w-full bg-white text-zinc-900 border border-zinc-300 p-2.5 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <p className="text-[11px] text-zinc-400 mt-1.5 font-medium">This address is used for admin purposes.</p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-100 flex items-center gap-4">
                        <button
                            type="submit"
                            className="bg-[#2271b1] text-white px-6 py-2.5 rounded-md text-sm font-bold hover:bg-[#135e96] transition-colors shadow-sm"
                        >
                            Save Changes
                        </button>
                        {showFeedback && (
                            <span className="text-green-600 text-sm font-medium animate-in fade-in duration-300">
                                Settings saved successfully!
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
