import { AdminCategory, AdminPost, AdminSettings, MediaItem } from './types';

const STORAGE_KEYS = {
    CATEGORIES: 'nl_admin_categories',
    POSTS: 'nl_admin_posts',
    SETTINGS: 'nl_admin_settings',
    MEDIA: 'nl_admin_media',
};

export const storage = {
    // Categories
    getCategories: (): AdminCategory[] => {
        const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
        return data ? JSON.parse(data) : [];
    },
    saveCategories: (categories: AdminCategory[]) => {
        localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    },

    // Posts
    getPosts: (): AdminPost[] => {
        const data = localStorage.getItem(STORAGE_KEYS.POSTS);
        return data ? JSON.parse(data) : [];
    },
    savePosts: (posts: AdminPost[]) => {
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    },

    // Settings
    getSettings: (): AdminSettings | null => {
        const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return data ? JSON.parse(data) : null;
    },
    saveSettings: (settings: AdminSettings) => {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    },

    // Media
    getMedia: (): MediaItem[] => {
        const data = localStorage.getItem(STORAGE_KEYS.MEDIA);
        return data ? JSON.parse(data) : [];
    },
    saveMedia: (media: MediaItem[]) => {
        localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(media));
    },

    // Delete Helpers
    deletePost: (id: string) => {
        const posts = storage.getPosts();
        const filtered = posts.filter(p => p.id !== id);
        storage.savePosts(filtered);
        return filtered;
    },
    deleteCategory: (key: string) => {
        const categories = storage.getCategories();
        const filtered = categories.filter(c => c.key !== key);
        storage.saveCategories(filtered);
        return filtered;
    },
    deleteMedia: (id: string) => {
        const media = storage.getMedia();
        const filtered = media.filter(m => m.id !== id);
        storage.saveMedia(filtered);
        return filtered;
    }
};
